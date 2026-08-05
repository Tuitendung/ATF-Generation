# Complete validation, AI evidence, atomicity, and source opacity

Status: ready-for-agent
Type: task
Blocked by: 01, 12, 14, 16, 17, 18, 19, 20

## What to build

Close every remaining validation, diagnostic, interpretation-evidence, capability, zero-artifact, and source-opacity requirement across the full version-2 POC. The complete worker must end with one valid complete Suite or one correctly classified terminal failure with zero run-owned artifacts.

## Acceptance criteria

- [ ] Implement every stable `ERROR` and `INFO` meaning in the current validation contract.
- [ ] Include severity, section, physical line or `0`, relevant key, and corrective message for every Design Diagnostic.
- [ ] Introduce no Design Diagnostic severity named `WARNING`.
- [ ] Keep UI Action work limited to fast authorization, exact binding, required fields, anchors, run stamp, and queueing.
- [ ] Run complete table parsing, AI interpretation, semantic validation, binding, coverage, planning, and persistence only in the bound worker.
- [ ] Enforce distinct `DESIGN_INVALID`, `AI_INTERPRETATION_INCONSISTENT`, and `AI_INTERPRETATION_TECHNICAL_FAILURE` meanings.
- [ ] Validate every block before merging and every cross-block ownership, target, type, effect, MRVS, and graph constraint after merging.
- [ ] Resolve the Behavior Execution User, references, capability mappings, and all required adapters before the first insert.
- [ ] Produce one immutable complete Generation Plan only when no blocking result exists.
- [ ] Prove every Design, AI, binding, coverage, capability, search-limit, and planning failure creates zero artifacts.
- [ ] Fault-inject every production persistence stage and prove cleanup leaves zero incomplete artifacts without affecting other runs or v1.
- [ ] Persist only approved non-raw AI evidence and prove no raw content or custom run table exists.
- [ ] Instrument both Skill inputs and deterministic generation and prove UI Policies, Catalog Client Scripts, Script Includes, observed behavior, live-value search, and Article Body never provide an expectation.
- [ ] Prove Permission Design is neither read nor validated by version 2.
- [ ] Reject Dependency, Scenario, dynamic-choice, Presentation Detail, source-code, arbitrary-script, multi-trigger, cross-target grouping, and every other out-of-scope capability.
- [ ] Deliberately change implementation while Design remains fixed and prove only the observed ATF result changes.
- [ ] Prove run-stamped success and failure reporting without notification, Execution Tracker, Last Generation fields, or Published Specification mutation.
- [ ] Run the complete primary seam, Skills, routing, worker, writer, adapters, target-instance, privacy, source-opacity, and version-1 regression suites.
- [ ] Complete a clean type check and SDK build.

## Comments

