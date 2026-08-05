---
status: accepted
---

# Make Business Logic Expressions target-owned

Each version-2 Guided Business Logic Behavior Block declares exactly one target and expected effects only for that target. Other variables may appear as the one change trigger, condition inputs, or Typed Value Expression inputs but cannot receive effects from the block.

ADR-0077 supersedes the earlier cross-target grouping rule: a `BEHAVIOR_ID` belongs to one block and is never shared across targets, application code does not merge blocks, and AI cannot infer grouping. Separate target blocks produce separate Tests even when their trigger and conditions are equivalent. This accepts repeated setup in exchange for isolated interpretation, ownership, diagnostics, and generation.
