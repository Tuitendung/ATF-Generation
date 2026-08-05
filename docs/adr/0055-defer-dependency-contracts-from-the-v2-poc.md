---
status: accepted
---

# Defer dependency contracts from the version-2 POC

The version-2 POC uses Variable Design, Business Logic, Variable Test Data, fixed execution records, and Design-owned final observable effects to derive and run tests. It does not add Dependency Design or Dependency Test Data sections and does not accept `DEPENDENCY(...)` or `USE DEPENDENCY ... WITH ...` in POC Business Logic. A Script Include, API, cache, or server lookup used by the live implementation remains invisible to the generator and does not require a Design model when controlled variable inputs and fixed records can make its final observable behavior deterministic.

Behavior for which the same variable inputs may produce different external outcomes, or whose actual dependency result cannot be controlled with the POC's fixed data, is unsupported and fails capability validation rather than using the live dependency as an oracle or being silently skipped. The POC therefore does not cover dependency error, timeout, not-found, or variable external-response paths that need a Managed Fixture or Dependency Test Double.

ADRs 0024, 0025, and 0028 remain design constraints only if dependency capability is admitted after the POC; they are not a commitment to that later scope. If admitted, every Behavior Block must map all dependency inputs explicitly, with no name-based inference. This deliberate deferral keeps the POC focused on proving validated Design-to-test generation while preserving implementation-mechanism independence.
