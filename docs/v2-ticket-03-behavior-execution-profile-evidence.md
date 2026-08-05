# Ticket 03 Behavior Execution Profile and form-load evidence

## Gate result

**BLOCKED — packaged for target-instance verification.**

The local prototype, generated ATF graph, and clean ServiceNow SDK build are complete. The gate is not `PASS` because this workspace has no target hostname, authenticated ServiceNow session, confirmed target release, or ATF Test Result IDs. Nothing in this report upgrades target-instance acceptance from unchecked to passed.

The requested formal `$code-review` and Ticket 03 commit are also blocked: the supplied workspace contains no `.git` directory, and `git status` plus `git rev-parse --show-toplevel` both return “not a git repository.” The code-review skill requires a resolvable fixed point and a non-empty three-dot Git diff before it starts its Standards and Spec sub-reviews. This prototype does not initialize replacement Git history.

This is disposable feasibility evidence. It does not implement the production Behavior Test generator, version-2 schema, capability registry, or persistence path.

## Target and prerequisites

| Item | Packaged or expected value | Target-instance status |
| --- | --- | --- |
| Target instance | Australia demo instance referenced by the version-1 guides; repository retains `INSTANCE.service-now.com` placeholder | **BLOCKED:** hostname/authenticated session unavailable |
| Target release | Must be read from the target instance before execution | **BLOCKED:** unknown; do not infer from SDK version |
| SDK | `@servicenow/sdk` 4.8.1; `@servicenow/glide` 27.0.5 | Verified locally |
| Service Portal plugin | `com.glide.automated_testing_impl.service_catalog_portal` | Must be active on target; do not activate from this prototype |
| Test operator | A Test Designer able to run client-side ATF, normally with `atf_test_admin`, plus a connected Client Test Runner | Must be verified |
| Behavior Execution User | OOB System Administrator candidate, `6816f79cc0a8016401c5a33be04be441` | Prior v1 documentation says active/unlocked on Australia; Ticket 03 preflight must revalidate on the actual target |
| Forbidden v1 user | Accessible Representative Test User `d8f57f140b20220050192f15d6673a98` | Explicitly rejected by preflight |
| Catalog access | Prototype item is active, standalone, not hidden from Service Portal, has no role or User Criteria restriction, and hides ordering/cart controls | OOB open step must prove access as the configured user |
| Behavior-user roles | The fixture declares no required Catalog Item role; the exact target user's inherited/direct role export must be attached to the run evidence | **BLOCKED:** target role inventory unavailable |
| Fixed data | No mutable business record is used. Fixed inputs are the exact Behavior Execution User, OOB Portal/Page bindings, fixture baselines, and 15-second timeout | Packaged; target identities still require preflight |

## Behavior Execution User resolution rule

The application-owned throwaway property is:

`x_gemjp_atf_genera.prototype.ticket_03.behavior_execution_user`

Resolution is deliberately independent of the Current Specification and Permission Design:

1. Query `sys_properties` by the exact property name with a limit of two and require exactly one non-empty value.
2. Reject the value if it equals the known version-1 Accessible Representative Test User `d8f57f140b20220050192f15d6673a98`.
3. Query `sys_user` by exact `sys_id=<configured value>^active=true`, with a limit of two, and require exactly one record.
4. Do not query `kb_knowledge`, accessible/inaccessible user fields, User Criteria, Permission Design, or select a candidate by role/name.
5. Use that exact sys_id as step 1 `Impersonate` in every prototype Behavior Test.

The packaged candidate is `6816f79cc0a8016401c5a33be04be441`. It was the version-1 inaccessible fixture and Knowledge Base technical owner, not the forbidden version-1 Accessible Representative Test User. This identity remains provisional until the target preflight passes and its roles/Catalog access are captured.

## Portal, page, controls, and readiness seams

