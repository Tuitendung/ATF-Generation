# Generate Variable Set and bounded MRVS behavior

Status: ready-for-agent
Type: task
Blocked by: 01, 08, 15

## What to build

Extend the complete runtime-AI path for variables owned by a Single Row Variable Set and for MRVS whole-collection Test Data, stimulus, verification, and `ROW_COUNT`, while preserving the no-row-logic and no-MRVS-target boundary.

## Acceptance criteria

- [ ] Represent variable, Single Row Variable Set, and MRVS entries in the one Variable Design table.
- [ ] Resolve blank `parent_key` as Catalog Item ownership and one populated key as Variable Set ownership.
- [ ] Reject unknown parents, invalid parent kinds, nested Variable Sets, and nested MRVS.
- [ ] Address supported Single Row Variable Set children through technical `entry_key` values.
- [ ] Apply ordinary scalar Candidate, trigger, effect, and assertion rules to supported Single Row children.
- [ ] Require `data_profile_key` and `mrvs_row_key` for every direct MRVS child Candidate.
- [ ] Forbid `mrvs_row_key` on non-MRVS Candidates.
- [ ] Scope MRVS Test Row identity by Data Profile, MRVS parent, and row key.
- [ ] Reject duplicate child assignments within one row.
- [ ] Preserve row order by first physical appearance.
- [ ] Fill an omitted supported child only from its Design-declared baseline default.
- [ ] Set, replace, remove, clear, and observe complete Design-owned MRVS rows through proven adapters.
- [ ] Support one real whole-collection variable-change trigger.
- [ ] Support `ROW_COUNT` as an Integer condition operand.
- [ ] Reject MRVS as a Behavior target and reject every target-owned MRVS effect.
- [ ] Reject child-cell triggers, row predicates, per-row effects, unsupported aggregates, cross-row logic, arbitrary JSON traversal, and nested MRVS.
- [ ] Produce `ATF_MAPPING_UNSUPPORTED` before writes for an unproven child-control mapping.
- [ ] Add valid, invalid hierarchy, invalid row, unsupported behavior, whole-change, count-driven, zero-artifact, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

