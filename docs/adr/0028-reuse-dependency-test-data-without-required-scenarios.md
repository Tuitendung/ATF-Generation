# Reuse dependency test data without required scenarios

ADR-0055 defers Dependency Test Data from the version-2 POC. This ADR remains a post-POC design constraint only and does not add a Dependency Test Data field or generator path to the POC.

Test Designers declare named **Dependency Test Data** for each Catalog Dependency Contract that needs executable examples. Each dataset contains the typed inputs, Design-owned expected outcome and outputs, and the explicit Managed Fixture or Dependency Test Double binding needed to exercise that result.

ATF Generation may select these reusable datasets when constructing Derived Behavior Test Cases for individual contract outcomes, so a Test Designer does not have to author a Catalog Test Scenario merely because a Behavior Block uses `DEPENDENCY(...)`. An optional cross-contract Catalog Test Scenario references the same named data rather than redefining it, and the generator continues to calculate final expected Catalog effects from Business Logic.

If no Dependency Test Data can satisfy a declared dependency branch deterministically, Design Validation reports the missing data and generation does not silently omit that branch or call the live dependency to learn an expected result. This generalizes ADR-0024's Design-declared dependency-result rule to both generated single-behavior tests and optional authored scenarios.
