---
status: accepted
---

# Derive Outcome coverage from candidate Test Data

Version 2 stores Variable Test Data as outcome-unbound **Candidate Test Values** with the fixed header `test_value_key | variable_key | value | data_profile_key | mrvs_row_key`. Test Designers supply finite business-valid values, optional correlation groups, and explicit MRVS-row membership, but do not enter Behavior IDs, Outcome IDs, expected effects, test names, or ATF steps. This keeps ATF Generation responsible for analyzing Business Logic and constructing tests rather than merely translating pre-authored cases.

A blank `data_profile_key` makes a candidate independently selectable. Rows sharing a nonblank key form one **Data Profile** whose values must be selected together and which may be evaluated for multiple Catalog Behavioral Contracts. For each individual contract, the generator evaluates only its referenced variables, maps finite candidates or whole profiles to the ordered Declared Outcomes, and requires data coverage for every outcome. It neither invents business values nor creates cross-contract Cartesian products; missing or ambiguous coverage fails Design Validation.

This model costs more deterministic selection logic than binding datasets directly to outcomes, but avoids forcing Test Designers to enumerate generated tests and preserves the Current Specification's Business Logic as the sole expected-behavior source.
