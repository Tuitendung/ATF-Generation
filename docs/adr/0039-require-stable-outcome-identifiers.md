---
status: accepted
---

# Require stable Outcome IDs

Every unconditional or conditional branch in a version-2 Guided Business Logic Behavior Block declares `OUTCOME_ID: <outcome_id>` with an identifier unique within that block. The pair of Behavior ID and Outcome ID gives the Declared Outcome a stable identity used by AI agreement, generated-Test naming, and validation diagnostics instead of a mutable branch position.

AI must preserve the Test Designer-authored ID exactly and cannot generate, rename, normalize, or infer it. An Outcome ID is neither a Test Data field nor a test oracle. Deterministic generation evaluates outcome-unbound Candidate Test Values and Data Profiles against the agreed contract; expected effects continue to come exclusively from the Business Logic source.
