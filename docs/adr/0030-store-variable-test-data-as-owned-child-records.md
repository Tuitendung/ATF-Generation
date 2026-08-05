---
status: superseded by ADR-0031
---

# Store Variable Test Data as owned child records

Version 2 stores each named **Variable Test Data** value as a structured child record owned by exactly one Variable Design Row. The Variable Design form exposes those records through a Test Data related surface, allowing a Test Designer to add multiple concrete typed values or Reference fixtures without duplicating the variable definition or editing JSON.

The child record carries its stable Data ID and the value or fixture appropriate to the owner's Semantic Value Type. ATF Generation validates those records against the variable definition and selects them for behavior preconditions and stimuli; the Test Designer does not label them as generated `THEN` or `ELSE` assertions. The records belong to the same Specification Aggregate and become immutable with their Published owner.

Using one repeatable child table supports arbitrary data cardinality and field-level authoring while avoiding numbered columns on Variable Design and separate physical tables for every Semantic Value Type.
