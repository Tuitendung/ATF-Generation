---
status: accepted
---

# Defer Catalog Test Scenarios from the version-2 POC

The version-2 POC accepts Variable Design, Business Logic, and Variable Test Data and generates independent Derived Behavior Test Cases only. It does not add a Catalog Test Scenario field, accept authored step sequences, preserve state across multiple Catalog Behavioral Contracts, or automatically compose cross-contract behavior. Each single-trigger contract is tested once for each Declared Outcome.

Behavior whose expected result can be established only through a multi-contract sequence is unsupported and fails capability validation rather than being approximated, silently skipped, or expanded into a Cartesian product. Data Profiles may correlate inputs within one contract but do not become sequences or expected-effect definitions.

ADR-0014 remains a post-POC constraint only if Scenario capability is explicitly admitted later; that prior design is not an automatic implementation backlog commitment. This keeps the POC focused on proving that structured behavior plus candidate data can produce tests without requiring Test Designers to author cases.
