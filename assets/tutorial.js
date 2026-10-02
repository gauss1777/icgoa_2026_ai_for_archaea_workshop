const records = [
  {
    id: "SYN-S1",
    title: "Synthetic record: methane turnover in an anoxic sediment",
    context: "Anoxic marine sediment; genome-resolved survey with geochemical profiles",
    topics: ["methane"],
    abstract: [
      "Metagenome-assembled archaeal genomes encoded methyl-coenzyme M reductase genes associated with methane metabolism.",
      "The strongest abundance signal occurred near the sulfate-methane transition.",
      "Genome content supports metabolic potential, but the training record does not include direct rate measurements."
    ],
    uncertainty: "Taxonomic placement, genome completeness, pathway direction, and measured activity require verification."
  },
  {
    id: "SYN-S2",
    title: "Synthetic record: ammonia-oxidizing archaea in an oligotrophic water column",
    context: "Open-ocean water column; metagenomics and transcript measurements",
    topics: ["ammonia"],
    abstract: [
      "Archaeal amoA genes and transcripts were detected across low-ammonia samples.",
      "The abundance pattern was consistent with a role for ammonia-oxidizing archaea in nitrification.",
      "Transcripts indicate expression but do not independently establish process rates."
    ],
    uncertainty: "Primer or assembly bias, taxonomic resolution, and rate evidence require verification."
  },
  {
    id: "SYN-S3",
    title: "Synthetic record: defense systems in an archaeal virus-host pair",
    context: "Hypersaline enrichment; paired host and virus genomes",
    topics: ["virus"],
    abstract: [
      "The archaeal host genome contained CRISPR spacers matching the recovered viral genome.",
      "The enrichment changed in composition after viral challenge.",
      "Spacer matches support prior interaction, but do not alone prove the mechanism of resistance."
    ],
    uncertainty: "Host range, defense mechanism, experimental controls, and ecological relevance require verification."
  }
];

const topicTerms = {
  methane: ["methane", "methanogenesis", "methanotrophic", "methyl-coenzyme", "mcr"],
  ammonia: ["ammonia", "nitrification", "amoa", "ammonia-oxidizing"],
  virus: ["virus", "viral", "host", "crispr", "spacer", "defense"]
};

const stopWords = new Set([
  "which", "what", "where", "when", "with", "from", "that", "this", "these",
  "those", "provide", "evidence", "relevant", "records", "record", "requires",
  "require", "expert", "verification", "archaeal", "archaea", "and", "the",
  "for", "are", "how", "into", "does", "still"
]);

const topicSelect = document.querySelector("#topic");
const questionInput = document.querySelector("#question");
const runButton = document.querySelector("#run-scan");
const resetButton = document.querySelector("#reset-demo");
const briefButton = document.querySelector("#build-brief");
const resultsNode = document.querySelector("#results");
const briefNode = document.querySelector("#brief");
const promptNode = document.querySelector("#prompt-preview");

let scanState = null;

function tokensFromQuestion(question) {
  return [...new Set(
    question
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, " ")
      .split(/\s+/)
      .filter(token => token.length > 2 && !stopWords.has(token))
  )];
}

