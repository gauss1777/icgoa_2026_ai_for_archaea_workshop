# AI for Archaea: ICGOA 2026 Workshop Learning Repository

An English-language learning repository for an **AI for Archaea** workshop connected to the scientific themes of the International Conference on Geo-Omics of Archaea 2026 (ICGOA 2026).

> **Independent educational resource.** This repository is maintained by [AI Archaea](https://gauss1777.github.io/) and is not the official ICGOA 2026 conference website. Conference logistics should always be checked on the [official ICGOA 2026 website](https://www.icgoa2026.com/).

## Conference context

The official conference is **The International Conference on Geo-Omics of Archaea 2026 — Toward A Cross-Domain Perspective**, scheduled for **1–4 December 2026** at Sun Yat-Sen University in Guangzhou, China.

## Workshop focus

The workshop introduces a practical, evidence-first approach to using AI in archaeal research. It is designed for learners who want to connect biological questions with literature retrieval, structured extraction, reproducible analysis, and human verification.

### Learning outcomes

After completing the starter materials, learners should be able to:

- describe core features of archaeal biology without relying on outdated stereotypes;
- frame an archaeal research question before selecting an AI tool;
- separate retrieved evidence from model-generated interpretation;
- build a small, auditable evidence table from literature-like records;
- distinguish reusable scientific-agent governance from task-specific models, actions, and validators;
- identify where expert review is required before a claim can be reused.

## Repository contents

- [Workshop website](https://gauss1777.github.io/icgoa_2026_ai_for_archaea_workshop/) — overview and learning path
- [Archaea Starter Knowledge Base](knowledge-base/README.md) — concise foundations, methods, resources, and glossary
- [Interactive knowledge base](knowledge-base.html) — browser-friendly reference
- [Tutorial Demo 01](tutorials/demo-01-literature-triage/README.md) — evidence-first archaeal literature triage
- [Interactive tutorial](tutorial-demo.html) — no API key and no installation required
- [Tutorial logic](assets/tutorial.js) — transparent browser-side implementation
- [Case Study 02](tutorials/demo-02-evidence-gated-imaging-agent/README.md) — evidence-gated agents for archaeal single-particle cryo-EM and cellular cryo-ET
- [Interactive imaging case study](imaging-agent-case-study.html) — synthetic promote/rollback/stop/escalate decisions
- [Case-study logic](assets/imaging-agent-case-study.js) — transparent browser-side decision exercise

## Quick start

1. Open the [workshop website](https://gauss1777.github.io/icgoa_2026_ai_for_archaea_workshop/).
2. Read the [starter knowledge base](knowledge-base.html).
3. Complete [Tutorial Demo 01](tutorial-demo.html).
4. Inspect the generated evidence brief and record every point that still requires human verification.
5. Complete [Case Study 02](imaging-agent-case-study.html) and write an evidence-gated agent contract for one archaeal imaging task.

To run the site locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Tutorial design

The first demo uses a small set of **synthetic training records**. A transparent keyword scorer retrieves candidate evidence and then produces a structured brief. It is deliberately not presented as a production AI model. The purpose is to expose the workflow, assumptions, provenance requirements, and validation checkpoints before learners connect an external language model or a real literature corpus.

The second module is a **conceptual imaging-agent case study** based on the 2026 CryoForge preprint. It separates transferable control logic—proposal/acceptance separation, independent evidence gates, rollback, stopping, escalation, and trajectory audit—from atomic-model-specific edit operations and validators. Its four decision scenarios are synthetic; the module does not process microscopy data or claim to reproduce CryoForge.

## Responsible-use principles

- Do not submit confidential, unpublished, personal, or access-controlled data to an external AI service.
- Keep source identifiers and evidence sentences attached to every extracted claim.
- Distinguish retrieval, extraction, interpretation, and hypothesis generation.
- Verify taxonomy, gene function, environmental context, and causal language with domain expertise.
- Report uncertainty and negative evidence.
- Keep raw imaging data immutable; apply agent actions only to versioned derivatives.
- Require workflow-specific evidence gates instead of transferring atomic metrics by analogy.
- Prefer reproducible scripts and versioned outputs over opaque chat histories.

## Maintainer

[gauss1777](https://github.com/gauss1777) · [AI Archaea](https://gauss1777.github.io/)

## Status

Public workshop scaffold with literature-triage and evidence-gated imaging-agent modules, August 2026. Program details and additional exercises can be added as the workshop format is confirmed.
