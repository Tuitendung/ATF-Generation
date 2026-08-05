---
status: accepted
---

# Derive ON CHANGE stimuli from baseline and candidates

Variable Test Data does not add `from_value` or `to_value` columns for `ON CHANGE`. For each Derived Behavior Test Case, version 2 establishes all non-trigger preconditions first and then applies one final **Change Stimulus** to the trigger variable. The generator normally uses Baseline Variable State as the before value and the selected Candidate Test Value or explicit Business Logic literal as the after value.

The before and after values must be distinct. When baseline already equals the required after value, the generator selects the first type-valid Candidate Test Value that creates a real transition; an explicit `FROM ... TO ...` condition instead determines both sides. If finite Design-owned values cannot create the declared transition, Design Validation fails rather than simulating an on-change event by setting the same value or inventing data.

This keeps Variable Test Data outcome-unbound and compact while preserving the observable event semantics that the generated ATF must exercise.
