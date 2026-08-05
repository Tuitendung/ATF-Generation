# Use explicit fixture or test-double dependency bindings

ADR-0055 defers dependency Execution Bindings from the version-2 POC. These rules apply only if dependency-backed behavior is admitted after the POC and do not create a current implementation requirement.

Every Catalog Test Scenario that consumes a Catalog Dependency Contract selects an explicit Execution Binding: a **Managed Fixture** or a **Dependency Test Double**. A Managed Fixture is preferred when controlled data can make the real dependency implementation produce the Scenario Dependency Result; a Dependency Test Double is used for outcomes such as external failures, errors, or timeouts that cannot be produced safely and deterministically through fixture data.

The binding only prepares actual execution. It cannot choose, replace, or alter the scenario's Design-owned expected outcome or outputs, and ATF Generation never falls back automatically between binding kinds. Generation fails clearly when the selected binding is incomplete or unsupported, and generated artifact provenance identifies the binding used. A fixture-bound test exercises the integrated dependency path, while a double-bound test verifies only the consuming Catalog Form Behavior and makes no provider-conformance claim.

Dependency Test Double support remains a platform prototype gate. Before it is production-supported, the implementation must prove ATF-only activation, per-execution isolation, safe parallel runs, automatic expiry or teardown, readiness-based asynchronous waiting, deterministic timeout diagnostics, and no mutable global override available to production requesters. If that gate is not met, `TEST_DOUBLE` scenarios are rejected rather than silently executed against a real dependency.
