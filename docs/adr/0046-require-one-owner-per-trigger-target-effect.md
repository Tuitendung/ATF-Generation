---
status: accepted
---

# Require one owner per trigger, target, and effect

Within one Catalog Test Specification, exactly one **Behavior Effect Owner** may declare a given combination of Declared Trigger, variable or Catalog Form Target, and effect property. Two Behavior IDs therefore cannot both set `SELF.MANDATORY` for `ON CHANGE(amount)` on `assigned_to`, even if their authored conditions appear mutually exclusive; Design Validation reports the duplicate ownership.

Different properties on the same target and trigger may have different owners, and the same property may have different owners for different triggers. A single owner expresses multi-condition behavior through its ordered `If`, `Else if`, and terminal `Otherwise` branches. This avoids runtime-order semantics and condition-overlap solving while keeping one unambiguous Design-owned expected result for each event.
