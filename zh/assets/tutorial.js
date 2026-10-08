const records = [
  {
    id: "SYN-S1",
    title: "模拟条目：缺氧沉积物中的甲烷转化",
    context: "缺氧海洋沉积物；结合基因组解析调查与地球化学剖面",
    topics: ["methane"],
    abstract: [
      "宏基因组组装得到的古菌基因组编码了与甲烷代谢相关的甲基辅酶 M 还原酶（MCR）基因。",
      "硫酸盐-甲烷过渡带附近出现最强的丰度信号。",
      "基因组内容支持代谢潜力，但该教学条目不包含直接速率测量。"
    ],
    uncertainty: "分类归属、基因组完整性、代谢途径方向和实测活性仍需核查。"
  },
  {
    id: "SYN-S2",
    title: "模拟条目：贫营养水体中的氨氧化古菌",
    context: "开放大洋水柱；宏基因组与转录测量",
    topics: ["ammonia"],
    abstract: [
      "在多个低氨样品中检测到古菌 amoA 基因及其转录本。",
      "丰度模式与氨氧化古菌参与硝化的解释一致。",
      "转录本提示基因表达，但不能独立确定过程速率。"
    ],
    uncertainty: "引物或组装偏倚、分类分辨率及速率证据仍需核查。"
  },
  {
    id: "SYN-S3",
    title: "模拟条目：古菌病毒-宿主配对中的防御系统",
    context: "高盐富集培养体系；配对的宿主与病毒基因组",
    topics: ["virus"],
    abstract: [
      "古菌宿主基因组中的 CRISPR 间隔序列与获得的病毒基因组匹配。",
      "病毒挑战后，富集培养体系的组成发生变化。",
      "间隔序列匹配支持既往相互作用，但不能单独证明抗性机制。"
    ],
    uncertainty: "宿主范围、防御机制、实验对照和生态相关性仍需核查。"
  }
];

const topicTerms = {
  methane: ["methane", "methanogenesis", "methanotrophic", "methyl-coenzyme", "mcr", "甲烷", "产甲烷", "甲烷氧化", "甲基辅酶"],
  ammonia: ["ammonia", "nitrification", "amoa", "ammonia-oxidizing", "氨", "氨氧化", "硝化"],
  virus: ["virus", "viral", "host", "crispr", "spacer", "defense", "病毒", "宿主", "间隔序列", "防御"]
};

const stopWords = new Set([
  "which", "what", "where", "when", "with", "from", "that", "this", "these",
  "those", "provide", "evidence", "relevant", "records", "record", "requires",
  "require", "expert", "verification", "archaeal", "archaea", "and", "the",
  "for", "are", "how", "into", "does", "still"
]);

// Fixed lexical terms only: no Chinese word-segmentation model or semantic search.
const chineseQuestionTerms = [
  "甲烷", "产甲烷", "甲烷氧化", "缺氧", "硫酸盐", "沉积物",
  "氨", "氨氧化", "硝化", "转录", "丰度", "基因组", "代谢", "活性", "速率",
  "病毒", "宿主", "间隔序列", "防御", "高盐", "抗性"
];
const fieldLabels = {
  source: "来源标识符（source）",
  sentence: "支持语句（sentence）",
  context: "环境背景（context）",
  uncertainty: "不确定性说明（uncertainty）"
};

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
  const normalized = question.toLowerCase();
  const latinTokens = normalized
    .replace(/[^a-z0-9-]+/g, " ")
    .split(/\s+/)
    .filter(token => token.length > 2 && !stopWords.has(token));
  const chineseTokens = chineseQuestionTerms.filter(term => normalized.includes(term));
  return [...new Set([...latinTokens, ...chineseTokens])];
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
    const score = makeElement("span", "score", "相关性得分 " + record.score);
    head.append(title, score);

    const meta = makeElement("p", "record-meta", record.id + " · " + record.context);
    const matched = makeElement(
      "p",
      "matched-terms",
      "命中词：" + (record.matched.length ? record.matched.join(", ") : "无")
    );

    const supportingSentence = record.abstract.find(sentence =>
      record.matched.some(term => sentence.toLowerCase().includes(term.toLowerCase()))
    ) || record.abstract[0];

    const evidence = makeElement("p", "evidence-sentence", "“" + supportingSentence + "”");
    const uncertainty = makeElement("p", "record-meta", "核查提示：" + record.uncertainty);

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

