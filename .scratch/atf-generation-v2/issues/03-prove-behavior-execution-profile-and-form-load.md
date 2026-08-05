# Prove the Behavior Execution Profile and genuine form-load context

Status: ready-for-human
Type: prototype
Blocked by: None

## What to build

Create throwaway ServiceNow evidence that one configured active Behavior Execution User can open a fresh Catalog Item in OOB Service Portal and that form-load behavior is selected only from state effective before or during opening.

## Acceptance criteria

- [ ] Resolve exactly one active Behavior Execution User without reading Permission Design.
- [ ] Impersonate that user at the start of a manually executable ATF Test.
- [ ] Open the Catalog Item through the OOB Service Portal `sc_cat_item` page.
- [ ] Demonstrate repeated independent Tests begin with fresh form state and no browser or variable residue.
- [ ] Locate in-scope controls through stable OOB or proven semantic seams, not arbitrary DOM selectors.
- [ ] Demonstrate one form-load effect selected from Baseline Variable State.
- [ ] Demonstrate any admitted fixed execution input is effective before or during open.
- [ ] Prove a post-open variable assignment cannot be treated as a form-load stimulus.
- [ ] Distinguish user-resolution, impersonation, open, load-readiness, and assertion failures.
- [ ] Confirm no Test submits, orders, adds to cart, or creates request records.
- [ ] Record prerequisite Catalog access, roles, and fixed data for the configured user.
- [ ] Do not reuse the version-1 Accessible Representative Test User.

## Evidence required

- Target release, Portal route, page identity, and user-resolution rule.
- Repeatable ATF execution results and fresh-state evidence.
- Form-load timing evidence separating pre-open state from prohibited post-open assignment.
- Exact stable control-location seam and failure classifications.

## Capability blocked if this prototype fails

- Behavior Execution Profile.
- OOB Service Portal behavior execution.
- Fresh-Test isolation.
- Form-load generation.
- Every production Behavior Test.

## Comments

### 2026-08-05 — local prototype packaged; target execution blocked

Gate result: **BLOCKED**, not PASS. The repository has no target hostname, authenticated ServiceNow session, confirmed target release, or ATF Test Result IDs. Acceptance checkboxes remain unchecked until the artifacts run on the intended target instance.

Behavior Execution User rule: read exact property `x_gemjp_atf_genera.prototype.ticket_03.behavior_execution_user`; require exactly one non-empty property and exactly one `sys_user` with the configured exact sys_id and `active=true`; reject `d8f57f140b20220050192f15d6673a98`; never query Permission Design, User Criteria, or Catalog Test Specification user fields. Packaged candidate: OOB System Administrator `6816f79cc0a8016401c5a33be04be441`, which is not the version-1 Accessible Representative Test User. Target roles and Catalog access still require evidence.

Artifact identifiers:

- Profile preflight Test: `fab857499ea44c0ebc09c92f10cc13e9`
- Fresh form A Test: `457c72bf94734b9c8f300edf252b3433`
- Fresh form B Test: `774db46d38e4411480c8fa92b82b8fbd`
- Throwaway Catalog Item: `03000000000000000000000000000001`
- `load_driver`: `401fc4946f864c32a93cb390f4d84669`
- `load_result`: `ff4bed6b9ba54127bf72f341343f9262`
- `residue_marker`: `b934181959524e6b92fc718b75d64427`
- onLoad script: `eefb44b6a5ff4a15b2ffcc3a865be888`

Portal/page/readiness: OOB `/sp`, explicit OOB `sc_cat_item` Page, OOB Catalog SP steps, exact variable sys_id seams, and OOB Variable State Validation polling bounded at 15 seconds. Generated XML has `Impersonate` at order 1 and `Open a Catalog Item (SP)` at order 2. The graph contains no submit, order, add-to-cart, checkout, record-insert, Flow, or REST mutation step.

Fixture timing: the onLoad script reads `load_driver=baseline` during fresh open and sets `load_result=baseline-loaded`. Form A assigns `load_driver=post_open` only after initial readiness/assertion and then requires `load_result` to remain `baseline-loaded`. Form B independently requires the original `baseline / baseline-loaded / clean` tuple, providing the residue check once A/B are repeatedly executed on target.

Test Result IDs: **none; tests have not run on target**.

Review/commit blocker: the workspace has no `.git` directory; both `git status` and `git rev-parse --show-toplevel` fail with “not a git repository.” The required `$code-review` cannot pin a fixed point or obtain a three-dot diff, and no Ticket 03 commit hash can be created without inventing replacement repository history.

Durable evidence and the short human verification checklist: `docs/v2-ticket-03-behavior-execution-profile-evidence.md`.
