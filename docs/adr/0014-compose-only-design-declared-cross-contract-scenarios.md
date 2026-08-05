---
status: accepted
---

# Compose only Design-declared cross-contract scenarios

ADR-0056 defers Catalog Test Scenarios and all cross-contract sequence composition from the version-2 POC. This ADR remains a constraint only if Scenario capability is admitted after the POC; it does not create a current Scenario field or generator path.

The POC derives one test for each Declared Trigger and Declared Outcome pairing in a Catalog Behavioral Contract and never takes the Cartesian product of outcomes across independent contracts. If Scenario capability is later admitted, a generated test may compose multiple contracts only when the Current Specification explicitly declares their shared initial state, test data, stimulus, and participating contracts; this trades automatic exhaustive permutation for bounded, auditable Test Suites and explicit business intent.