| Seam | Artifact binding | Evidence boundary |
| --- | --- | --- |
| Portal route | OOB Service Portal `/sp`; record `81b75d3147032100ba13a5554ee4902b` | SDK 4.8.1 metadata and prior Australia evidence; preflight must revalidate exact target record |
| Page identity | OOB Page ID `sc_cat_item`; record `9f12251147132100ba13a5554ee490f4` | Preflight reads `sp_page.id` and requires exact `sc_cat_item` |
| Open | OOB `Open a Catalog Item (SP)` | Explicit Portal, Page, and Catalog Item inputs; no custom navigation or selector |
| Control identity | Exact `item_option_new.sys_id` encoded through OOB Catalog SP step inputs | No CSS, XPath, query selector, generic page-text search, or custom widget assumption |
| Load readiness | OOB `Variable State Validation (SP)` | Step timeout is `00:00:15`; the SDK contract says the Client Test Runner checks the declared variable state each second until success or timeout |
| Value assertion | OOB `Validate Variable Values (SP)` | Exact `IO:<variable_sys_id>=<semantic value>` conditions |
| Post-open assignment | OOB `Set Variable Values (SP)` | Exact variable sys_ids and values; deliberately occurs only after open and initial load assertion |

SDK-generated variable identities:

| Design/fixture name | `item_option_new.sys_id` | Baseline |
| --- | --- | --- |
| `load_driver` | `401fc4946f864c32a93cb390f4d84669` | internal choice value `baseline` |
| `load_result` | `ff4bed6b9ba54127bf72f341343f9262` | `not-loaded` before the onLoad behavior; expected `baseline-loaded` after load; read-only after onLoad |
| `residue_marker` | `b934181959524e6b92fc718b75d64427` | `clean` |

These are packaged SDK identities, not target execution results. The preflight verifies the target's OOB Step Configurations and required reference inputs before the form Tests are accepted.

## Fixture and form-load timing

The throwaway fixture Catalog Item is `03000000000000000000000000000001`. Its single `onLoad` Catalog Client Script reads `load_driver` once while the fresh form opens:

- baseline at open → set `load_result=baseline-loaded`;
- any pre-open fixed driver value → set `load_result=pre-open-context-loaded`;
- then make `load_result` read-only.

There is deliberately no `onChange` script that can re-run the load selection. The proof sequence is:

1. `Impersonate` the fixed Behavior Execution User.
2. Open the item in a new ATF Test through OOB Service Portal `sc_cat_item`.
3. Wait for visible controls plus read-only `load_result`, bounded at 15 seconds.
4. Assert the initial tuple `load_driver=baseline`, `load_result=baseline-loaded`, `residue_marker=clean`.
5. Only then assign `load_driver=post_open` and `residue_marker=dirty-a`.
6. Assert `load_driver=post_open` and `residue_marker=dirty-a`, while `load_result` remains `baseline-loaded`.

Step 6 is the negative control: a post-open Candidate-like assignment can change current form state but cannot be classified as a form-load stimulus and cannot select the alternate load result. If a generated `ON LOAD` Outcome needs that post-open assignment, it is unreachable and must be rejected before artifact creation under ADR-0045. This prototype does not add the production planner that performs that rejection.

Fresh-state evidence requires both independent Tests to be executed, not merely inspected:

- Form A observes the fresh tuple, then leaves `load_driver=post_open` and `residue_marker=dirty-a` in its browser form.
- Form B starts with its own `Impersonate` and OOB open, then must observe the original fresh tuple again.
- Execute `A → B → A → B`, and execute A and B individually in a different order. Every first observation must be identical. No Test may rely on Suite order or a previous Test.

Until those runs have target Test Result IDs, fresh-state and timing acceptance remain unproven.

## Failure classification

| Classification | Evidence location | Meaning |
| --- | --- | --- |
| `USER_RESOLUTION` | Profile preflight | Missing/duplicate/empty profile property, forbidden v1 Accessible user, or zero/multiple/inactive exact `sys_user` |
| `IMPERSONATION` | Form Test step 1 | Exact configured user could not be impersonated |
| `OPEN` | Preflight or Form Test step 2 | Portal/Page/OOB open metadata invalid, Catalog access absent, plugin missing, or Catalog Item did not open |
| `LOAD_READINESS` | Form Test step 3 | Declared semantic control state did not stabilize within 15 seconds |
| `ASSERTION` | Form Test value assertion after readiness | Stable observable value differs from the fixture expectation; this is not reported as an open or timeout failure |

The preflight does not turn runtime open errors into permission outcomes. Each ATF step/result remains separately inspectable.

## Pre-Submission Boundary and request-record proof

Static graph inspection after the clean SDK build shows only these form-Test step configurations:

