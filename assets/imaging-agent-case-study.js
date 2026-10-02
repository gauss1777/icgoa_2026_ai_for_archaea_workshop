const scenarios = [
  {
    id: "spa-rollback",
    workflow: "Single-particle cryo-EM",
    stage: "REFINEMENT BRANCH",
    title: "A sharper archaeal membrane-complex map without independent support",
    proposal: "Promote a more aggressive particle-selection and refinement branch because its working map appears sharper and its nominal resolution improves.",
    evidence: [
      ["Target metric", "Nominal resolution improves from 3.8 Å to 3.3 Å in the optimized branch."],
      ["Independent evidence", "The corresponding independent half-map behavior does not improve reproducibly."],
      ["Guardrail", "Orientation coverage narrows and a peripheral density becomes less stable across random seeds."],
      ["Interpretive risk", "The unstable region is adjacent to the feature that motivated the biological claim."]
    ],
    answer: "rollback",
    status: "ROLLBACK",
    rationale: "The apparent gain is not independently reproduced and a guardrail worsens. Retain the prior validated branch, log the rejected parameters, and review whether selection or masking created an optimistic headline metric.",
    lesson: "A proposer cannot validate its own optimized output. A better nominal number is insufficient when independent evidence and stability disagree."
  },
  {
    id: "spa-promote",
    workflow: "Single-particle cryo-EM",
    stage: "LOCAL REFINEMENT",
    title: "A bounded correction survives the evidence gate",
    proposal: "Promote a local refinement branch for a purified archaeal S-layer assembly while leaving the rest of the workflow unchanged.",
    evidence: [
      ["Target metric", "Local resolution and map interpretability improve in the predefined region."],
      ["Independent evidence", "The gain is present in independently processed half-maps and survives a repeated split."],
      ["Guardrail", "Global FSC, orientation coverage, particle count, and density outside the target region remain stable."],
      ["Scope", "No atomic identity or mechanism is inferred from the map improvement alone."]
    ],
    answer: "promote",
    status: "PROMOTE",
    rationale: "The predefined target improves under independent checks without degrading global guardrails. Promote the derivative, preserve the previous state and parameters, and keep biological interpretation as a separate review step.",
    lesson: "Promotion is justified by reproducible evidence and bounded scope—not by autonomous confidence."
  },
  {
    id: "et-escalate",
    workflow: "Cellular cryo-ET",
    stage: "OBJECT REPAIR",
    title: "Membrane and S-layer boundaries are inseparable in one orientation",
    proposal: "Split one continuous envelope label into separate membrane and S-layer objects along a low-contrast region of an archaeal cell.",
    evidence: [
      ["Image evidence", "Two boundaries appear in several slices but merge along the missing-wedge direction."],
      ["Continuity", "Adjacent slices support two competing, topologically plausible traces."],
      ["Context", "A neighboring tomogram suggests separation, but specimen thickness and acquisition geometry differ."],
      ["Identity", "No molecular label independently identifies the outer boundary in this cell."]
    ],
    answer: "escalate",
    status: "ESCALATE",
    rationale: "The data support competing interpretations and the acquisition limit is aligned with the disputed boundary. Preserve both hypotheses, localize the uncertainty, and request expert review or orthogonal evidence rather than forcing a single label.",
    lesson: "Ambiguity is an output state. Cellular identity and topology cannot be manufactured from local visual plausibility."
  },
  {
    id: "et-stop",
    workflow: "Cellular cryo-ET",
    stage: "SEGMENTATION LOOP",
    title: "Repeated split–merge actions oscillate without new evidence",
    proposal: "Run another autonomous split–merge cycle on a vesicle-like component after four cycles alternated between two segmentations.",
    evidence: [
      ["Trajectory", "The last four iterations oscillate between the same two object graphs."],
      ["Target metric", "Changes remain below the predeclared minimum meaningful improvement."],
      ["Guardrail", "Topology and volume estimates alternate; neither hypothesis dominates on held-out slices."],
      ["Budget", "The predeclared maximum autonomous iteration count has been reached."]
    ],
    answer: "stop",
    status: "STOP",
    rationale: "The stopping contract has been met: oscillation, negligible marginal gain, unresolved validation, and budget exhaustion. End autonomous action and package both candidate states for later review.",
    lesson: "Learning when to stop means obeying a predeclared boundary even when another action is computationally possible."
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
    makeElement("p", "empty-state", "Select a decision to reveal the gate outcome and reasoning.")
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
      makeElement("p", "empty-state", "Choose promote, rollback, escalate, or stop before checking the gate.")
    );
    return;
  }

  const scenario = selectedScenario();
  const correct = choice.value === scenario.answer;
  const card = makeElement("article", "feedback-card " + (correct ? "correct" : "reconsider"));
  card.append(
    makeElement("p", "feedback-kicker", correct ? "EVIDENCE-GATED DECISION" : "RECONSIDER THE GATE"),
    makeElement("h3", "", correct ? scenario.status : "Expected: " + scenario.status),
    makeElement("p", "", scenario.rationale),
    makeElement("p", "feedback-lesson", "Transfer lesson: " + scenario.lesson)
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
