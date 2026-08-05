# Complete scalar state and message behavior

Status: ready-for-agent
Type: task
Blocked by: 01, 06, 15

## What to build

Complete the requester-facing path for text, boolean, fixed-choice, state, and exact message behavior through the proven adapters and the closed five-effect contract.

## Acceptance criteria

- [ ] Support Single Line Text and Multi Line Text as text semantic values.
- [ ] Support Checkbox and Yes/No as boolean semantic values.
- [ ] Support Select Box and Multiple Choice with fixed internal-value domains.
- [ ] Interpret, validate, plan, stimulate, and assert `VALUE`, `VISIBLE`, `MANDATORY`, and `READ_ONLY` through proven mappings.
- [ ] Support exact typed literals and explicitly stated `EMPTY`, `BASELINE`, and `KEEP` semantics where applicable.
- [ ] Support equality, inequality, emptiness, membership, and supported text operations with typed validation.
- [ ] Reject fixed-choice display labels and undeclared internal values.
- [ ] Reject dynamic choice addition, removal, filtering, relabeling, and reordering.
- [ ] Support exact `INFO`, `WARNING`, or `ERROR` Field Messages.
- [ ] Support exact Form Messages through `CATALOG_FORM`.
- [ ] Limit one Behavior Block to zero messages or one message type.
- [ ] Require each message Outcome to state exact text or explicit clear semantics.
- [ ] Fail on wrong message scope, type, text, changed Unicode literal, or uncleared state.
- [ ] Enforce the complete target-effect-value matrix and reject inapplicable combinations.
- [ ] Reject Structural Variable Entries and Variable Sets as targets, triggers, condition inputs, and Candidate owners.
- [ ] Add positive and deliberately incorrect fixtures for every claimed control-effect mapping.
- [ ] Run complete target-instance, zero-artifact, source-opacity, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

