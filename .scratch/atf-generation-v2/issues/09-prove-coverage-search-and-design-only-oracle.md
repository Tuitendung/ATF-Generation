# Prove bounded Coverage Assignment Search and the Design-only oracle

Status: ready-for-agent
Type: prototype
Blocked by: 01, 02

## What to build

Create a throwaway side-effect-free derivation prototype that consumes reviewed canonically agreed contracts plus deterministic Variable Design and Test Data, selects finite assignments, and proves expected results remain source-opaque.

## Acceptance criteria

- [ ] Consume reviewed canonical contracts rather than parse or reinterpret Business Logic semantics.
- [ ] Select exact Business Logic literals and Baseline Variable State before Candidate data.
- [ ] Select one complete Data Profile at a time in first-physical-row order.
- [ ] Supplement one profile with independent Candidates when necessary.
- [ ] Never combine two Data Profiles in one assignment.
- [ ] Enumerate independent variables and Candidates in documented deterministic order.
- [ ] Select only the first satisfying assignment for one Declared Outcome.
- [ ] Prove extra satisfying assignments do not add Tests.
- [ ] Prove uncovered finite search reports `OUTCOME_NOT_COVERED`.
- [ ] Prove the 10,000-assignment boundary reports `COVERAGE_SEARCH_LIMIT_EXCEEDED` without random sampling.
- [ ] Derive a distinct before/after Change Stimulus without inventing a value.
- [ ] Instrument all inputs and prove no UI Policy, Catalog Client Script, Script Include, observed branch, live-value search, or Article Body contributes an expectation.
- [ ] Demonstrate fixed Design plus changed implementation-shaped input leaves the derived expected result unchanged.
- [ ] Record runtime and memory observations for representative and boundary searches.

## Evidence required

- Reviewed canonical-contract and Test Data fixtures.
- Exact selected assignments and repeated deterministic results.
- Boundary benchmark and terminal diagnostics.
- Instrumented source-access ledger.

## Capability blocked if this prototype fails

- Outcome coverage derivation.
- Candidate Test Value and Data Profile selection.
- Bounded Coverage Assignment Search.
- Change Stimulus planning.
- Source-opaque expected-result generation.

## Comments

