---
status: accepted
---

# Bound deterministic Coverage Assignment Search

For each Declared Outcome of a single-trigger Behavior Block, version 2 first tries the assignment formed by exact Business Logic literals and otherwise unchanged Baseline Variable State. It then considers one whole Data Profile at a time in the order of that profile's first physical row, supplementing it when necessary with independently selectable Candidate Test Values; finally it considers assignments containing no Data Profile. Independent variables are ordered by their first physical Candidate row, each variable's candidates retain physical order, and enumeration is lexicographic, so the first satisfying assignment is stable.

One Derived Behavior Test Case may use at most one Data Profile. The generator never combines two named profiles because their cross-profile business relationship is not Design-owned; when values from two groups must be valid together, the Test Designer supplies one combined Data Profile. Independently selectable candidates explicitly authorize cross-variable combination and may supplement a profile without breaking its indivisible members.

The POC evaluates at most 10,000 complete assignments for one Outcome. Reaching the cap produces blocking `COVERAGE_SEARCH_LIMIT_EXCEEDED`, while exhausting the finite search produces `OUTCOME_NOT_COVERED`; neither condition creates partial Tests or causes random sampling. The limit bounds combinatorial work without turning extra satisfying assignments into extra generated Tests.
