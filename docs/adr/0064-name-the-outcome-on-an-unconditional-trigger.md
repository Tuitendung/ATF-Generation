---
status: accepted
---

# Name the Outcome on an unconditional trigger

An Unconditional Behavior declares its one Test Designer-authored `OUTCOME_ID` inside `LOGIC`, followed by its complete target-owned effect list. Its `TRIGGER` section still contains exactly one form-load or variable-change statement, but identity and expected effects never share the trigger line. The block contains no `If`, `Else if`, or `Otherwise`; conditional Behaviors retain their ordered branches with mandatory terminal `Otherwise`.

This gives every generated Test a stable Design identity without inventing a condition. Both Skills must return the same Outcome ID and effect list, and deterministic validation requires exactly one Outcome for the unconditional shape.
