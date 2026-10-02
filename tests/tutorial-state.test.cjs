// Run with Node.js 18 or later: node --test tests/tutorial-state.test.cjs
// This deliberately small DOM double checks state/rendering logic, not layout.
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const root = resolve(__dirname, "..");
const html = readFileSync(resolve(root, "tutorial-demo.html"), "utf8");
// The override lets the same tests verify that the original source fails.
const script = readFileSync(process.env.TUTORIAL_SCRIPT || resolve(root, "assets/tutorial.js"), "utf8");

class Element {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.listeners = new Map();
    this.disabled = false;
    this.value = "";
    this.checked = false;
    this._text = "";
  }
  set textContent(text) {
    this.children = [];
    this._text = String(text);
  }
  get textContent() {
    return this._text + this.children.map(child => child.textContent).join("");
  }
  append(...children) {
    this.children.push(...children);
  }
  replaceChildren(...children) {
    this._text = "";
    this.children = [...children];
  }
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }
  dispatch(type) {
    for (const listener of this.listeners.get(type) || []) listener({ target: this });
  }
  click() {
    if (!this.disabled) this.dispatch("click");
  }
}

function loadDemo() {
  const nodes = {};
  for (const id of ["topic", "question", "run-scan", "reset-demo", "build-brief", "results", "brief", "prompt-preview"]) {
    assert.ok(html.includes(`id="${id}"`), `Missing real HTML control: ${id}`);
    nodes[id] = new Element("div");
  }
  nodes.topic.options = [...html.matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)]
    .map(([, value, text]) => ({ value, text }));
  nodes.topic.value = nodes.topic.options[0].value;
  Object.defineProperty(nodes.topic, "selectedIndex", {
    get() { return this.options.findIndex(option => option.value === this.value); }
  });
  nodes.question.value = html.match(/<textarea id="question"[^>]*>([^<]+)<\/textarea>/)[1];
  nodes["build-brief"].disabled = /<button[^>]*id="build-brief"[^>]*\bdisabled\b/.test(html);
  const fields = [...html.matchAll(/<input type="checkbox" value="([^"]+)"([^>]*)>/g)].map(([, value, attrs]) => {
    const input = new Element("input");
    input.value = value;
    input.checked = /\bchecked\b/.test(attrs);
    return input;
  });
  assert.equal(fields.length, 4);
  const document = {
    querySelector: selector => nodes[selector.slice(1)],
    querySelectorAll: selector => {
      if (selector === 'fieldset input[type="checkbox"]') return fields;
      if (selector === 'fieldset input[type="checkbox"]:checked') return fields.filter(field => field.checked);
      throw new Error(`Unexpected selector: ${selector}`);
    },
    createElement: tag => new Element(tag)
  };
  const context = vm.createContext({ document });
  vm.runInContext(script, context, { filename: "tutorial.js" });
  return {
    nodes, fields,
    run: () => nodes["run-scan"].click(),
    build: () => nodes["build-brief"].click(),
    forceBuild: () => vm.runInContext("buildBrief()", context),
    topic(value) { nodes.topic.value = value; nodes.topic.dispatch("change"); },
    question(value) { nodes.question.value = value; nodes.question.dispatch("input"); },
    field(index, checked) { fields[index].checked = checked; fields[index].dispatch("change"); }
  };
}

function assertInvalidated(demo) {
  const { nodes } = demo;
  assert.equal(nodes["build-brief"].disabled, true);
  assert.equal(nodes.results.children.filter(child => child.className === "result-record").length, 0);
  assert.doesNotMatch(nodes.brief.textContent, /Evidence brief:|\[SYN-S\d\]/);
  assert.doesNotMatch(nodes["prompt-preview"].textContent, /ALLOWED SOURCES|OUTPUT CONTRACT/);
}

function promptParts(demo) {
  const text = demo.nodes["prompt-preview"].textContent;
  return {
    text,
    question: text.split("\nQUESTION\n")[1].split("\n\nALLOWED SOURCES\n")[0],
    sources: JSON.parse(text.split("\nALLOWED SOURCES\n")[1].split("\n\nOUTPUT CONTRACT\n")[0])
  };
}

for (const [topic, label, firstId] of [
  ["methane", "Methane cycling", "SYN-S1"],
  ["ammonia", "Ammonia oxidation", "SYN-S2"],
  ["virus", "Virus–host interactions", "SYN-S3"]
]) {
  test(`normal ${topic} scan and brief use one coherent input set`, () => {
    const demo = loadDemo();
    demo.topic(topic);
    demo.run();
    assert.equal(demo.nodes["build-brief"].disabled, false);
    assert.equal(demo.nodes.results.children.length, 3);
    assert.match(demo.nodes.results.children[0].textContent, new RegExp(firstId));
    const prompt = promptParts(demo);
    assert.equal(prompt.question, demo.nodes.question.value.trim());
    assert.equal(prompt.sources[0].source_id, firstId);
    assert.equal(prompt.sources.length, 3);
    assert.match(prompt.text, /Return these fields: source, sentence, context, uncertainty\./);
    demo.build();
    assert.equal(demo.nodes.brief.children.length, 1);
    const card = demo.nodes.brief.children[0];
    assert.equal(card.children[0].textContent, `Evidence brief: ${label}`);
    assert.equal(card.children[1].textContent, prompt.question);
    assert.match(card.textContent, new RegExp(`\\[${firstId}\\]`));
    assert.match(card.textContent, /retrieval relevance only/);
    assert.match(card.textContent, /Human verification required/);
  });
}