1. `Impersonate`
2. `Open a Catalog Item (SP)`
3. `Variable State Validation (SP)`
4. `Validate Variable Values (SP)`
5. `Set Variable Values (SP)`
6. `Validate Variable Values (SP)` (Form A only)

There is no Submit, Order, Add to Cart, Checkout, Record Insert, Flow, or REST mutation step. The fixture also hides Order Now, cart, wishlist, quantity, save-as-draft, and attachment controls. This is durable local evidence that the packaged graph has no request-creation operation; target execution must still prove zero `sc_request` and `sc_req_item` rows were created in each execution window.

For every run, record counts immediately before and after, and attach the exact encoded queries/timestamps used. Any new request record attributable to either Test is a gate failure.

## Artifact inventory

| Artifact | Identifier |
| --- | --- |
| Profile preflight Test | `fab857499ea44c0ebc09c92f10cc13e9` |
| Fresh form A Test | `457c72bf94734b9c8f300edf252b3433` |
| Fresh form B Test | `774db46d38e4411480c8fa92b82b8fbd` |
| Fixture Catalog Item | `03000000000000000000000000000001` |
| onLoad Catalog Client Script | `eefb44b6a5ff4a15b2ffcc3a865be888` |
| Behavior Execution User property | `b927efd1f20a4389af07fb61eb6341d7` |
| Portal property | `a28a3c37b4fd47debb9884f57432c91b` |
| Page property | `e8c9ade3ccee4b9d9e49ac50005caa8b` |
| Readiness-timeout property | `5e02c8673f1d4a8ba99f195f8bf8e1bc` |

## Human target-instance verification checklist

- [ ] Record the exact instance hostname and release/build; confirm this is the intended Australia target.
- [ ] Install/update the clean package through the approved SDK/release process; do not activate plugins automatically.
- [ ] Confirm `com.glide.automated_testing_impl.service_catalog_portal` is active.
- [ ] Run preflight Test `fab857499ea44c0ebc09c92f10cc13e9`; record its Test Result ID and output.
- [ ] Export the exact configured Behavior Execution User identity, active/locked state, direct/inherited roles, and verify it is not `d8f57f140b20220050192f15d6673a98`.
- [ ] As that user, prove direct Catalog access through `/sp?id=sc_cat_item&sys_id=03000000000000000000000000000001` (or the equivalent URL generated by the OOB step).
- [ ] Verify Portal suffix `sp`, Page ID `sc_cat_item`, and the exact OOB Step Configuration/input cardinalities recorded by preflight.
- [ ] Capture baseline `sc_request` and `sc_req_item` counts and the execution start timestamp.
- [ ] Run A, B, A, B; record every Test Result ID and step-result timings.
- [ ] Run B and A independently in reversed order; record every Test Result ID.
- [ ] Verify every fresh observation is `baseline / baseline-loaded / clean`.
- [ ] Verify Form A's post-open observation is `post_open / baseline-loaded / dirty-a`.
- [ ] Inject or capture one failure of each class separately: user resolution, impersonation, open, load readiness, and assertion; restore every fixture afterward.
- [ ] Capture post-run request counts and prove no attributable `sc_request` or `sc_req_item` was inserted.
- [ ] Attach screenshots/exported Test Results and artifact links; do not store credentials, cookies, or tokens.
- [ ] Only then change the gate result to `PASS` or `FAIL` and update the Ticket 03 acceptance checkboxes.

## Target result ledger

| Run | Test Result ID | Result | Fresh tuple | Post-open tuple | Request delta | Evidence link |
| --- | --- | --- | --- | --- | --- | --- |
| Preflight | Not run | BLOCKED | n/a | n/a | n/a | Authenticated target unavailable |
| A1 | Not run | BLOCKED | Not observed | Not observed | Not measured | Authenticated target unavailable |
| B1 | Not run | BLOCKED | Not observed | n/a | Not measured | Authenticated target unavailable |
| A2 | Not run | BLOCKED | Not observed | Not observed | Not measured | Authenticated target unavailable |
| B2 | Not run | BLOCKED | Not observed | n/a | Not measured | Authenticated target unavailable |
| B independent | Not run | BLOCKED | Not observed | n/a | Not measured | Authenticated target unavailable |
| A independent | Not run | BLOCKED | Not observed | Not observed | Not measured | Authenticated target unavailable |
