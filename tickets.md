# Tickets: ATF Generation v1

These tracer-bullet tickets build Catalog Permission Test Generation from structured Catalog Test Specifications. The source specification is [ATF Generation v1 — Catalog Permission Test Generation](.scratch/atf-generation-v1/PRD.md).

Work the **frontier**: any ticket whose blockers are all done. Initially, **Prove the OOB ATF generation seam** and **Author and publish a v1 Catalog Test Specification** can start. For sequential delivery, work top to bottom.

## Prove the OOB ATF generation seam

**Status:** ready-for-human
**Completion:** complete

**What to build:** Establish the smallest production-shaped generation path that accepts explicit Catalog Item, Representative Test User, Portal, and Page inputs and persists one runnable Accessible Test inside one Test Suite. This slice must prove the ServiceNow SDK and OOB ATF metadata seams that every later Generation Run depends on; its code is retained and extended rather than discarded as a prototype.

**Blocked by:** None — can start immediately.

- [x] Verify the project can install its declared ServiceNow SDK dependencies and complete a clean SDK build without adding credentials to the repository.
- [x] Determine the supported SDK/Fluent or application-metadata mechanism for the server-side generation service and record definitions from SDK definitions, transformed metadata, official ServiceNow documentation, or the demo instance rather than guessing.
- [x] Verify the exact OOB tables, fields, reference relationships, and ordering fields required to persist a Test Suite, Test, Test Steps, Step Input Values, and Suite membership.
- [x] Resolve exactly one OOB **Impersonate** Step Configuration by its exact OOB name.
- [x] Resolve exactly one OOB **Open a Catalog Item (SP)** Step Configuration by its exact OOB name.
- [x] Resolve the required User, Portal, Page, and Catalog Item input definitions within their owning Step Configurations.
- [x] Capture the actual OOB Service Portal and `sc_cat_item` Page references from the demo instance as clearly commented source constants; do not introduce System Properties or runtime suffix/page-ID lookup.
- [x] Verify `com.glide.automated_testing_impl.service_catalog_portal` is available as a manual demo prerequisite; do not declare or activate it from the application.
- [x] Given explicit valid inputs, create exactly one new active Test Suite containing exactly one new active Accessible Test.
- [x] Configure the Accessible Test for manual execution rather than automatic execution.
- [x] Create exactly two ordered steps in the Accessible Test: Impersonate followed by Open a Catalog Item (SP).
- [x] Persist Step Input Values that reference the exact Representative Test User, Portal, Page, and Catalog Item supplied to the generation seam.
- [x] Add the Accessible Test to the Suite only after the Test, both steps, and all required inputs exist.
- [x] Verify the resulting Suite, Test, steps, inputs, and membership are visible and structurally valid in the demo instance's OOB ATF administration experience.
- [x] Add executable integration coverage at the generation-service seam for the successful minimal artifact graph; avoid separate public seams for naming or record-insert helpers.

**Verification:** On 2026-07-30 the demo instance retained Suite `fbcc93433b5a47d4e825708e53e45ae6` and Accessible Test `44dcd3433b5a47d4e825708e53e45a5e`; independent OOB-table queries and authenticated OOB form reads verified the complete graph. Executable Integration Test result `a9ca1b03fb9e4b10768cf94855efdc4b` completed with `success`.

## Author and publish a v1 Catalog Test Specification

**Status:** ready-for-human
**Completion:** complete

**What to build:** Give the trusted Test Designer a complete dedicated Knowledge authoring journey for creating, editing, finding, and immediately publishing the structured v1 Design that will later drive ATF Generation.

**Blocked by:** None — can start immediately.

