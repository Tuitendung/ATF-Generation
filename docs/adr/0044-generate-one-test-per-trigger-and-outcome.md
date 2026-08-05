---
status: superseded by ADR-0077
---

# Generate one test per Declared Trigger and Outcome

A version-2 Behavior Block may list multiple variable keys in `ON CHANGE(variable_1, variable_2, ...)`. Each listed variable is a separate **Declared Trigger** for the same ordered conditions and target-owned outcomes, and ATF Generation creates exactly one Derived Behavior Test Case for every Declared Trigger and Declared Outcome pairing.

For each generated test, the generator establishes all other preconditions before applying the selected trigger variable's Change Stimulus last. This verifies that the expected behavior reacts to every event Design explicitly declares rather than assuming that one variable's change proves another variable's event path. Test count therefore grows from explicit trigger-outcome coverage, not from the number of Candidate Test Values or automatic cross-contract combinations.

Supporting a trigger list avoids duplicating otherwise identical Behavior Blocks and remains independent of whether the live implementation uses a UI Policy, Client Script, or both. This supersedes ADR-0041's unqualified one-test-per-outcome count.
