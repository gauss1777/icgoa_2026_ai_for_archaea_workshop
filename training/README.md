# Learner resources

The core exercises use local HTML, CSS and JavaScript plus a manual paper audit. No GPU, paid account, external model or programming experience is required.

## Prerequisites

Basic familiarity with genes, proteins, genomes and scientific papers is helpful. Start with the [Archaea knowledge base](../knowledge-base.html) if you are entering from another field.

## Exercises

1. Run [Demo 01](../tutorial-demo.html). Inspect the synthetic source IDs, matched terms and verification notes. Change an input and explain why a new scan is needed.
2. Use the [research reading map](../research-updates.html), [worksheet](learner-worksheet.md) and [source-audit CSV](source-audit-template.csv) to inspect actual primary papers.
3. Complete the four synthetic decisions in [Case Study 02](../imaging-agent-case-study.html). Give your evidence-based reason before reading the feedback.

A source card is a navigation aid, not a substitute for the original paper. Record unread methods and access gaps rather than filling them from memory.

## Local access

From the repository folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The interactive exercises do not call an external model. Scientific source links require internet access; keep lawfully accessible source passages and the worksheet locally when working offline.

## Optional model comparison

Only use an institutionally approved service with material you are permitted to supply. Keep model/version, prompt, source provenance and output together. Audit every extracted claim against the human-built source table. Never upload confidential, unpublished or personal data.

## Scope

These are learning exercises, not microscopy processing, model training or biological validation. A completed worksheet does not establish scientific correctness or measured learning efficacy. See the [demo notes](../tutorials/demo-01-literature-triage/README.md) and [imaging notes](../tutorials/demo-02-evidence-gated-imaging-agent/README.md).
