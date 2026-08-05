---
status: accepted
---

# Represent List Collector data as Reference Sets

A List Collector Candidate Test Value uses `REFERENCE_SET(REFERENCE_BY(...), REFERENCE_BY(...))`. Each member resolves against the List Collector variable's Design-declared `reference_table` under ADR-0049's exactly-one-record rule, and duplicate resolved records fail validation. `EMPTY` represents an empty selection.

Generated tests set and verify the exact resolved membership while ignoring display or selection order: missing and additional records fail, but the same members in a different order satisfy the expectation. Raw sys_id lists, display-label lists, partial-subset assertions, and random records are unsupported.

This models the List Collector's business meaning as a set and avoids turning platform-dependent rendering order into expected behavior.
