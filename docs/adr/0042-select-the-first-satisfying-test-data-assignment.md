---
status: accepted
---

# Select the first satisfying Test Data assignment

When multiple finite Test Data assignments reach the same Declared Outcome, version 2 generates its single Derived Behavior Test Case from the first satisfying assignment in a deterministic preference order. It first reuses type-valid literals and defined empty or baseline semantics already present in Business Logic where they are sufficient, then preserves Baseline Variable State for variables that need no change, then evaluates whole Data Profiles and independent Candidate Test Values in their physical Variable Test Data order.

The generator treats a Data Profile as indivisible, evaluates only finite Design-owned inputs relevant to the individual contract, and selects the first complete assignment whose ordered conditions reach the Outcome. It does not choose randomly or generate tests from the remaining satisfying assignments. Reordering Variable Test Data can therefore change representative test inputs in a later Specification revision, but it cannot change expected effects, which continue to come only from Business Logic.

This avoids another priority column and makes representative selection predictable while accepting that row order is meaningful Design rather than cosmetic formatting.