test("switching methane to ammonia clears the old scan, prompt and built brief", () => {
  const demo = loadDemo();
  demo.run();
  demo.build();
  demo.topic("ammonia");
  assertInvalidated(demo);
  assert.match(demo.nodes.question.value, /ammonia oxidation/);
  demo.build();
  assertInvalidated(demo);
  demo.run();
  demo.build();
  assert.match(demo.nodes.brief.textContent, /Evidence brief: Ammonia oxidation/);
  const fresh = loadDemo();
  fresh.topic("ammonia");
  fresh.run();
  fresh.build();
  assert.equal(demo.nodes.brief.textContent, fresh.nodes.brief.textContent);
  assert.equal(promptParts(demo).text, promptParts(fresh).text);
  assert.equal(promptParts(demo).sources[0].source_id, "SYN-S2");
});

test("editing the question invalidates immediately and rescanning updates retrieval", () => {
  const demo = loadDemo();
  demo.run();
  demo.build();
  const revised = "  CRISPR spacer virus viral host defense hypersaline enrichment resistance  ";
  demo.question(revised);
  assertInvalidated(demo);
  demo.run();
  assert.equal(promptParts(demo).question, revised.trim());
  assert.equal(promptParts(demo).sources[0].source_id, "SYN-S3");
  demo.build();
  assert.equal(demo.nodes.brief.children[0].children[1].textContent, revised.trim());
});

test("changing a required field clears outputs until a new contract is generated", () => {
  const demo = loadDemo();
  demo.run();
  demo.build();
  demo.field(2, false);
  assertInvalidated(demo);
  demo.run();
  assert.match(promptParts(demo).text, /Return these fields: source, sentence, uncertainty\./);
  demo.build();
  assert.match(demo.nodes.brief.textContent, /Evidence brief: Methane cycling/);
  demo.field(2, true);
  assertInvalidated(demo);
});

test("empty field selection blocks retrieval and recovers after selecting one field", () => {
  const demo = loadDemo();
  demo.fields.forEach((_, index) => demo.field(index, false));
  demo.run();
  assertInvalidated(demo);
  assert.match(demo.nodes.results.textContent, /Select at least one required evidence field/);
  assert.doesNotMatch(demo.nodes["prompt-preview"].textContent, /Return these fields: \./);
  demo.field(1, true);
  assertInvalidated(demo);
  demo.run();
  assert.match(promptParts(demo).text, /Return these fields: sentence\./);
  demo.build();
  assert.match(demo.nodes.brief.textContent, /Evidence brief:/);
});

test("empty fields after a completed brief cannot leave stale output visible", () => {
  const demo = loadDemo();
  demo.run();
  demo.build();
  demo.fields.forEach((_, index) => demo.field(index, false));
  assertInvalidated(demo);
  demo.run();
  assertInvalidated(demo);
  assert.match(demo.nodes.results.textContent, /Select at least one/);
});

test("a scan rejects silently emptied fields and clears a previously built brief", () => {
  const demo = loadDemo();
  demo.run();
  demo.build();
  demo.fields.forEach(field => { field.checked = false; });
  demo.run();
  assertInvalidated(demo);
  assert.match(demo.nodes.results.textContent, /Select at least one required evidence field/);
});

test("repeated scans replace results, preserve a deterministic prompt, and clear the brief", () => {
  const demo = loadDemo();
  demo.run();
  const firstPrompt = promptParts(demo).text;
  const firstResults = demo.nodes.results.textContent;
  demo.build();
  demo.build();
  assert.equal(demo.nodes.brief.children.length, 1);
  demo.run();
  demo.run();
  assert.equal(demo.nodes.results.children.length, 3);
  assert.equal(demo.nodes.results.textContent, firstResults);
  assert.equal(promptParts(demo).text, firstPrompt);
  assert.doesNotMatch(demo.nodes.brief.textContent, /Evidence brief:/);
  assert.match(demo.nodes.brief.textContent, /Retrieval complete/);
  demo.build();
  assert.match(demo.nodes.brief.textContent, /Evidence brief: Methane cycling/);
});

for (const [kind, edit] of [
  ["topic", demo => { demo.nodes.topic.value = "ammonia"; }],
  ["question", demo => { demo.nodes.question.value = "A newly restored question"; }],
  ["fields", demo => { demo.fields[0].checked = false; }],
  ["same-size field selection", demo => { demo.fields[0].checked = true; demo.fields[1].checked = false; }]
]) {
  test(`building rejects a silent ${kind} change without relying on DOM events`, () => {
    const demo = loadDemo();
    if (kind === "same-size field selection") demo.field(0, false);
    demo.run();
    demo.build();
    edit(demo);
    demo.build();
    assertInvalidated(demo);
  });
}

test("building without a valid scan is guarded even if called directly", () => {
  const demo = loadDemo();
  assert.equal(demo.nodes["build-brief"].disabled, true);
  demo.forceBuild();
  assertInvalidated(demo);
});

test("reset restores defaults and removes every generated output", () => {
  const demo = loadDemo();
  demo.topic("virus");
  demo.field(2, false);
  demo.run();
  demo.build();
  demo.nodes["reset-demo"].click();
  assert.equal(demo.nodes.topic.value, "methane");
  assert.match(demo.nodes.question.value, /methane cycling/);
  assert.ok(demo.fields.every(field => field.checked));
  assertInvalidated(demo);
  demo.run();
  demo.build();
  assert.match(demo.nodes.brief.textContent, /Evidence brief: Methane cycling/);
  assert.equal(promptParts(demo).sources[0].source_id, "SYN-S1");
});