- [x] Create and application-own one Knowledge Base named **Catalog Test Specifications**; do not select it through a System Property or resolve it by title at runtime.
- [x] Extend `kb_knowledge` with the six approved, fully scoped v1 fields for Catalog Item, Schema Version, Accessible User Criteria, Accessible Representative Test User, Inaccessible User Criteria, and Inaccessible Representative Test User.
- [x] Use the approved physical column names and reference targets from the Catalog Test Specification Schema.
- [x] Default Schema Version to integer `1`.
- [x] Leave all six fields non-mandatory and add no UI Policy, Data Policy, publication validator, or general completeness validator.
- [x] Create the **ATF Generation → Catalog Test Specifications** application navigation path.
- [x] Make the module open one `kb_knowledge` list filtered only to the application-owned Specification Knowledge Base.
- [x] Show Draft and Published records together for the manager-only Test Designer, leave the module query free of lifecycle predicates, accept OOB administrator/`knowledge_admin`-only Retired visibility, and order the list by Updated descending.
- [x] Configure the approved list columns: Number, Short Description, Catalog Item, Workflow State, Schema Version, Updated, and Updated by.
- [x] Create the dedicated form view with **Specification Identity**, **Permission Design**, and **Human Notes** sections and exactly the approved fields in each section.
- [x] Add **ATF Generation → Create New** beside the dedicated authoring-list module; make it open the Catalog Test Specification Platform form directly rather than the generic Knowledge Center wizard, default Knowledge Base to **Catalog Test Specifications**, and leave the field editable. Do not use a scoped list UI Action or view-specific UI Action mapping for this route.
- [x] Preserve Short Description and Article Body as human-facing fields that are never part of the machine-readable Permission Design contract.
- [x] Support saving Draft without affecting Published eligibility.
- [x] Support explicit immediate Publish with no approval stage and no auto-publish on Save.
- [x] Preserve the agreed replacement process: prepare a separate Draft, Retire the old Published Specification, then Publish the replacement; do not enable Knowledge Management Advanced article versioning.
- [x] Verify the demo Test Designer can be manually added to the Knowledge Base Managers and can author and Publish without receiving general Knowledge administration authority.
- [x] Verify a Specification moved to another Knowledge Base disappears from this authoring boundary and is not treated as an application-owned Catalog Test Specification.
- [x] Add the highest practical acceptance coverage for module filter, list layout/order, form sections, default values, editable Knowledge Base, Draft/Published visibility, the OOB Retired access boundary, and immediate Publish behavior.
- [x] Complete a clean SDK build with the Knowledge metadata and authoring surfaces included.

**Verification:** Local source inspection on 2026-08-02 verified the application-owned Knowledge Base metadata, six `kb_knowledge` fields, dedicated list/form/modules, fixed list filter/order, exact list columns and form sections, absence of scoped UI/Data Policies, human-only notes boundary, and packaged Ticket 02 acceptance coverage. `npm.cmd run build` completed successfully with ServiceNow SDK 4.8.1. The user directed that Ticket 02 be recorded complete on 2026-08-02, including its Australia-instance Draft/Publish/Retire, persona visibility, Knowledge Base Manager, and moved-record acceptance boundaries. No Passed Ticket 02 Test Result ID or screenshots are stored in this repository.

## Generate one Accessible Permission Test from the Catalog Item form

**Status:** ready-for-human
**Completion:** complete

**What to build:** Connect the administrative Catalog Item form to the structured Current Specification and proven generation seam so one authorized click queues an asynchronous Generation Run and creates one Accessible Permission Test from the exact Published Design.

**Blocked by:**

- Prove the OOB ATF generation seam.
- Author and publish a v1 Catalog Test Specification.

- [x] Add a server-side **Create ATF** form action to `sc_cat_item` in Platform UI only.
- [x] Make the action visible only to `atf_test_admin` while keeping it visible regardless of whether the Catalog Item currently has an eligible Specification.
- [x] Recheck `atf_test_admin` on the server before any lookup or enqueue action.
- [x] Resolve the happy-path Current Specification from the application-owned Knowledge Base, current Catalog Item, and Published workflow state.
- [x] Require the happy-path Specification to declare `Schema Version = 1` before enqueue.
- [x] Bind the exact Specification record selected at click time rather than allowing the worker to resolve a later Current Specification.
- [x] Generate one UTC run stamp suitable for form feedback, names, descriptions, and logs.
- [x] Enqueue one scoped Application Event with the Catalog Item as record context, the exact Specification `sys_id` as `parm1`, and the run stamp as `parm2`; do not send JSON or a requester `sys_id`.
- [x] Read requester audit identity from the event creator username.
- [x] Handle the event with a System-context Script Action that delegates to the generation service and contains no artifact-assembly rules of its own.
- [x] Re-read the exact bound Specification in the worker and recheck `Schema Version = 1` without resolving Current Specification again.
- [x] Use the Specification's exact Accessible Representative Test User and the Catalog Item Under Test to create one complete Accessible Test through the proven generation seam.
- [x] Create one active Test Suite for the Generation Run and leave Suite/Test automatic execution disabled.
- [x] Return immediately to the same Catalog Item form after enqueue.
- [x] Display `ATF Generation was queued.` and the UTC run stamp with an informational Platform UI message.
- [x] Do not navigate to an ATF list, generated artifact, or System Logs, and do not add polling or completion notification.
- [x] Verify the successful path through the UI Action seam by observing role authorization, exact event payload, redirect behavior, message, and persisted Suite/Accessible Test graph.
- [x] Verify the worker runs as System without impersonating the Test Designer or Representative Test User during generation and without executing the generated Test.

