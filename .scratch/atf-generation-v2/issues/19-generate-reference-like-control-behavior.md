# Generate Reference-like control behavior

Status: ready-for-agent
Type: task
Blocked by: 01, 07, 15

## What to build

Extend the complete Design-to-ATF path so Reference, List Collector, and reference-like Lookup Select variables participate in Baseline, Candidate Test Data, conditions, Change Stimuli, `VALUE` effects, and assertions through exact Design-owned bindings.

## Acceptance criteria

- [ ] Require `reference_table` for Reference, List Collector, and reference-like Lookup Select and reject it for other types.
- [ ] Parse `REFERENCE_BY` with one direct field and one exact quoted lookup value.
- [ ] Resolve the table only from Variable Design.
- [ ] Validate the direct field and resolve exactly one existing record before the first insert.
- [ ] Produce stable located errors for zero and multiple matches.
- [ ] Use resolved sys_id only as an Execution Binding, never as expected Design or description content.
- [ ] Set and assert a Reference by semantic identity.
- [ ] Set and assert a reference-like Lookup Select by stored identity semantics.
- [ ] Parse `REFERENCE_SET` as a single-cell List Collector Candidate.
- [ ] Reject duplicate members and mixed reference tables.
- [ ] Set and assert exact unordered List Collector membership.
- [ ] Support `EMPTY` as no selected members and fail for any extra or missing member.
- [ ] Reject raw sys_id Design, display-label matching, encoded queries, dot-walking, random/first records, and implicit record creation.
- [ ] Reject code-valued Lookup Select, live option-domain verification, and reference qualifier behavior.
- [ ] Apply the same deterministic Outcome and Candidate selection rules as scalar values.
- [ ] Add positive, zero-match, ambiguous, exact-membership, deliberately wrong, zero-artifact, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

