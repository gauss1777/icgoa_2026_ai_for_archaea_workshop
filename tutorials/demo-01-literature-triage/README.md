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

Replace the synthetic records with five real primary papers relevant to your research question. For every paper, record:

- DOI, PMID, or another stable identifier;
- retrieval date;
- organism name and taxonomy source;
- environment and sampling design;
- evidence sentence;
- evidence level;
- uncertainty or contradictory result.

Then compare a human-built brief with an approved model-assisted brief. Audit every difference.

## Responsible-use checkpoint

Do not upload confidential, unpublished, personal, or access-controlled data to an external model. Check institutional and project policies before connecting any API.
