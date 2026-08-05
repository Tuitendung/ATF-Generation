---
status: superseded by ADR-0063
---

# Limit MRVS behavior to whole collection and row count

Version 2 supports MRVS structure, explicit MRVS Test Rows, whole-collection setting and verification, `ON CHANGE(mrvs_key)`, and the typed integer operand `ROW_COUNT(mrvs_key)`. A whole-MRVS Change Stimulus may add, replace, or remove Design-owned rows, and Business Logic may use row count to affect a supported target outside or at the whole-structure level.

Version 2 does not declare child-cell triggers, per-row Business Logic, `ANY_ROW` or `ALL_ROWS` predicates, column aggregates, row-to-row comparisons, cross-row mutation, nested MRVS, arbitrary JSON, or scripted traversal. These are outside the accepted v2 capability boundary rather than silently approximated or automatically added to its implementation backlog.

This preserves useful MRVS coverage without creating a separate collection-query language. Setting, clearing, and observing MRVS rows and count remain required platform prototype gates before implementation.
