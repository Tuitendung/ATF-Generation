# Prove protected ATF metadata and atomic persistence

Status: ready-for-agent
Type: prototype
Blocked by: 03, 04

## What to build

Use the existing version-1 protected-record seam as prior art and create a throwaway version-2 artifact experiment. Prove a behavior Test graph can be written through supported target-release boundaries and every induced failure leaves zero incomplete v2 artifacts. Version-1 partial-artifact behavior remains unchanged.

## Acceptance criteria

- [ ] Revalidate Application Access and cross-scope behavior for Suite, Test, step, input, and membership records.
- [ ] Resolve required Step Configurations and input definitions before the first insert.
- [ ] Persist one complete behavior-only Suite and Test from explicit non-AI inputs.
- [ ] Include impersonation, fresh OOB Service Portal open, one proven scalar operation or assertion, and Suite membership.
- [ ] Track every run-owned identifier independently of display names.
- [ ] Determine whether one transaction spans all required writes.
- [ ] If not, prove exact run-owned compensating cleanup.
- [ ] Inject failure before and after every Suite, Test, step, input, and membership stage.
- [ ] Prove every induced failure leaves zero incomplete v2 records.
- [ ] Prove cleanup failure is itself blocking and observable.
- [ ] Prove cleanup never deletes a successful prior run or any v1 artifact.
- [ ] Prove version-1 accepted append-only and partial-artifact behavior is unchanged.
- [ ] Record roles, OOB actions, tables, and privileges without broadening OOB Application Access.

## Evidence required

- Target-release protected-table and cross-scope matrix.
- One complete successful artifact graph.
- Failure-injection matrix and post-failure zero-artifact queries.
- Cleanup isolation and version-1 regression evidence.

## Capability blocked if this prototype fails

- Production version-2 artifact writer.
- Behavior-only Suite creation.
- Zero-incomplete-artifact guarantee.
- Complete Schema Version 2 generation path.

## Comments

