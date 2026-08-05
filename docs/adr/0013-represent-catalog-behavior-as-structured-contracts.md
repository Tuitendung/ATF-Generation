---
status: accepted
---

# Represent Catalog behavior as structured contracts

Version 2 describes expected requester-facing Catalog behavior through Catalog Behavioral Contracts that explicitly state one trigger, typed conditions, Design-owned inputs, ordered Outcomes, and observable target-owned effects. The Catalog Test Specification does not store executable implementation source as expected behavior, and ATF Generation never interprets UI Policies, Catalog Client Scripts, Script Includes, or observed runtime branches to discover the expected result.

The POC obtains each contract through ADR-0077's Validated AI Interpretation of Guided Business Logic, then uses deterministic validation and derivation. Dependency contracts remain outside the POC under ADR-0055. This preserves the Current Specification as the sole test oracle while allowing implementation mechanisms to change independently.
