# Require scenario-declared dependency results

ADR-0055 defers this dependency capability from the version-2 POC. This ADR records the Design rule to use only if dependency-backed behavior is admitted after the POC; it does not authorize Dependency Design fields or `DEPENDENCY(...)` expressions in the current POC.

A **Catalog Dependency Contract** describes typed inputs, declared outcomes, and typed outputs needed by Catalog Form Behavior without identifying a Script Include or any other implementation mechanism. Each Catalog Test Scenario that uses the contract must provide a **Scenario Dependency Result** containing its expected outcome and every output required by that outcome.

A future admitted Business Logic contract would read that result only through typed dependency Outcome and output references. Design Validation would resolve the stable dependency and output names, verify that the selected Outcome declares the requested output, and type-check the concrete scenario value before generation. This post-POC constraint does not define a current Guided Business Logic authoring form or authorize dependency syntax.

ATF Generation must not call a live Script Include, API, or other dependency to learn expected output because doing so would make observed implementation behavior the test oracle and could reproduce a defect as a passing expectation. A managed fixture or test double may later serve as an Execution Binding that makes the actual form encounter the declared outcome, but it cannot replace or alter the Scenario Dependency Result.