**Test guide:** [Các bước và link kiểm thử Ticket 03](docs/ticket-03-test-guide.md).

**Verification:** Source inspection on 2026-08-02 verified the UI Action, event mapping, thin Script Action adapter, generation-service worker path, and packaged Ticket 03 acceptance definitions. The user directed that Ticket 03 be recorded complete on 2026-08-02, including the UI Action/event/redirect/message journey and System-context worker boundary. No Passed Ticket 03 Test Result IDs, event `sys_id`, run stamp, or screenshots are stored in this repository.

## Complete the two-outcome Permission Generation Run

**Status:** ready-for-human
**Completion:** complete

**What to build:** Extend a successful Generation Run into the complete v1 permission output: one stamped Suite containing one Accessible Test and one explicitly labeled Inaccessible expected-failure probe derived only from the bound Catalog Test Specification.

**Blocked by:** Generate one Accessible Permission Test from the Catalog Item form.

- [x] Create exactly one Inaccessible Test after completing the Accessible Test.
- [x] Use the exact Inaccessible Representative Test User from the bound Specification as the Impersonate input.
- [x] Give the Inaccessible Test exactly two ordered OOB steps: Impersonate followed by Open a Catalog Item (SP).
- [x] Use the same hardcoded OOB Portal and Page references and the same Catalog Item Under Test for both Tests.
- [x] Add each Test to the Suite only after its Test record, both steps, and all required input values exist.
- [x] Create exactly two Suite memberships for a fully successful Generation Run.
- [x] Make the Suite and both Tests active while keeping automatic execution disabled.
- [x] Use the approved Suite name containing Catalog Item, Specification number/version, and run stamp.
- [x] Use the approved Accessible Test name containing `ACCESSIBLE` and the run stamp.
- [x] Use the approved Inaccessible Test name containing `INACCESSIBLE - EXPECTED STEP FAILURE` and the run stamp.
- [x] Include required human-readable and technical provenance in Suite/Test descriptions: run stamp, Catalog Item display value and `sys_id`, bound Specification number/version and `sys_id`, requested-by username, expectation, relevant User Criteria, relevant Representative Test User, and Service Portal surface.
- [x] Treat User Criteria as provenance only; do not evaluate whether either Representative Test User satisfies it.
- [x] Do not parse Short Description or Article Body as expected behavior.
- [x] Do not inspect live variables, Variable Sets, UI Policies, Catalog Client Scripts, Script Includes, Flow/Subflow, or other implementation metadata.
- [x] Do not order, add to cart, submit, or fulfill the Catalog Item.
- [x] Add no custom assertion step, DOM inspection, denial classifier, post-processing, or result inversion.
- [x] Preserve native ATF interpretation for Accessible: successful open is Passed/expectation satisfied; failed open is Failed/expectation violated.
- [x] Preserve native ATF status for Inaccessible: failed open remains Failed/red and is manually treated as expected evidence; successful open remains Passed/green and is manually treated as unexpected access.
- [x] State in the negative Test description that Portal errors, widget errors, JavaScript errors, bad configuration, and timeouts also count as inaccessible evidence in this POC.
- [x] Verify through the generation-service seam that one valid Generation Run creates exactly one Suite, two complete Tests, four ordered steps, all required inputs, and two memberships.

**Test guide:** [Các bước và link kiểm thử Ticket 04](docs/ticket-04-test-guide.md).

**Verification:** Human acceptance completed on the Australia instance on 2026-08-02. The user confirmed that a valid Generation Run produced one active Suite, one active Accessible Test, one active Inaccessible expected-failure probe, four ordered OOB steps, all required Step Input Values, and two Suite memberships without automatic execution or result inversion. Native ATF status was preserved and the Inaccessible failure was interpreted manually as expected evidence. The run stamp, record `sys_id` values, screenshots, and Test Result ID were not provided or stored in this repository.

## Fail fast at every generation boundary

**Status:** ready-for-human
**Completion:** complete

**What to build:** Make every invalid authorization, Specification, compatibility, and OOB metadata condition stop at its agreed boundary with no ATF artifacts and with actionable human or stamped diagnostic feedback.

**Blocked by:** Complete the two-outcome Permission Generation Run.

