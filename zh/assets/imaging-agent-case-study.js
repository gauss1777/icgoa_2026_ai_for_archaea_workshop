const scenarios = [
  {
    id: "spa-rollback",
    workflow: "单颗粒冷冻电镜",
    stage: "精修分支",
    title: "古菌膜复合物密度图更清晰，却缺乏独立支持",
    proposal: "因工作密度图更清晰、名义分辨率更好，拟采用筛选和精修更激进的粒子处理分支。",
    evidence: [
      ["目标指标", "优化分支的名义分辨率由 3.8 Å 改善为 3.3 Å。"],
      ["独立证据", "对应的独立半图表现未出现可重复的改善。"],
      ["约束指标", "取向覆盖缩窄，外围密度在不同随机种子下的稳定性下降。"],
      ["解释风险", "不稳定区域紧邻支撑当前生物学判断的目标特征。"]
    ],
    answer: "rollback",
    status: "回退",
    rationale: "表面增益没有被独立复现，且约束指标恶化。应保留先前已验证分支，记录被拒绝的参数，并检查粒子筛选或掩膜是否造成过于乐观的单个指标。",
    lesson: "提案方不能自行验证其优化结果。当独立证据与稳定性不一致时，更好的名义数值并不足够。"
  },
  {
    id: "spa-promote",
    workflow: "单颗粒冷冻电镜",
    stage: "局部精修",
    title: "范围受限的修正通过证据审核",
    proposal: "拟采用纯化古菌 S 层组装体的局部精修分支，工作流其他部分保持不变。",
    evidence: [
      ["目标指标", "预先指定区域的局部分辨率和密度图可解释性均改善。"],
      ["独立证据", "增益在独立处理的半图中存在，并在重新划分数据后仍成立。"],
      ["约束指标", "全局 FSC、取向覆盖、粒子数及目标区域之外的密度保持稳定。"],
      ["适用范围", "不因密度图改善，就单独推断原子身份或作用机制。"]
    ],
    answer: "promote",
    status: "采用候选分支",
    rationale: "预设目标在独立检查下改善，且全局约束未恶化。可采用该衍生结果，保留先前状态和参数，并将生物学解释留作独立复核步骤。",
    lesson: "采用结果的依据是可重复证据和明确的适用范围，而不是智能体自身的信心。"
  },
  {
    id: "et-escalate",
    workflow: "细胞冷冻电子断层成像",
    stage: "对象修正",
    title: "膜与 S 层边界在一个方向上难以区分",
    proposal: "拟在古菌细胞低对比度区域，将连续包被标签拆分为独立的膜对象与 S 层对象。",
    evidence: [
      ["图像证据", "多个切片中可见两条边界，但它们在缺失楔方向上合并。"],
      ["连续性", "相邻切片支持两种相互竞争、拓扑上均合理的边界追踪。"],
      ["背景", "邻近断层图提示二者分离，但样品厚度和采集几何不同。"],
      ["身份判定", "没有独立分子标记能够判定该细胞外侧边界的身份。"]
    ],
    answer: "escalate",
    status: "转交专家复核",
    rationale: "数据支持不同解释，且采集限制恰好影响有争议的边界。应保留两种假说，定位不确定性，申请专家复核或其他独立类型的证据，而不是强行指定唯一标签。",
    lesson: "歧义本身就是一种输出状态。局部图像看起来合理，不能据此编造细胞对象的身份或拓扑。"
  },
  {
    id: "et-stop",
    workflow: "细胞冷冻电子断层成像",
    stage: "分割循环",
    title: "反复拆分与合并发生振荡，却没有新证据",
    proposal: "在四轮循环已经反复切换于两种分割结果之后，拟对囊泡样组分再开展一轮自主拆分与合并。",
    evidence: [
      ["运行轨迹", "最近四次迭代在相同的两个对象图之间振荡。"],
      ["目标指标", "变化始终低于预先规定的最小有意义改善。"],
      ["约束指标", "拓扑和体积估计交替变化；在留出切片上，没有一种假说明显优于另一种。"],
      ["资源上限", "已达到预先规定的最大自主迭代次数。"]
    ],
    answer: "stop",
    status: "停止",
    rationale: "已满足停止约定：结果振荡、边际增益可忽略、验证仍未解决且资源额度耗尽。应结束自主操作，保存两个候选状态供后续复核。",
    lesson: "学会停止，意味着即使计算上还能继续操作，也遵守预先规定的边界。"
  }
];

const scenarioSelect = document.querySelector("#scenario-select");
const workflowNode = document.querySelector("#scenario-workflow");
const stageNode = document.querySelector("#scenario-stage");
const titleNode = document.querySelector("#scenario-title");
const proposalNode = document.querySelector("#scenario-proposal");
const evidenceNode = document.querySelector("#scenario-evidence");
const checkButton = document.querySelector("#check-decision");
const feedbackNode = document.querySelector("#decision-feedback");

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function selectedScenario() {
  return scenarios.find(scenario => scenario.id === scenarioSelect.value) || scenarios[0];
}

function resetDecision() {
  document.querySelectorAll('input[name="decision"]').forEach(input => {
    input.checked = false;
  });
  feedbackNode.replaceChildren(
    makeElement("p", "empty-state", "选择一个决定，查看证据审核结果及理由。")
  );
}

function renderScenario() {
  const scenario = selectedScenario();
  workflowNode.textContent = scenario.workflow;
  stageNode.textContent = scenario.stage;
  titleNode.textContent = scenario.title;
  proposalNode.textContent = scenario.proposal;
  evidenceNode.replaceChildren();

  scenario.evidence.forEach(([label, value]) => {
    const row = makeElement("div");
    row.append(makeElement("dt", "", label), makeElement("dd", "", value));
    evidenceNode.append(row);
  });

  resetDecision();
}

function checkDecision() {
  const choice = document.querySelector('input[name="decision"]:checked');
  if (!choice) {
    feedbackNode.replaceChildren(
      makeElement("p", "empty-state", "请先选择采用候选分支、回退、转交专家复核或停止，再查看证据审核结果。")
    );
    return;
  }

  const scenario = selectedScenario();
  const correct = choice.value === scenario.answer;
  const card = makeElement("article", "feedback-card " + (correct ? "correct" : "reconsider"));
  card.append(
    makeElement("p", "feedback-kicker", correct ? "基于证据的决策" : "请重新审视证据条件"),
    makeElement("h3", "", correct ? scenario.status : "应选择：" + scenario.status),
    makeElement("p", "", scenario.rationale),
    makeElement("p", "feedback-lesson", "迁移启示：" + scenario.lesson)
  );
  feedbackNode.replaceChildren(card);
}

scenarios.forEach(scenario => {
  const option = document.createElement("option");
  option.value = scenario.id;
  option.textContent = scenario.workflow + " · " + scenario.title;
  scenarioSelect.append(option);
});

scenarioSelect.addEventListener("change", renderScenario);
checkButton.addEventListener("click", checkDecision);
renderScenario();
