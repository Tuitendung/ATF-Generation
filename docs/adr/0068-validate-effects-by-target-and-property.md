---
status: accepted
---

# Validate Behavior Effects by target and property

Every supported interactive leaf variable may be a Behavior target for `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and typed `MESSAGE(INFO|WARNING|ERROR)` effects, with each value validated against the variable's Semantic Value Type. `CATALOG_FORM` accepts only typed `MESSAGE`; Single Row Variable Sets, MRVS entries, Structural Variable Entries, and unsupported controls accept no Behavior Effects and cannot be Behavior targets.

Effect values are also closed by property. `VALUE` accepts a type-valid Typed Value Expression, `EMPTY`, `BASELINE`, or `KEEP`; `VISIBLE`, `MANDATORY`, and `READ_ONLY` accept only `true`, `false`, `BASELINE`, or `KEEP`; `MESSAGE(type)` accepts one double-quoted exact message or `CLEAR`. `CLEAR` is not an alias for an empty variable value, `EMPTY` is not a message directive, and messages have no undeclared baseline or `KEEP` semantics.

This matrix makes malformed or semantically inapplicable effects fail Design Validation instead of becoming no-op ATF steps. It preserves target-owned expected behavior while keeping Catalog Presentation Details and MRVS mutation outside the POC.
