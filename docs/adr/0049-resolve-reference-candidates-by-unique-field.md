---
status: accepted
---

# Resolve Reference candidates by unique field

A Reference variable's Candidate Test Value uses `REFERENCE_BY(<unique_field>, "<value>")`. ATF Generation takes the table exclusively from that Variable Design Entry's `reference_table`, permits only one direct supported field declared unique on that table, and requires the lookup to resolve exactly one existing record before generating artifacts.

The resolved `sys_id` is an Execution Binding used to set the Reference control; it is never stored as portable Design or used to infer expected behavior. Raw `sys_id` values, display-label matching, encoded queries, dot-walking, arbitrary conditions, and random or first-record selection are rejected. Zero or multiple matches fail with the Candidate Test Value and Reference variable identified.

This adds a runtime data dependency but keeps Design stable across instances that provide the same controlled business key and avoids another custom table. Missing-record creation, if required, must be an explicit Managed Fixture concern rather than an implicit side effect of `REFERENCE_BY`.
