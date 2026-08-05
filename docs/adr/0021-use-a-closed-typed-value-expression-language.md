---
status: accepted
---

# Use a closed typed value-expression language

Version 2 derives expected `VALUE` effects from a closed Typed Value Expression rather than JavaScript or arbitrary formulas. Guided Business Logic may state typed literals, values of declared variables, supported exact-decimal arithmetic, and the closed `ROUND` and `CONCAT` meanings; both Now Assist Skills must normalize the statement to the same typed expression. Date literals use `YYYY-MM-DD`, Date/Time literals use UTC `YYYY-MM-DDTHH:mm:ssZ`, and `NOW`, `TODAY`, relative time, and timezone-free timestamps are unsupported.

Deterministic Design Validation resolves each variable identifier and checks operators and functions against operand and target Semantic Value Types. It rejects unsupported functions, dynamic names, runtime queries, live-record dot-walking, JavaScript, dependencies, and implementation-source evaluation. Selected Candidate Test Values or one Data Profile supply finite inputs only after interpretation; they never change the expected expression.

`BASELINE`, `KEEP`, `EMPTY`, and `CLEAR` retain their distinct effect meanings and may be normalized only when explicitly stated in the source. Dependency expressions remain outside the POC under ADR-0055, and every claimed expression-to-ATF mapping remains subject to its platform gate.