- [x] Reject a direct unauthorized UI Action invocation before lookup or enqueue and report that `atf_test_admin` is required.
- [x] When no Published Specification exists for the current Catalog Item in the application-owned Knowledge Base, enqueue nothing, create no artifacts, and show the approved human-readable error.
- [x] When multiple Published Specifications exist, enqueue nothing, create no artifacts, report the exact count, and instruct the Test Designer to Retire all but one.
- [x] Do not select the newest record, the first record, an old Published revision, or a Draft in either cardinality failure.
- [x] When Schema Version is blank, enqueue nothing and show the Specification number and required version without exposing a `sys_id`.
- [x] When Schema Version is not `1`, enqueue nothing and show the Specification number, unsupported value, and supported value without exposing a `sys_id`.
- [x] If the exact bound Specification no longer exists when the worker runs, stop before artifact creation and write a stamped failure summary.
- [x] If the bound Specification's Schema Version is no longer `1`, stop before artifact creation without substituting another Specification.
- [x] Resolve all required OOB Step Configurations and input definitions before inserting the Suite.
- [x] Treat zero matches for every required Step Configuration or input definition as a stamped preflight failure with no artifacts.
- [x] Treat multiple matches for every required Step Configuration or input definition as an ambiguity failure with no artifacts.
- [x] Detect an unavailable Service Catalog Portal ATF plugin only through missing OOB metadata; add no separate plugin-state query, hard dependency, automatic activation, or fallback step.
- [x] Keep form messages user-facing and free of record `sys_id` values while allowing worker logs to contain technical identifiers.
- [x] Add integration coverage at the UI Action seam for authorization, zero/multiple Specification cardinality, blank/unsupported Schema Version, successful event mapping, same-form redirect, and absence of artifacts on every UI preflight failure.
- [x] Add generation-service coverage for missing bound Specification, worker compatibility failure, and zero/multiple metadata matches, asserting that no Suite, Test, step, input, or membership is created.

**Verification:** Implementation and packaged integration coverage completed on 2026-08-02. The UI Action now reports exact Published-Specification cardinality, distinct blank/unsupported Schema Version corrections, and exposes no record `sys_id` in form messages. Bound-Specification and OOB metadata failures write concise stamped preflight summaries and stop before Suite insertion. The packaged Ticket 05 test exercises the UI Action and generation-service public seams, including zero/multiple Step Configuration and input-definition matches, and asserts unchanged Suite/Test/step/input/membership counts. `npm.cmd run build` completed successfully; the packaged test still requires a Passed result on the Australia instance.

## Make independent and partial Generation Runs diagnosable

**Status:** ready-for-human
**Completion:** complete

**What to build:** Make repeated clicks and post-preflight insert failures produce the exact independent, append-only, manually diagnosable outcomes accepted for the POC without adding persistence, rollback, retry, or cleanup automation.

**Blocked by:** Complete the two-outcome Permission Generation Run.

- [x] Make every authorized valid click create a new Suite and two new Tests even when Catalog Item and Current Specification match a prior run.
- [x] Do not deduplicate, reuse, update, reconcile, or delete earlier generated artifacts.
- [x] Treat generated names as display-only traceability; allow same-second runs to have equal names while remaining distinct by `sys_id`.
- [x] Log `[ATF-GEN][<run stamp>] Generation started` at worker start.
- [x] Log each created artifact type and `sys_id` with the same run stamp.
- [x] Log a stamped completion message after the full Suite graph exists.
- [x] On post-preflight insert failure, log the current generation stage and concise error summary.
- [x] After failure, log every artifact type and `sys_id` already created under that run stamp.
- [x] Do not log a full JavaScript stack trace or dump the bound Specification fields.
- [x] Do not create a persistent Generation Run or Generation Error record.
- [x] Do not roll back, compensate, delete, retry, resume, or mark partial artifacts automatically.
- [x] If Accessible Test assembly fails, leave any partial Accessible Test outside the Suite and do not start the Inaccessible Test.
- [x] If Inaccessible Test assembly fails, preserve the completed Accessible membership and leave any partial Inaccessible Test outside the Suite.
- [x] Preserve Suite membership as evidence of complete Test assembly by inserting it only after both steps and all inputs exist.
- [x] Keep manual inspection and cleanup with `atf_test_admin`; do not add a cleanup UI Action or scheduled job.
- [x] Add integration coverage for two independent successful clicks, same-second display-name collision, Accessible assembly failure, and Inaccessible assembly failure.
- [x] Assert the exact persisted partial artifact graph and stamped log contract for each induced failure rather than testing private insert helpers.

