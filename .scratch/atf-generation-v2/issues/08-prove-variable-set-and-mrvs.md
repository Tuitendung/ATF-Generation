# Prove Variable Set and bounded MRVS behavior

Status: ready-for-agent
Type: prototype
Blocked by: 04

## What to build

Create throwaway evidence for addressing Single Row Variable Set children and using MRVS only as complete Design-owned Test Data, a whole-collection trigger, and a `ROW_COUNT` condition operand.

## Acceptance criteria

- [ ] Address, set, and assert a supported Single Row Variable Set child by technical `entry_key`.
- [ ] Construct an MRVS with multiple ordered Design-owned rows and supported child controls.
- [ ] Replace, remove, clear, and observe the complete collection semantically.
- [ ] Produce one real whole-collection change event.
- [ ] Evaluate `ROW_COUNT` as an Integer condition that affects a normal scalar target.
- [ ] Preserve deterministic row order.
- [ ] Prove child-cell triggers and per-row effects are not required.
- [ ] Prove MRVS is not a Behavior target and receives no target-owned effect.
- [ ] Reject nested MRVS, row predicates, unsupported aggregates, cross-row logic, and arbitrary JSON traversal.
- [ ] Record every supported MRVS child-control mapping and limitation.
- [ ] Exercise deliberately invalid hierarchy and row inputs.
- [ ] Keep the prototype disposable.

## Evidence required

- Single Row Variable Set addressing evidence.
- MRVS setup, replacement, removal, clear, and observation results.
- Whole-collection change and `ROW_COUNT` results.
- Supported child-control matrix and rejected-operation evidence.

## Capability blocked if this prototype fails

- Single Row Variable Set support as applicable.
- MRVS Test Rows.
- Whole-collection MRVS stimulus and verification.
- `ROW_COUNT` conditions.
- Every production Behavior requiring a failed mapping.

## Comments

