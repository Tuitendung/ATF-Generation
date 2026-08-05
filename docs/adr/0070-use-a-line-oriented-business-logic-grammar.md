---
status: superseded by ADR-0077
---

# Use a line-oriented Business Logic grammar

Business Logic is a sequence of non-nested Behavior Blocks and one DSL statement occupies one physical line. Surrounding spaces, tabs, and indentation are ignored; blank lines are ignored while their line numbers are retained; keywords and message types are exact uppercase tokens; identifiers are Design Keys; and comments, multiline statements, multiline string literals, and semicolon-separated statements are not supported.

Each block begins with `BEHAVIOR <behavior_id> TARGET <target_key>` and ends with `END`. Its next nonblank line is one `ON LOAD` or `ON CHANGE(...)` trigger, followed either by ADR-0064's unconditional Outcome and one `THEN` body or by ordered `WHEN`/`ELSE WHEN` branches plus one terminal `ELSE`; an effect is one `SELF.<property> = <effect_value>` statement, with `SELF.MESSAGE(<type>)` as the typed-message form.

ADR-0077 replaces this DSL with the Guided Business Logic Template. Only block anchors and physical-line preservation remain deterministic; two independent Now Assist Skills interpret the bounded English conditions and effects into canonically equal typed contracts before deterministic validation.
