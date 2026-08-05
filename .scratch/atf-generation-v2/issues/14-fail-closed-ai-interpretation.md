# Fail closed for invalid or inconsistent AI interpretation

Status: ready-for-agent
Type: task
Blocked by: 01, 13

## What to build

Complete the production negative path for Block-Scoped Runtime Business Logic Interpretation. Every block must be independently interpreted, canonically agreed, deterministically validated, and correlated by run stamp; every Design or AI failure must produce the correct terminal result and zero ATF artifacts.

## Acceptance criteria

- [ ] Interpret each structurally valid Behavior Block independently while supplying complete Variable Design to both Skills.
- [ ] Never supply Variable Test Data, Article Body, implementation source, observed behavior, or one Skill's response to the other.
- [ ] Require technical variable `entry_key` values and fixed-choice internal values.
- [ ] Reject display labels with `DESIGN_INVALID`; diagnostics may suggest but never substitute the technical identifier.
- [ ] Accept English-only instructions and reject Vietnamese, bilingual, or code-switched instructions outside exact quoted literals.
- [ ] Preserve exact Unicode and prompt-like quoted literals without translation, correction, or whitespace rewriting.
- [ ] Canonically compare identity, target, one trigger, ordered Outcomes, typed conditions, effects, messages, literals, and source mappings.
- [ ] Record `AI_INTERPRETATION_INCONSISTENT` on any semantic difference and perform no semantic retry, selection, voting, or third pass.
- [ ] Retry each timeout, transport, availability, rate-limit, malformed/truncated-response, or response-schema failure exactly once with identical inputs and settings.
- [ ] Record `AI_INTERPRETATION_TECHNICAL_FAILURE` after the identical retry and do not classify the Specification as invalid.
- [ ] Record `DESIGN_INVALID` for an agreed but ambiguous, unsupported, incomplete, invalid, or cross-Design-inconsistent contract.
- [ ] Use the active runtime model without pinning or requiring model metadata; do not test cross-run equality.
- [ ] Record only run stamp, Specification/Behavior/Outcome/source identity, versions, hashes, attempts, agreement, and structured differences.
- [ ] Persist no raw prompt, response, duplicate Design, or model conversation and create no custom run/prompt/response table.
- [ ] Use only run-stamped system logs for failed-run reporting and do not mutate the Published Specification.
- [ ] Prove every terminal result creates zero ATF artifacts and does not affect a prior successful run.
- [ ] Add the complete valid/invalid corpus, retry, evidence, logging, privacy, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

