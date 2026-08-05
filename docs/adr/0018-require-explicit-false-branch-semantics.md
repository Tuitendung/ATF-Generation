---
status: accepted
---

# Require explicit false-branch semantics

Every conditional Guided Business Logic Behavior Block in version 2 is Branch-Complete: it declares one initial `If`, zero or more ordered `Else if` cases, and exactly one terminal `Otherwise`. Every target property affected in the block is stated exactly once in every Outcome. Each Outcome uses an explicit type-valid value or explicitly states the supported `BASELINE`, `KEEP`, or `CLEAR` meaning; missing, duplicated, or asymmetric effects fail Design Validation.

Neither AI nor deterministic application code infers an opposite value, reverse behavior, missing terminal branch, or omitted effect. This adds authoring requirements but prevents the generator from guessing whether behavior restores Design baseline, preserves pre-stimulus state, clears a message, or applies another result.