function invalidateScan(message = "输入已修改。请重新运行证据扫描，更新证据和提示词。") {
  scanState = null;
  resultsNode.replaceChildren(makeElement("p", "empty-state", message));
  briefNode.replaceChildren(makeElement("p", "empty-state", "生成简报前，请重新运行证据扫描。"));
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
    "角色",
    "你正在协助古菌研究中的证据提取。",
    "",
    "研究问题",
    scan.question,
    "",
    "允许使用的来源",
    JSON.stringify(boundedRecords, null, 2),
    "",
    "输出要求",
    "- 仅使用允许的来源。",
    "- 请返回以下字段：" + scan.fields.map(field => fieldLabels[field] || field).join("、") + ".",
    "- 每条结论都必须附上 source_id。",
    "- 区分直接证据与解释。",
    "- 证据不足时明确说明。",
    "- 最后列出人工核查清单。",
    "",
    "禁止",
    "- 不得编造引文、研究对象、基因、方法或环境细节。",
    "- 不得将基因组潜力改写为实测活性。",
    "- 不得将模拟条目当作真实论文。"
  ].join("\n");
}

function runScan() {
  const inputs = readInputs();
  if (!inputs.fields.length) {
    invalidateScan("请至少选择一个必选证据字段，再运行证据扫描。");
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
    makeElement("p", "empty-state", "检索已完成。检查候选条目后，可生成证据简报。")
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
    makeElement("h3", "", "证据简报：" + topic),
    makeElement("p", "", scanState.question)
  );

  const evidenceHeading = makeElement("h4", "", "候选证据");
  const evidenceList = makeElement("ul");

  relevant.forEach(record => {
    const sentence = record.abstract.find(item =>
      record.matched.some(term => item.toLowerCase().includes(term.toLowerCase()))
    ) || record.abstract[0];
    evidenceList.append(
      makeElement("li", "", "[" + record.id + "] " + sentence)
    );
  });

  const interpretationHeading = makeElement("h4", "", "解释边界");
  const interpretation = makeElement(
    "p",
    "",
    relevant.length
      ? "模拟资料中有 " + relevant.length + " 条候选记录的关键词与主题“" + topic.toLowerCase() + "”相关。这只表示检索相关性，不证明生物学因果关系或共识。"
      : "模拟资料中没有与该主题足够相关的条目。"
  );

  const checksHeading = makeElement("h4", "", "仍需人工核查");
  const checks = makeElement("ul");
  [
    "用真实原始来源和稳定标识符替换每个模拟条目。",
    "核查最新分类及所推断途径的方向。",
    "区分基因组潜力、表达、活性与实测速率。",
    "检查环境条件是否与研究问题相符。",
    "形成结论前，记录相反证据或阴性结果。"
  ].forEach(item => checks.append(makeElement("li", "", item)));

  card.append(evidenceHeading, evidenceList, interpretationHeading, interpretation, checksHeading, checks);
  briefNode.replaceChildren(card);
}

function resetDemo() {
  topicSelect.value = "methane";
  questionInput.value = "哪些条目提供了与古菌甲烷循环有关的证据？哪些判断仍需专家核查？";
  document.querySelectorAll('fieldset input[type="checkbox"]').forEach(input => {
    input.checked = true;
  });
  scanState = null;
  resultsNode.replaceChildren(makeElement("p", "empty-state", "运行证据扫描，对三个模拟教学条目进行排序。"));
  briefNode.replaceChildren(makeElement("p", "empty-state", "检索后，可在这里生成结构化简报。"));
  promptNode.textContent = "运行演示，生成限定来源与输出范围的提示词。";
  briefButton.disabled = true;
}

topicSelect.addEventListener("change", () => {
  const prompts = {
    methane: "哪些条目提供了与古菌甲烷循环有关的证据？哪些判断仍需专家核查？",
    ammonia: "哪些条目支持古菌参与氨氧化？相应证据属于哪一层次？",
    virus: "哪些条目包含古菌病毒与宿主相互作用的证据？哪些机制仍未解决？"
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
