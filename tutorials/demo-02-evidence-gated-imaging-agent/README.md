# Case Study 02: Evidence-Gated Agents for Archaeal Imaging

## Objective

Use the 2026 bioRxiv preprint *CryoForge: A Self-Correcting Agent for Cryo-EM Model Building That Learns When to Act and When to Stop* to distinguish a reusable scientific-agent architecture from components that are specific to atomic model building.

The browser-based case study is available at:

[Open Case Study 02](../../imaging-agent-case-study.html)

## Central judgment

The synthetic exercise illustrates general evidence-based decisions, not a ready-made archaeal imaging agent or a reproduced CryoForge method.

Reusable components include:

- separation of repair proposal from repair acceptance;
- a domain-constrained set of legal actions;
- an evidence gate that is not reducible to the proposer’s optimization objective;
- transactional promotion and rollback;
- explicit stop and expert-escalation states;
- trajectory-level provenance and benchmark stratification.

Components that remain specific to atomic model building include:

- residue-, segment-, chain-, and sequence-registration error types;
- backbone and side-chain rebuilding actions;
- bond geometry, rotamer, Ramachandran, clash, peptide-connectivity, and related atomic validators;
- atomic map-to-model metrics and model-challenge reference sets;

## Learning outcomes

After completing the case study, learners should be able to:

- explain why an agent should not validate its own proposal using only the objective it optimized;
- map the same governance loop onto single-particle cryo-EM and cellular cryo-ET without reusing invalid metrics;
- choose among promote, rollback, stop, and expert escalation;
- explain the evidence, uncertainty and missing observation behind a bounded decision;
- keep image-level evidence separate from biological identity and mechanistic interpretation.

## Transfer matrix

| Component | Single-particle cryo-EM | Cellular cryo-ET | Boundary |
|---|---|---|---|
| Diagnosis | Unstable particles, classes, orientations, CTF or refinement branch | Alignment failure, boundary discontinuity, implausible object, uncertain pick | A flag is a review trigger, not proof of error |
| Action | Retry a bounded branch; revise a derived subset or mask | Retry a derived reconstruction; split/merge labels; revise picks | Never overwrite raw movies or tilt images |
| Evidence gate | Half-map behavior, FSC/local resolution, orientation coverage, stability across seeds/subsets | Alignment/reprojection residuals, held-out views or volumes, continuity, topology, missing-wedge sensitivity, replicate and expert-reviewed subsets | Half maps do not validate whole-cell segmentation or biological identity by themselves |
| Rollback | Retain prior validated branch | Retain prior state and competing hypotheses | Reversibility must be implemented, not merely stated |
| Stop/escalate | No reproducible gain, worsening guardrail, oscillation or compute cap | Acquisition-limited ambiguity, topology conflict, instability, out-of-distribution specimen or annotation cap | Ambiguity is a legitimate terminal state |

## Decision exercise

The interactive page includes four synthetic cases:

1. a single-particle branch with an optimistic nominal metric but no independent support;
2. a bounded single-particle refinement with reproducible gain and stable guardrails;
3. a membrane/S-layer boundary that remains ambiguous along the missing-wedge direction;
4. a cryo-ET split–merge loop that has reached oscillation and compute limits.

Learners must choose **promote**, **rollback**, **escalate**, or **stop** and then inspect the evidence-gate rationale.

## Evidence and source boundary

The primary source is a preprint:

- Feng et al. (2026). *CryoForge: A Self-Correcting Agent for Cryo-EM Model Building That Learns When to Act and When to Stop*. bioRxiv, version 1. [https://doi.org/10.64898/2026.08.15.745007](https://doi.org/10.64898/2026.08.15.745007)

The August 2026 module was framed from the indexed abstract and DOI record, not a reproduced implementation. During the 2 October 2026 source review, primary full-text and DOI/API retrieval were unsuccessful. This access gap does not establish that the source is invalid, but no new implementation, code-release or performance claims are added. Recheck the primary preprint and version before technical implementation.

Additional validation anchors:

- [Cryo-EM model validation recommendations](https://www.nature.com/articles/s41592-020-01051-w)
- [FSC-Q map-to-model validation](https://www.nature.com/articles/s41467-020-20295-w)
- [wwPDB deposition tutorial and half-map requirements](https://www.wwpdb.org/deposition/tutorial)
- [EMDB Validation Analysis](https://www.ebi.ac.uk/emdb/va/)
- [Realistic phantom dataset for benchmarking cryo-ET annotation](https://www.nature.com/articles/s41592-025-02800-5)

Initial evidence review: **28 August 2026**. Teaching/source-boundary update: **2 October 2026**.

## Benchmark labels and independent evidence

The [phantom annotation study](https://www.nature.com/articles/s41592-025-02800-5) is a transferable benchmark resource, not an archaeal-cell validation. Its authors discuss incomplete labels and possible false positives. Record reference-label uncertainty; a score against a curated reference is not proof of molecular identity, archaeal transfer or physiological function.

For every proposed action, name the evidence object, the validator and whether its evidence is genuinely independent of the proposer. Agreement between related computational methods can be useful without becoming a new biological observation. Promotion is always tied to a bounded claim.

Use the [learner resources](../../training/README.md) to practice source inspection and explain the four synthetic decisions. No cryo-EM reconstruction or segmentation pipeline is implemented. See the [learner worksheet](../../training/learner-worksheet.md) and [dated research dossier](../../resources/research-evidence.md).
