---
status: superseded by ADR-0033
---

# Allow multiple delimited behaviors per variable row

Variable Design contains exactly one **Variable Design Row** for each stable variable key so identity, type, value domain, and baseline state have one authoritative owner. A row's Business Logic cell may contain zero or more **Behavior Blocks**, allowing one variable to have several independent expected behaviors without duplicating its definition across workbook rows.

Every block begins with `BEHAVIOR <behavior_id>` and ends with an explicit `END`. Conditional blocks retain the explicit `WHEN`/`THEN`/`ELSE` rule, while an unconditional `ON LOAD` block may omit `WHEN` and `ELSE`. Blank lines may separate blocks, but free-form content outside a block and an unterminated block fail Design Validation with source sheet, cell, behavior, line, and column diagnostics.

Explicit termination adds a small amount of authoring syntax but gives parsing and diagnostics an unambiguous boundary, especially when a cell contains multiple behaviors. Duplicating the variable row instead would make baseline ownership, type consistency, test data, and stable identity ambiguous.
