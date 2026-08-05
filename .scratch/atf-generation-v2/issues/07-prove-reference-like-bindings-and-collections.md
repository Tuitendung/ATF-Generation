# Prove Reference-like bindings and collections

Status: ready-for-agent
Type: prototype
Blocked by: 04

## What to build

Create throwaway resolution and Service Portal evidence for Design-owned Reference, reference-like Lookup Select, and List Collector values using exact identity and unordered membership.

## Acceptance criteria

- [ ] Resolve `REFERENCE_BY` through Variable Design `reference_table` and one direct unique field.
- [ ] Prove zero matches and multiple matches fail before artifact creation.
- [ ] Prove raw sys_id, display-label matching, encoded query, dot-walk, random record, and first-record selection are unnecessary and rejected.
- [ ] Set and assert one Reference by resolved identity.
- [ ] Set and assert one reference-like Lookup Select with stored sys_id semantics.
- [ ] Set and assert one `REFERENCE_SET` by exact unordered List Collector membership.
- [ ] Reject duplicate members and mixed tables.
- [ ] Prove `EMPTY` clears membership.
- [ ] Prove one extra or missing member fails exact comparison.
- [ ] Record direct dictionary metadata and binding-query security behavior.
- [ ] Create no missing reference record implicitly.
- [ ] Exercise positive, zero-match, ambiguous, and deliberately wrong assertions.

## Evidence required

- Reference tables, direct lookup fields, and uniqueness evidence.
- Zero, one, and multiple-match resolution evidence.
- ATF results for all three reference-like controls.
- Exact List Collector membership evidence.

## Capability blocked if this prototype fails

- Affected Reference mapping.
- Affected reference-like Lookup Select mapping.
- Affected List Collector mapping.
- `REFERENCE_BY` or `REFERENCE_SET` as applicable.
- Every production Behavior requiring a failed mapping.

## Comments

