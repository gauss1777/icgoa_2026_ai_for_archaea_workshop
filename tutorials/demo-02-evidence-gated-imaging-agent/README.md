# Case Study 02: Evidence-Gated Agents for Archaeal Imaging

## Objective

Use the 2026 bioRxiv preprint *CryoForge: A Self-Correcting Agent for Cryo-EM Model Building That Learns When to Act and When to Stop* to distinguish a reusable scientific-agent architecture from components that are specific to atomic model building.

The browser-based case study is available at:

[Open Case Study 02](../../imaging-agent-case-study.html)

## Central judgment

CryoForge is most transferable as an **agent-governance pattern**, not as a ready-made archaeal imaging agent.

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
- CryoForge’s reported trajectory outcome percentages.

## Learning outcomes

After completing the case study, learners should be able to:

- explain why an agent should not validate its own proposal using only the objective it optimized;
- map the same governance loop onto single-particle cryo-EM and cellular cryo-ET without reusing invalid metrics;
- choose among promote, rollback, stop, and expert escalation;
- write a minimum agent contract with legal actions, target metrics, guardrails, stopping rules, and audit fields;
- keep image-level evidence separate from biological identity and mechanistic interpretation.

## Transfer matrix

| Component | Single-particle cryo-EM | Cellular cryo-ET | Boundary |
|---|---|---|---|
| Diagnosis | Unstable particles, classes, orientations, CTF or refinement branch | Alignment failure, boundary discontinuity, implausible object, uncertain pick | A flag is a review trigger, not proof of error |
| Action | Retry a bounded branch; revise a derived subset or mask | Retry a derived reconstruction; split/merge labels; revise picks | Never overwrite raw movies or tilt images |
| Evidence gate | Half-map behavior, FSC/local resolution, orientation coverage, stability across seeds/subsets | Alignment/reprojection residuals, held-out views or volumes, continuity, topology, missing-wedge sensitivity, replicate and expert-reviewed subsets | Half maps do not validate whole-cell segmentation or biological identity by themselves |
| Rollback | Retain prior validated branch | Retain prior state and competing hypotheses | Reversibility must be implemented, not merely stated |
| Stop/escalate | No reproducible gain, worsening guardrail, oscillation or compute cap | Acquisition-limited ambiguity, topology conflict, instability, out-of-distribution specimen or annotation cap | Ambiguity is a legitimate terminal state |

## Archaeal use cases

### Single-particle cryo-EM

Candidate pilots include purified archaeal S-layer assemblies, ribosomes, and membrane complexes such as AMO-associated preparations. An initial agent should orchestrate existing processing tools and compare bounded branches. It should not autonomously infer protein identity or mechanism from an improved map.

### Cellular cryo-ET

Candidate pilots include membrane/S-layer separation, vesicle and extracellular-component review, cell–cell contact annotation, particle picking for subtomogram averaging, and continuity checks across adjacent volumes. Missing-wedge effects, low signal-to-noise ratio, specimen thickness, and heterogeneous cellular context make forced single-answer correction unsafe.

### VolWeaver and state-resolved virtual cells

VolWeaver-derived masks, objects, geometry, and spatial relations can serve as proposal states. An evidence-gated layer can decide whether a split, merge, boundary repair, or relabeling is promoted, rolled back, stopped, or escalated. Candidate structural trait units should be promoted only with linked geometry, condition, frequency, molecular support, and uncertainty. A visually coherent object is not automatically a molecularly identified or functional structure.

## Decision exercise

The interactive page includes four synthetic cases:

1. a single-particle branch with an optimistic nominal metric but no independent support;
2. a bounded single-particle refinement with reproducible gain and stable guardrails;
3. a membrane/S-layer boundary that remains ambiguous along the missing-wedge direction;
4. a cryo-ET split–merge loop that has reached oscillation and compute limits.

Learners must choose **promote**, **rollback**, **escalate**, or **stop** and then inspect the evidence-gate rationale.

## Suggested 30-minute format

1. **0–5 min:** align terminology across atomic models, single-particle cryo-EM, and cellular cryo-ET.
2. **5–10 min:** decompose CryoForge into proposer, evidence gate, transactional state, stopping rule, and escalation route.
3. **10–18 min:** run the decision lab in small groups.
4. **18–26 min:** redesign the action set and evidence gate for one archaeal imaging object.
5. **26–30 min:** compare failure modes and expert-review triggers.

## Evidence and source boundary

The primary source is a preprint:

- Feng et al. (2026). *CryoForge: A Self-Correcting Agent for Cryo-EM Model Building That Learns When to Act and When to Stop*. bioRxiv, version 1. [https://doi.org/10.64898/2026.08.15.745007](https://doi.org/10.64898/2026.08.15.745007)

This educational module uses claims confirmed in the indexed abstract and DOI record. It does not claim to reproduce the authors’ full method or software. Recheck the preprint for a revised version, code release, or peer-reviewed publication before technical implementation.

Additional validation anchors:

- [Cryo-EM model validation recommendations](https://www.nature.com/articles/s41592-020-01051-w)
- [FSC-Q map-to-model validation](https://www.nature.com/articles/s41467-020-20295-w)
- [wwPDB deposition tutorial and half-map requirements](https://www.wwpdb.org/deposition/tutorial)
- [EMDB Validation Analysis](https://www.ebi.ac.uk/emdb/va/)
- [Realistic phantom dataset for benchmarking cryo-ET annotation](https://www.nature.com/articles/s41592-025-02800-5)

Evidence review date: **28 August 2026**.
