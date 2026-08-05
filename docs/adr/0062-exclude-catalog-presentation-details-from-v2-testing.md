---
status: accepted
---

# Exclude Catalog presentation details from v2 testing

The version-2 POC does not test Catalog Presentation Details such as Label, Annotation, Container, Split, layout, ordering, color, or CSS. Structural Variable Entries may remain in Variable Design to describe form structure, but they cannot be Behavior targets, Declared Triggers, condition inputs, or owners of Candidate Test Values; using one in those positions fails Design Validation.

This exclusion does not remove requester-observable variable behavior from scope. The POC still verifies the agreed `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and `MESSAGE` effects on supported interactive variables, because those states express the Catalog behavior that UI Policies and Client Scripts are expected to produce.
