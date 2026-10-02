# AI for Archaea: ICGOA 2026 Workshop Learning Repository

An English-language, evidence-first learning repository maintained by [AI Archaea](https://gauss1777.github.io/).

**Independent educational resource.** This is not the official conference website or an announcement of an approved workshop programme, speakers, registration or room arrangements. Check the [official ICGOA 2026 website](https://www.icgoa2026.com/) for conference logistics.

## Conference context

The International Conference on Geo-Omics of Archaea 2026, "Toward A Cross-Domain Perspective", is scheduled for 1-4 December 2026 at Sun Yat-Sen University in Guangzhou, China.

## What you will practice

- Frame an archaeal biological question before choosing a tool.
- Distinguish lexical retrieval, model interpretation and biological support.
- Preserve source identifiers, passage locators and unresolved uncertainty.
- Audit a real paper's denominator, validation object and scope of generalization.
- Design claim-specific promote, rollback, escalate and stop decisions.
- Explain the human review or biological measurement still needed.

## Start here

1. Read the [starter knowledge base](knowledge-base.html).
2. Run [Demo 01](tutorial-demo.html): a transparent browser-side exercise using three synthetic records.
3. Complete the [five-paper bridge and learner worksheet](training/learner-worksheet.md).
4. Run [Case Study 02](imaging-agent-case-study.html): four synthetic imaging-agent decisions.
5. Leave with an auditable source table and a bounded evidence-gate contract, not a claimed biological discovery.

## Contents

| Resource | Purpose |
|---|---|
| [Workshop website](https://gauss1777.github.io/icgoa_2026_ai_for_archaea_workshop/) | Orientation and learning path |
| [Knowledge-base notes](knowledge-base/README.md) | Biology, methods, glossary and authoritative starting points |
| [Demo 01 notes](tutorials/demo-01-literature-triage/README.md) | Synthetic retrieval, state boundaries and real-paper extension |
| [Case Study 02 notes](tutorials/demo-02-evidence-gated-imaging-agent/README.md) | Transferable governance, task-specific validators and limits |
| [Research evidence page](research-updates.html) | Five core primary studies, two extensions and two limited-access watchlist entries |
| [Research evidence dossier](resources/research-evidence.md) | Read depth, supported claims and teaching implications |
| [Learner resources](training/README.md) | Prerequisites, exercises and access guidance |
| [Learner worksheet](training/learner-worksheet.md) | Questions and deliverables; no live model account required |
| [Source-audit CSV](training/source-audit-template.csv) | Blank audit fields for the five core papers |
| [Study-card JSON](data/published-study-cards.json) | Paraphrased, source-linked teaching records, separate from synthetic demo data |
| [Change history](CHANGELOG.md) | Published patch and October teaching-material upgrade |

## Local and offline use

Run this command **inside this repository folder**:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with `Ctrl+C`.

The two interactive exercises use local HTML, CSS and JavaScript, without an API key, package installation or model download. Their scientific source links require internet access. For an offline session, keep the repository and source-audit worksheet locally and have facilitators prepare lawfully accessible source passages in advance. Do not assume that publisher pages or external recordings will be available in the room.

## What these demos are, and are not

**Demo 01:** transparent keyword ranking over `SYN-S1` to `SYN-S3`, followed by a fixed teaching brief and a bounded model-ready prompt. Changing the topic, question or selected required fields invalidates the previous scan. Field selections describe required fields in the generated prompt; they do not selectively hide sections of the fixed brief. It is not a trained language model, scientific search engine or no-match benchmark.

**Case Study 02:** a conceptual evidence-gated imaging-agent exercise. Its cases do not process microscopy data or reproduce a scientific-agent implementation.

**Real-paper bridge:** a manual evidence audit with an optional, institutionally approved model comparison. The published study cards do not replace the synthetic browser corpus and are not model-generated research results. No GPU or external model is required for the core path.

## Responsible use

- Do not upload confidential, unpublished, personal or access-controlled material to an external service.
- Separate a predicted sequence, fold, domain label, transcript, image object and measured phenotype.
- Keep source version, read depth and passage locator attached to each claim.
- Treat correlated computational validators differently from independent biological observations.
- Keep raw imaging data immutable and actions confined to versioned derivatives.
- Report uncertainty, contradictory results and dataset/label limitations.
- Recheck taxonomy, function, environment and causal wording with domain expertise.
- Check source permissions and applicable institutional policies before redistributing material.

## Evidence and release status

Research cutoff: **2 October 2026**. Source cards are a targeted reading map, not an exhaustive systematic review. Reading depth and primary-source access gaps are explicitly retained.

The interactive demo includes scan-state regression checks. Minimal-DOM checks do not replace browser, keyboard, layout or accessibility evaluation. Source reading is not computational replication or a measured classroom outcome.

## Maintainer

[gauss1777](https://github.com/gauss1777) | [AI Archaea](https://gauss1777.github.io/)
