# Generate conditional variable-change Outcomes from Candidate data

Status: ready-for-agent
Type: task
Blocked by: 01, 04, 09, 14

## What to build

Extend the complete runtime-AI path so one Guided Business Logic block with one variable-specific change trigger and ordered conditional Outcomes derives exactly one independent Test per Outcome. The Test Designer supplies Candidate Test Values, not test cases or Outcome mappings.

## Acceptance criteria

- [ ] Require exactly one form-load or one variable-specific change trigger per block.
- [ ] Reject a trigger list, combined load/change, or multiple change variables.
- [ ] Support one `If`, zero or more ordered `Else if` branches, and exactly one terminal `Otherwise`.
- [ ] Require a unique Test Designer-authored `OUTCOME_ID` for every branch and preserve physical order.
- [ ] Reject nested branches and a missing or nonterminal `Otherwise`.
- [ ] Require every branch to declare the same target effect-property set.
- [ ] Normalize and validate multi-variable `AND`, `OR`, and parentheses; require parentheses when `AND` and `OR` are mixed.
- [ ] Parse the exact Variable Test Data header and ordered independent Candidate Test Values deterministically after interpretation.
- [ ] Keep Behavior IDs, Outcome IDs, expected effects, Test names, ATF steps, before-values, and after-values out of Test Data.
- [ ] Reuse exact Business Logic literals and Baseline before Candidate values.
- [ ] Require at least one satisfying finite assignment for every Outcome.
- [ ] Generate exactly one Test for each Declared Outcome and no extra Test for extra satisfying data.
- [ ] Establish every non-trigger precondition before applying one distinct trigger transition last.
- [ ] Prefer Baseline as the before-value and select another Design-owned Candidate when a distinct value is required.
- [ ] Report uncovered Outcomes, unavailable transitions, ambiguous boolean grouping, and invalid branch shapes before writes.
- [ ] Open a fresh form and assert all Outcome effects together in every generated Test.
- [ ] Demonstrate equivalent behavior for a second trigger requires a second block and Behavior ID.
- [ ] Add complete positive, negative, data-selection, trigger-order, target-instance, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

