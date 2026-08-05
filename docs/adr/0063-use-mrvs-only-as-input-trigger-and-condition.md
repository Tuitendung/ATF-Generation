---
status: accepted
---

# Use MRVS only as input, trigger, and condition

The version-2 POC supports MRVS structure, explicit MRVS Test Rows, whole-collection Change Stimulus setup and verification, `ON CHANGE(mrvs_key)`, and the typed integer operand `ROW_COUNT(mrvs_key)`. An MRVS may therefore provide input to a Behavior that targets a supported interactive variable, but the MRVS itself cannot be a Behavior target and cannot receive any `SELF` effect, including `SELF.VALUE`.

Child-cell triggers, per-row Business Logic, row predicates, aggregates other than `ROW_COUNT`, cross-row logic, and Business Logic that adds, removes, replaces, or mutates MRVS rows remain outside the POC. This supersedes ADR-0052's allowance for effects at the whole-structure level while retaining whole-collection setup and observation as an ATF platform prototype gate.
