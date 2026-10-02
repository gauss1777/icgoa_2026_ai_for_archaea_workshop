# Tutorial Demo 01: Evidence-First Archaeal Literature Triage

## Objective

Practice a transparent workflow for moving from an archaeal research question to a small, reviewable evidence brief.

The interactive demo is available at:

[Open Tutorial Demo 01](../../tutorial-demo.html)

## Learning outcomes

You will learn to:

- frame a bounded biological question;
- expose the concepts used for retrieval;
- inspect supporting sentences instead of trusting a relevance rank;
- keep source IDs attached to extracted claims;
- distinguish retrieval relevance from scientific support;
- prepare a human verification checklist.

## Training data

The demo contains three **synthetic records**:

- `SYN-S1`: methane turnover in an anoxic sediment;
- `SYN-S2`: ammonia-oxidizing archaea in an oligotrophic water column;
- `SYN-S3`: an archaeal virus-host interaction in a hypersaline enrichment.

They are teaching objects, not real publications. They intentionally have no DOI, authors, or journal metadata.

## Workflow

### Step 1: Frame

Select a topic and edit the research question. Decide which evidence fields are mandatory.

### Step 2: Retrieve

Run the evidence scan. The browser combines visible topic terms with non-trivial tokens from the question. Each training record receives a transparent score.

### Step 3: Inspect

For every candidate, inspect:

- matched terms;
- environmental context;
- one supporting sentence;
- the verification note.

A high score means lexical relevance, not biological truth.

### Step 4: Structure

Build the evidence brief. The output contains source-tagged evidence, a bounded interpretation, and a human review checklist.

### Step 5: Prepare a model-ready prompt

Inspect the generated prompt. It limits the model to supplied records and explicitly prohibits invented sources and overinterpretation.

## No API key

The demo runs entirely in the browser and sends no data to an external service. The scoring function in [`assets/tutorial.js`](../../assets/tutorial.js) is intentionally readable.

## Extension exercise

Use the [prepared five-paper bridge](../../training/learner-worksheet.md) and [source-audit CSV](../../training/source-audit-template.csv) for a separate real-literature exercise. The browser demo deliberately retains its three synthetic records; do not silently present them as publications. For every real paper, record: - DOI, PMID, or another stable identifier;
- retrieval date;
- organism name and taxonomy source;
- environment and sampling design;
- evidence sentence;
- evidence level;
- uncertainty or contradictory result.

Then compare a human-built brief with an approved model-assisted brief. Audit every difference.

## Responsible-use checkpoint

Do not upload confidential, unpublished, personal, or access-controlled data to an external model. Check institutional and project policies before connecting any API.

## Scan-state boundary (October 2026 patch)

1. Choose a topic and question, and leave at least one required field selected.
2. Run the scan and inspect the ranked synthetic records.
3. Build the brief only from that scan's topic, question and field snapshot.
4. Edit any of those inputs. The previous scan, brief and prompt become invalid; scan again before building a new brief.
5. Reset to restore the preset inputs and clear the prior scan.

Selecting zero fields blocks the scan with an explanation. Building the brief also checks for inputs changed without their usual event, so an old scan is not knowingly reused. This protects UI state consistency, not scientific accuracy.

The required-field checkboxes are **prompt requirements**. The brief is a fixed teaching template; selecting fewer fields does not selectively remove its sections. Topic bonuses and keyword matching are not a validated no-match detector.

The supplied patch adds 16 minimal-DOM regression cases in [the test folder](../../tests/README.md). Those checks do not replace a real browser, layout, keyboard or accessibility review. They were not rerun during the teaching-material upgrade.

## Prepared real-paper bridge

The core set is R01-R05 in the [study-card JSON](../../data/published-study-cards.json): archaeasins, histones, Evo 2, Methanoperedens extrachromosomal elements and Methanobacteriales adhesin-like proteins. Open the original sources; use cards as navigation and paraphrased teaching notes, not substitutes for methods or figures.

For each row, identify a supported claim, the evidence object that supports it, a tempting unsupported extension and the observation needed next. The [worksheet](../../training/learner-worksheet.md) defines the deliverables. If a publisher page is unavailable, mark the access gap rather than inventing a supporting passage.

An optional approved model can propose a structured extraction from a short, lawfully supplied source passage. Compare it against your human audit, record the model/version/prompt and reject unsupported claims. No model calls are implemented or required by this repository.