function scoreRecord(record, topic, questionTokens) {
  const body = [record.title, record.context, ...record.abstract].join(" ").toLowerCase();
  const terms = [...topicTerms[topic], ...questionTokens];
  const matched = [...new Set(terms.filter(term => body.includes(term.toLowerCase())))];
  const topicBonus = record.topics.includes(topic) ? 4 : 0;
  return {
    ...record,
    matched,
    score: topicBonus + matched.length
  };
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderResults(rankedRecords) {
  resultsNode.replaceChildren();

  rankedRecords.forEach(record => {
    const article = makeElement("article", "result-record");
    const head = makeElement("div", "result-head");
    const title = makeElement("h3", "", record.title);
    const score = makeElement("span", "score", "RELEVANCE SCORE " + record.score);
    head.append(title, score);

    const meta = makeElement("p", "record-meta", record.id + " · " + record.context);
    const matched = makeElement(
      "p",
      "matched-terms",
      "Matched terms: " + (record.matched.length ? record.matched.join(", ") : "none")
    );

    const supportingSentence = record.abstract.find(sentence =>
      record.matched.some(term => sentence.toLowerCase().includes(term.toLowerCase()))
    ) || record.abstract[0];

    const evidence = makeElement("p", "evidence-sentence", "“" + supportingSentence + "”");
    const uncertainty = makeElement("p", "record-meta", "Verification note: " + record.uncertainty);

    article.append(head, meta, matched, evidence, uncertainty);
    resultsNode.append(article);
  });
}

function selectedFields() {
  return [...document.querySelectorAll('fieldset input[type="checkbox"]:checked')]
    .map(input => input.value);
}

function readInputs() {
  return {
    topic: topicSelect.value,
    topicLabel: topicSelect.options[topicSelect.selectedIndex].text,
    question: questionInput.value.trim(),
    fields: selectedFields()
  };
}

function invalidateScan(message = "Inputs changed. Run the evidence scan again to refresh the evidence and prompt.") {
  scanState = null;
  resultsNode.replaceChildren(makeElement("p", "empty-state", message));
  briefNode.replaceChildren(makeElement("p", "empty-state", "Run a new evidence scan before building the brief."));
  promptNode.textContent = message;
  briefButton.disabled = true;
}

function buildPrompt(scan) {
  const boundedRecords = scan.rankedRecords.map(record => ({
    source_id: record.id,
    title: record.title,
    context: record.context,
    sentences: record.abstract,
    uncertainty: record.uncertainty
  }));

  return [
    "ROLE",
    "You are assisting with evidence extraction for archaeal research.",
    "",
    "QUESTION",
    scan.question,
    "",
    "ALLOWED SOURCES",
    JSON.stringify(boundedRecords, null, 2),
    "",
    "OUTPUT CONTRACT",
    "- Use only the allowed sources.",
    "- Return these fields: " + scan.fields.join(", ") + ".",
    "- Attach a source_id to every claim.",
    "- Separate direct evidence from interpretation.",
    "- State when evidence is insufficient.",
    "- End with a human verification checklist.",
    "",
    "DO NOT",
    "- Invent citations, organisms, genes, methods, or environmental details.",
    "- Convert genomic potential into measured activity.",
    "- Treat the synthetic records as real publications."
  ].join("\n");
}

function runScan() {
  const inputs = readInputs();
  if (!inputs.fields.length) {
    invalidateScan("Select at least one required evidence field, then run the evidence scan.");
    return;
  }

  const questionTokens = tokensFromQuestion(inputs.question);
  const rankedRecords = records
    .map(record => scoreRecord(record, inputs.topic, questionTokens))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

  // Every generated output belongs to this one scan, not to later form edits.
  scanState = { ...inputs, rankedRecords };
  renderResults(scanState.rankedRecords);
  promptNode.textContent = buildPrompt(scanState);
  briefButton.disabled = false;
  briefNode.replaceChildren(
    makeElement("p", "empty-state", "Retrieval complete. Build the evidence brief when you have inspected the candidate records.")
  );
}

function buildBrief() {
  const inputs = readInputs();
  // Also guard programmatic/restored edits that did not dispatch an input event.
  if (!scanState || inputs.topic !== scanState.topic || inputs.question !== scanState.question ||
      inputs.fields.length !== scanState.fields.length ||
      inputs.fields.some((field, index) => field !== scanState.fields[index])) {
    invalidateScan();
    return;
  }

  const topic = scanState.topicLabel;
  const relevant = scanState.rankedRecords.filter(record => record.score > 0);
  const card = makeElement("article", "brief-card");
  card.append(
    makeElement("h3", "", "Evidence brief: " + topic),
    makeElement("p", "", scanState.question)
  );

  const evidenceHeading = makeElement("h4", "", "Candidate evidence");
  const evidenceList = makeElement("ul");

  relevant.forEach(record => {
    const sentence = record.abstract.find(item =>
      record.matched.some(term => item.toLowerCase().includes(term.toLowerCase()))
    ) || record.abstract[0];
    evidenceList.append(
      makeElement("li", "", "[" + record.id + "] " + sentence)
    );
  });

  const interpretationHeading = makeElement("h4", "", "Bounded interpretation");
  const interpretation = makeElement(
    "p",
    "",
    relevant.length
      ? "The training corpus contains " + relevant.length + " candidate record(s) with terms relevant to " + topic.toLowerCase() + ". This establishes retrieval relevance only; it does not establish biological causality or consensus."
      : "The training corpus does not contain a sufficiently relevant record for this topic."
  );

  const checksHeading = makeElement("h4", "", "Human verification required");
  const checks = makeElement("ul");
  [
    "Replace every synthetic record with a real primary source and stable identifier.",
    "Verify current taxonomy and the direction of the inferred pathway.",
    "Distinguish genomic potential, expression, activity, and measured rates.",
    "Check whether environmental conditions match the research question.",
    "Record contradictory or negative evidence before drawing a conclusion."
  ].forEach(item => checks.append(makeElement("li", "", item)));

  card.append(evidenceHeading, evidenceList, interpretationHeading, interpretation, checksHeading, checks);
  briefNode.replaceChildren(card);
}

function resetDemo() {
  topicSelect.value = "methane";
  questionInput.value = "Which records provide evidence relevant to archaeal methane cycling, and what still requires expert verification?";
  document.querySelectorAll('fieldset input[type="checkbox"]').forEach(input => {
    input.checked = true;
  });
  scanState = null;
  resultsNode.replaceChildren(makeElement("p", "empty-state", "Run the evidence scan to rank the three training records."));
  briefNode.replaceChildren(makeElement("p", "empty-state", "A structured brief will appear here after retrieval."));
  promptNode.textContent = "Run the demo to generate a bounded prompt.";
  briefButton.disabled = true;
}

topicSelect.addEventListener("change", () => {
  const prompts = {
    methane: "Which records provide evidence relevant to archaeal methane cycling, and what still requires expert verification?",
    ammonia: "Which records support a role for archaea in ammonia oxidation, and what is the evidence level?",
    virus: "Which records contain evidence of archaeal virus-host interaction, and what mechanism remains unresolved?"
  };
  questionInput.value = prompts[topicSelect.value];
  invalidateScan();
});

questionInput.addEventListener("input", () => invalidateScan());
document.querySelectorAll('fieldset input[type="checkbox"]').forEach(input => {
  input.addEventListener("change", () => invalidateScan());
});

runButton.addEventListener("click", runScan);
briefButton.addEventListener("click", buildBrief);
resetButton.addEventListener("click", resetDemo);
