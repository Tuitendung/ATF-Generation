---
status: accepted
---

# Support Field Messages and Form Messages

Version 2 represents both requester-observable message scopes. A **Field Message** uses a variable target and `SELF.MESSAGE(INFO|WARNING|ERROR)`, while a **Form Message** uses the reserved `TARGET CATALOG_FORM` and the same closed message-type set. `CATALOG_FORM` is a schema-defined target, not a Variable Design Entry, custom table record, DOM selector, or implementation mechanism.

Each conditional branch declares the expected message text or `CLEAR` for the same typed message effect. Generated tests require an exact match of observable scope, `INFO`/`WARNING`/`ERROR` type, and Design-owned visible text; presence of a different message does not satisfy the expectation, while `CLEAR` requires the corresponding message to be absent. Arbitrary HTML, custom widgets, DOM notifications, and implementation-discovered messages remain outside the model. Platform support for reliably observing both message scopes and types is a required ATF prototype gate before implementation.

This controlled exception extends ADR-0033 and ADR-0034's variable-target rule while preserving Target-Owned Business Logic and one Behavior Effect Owner per trigger, target, and message effect.
