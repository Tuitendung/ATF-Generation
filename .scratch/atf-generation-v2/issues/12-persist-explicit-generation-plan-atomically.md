# Persist an explicit Generation Plan atomically

Status: ready-for-agent
Type: task
Blocked by: 10, 11

## What to build

Create the production behavior artifact seam that accepts one complete immutable Generation Plan and persists one complete behavior-only Test Suite and its Tests, or leaves zero run-owned artifacts. The writer does not parse Design, call AI, select Test Data, or inspect implementation source.

## Acceptance criteria

- [ ] Define a small immutable Generation Plan interface containing Suite identity, Derived Behavior Test Cases, selected-input provenance, ordered semantic operations, expected effects, and non-raw interpretation provenance.
- [ ] Resolve the configured active Behavior Execution User before the first insert.
- [ ] Resolve every required Step Configuration, input definition, adapter, and binding before the first insert.
- [ ] Persist an active non-automatic behavior-only Suite and complete Tests.
- [ ] Persist impersonation, fresh OOB Service Portal open, ordered setup/stimulus/readiness/assertion operations, inputs, and memberships from the explicit plan.
- [ ] Use Behavior ID, target, Declared Trigger, Outcome ID, bound Specification, selected data keys, and run stamp in approved names and descriptions.
- [ ] Retain allowed prompt/schema versions, hashes, attempts, and agreement evidence without raw prompt, response, Design text, source, or raw reference sys_id.
- [ ] Add membership only after its complete Test graph exists.
- [ ] Track exact run-owned identifiers independently of display names.
- [ ] Use the transaction or compensating-cleanup path proven by Ticket 10.
- [ ] Fault-inject every persistence stage and prove zero incomplete v2 artifacts remain.
- [ ] Never delete a successful prior run, a different in-flight run, or a version-1 artifact.
- [ ] Keep the version-1 writer and accepted partial-artifact behavior unchanged.
- [ ] Add production writer integration coverage for success, isolation, and every cleanup path.
- [ ] Complete a clean type check and SDK build.

## Out of scope

- Deriving or repairing the Generation Plan.
- Calling either Now Assist Skill.
- Automatically executing the generated Suite.

## Comments

