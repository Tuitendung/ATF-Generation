# Add Data Profiles, coverage bounds, ownership, and cycle safety

Status: ready-for-agent
Type: task
Blocked by: 01, 09, 15

## What to build

Complete deterministic cross-variable derivation without authored scenarios or a general solver. Support one indivisible Data Profile per Test, independent Candidate supplementation, bounded search, one effect owner, branch reachability, and value-cycle rejection.

## Acceptance criteria

- [ ] Group equal nonblank `data_profile_key` rows as one indivisible Data Profile.
- [ ] Treat blank profile keys as independently selectable Candidates.
- [ ] Reject conflicting scalar assignments inside one profile.
- [ ] Evaluate complete profiles in first-physical-row order.
- [ ] Select at most one Data Profile for one Derived Behavior Test Case.
- [ ] Supplement one selected profile with independent Candidates when required.
- [ ] Never combine two profiles or invent a missing business relationship.
- [ ] Enumerate independent variables and Candidates in the documented deterministic order.
- [ ] Stop at the first satisfying complete assignment.
- [ ] Enforce the 10,000-assignment boundary without random sampling.
- [ ] Prove additional satisfying assignments do not add Tests.
- [ ] Enforce one Behavior Effect Owner per single Declared Trigger, target, and effect property.
- [ ] Permit different owners for different properties or different triggers while never merging target blocks.
- [ ] Build the Value-Change Graph only from possible target `VALUE` assignments.
- [ ] Reject self-cycles and every directed cycle before writes.
- [ ] Prove visibility, mandatory, read-only, and message effects create no graph edge.
- [ ] Detect provably unreachable ordered branches and uncovered finite Outcomes.
- [ ] Record selected literals, profile key, and Candidate keys in non-raw provenance.
- [ ] Reject Catalog Test Scenarios, cross-contract composition, and cross-contract Cartesian generation.
- [ ] Add repeated deterministic, boundary, ownership, reachability, graph, zero-artifact, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

