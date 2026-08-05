---
status: accepted
---

# Derive single-behavior tests without authored scenarios

Test Designers declare reusable Candidate Test Values and optional Data Profiles in Variable Test Data, while ATF Generation constructs exactly one Derived Behavior Test Case for every Declared Outcome of one single-trigger Catalog Behavioral Contract. Variable Test Data does not contain Behavior IDs, Outcome IDs, or expected effects. After both Skills agree and deterministic validation succeeds, the generator evaluates the finite Design-owned candidates against the contract, selects one satisfying assignment for the Outcome, orders setup so the declared stimulus runs last, and derives assertions exclusively from the agreed Behavior Block contract.

For `ON CHANGE`, that final stimulus must be a real transition between distinct values. The generator uses the trigger variable's Baseline Variable State as the before value when possible, the selected outcome value as the after value, and another finite Candidate Test Value when baseline equals the required after value. An explicit `FROM ... TO ...` transition in Business Logic overrides that default selection. Inability to construct distinct, condition-valid before and after values fails Design Validation.

For `ON LOAD`, the selected assignment must exist in the Load Context before or during Catalog form opening. Candidate Test Values cannot be applied after the form opens to force a load branch; an outcome that lacks a satisfying baseline, pre-established fixture, dependency result, or supported execution context fails Design Validation.

Under ADR-0056, the POC has no Catalog Test Scenario input and never composes sequences across Catalog Behavioral Contracts. ATF Generation may evaluate finite Candidate Test Value combinations only within variables referenced by one contract; it treats each Data Profile as an indivisible valid combination and does not create cross-contract Cartesian products or invent missing business data. If available Variable Test Data cannot satisfy an Outcome deterministically, Design Validation blocks the run instead of silently omitting the Test. Under ADR-0055, an Outcome requiring dependency data is unsupported rather than treated as a missing variable candidate.

This clarifies ADR-0014: automatic derivation within one contract is required, while composition across independent contracts is unavailable in the POC and remains post-POC only if explicitly admitted later.
