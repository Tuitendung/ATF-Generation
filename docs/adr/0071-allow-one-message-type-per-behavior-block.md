---
status: accepted
---

# Allow one message type per Behavior Block

Within the version-2 POC, one Behavior Block may declare no message effect or exactly one Behavior Message Type: `INFO`, `WARNING`, or `ERROR`. When present, every Declared Outcome states that same target-owned message property, assigning either one exact quoted visible text or an explicit clear instruction; a block that mixes message types or repeats the message effect in one Outcome fails Design Validation.

“One logic” means one Behavior Block, not the entire Specification. Separate Behavior Blocks may choose different message types subject to the one-owner rule for each Declared Trigger, target, and typed message property. This avoids same-Behavior message collections and ordering semantics while retaining exact Field and Form Message verification.
