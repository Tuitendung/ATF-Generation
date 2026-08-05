---
status: accepted
---

# Support ordered intermediate branches

A version-2 Guided Business Logic Behavior Block may express more than two Declared Outcomes with zero or more `Else if` branches between its initial `If` and terminal `Otherwise`. Conditions are evaluated in physical order and the first true condition selects the Outcome; `Otherwise` selects the Outcome when every preceding condition is false. Every branch declares an `OUTCOME_ID` unique within the block.

Each branch declares the same target-owned effect-property set and independently produces one Derived Behavior Test Case. Design-owned Test Data for an `Else if` branch must make every earlier condition false and that branch true; data for `Otherwise` must make every prior condition false. Both Skills must preserve this order in the canonical contract, and deterministic validation rejects an uncovered branch. This supports multi-outcome logic without arbitrary script expressions or implementation-derived ordering.
