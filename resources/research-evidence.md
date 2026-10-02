# AI-assisted archaeal research: a claim-by-claim teaching map

Research cutoff: **2 October 2026**. Targeted narrative synthesis of primary studies; not an exhaustive systematic review, computational replication or a list of universally best papers. Facts below are paraphrased. Read depth is declared for each entry.

## Four distinctions before reading

- **Training inclusion vs evaluated application:** including archaeal sequences in a general model does not prove task-specific transfer. Conversely, Evo 2 reports an archaeal gene-essentiality evaluation; calling it training inclusion only would be inaccurate.
- **Prediction vs observation:** fold confidence, molecular dynamics and model agreement remain computational evidence. Selected antimicrobial assays provide a different kind of support, within their assay conditions.
- **Evidence object vs biological conclusion:** a host-linked element, expressed gene, structural domain and methane-turnover rate are not interchangeable objects.
- **Reference labels vs reality:** a curated benchmark can contain omissions or mistakes. Validate the bounded target rather than treating reference annotations as absolute truth.

## Five core papers

### R01. Deep learning reveals antibiotics in the archaeal proteome

- Source: [10.1038/s41564-025-02061-0](https://www.nature.com/articles/s41564-025-02061-0); 2025-08-12. Peer-reviewed.
- Biological context: Peptides mined from archaeal proteomes; activity tested against bacterial pathogens.
- AI/method role: APEX 1.1 deep-learning candidate prioritization.
- Application scope: Direct archaeal sequence application with selected experimental follow-up.
- Supported claim: The study mined 233 archaeal proteomes and prioritized 12,623 candidates; 75 of 80 selected synthesized peptides were active against at least one tested bacterial strain.
- Boundary: The hit rate concerns a selected test set, not all predicted candidates. Mouse-model evidence is not human clinical efficacy or proof of a natural antimicrobial role in archaea.
- Source locator: Results: Deep-learning-guided identification; Antimicrobial activity; abstract.
- Reading depth: Metadata, abstract and selected Results passages.
- Learner question: Which denominator does the reported hit rate use, and which claim would require a new experiment?

### R02. Histone diversity in the archaeal domain of life

- Source: [10.1038/s41467-026-71849-3](https://www.nature.com/articles/s41467-026-71849-3); 2026-04-15; Version of record dated 2026-06-12. Peer-reviewed.
- Biological context: Archaeal histone sequence diversity across GTDB release 220.
- AI/method role: Physicochemical-feature clustering, AlphaFold3 and molecular dynamics.
- Application scope: Direct archaeal computational analysis.
- Supported claim: The study combines archaeal histone clustering with structural predictions and simulations; some predicted nucleosome-like arrangements are unstable in simulations.
- Boundary: Prediction plus simulation is still computational evidence. It does not establish how the proposed assemblies organize DNA in living archaeal cells.
- Source locator: Results: structural prediction; Fig. 5; Discussion; Methods: Structural prediction.
- Reading depth: Metadata and selected Results, Discussion and Methods passages.
- Learner question: Are two computational analyses independent experimental confirmation? What biological observation is still missing?

### R03. Genome modelling and design across all domains of life with Evo 2

- Source: [10.1038/s41586-026-10176-5](https://www.nature.com/articles/s41586-026-10176-5); 2026-03-04. Peer-reviewed.
- Biological context: Multi-domain genomic data, including archaeal gene-essentiality benchmarks.
- AI/method role: Genomic foundation model; zero-shot scores for premature-stop perturbations.
- Application scope: General model with a reported archaeal evaluation component.
- Supported claim: The paper reports zero-shot gene-essentiality predictions evaluated against experimental labels across bacterial, archaeal and phage species.
- Boundary: An archaeal benchmark is more than training-set inclusion, but it is not evidence that generated archaeal genomes are viable or that every lineage and task generalizes.
- Source locator: Fig. 2j; gene-essentiality Results paragraph; Extended Data Fig. 3h.
- Reading depth: Metadata, selected Results and figure-caption passages.
- Learner question: Which evidence supports an archaeal prediction task, and which broader design claim remains unsupported?

### R04. Jumbo circular extrachromosomal elements of methane-oxidizing archaea with variably extensive metabolic and defense gene repertoires

- Source: [10.1038/s41467-026-74423-z](https://www.nature.com/articles/s41467-026-74423-z); 2026. Peer-reviewed.
- Biological context: Methanoperedens and associated extrachromosomal elements.
- AI/method role: Genome/transcript evidence with ColabFold and AlphaFold3 structure models.
- Application scope: AI-assisted archaeal annotation within an integrated biological study.
- Supported claim: The study combines genomic and expression evidence for archaeal extrachromosomal elements and deposits custom ColabFold/AlphaFold3 models alongside its data.
- Boundary: A predicted fold, a transcribed gene and a measured metabolic effect are different evidence objects; do not infer a change in methane turnover from a model alone.
- Source locator: Abstract; Results: ECE-host association; Data availability.
- Reading depth: Selected primary HTML passages and PDF abstract/data-availability passages.
- Learner question: What establishes host association, and what additional evidence would establish an encoded gene's physiological effect?

### R05. Comparative analysis of adhesin-like proteins from Methanobacteriales species

- Source: [10.3389/fmicb.2026.1897686](https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2026.1897686/full); 2026-09-29. Peer-reviewed.
- Biological context: Methanobacteriales, including intestinal and rumen lineages.
- AI/method role: AlphaFold-assisted structural analysis and PRISM domain recognition.
- Application scope: Direct archaeal structural-domain annotation.
- Supported claim: The paper maps adhesin-like protein architectures across 17 species and describes curated model-assisted domain recognition.
- Boundary: Proteins exceeding 5,000 residues were excluded from prediction. PRISM is described as a manuscript in preparation; its executable release was not verified here. Domain labels do not prove adhesion mechanisms.
- Source locator: Methods: Sequence retrieval and structural modeling; Characterization of ALP domains; Discussion.
- Reading depth: Metadata, abstract and selected Methods/Discussion passages.
- Learner question: How do sequence-length filtering, reference annotations and split design limit a biological claim?


## Extensions, not extra core workload

### R06. Rapid and accurate prediction of protein homo-oligomer symmetry using Seq2Symm

Source: [10.1038/s41467-025-57148-3](https://www.nature.com/articles/s41467-025-57148-3); 2025-02-27. Seq2Symm was applied to the Pyrococcus furiosus proteome as part of a multi-proteome analysis.

Boundary: Proteome-scale predictions are not independent physical validation of every archaeal oligomer.

Read depth: Metadata and selected Results passages. Locator: Results: multi-proteome application; Fig. 4.

### R07. A realistic phantom dataset for benchmarking cryo-ET data annotation

Source: [10.1038/s41592-025-02800-5](https://www.nature.com/articles/s41592-025-02800-5); 2025-08-26. The phantom benchmark links tomograms and curated annotations; the authors explicitly acknowledge incomplete labels and possible false positives.

Boundary: Curated ground truth is not absolute, and performance on a phantom does not establish archaeal cellular segmentation or molecular identity.

Read depth: Metadata and selected Results/Methods passages. Locator: Results: dataset quality and ground-truth limitations; CryoET Data Portal deposition 10310.


## Watchlist and unresolved retrieval

### R08. MGM2 as a Unified Foundation Model for Microbiome World Exploration

Source: [10.64898/2026.07.20.739063](https://www.biorxiv.org/content/10.64898/2026.07.20.739063v1.full). Status: Preprint, v1; watchlist.

Read depth: Indexed primary-page passages only; full-page access blocked. The full primary page could not be opened in this review. This entry is not a replication, a causal validation, or a core teaching requirement.

Teaching use: What controls would distinguish an ecological feature from project or assay artifacts?

### R09. CryoForge preprint referenced by the existing imaging module

Source: [10.64898/2026.08.15.745007](https://doi.org/10.64898/2026.08.15.745007). Status: Preprint, v1 cited by the August 2026 module; current recheck incomplete.

Read depth: Existing public module; primary-source recheck incomplete. Primary full text and DOI/API retrieval failed in this review. Do not add implementation, code-release or trajectory-performance claims from secondary summaries.

Teaching use: Which governance concepts can be discussed without claiming a reproduced CryoForge implementation?


A DOI suffix is not used as a independently confirmed publication date. An access failure is recorded as a gap, not proof that a study is invalid. Neither watchlist entry is required for the core learner exercise.

## Implementation boundary

The repository adds reading and auditing materials, not an APEX, AlphaFold, Evo 2, PRISM, Seq2Symm, MGM2, CryoForge or microscopy implementation. No external model calls, genome generation, wet-lab protocols or new biological results are included.

Use the [learner worksheet](../training/learner-worksheet.md), [CSV template](../training/source-audit-template.csv) and [browser evidence page](../research-updates.html).