**Verification:** Implementation and packaged integration coverage completed and re-reviewed on 2026-08-03. The package records an ordered stamped diagnostic stream for every created Suite, Test, Test Step, materialized Step Input Value, and Suite membership; induced insertion failures verify the exact retained Accessible and Inaccessible partial graphs without rollback, retry, cleanup, or persistent run/error records. The Ticket 06 integration oracle uses a structured observer on the existing package-private fault-injection seam to capture each actual insert result, then traverses only those Suite/Test/Step `sys_id` relationships and compares the persisted graph independently with returned identifiers and the stamped diagnostic ledger. It never parses generated names or descriptions as lookup keys. The prior instance-wide Suite/Test/step/input/membership snapshots were removed, and each execution lets ServiceNow allocate a fresh Specification fixture `sys_id` instead of deleting a fixed identifier. All server JavaScript syntax checks and a clean ServiceNow SDK build completed successfully, and the rebuilt package contains the bounded Ticket 06 test. The packaged Ticket 06 ATF test still requires a Passed result on the Australia instance; no manual instance verification, screenshots, generated artifact `sys_id` values, stamped log export, or Test Result ID are stored in this repository.

## Validate the complete team-demo journey on Australia

**Status:** ready-for-human
**Completion:** complete

**What to build:** Validate and demonstrate the complete trusted-Design-to-ATF journey on the Australia demo instance, including its intentional negative-result limitation and all manual instance prerequisites, without expanding the application beyond v1.

**Blocked by:**

- Fail fast at every generation boundary.
- Make independent and partial Generation Runs diagnosable.

- [x] Complete a clean SDK build of the full application.
- [ ] Install or update the application on the configured Australia demo instance using externally managed ServiceNow authentication; add no credentials or authentication files to the repository.
- [ ] Verify `com.glide.automated_testing_impl.service_catalog_portal` is active manually.
- [ ] Verify the source constants identify the actual OOB `sp` Service Portal and OOB `sc_cat_item` Page on the demo instance.
- [ ] Verify every OOB Step Configuration and required input-definition lookup returns exactly one record.
- [ ] Verify the demo Test Designer has `atf_test_admin` and is a Manager of **Catalog Test Specifications** without general Knowledge administration authority.
- [ ] Author and immediately Publish a complete v1 Catalog Test Specification with one Accessible and one Inaccessible Permission Audience and Representative Test User.
- [ ] From the Catalog Item administrative form, click **Create ATF** and observe the same-form queued message with UTC run stamp.
- [ ] Correlate the run stamp to exactly one generated active Suite and two active, non-automatic Tests.
- [ ] Inspect names, descriptions, steps, input values, creation order, and Suite memberships against the source Specification and approved provenance contract.
- [ ] Run the Accessible Test and verify that successful open produces ATF Passed and Permission Expectation Satisfaction.
- [ ] Verify that a failed Accessible open is treated as an expectation violation.
- [ ] Run the Inaccessible Test and verify that a failed OOB open remains ATF Failed/red and is manually recorded as expected POC evidence.
- [ ] Verify that a successful Inaccessible open remains ATF Passed/green and is manually recorded as unexpected access.
- [ ] Accept and clearly demonstrate that the Suite may remain Failed by design and that the POC produces no automatic `2/2 passed` result.
- [ ] Demonstrate at least one UI Action preflight failure and one worker metadata preflight failure, confirming no artifacts are created for either.
- [ ] Demonstrate a second valid click creates a fully independent Suite and Tests.
- [ ] Confirm no generated Test orders, adds to cart, submits, or fulfills the Catalog Item.
- [ ] Confirm no AI, Article Body parsing, live implementation discovery, User Criteria membership evaluation, retry, rollback, polling, notification, or deferred future capability has been introduced.
- [ ] Record any SDK or OOB metadata facts discovered during implementation in the existing technical documentation when they clarify the implementation without changing the agreed Design.

**Test guide:** [Hướng dẫn nghiệm thu Ticket 07 trên Australia](docs/ticket-07-test-guide.md).

**Verification:** Local automation completed on 2026-08-03. All 10 server JavaScript files passed syntax parsing; the ServiceNow SDK output was cleaned and `npm.cmd run build` completed successfully. Package inspection found the required application scope, production UI Action/Event/Script Action/Script Include/Knowledge metadata, six dictionary updates, all seven packaged Ticket 01–06 ATF tests, and 15 packaged ATF test steps. `now-sdk pack` emitted `target/atf_generation_0_0_1.zip`; its 65 entries include package inventory, production metadata, and the Ticket 05/06 tests. Source/package checks confirmed consistent Australia Portal/Page constants and the bounded Ticket 06 oracle. ServiceNow SDK authentication inspection returned `No credentials found`, so no install, query, plugin activation, generated Test execution, or other Australia verification was attempted. The user directed Ticket 07 to be recorded complete on 2026-08-03. Instance checklist items remain unchecked and the ticket remains `ready-for-human` because no Australia run stamps, artifact `sys_id` values, Test Result IDs, screenshots, or equivalent human-verification evidence are stored in this repository.
