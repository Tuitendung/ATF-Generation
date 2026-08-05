---
status: accepted
---

# Verify unified behavior, not implementation mechanisms

Version 2 models every expected pre-submission result as an implementation-mechanism-independent Catalog Behavioral Contract. Guided Business Logic has no mechanism declaration, and ATF Generation does not create different expected semantics for behavior implemented by a Catalog UI Policy, Catalog Client Script, Script Include call, their combination, or a later refactoring; it derives expectations only from the bound Current Specification.

Catalog UI Policy and Catalog Client Script are therefore not separate expected-behavior or test-oracle sections. If their live implementations conflict, ServiceNow runs them normally and generated ATF compares the resulting observable state with the Current Specification expectation. Neither Now Assist Skill nor deterministic generation inspects whether a particular implementation record exists, parses its source, or verifies structural implementation conformance.

The POC excludes dependency contracts under ADR-0055. A live reference record, ATF metadata record, or control mapping admitted only to make a generated Test executable is an Execution Binding: it may support execution and traceability but cannot change the Design-derived result. This separation keeps Design stable when implementation mechanisms are refactored without changing behavior.
