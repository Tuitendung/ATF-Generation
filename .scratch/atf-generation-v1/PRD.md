# ATF Generation v1 — Catalog Permission Test Generation

Status: ready-for-agent

## Problem Statement

Test Designers currently have to translate Catalog Item access requirements into ServiceNow Automated Test Framework artifacts by hand. The source Design may describe User Criteria, representative users, variables, client behavior, server behavior, and fulfillment, but there is no machine-readable contract that a generator can consume consistently. Manual construction is slow, repetitive, and vulnerable to differences in naming, provenance, step configuration, and Suite membership.

For the team proof of concept, the immediate need is deliberately narrower: from the administrative form of one Catalog Item, a trusted Test Designer must be able to generate one ATF Test Suite containing one Accessible Permission Test and one Inaccessible Permission Test. The Design must remain the only source of expected behavior. The first version must prove the end-to-end authoring and generation path without introducing AI interpretation, live implementation discovery, production-grade validation, configurable execution surfaces, retry infrastructure, or test capabilities beyond opening the Catalog Item in OOB Service Portal.

The OOB **Open a Catalog Item (SP)** step creates a deliberate limitation for the negative case. It has no “expected failure” option, so an inaccessible outcome remains a red ATF failure. The team accepts this result and will interpret it manually: failure satisfies the inaccessible expectation, while a green pass means the user unexpectedly opened the item.

## Solution

Create a structured, versioned Catalog Test Specification model on `kb_knowledge` inside one application-owned Knowledge Base. A dedicated module, list, and form view allow the Test Designer to author the v1 identity and Permission Design fields and deliberately publish the Specification. Free-form Article Body content remains optional human notes and is never parsed.

Add a server-side **Create ATF** UI Action to the Platform UI administrative form for `sc_cat_item`. The action is visible and executable only to `atf_test_admin`. It resolves exactly one Current Published Specification for the Catalog Item, enforces `Schema Version = 1`, binds the exact Specification, creates a UTC run stamp, and queues a scoped Application Event. It then returns to the same Catalog Item form with a human-readable queued message.

A System-context Script Action delegates to one generation service. Before inserting anything, the service resolves the OOB **Impersonate** and **Open a Catalog Item (SP)** Step Configurations and their required inputs with exact-cardinality checks. It then creates one new Test Suite and two new active, non-automatic Tests on every invocation. Both Tests impersonate their exact Representative Test User and execute the same OOB open step against hardcoded OOB Service Portal and Catalog Item Page references from the demo instance.

Generation is asynchronous, append-only, and best-effort. It has no persistent Generation Run record, rollback, retry, resume, polling, or completion notification. Stamped logs and generated names provide traceability. Partial artifacts are retained for manual inspection and cleanup by an `atf_test_admin`.

## User Stories

1. As a Test Designer, I want a **Create ATF** button on the administrative Catalog Item form, so that I can initiate generation from the item I am designing.
2. As a Test Designer, I want the button limited to Platform UI, so that the generation control is not exposed to requesters in Service Portal or Employee Center.
3. As an ATF administrator, I want only users with `atf_test_admin` to see the button, so that generation is restricted to trusted operators.
4. As an ATF administrator, I want authorization checked again on the server, so that a crafted request cannot bypass UI visibility.
5. As a Test Designer, I want a dedicated **Catalog Test Specifications** module, so that I do not have to use the general Knowledge administration experience.
6. As a Test Designer, I want the module list limited to the application-owned Specification Knowledge Base, so that unrelated Knowledge Articles are excluded.
7. As a Test Designer, I want Draft and Published Specifications visible in one list, so that I can manage active POC authoring without separate modules. The module must not add a lifecycle predicate, but the POC accepts the OOB Australia access boundary that only administrators and knowledge administrators can view Retired articles; it does not grant `knowledge_admin` or add custom ACL logic for the Test Designer.
8. As a Test Designer, I want the authoring list ordered by most recently updated, so that current work is easy to find.
9. As a Test Designer, I want the list to show Number, Short Description, Catalog Item, Workflow State, Schema Version, Updated, and Updated by, so that I can distinguish Specifications without opening each record.
10. As a Test Designer, I want a dedicated **Create New** application module to open the dedicated Platform form directly and default to the application-owned Knowledge Base, so that normal authoring starts in the correct boundary instead of the generic Knowledge Center wizard or a list UI Action.
11. As a Test Designer, I want the defaulted Knowledge Base to remain editable for the team demo, so that the POC does not add enforcement logic.
12. As a Test Designer, I want a minimal dedicated form with Identity, Permission Design, and Human Notes sections, so that the authoritative inputs are obvious.
13. As a Test Designer, I want Short Description to remain human-authored and non-authoritative, so that it can be useful without changing generated expectations.
14. As a Test Designer, I want Article Body available for optional notes, so that human context can accompany the structured Design.
15. As a Test Designer, I want Article Body ignored by generation, so that free-form prose cannot silently change Test behavior.
16. As a Test Designer, I want Schema Version to default to `1`, so that new v1 Specifications begin with the supported compatibility value.
17. As a Test Designer, I want exactly one Accessible User Criteria reference, so that the intended accessible audience is traceable.
18. As a Test Designer, I want exactly one Accessible Representative Test User reference, so that the generated positive Test has an explicit impersonation identity.
19. As a Test Designer, I want exactly one Inaccessible User Criteria reference, so that the intended inaccessible audience is traceable.
20. As a Test Designer, I want exactly one Inaccessible Representative Test User reference, so that the generated negative Test has an explicit impersonation identity.
21. As a Test Designer, I want User Criteria treated as intent rather than executable membership logic, so that the POC does not need to solve arbitrary criteria evaluation.
22. As a Test Designer, I want Representative Test Users used exactly as authored, so that generation does not guess or mutate test identities.
23. As a Test Designer, I want to save a Specification as Draft without affecting generation, so that unfinished Design remains isolated.
24. As a Test Designer, I want Publish to be an explicit action with immediate publication and no approval stage, so that Published remains an intentional but lightweight boundary.
25. As a Test Designer, I want Published Specifications treated as immutable by the POC process, so that the generation oracle is not edited in place.
26. As a Test Designer, I want to prepare a replacement as a separate Draft while the existing Published Specification remains current, so that generation can continue against the old Design until replacement.
27. As a Test Designer, I want to Retire the old Specification before publishing its replacement, so that only one Current Published Specification exists.
28. As a Test Designer, I want generation to stop during the accepted Retire-to-Publish gap, so that it never falls back to Draft.
29. As a Test Designer, I want generation to stop if two Published Specifications exist, so that it never guesses which expected Design is authoritative.
30. As a Test Designer, I want a clear message when no Published Specification exists, so that I know why generation did not start.
31. As a Test Designer, I want a clear message showing the number of conflicting Published Specifications, so that I know to Retire all but one.
32. As a Test Designer, I want blank or unsupported Schema Version reported before enqueue, so that incompatible Design cannot reach artifact creation.
33. As a Test Designer, I want UI messages to use human-readable names and Specification numbers rather than `sys_id` values, so that the form remains understandable.
34. As a Test Designer, I want the Catalog Item form to return immediately after enqueue, so that artifact creation does not block my request.
35. As a Test Designer, I want a UTC run stamp in the queued message, so that I can correlate later artifacts and logs.
36. As a Test Designer, I want to remain on the same Catalog Item form after enqueue, so that I retain the initiating context.
37. As a Test Designer, I want every click to create an independent Suite and Tests, so that the POC has no deduplication or reconciliation behavior to understand.
38. As a Test Designer, I want the worker bound to the exact Specification selected at click time, so that queue delay cannot switch the Design source.
39. As an ATF administrator, I want the worker to recheck `Schema Version = 1`, so that the asynchronous boundary has a compatibility guard.
40. As an ATF administrator, I want a missing bound Specification to stop the worker before artifact creation, so that a deleted source cannot yield untraceable output.
41. As an ATF administrator, I want all OOB Step Configurations and input definitions resolved before the first insert, so that missing metadata does not intentionally create partial output.
42. As an ATF administrator, I want zero or multiple OOB metadata matches to stop generation, so that the generator does not choose a configuration arbitrarily.
43. As an ATF administrator, I want the Service Catalog Portal ATF plugin treated as a manual prerequisite, so that the POC avoids plugin activation and dependency-management logic.
44. As an ATF administrator, I want missing plugin metadata detected by the normal metadata preflight, so that no separate plugin-state path is needed.
45. As a Test Designer, I want each Generation Run to create one clearly stamped Test Suite, so that its output can be found without a persistent run record.
46. As a Test Designer, I want the Suite description to identify the Catalog Item, bound Specification, requester, and run stamp, so that provenance is visible on the artifact.
47. As a Test Designer, I want an Accessible Test generated from the Accessible Representative Test User, so that the positive permission expectation can be executed.
48. As a Test Designer, I want the Accessible Test to contain only Impersonate and Open a Catalog Item (SP), so that v1 proves item opening without ordering behavior.
49. As a Test Designer, I want an Inaccessible Test generated from the Inaccessible Representative Test User, so that the negative permission expectation can be probed.
50. As a Test Designer, I want the Inaccessible Test to use the same OOB open step, so that v1 contains no custom assertion or result-inversion step.
51. As a Test Designer, I want the negative Test name and description to say **EXPECTED STEP FAILURE**, so that a red result is not mistaken for an unexpected POC defect.
52. As a Test Designer, I want a successful Accessible open interpreted as expectation satisfaction, so that normal ATF Passed semantics apply to the positive case.
53. As a Test Designer, I want a failed Accessible open interpreted as an expectation violation, so that unexpected lack of access remains visible.
54. As a Test Designer, I want any failed Inaccessible open interpreted manually as expectation satisfaction, so that the POC can use the OOB step without custom logic.
55. As a Test Designer, I want a passed Inaccessible open interpreted manually as an expectation violation, so that unexpected access is not hidden by the green ATF status.
56. As a Test Designer, I accept that Portal errors, widget errors, JavaScript errors, bad configuration, and timeouts also count as inaccessible evidence in v1, so that the POC does not classify failure causes.
57. As an ATF administrator, I want generated Suites and Tests active but not automatically executed, so that creation and execution remain separate actions.
58. As an ATF administrator, I want a Test added to the Suite only after both of its steps and all inputs exist, so that Suite membership represents complete assembly.
59. As an ATF administrator, I want the Accessible Test completed before the Inaccessible Test, so that partial-failure outcomes are deterministic.
60. As an ATF administrator, I want successful inserts logged with the run stamp and created `sys_id`, so that I can inspect and clean up partial artifacts.
61. As an ATF administrator, I want worker failures logged with a concise stage and summary, so that asynchronous failures are diagnosable without a persistent error model.
62. As an ATF administrator, I want full stack traces omitted from application logs, so that POC logs remain concise and stable across server-side exception shapes.
63. As an ATF administrator, I want partial artifacts retained rather than rolled back, so that the POC avoids compensating-delete logic.
64. As an ATF administrator, I want no automatic retry or resume, so that repeated generation always occurs through an explicit new click.
65. As a Test Designer, I want generated Tests not to order, add to cart, or submit the Catalog Item, so that v1 remains limited to access opening.
66. As a Test Designer, I want live variables, Variable Sets, UI Policies, Client Scripts, Script Includes, and Flows ignored, so that implementation details never become expected Design implicitly.
67. As a Test Designer, I want Now Assist and other AI tools excluded from v1 generation, so that results are deterministic and traceable to structured Design.
68. As a future capability designer, I want deferred Design questions preserved outside the v1 physical schema, so that later versions can expand the contract deliberately without pretending those sections are already resolved.
69. As a developer, I want instance-specific Portal and Page references isolated as clearly commented constants, so that the single-instance assumption is visible in source.
70. As a developer, I want no System Properties or consolidated post-install checklist for those constants, so that the implementation reflects the accepted demo shortcut.
71. As a developer, I want exact ServiceNow metadata table and field names verified from SDK definitions or the demo instance, so that implementation does not guess platform internals.
72. As a future maintainer, I want generated names and descriptions to preserve the project’s canonical vocabulary, so that code and artifacts remain consistent with the domain glossary.

## Implementation Decisions

- The ServiceNow application scope is `x_gemjp_atf_genera`.
- The feature is organized around four responsibilities: structured Specification metadata and authoring surfaces; the server-side Catalog Item UI Action; a thin Application Event/Script Action adapter; and one generation service that owns preflight and artifact assembly.
- The generation service is the primary module boundary. OOB metadata lookup, provenance construction, record insertion order, and failure-stage reporting are internal to that boundary rather than separate public services.
- The Specification Knowledge Base is application-owned and identified directly by application metadata. There is no administrator-selected Knowledge Base, title lookup, fallback Knowledge Base, or System Property.
- V1 extends `kb_knowledge` with the following physical columns:

| Concept | Physical column | Type/reference |
| --- | --- | --- |
| Catalog Item | `x_gemjp_atf_genera_catalog_item` | Reference to `sc_cat_item` |
| Schema Version | `x_gemjp_atf_genera_schema_version` | Integer, default `1` |
| Accessible User Criteria | `x_gemjp_atf_genera_accessible_criteria` | Reference to `user_criteria` |
| Accessible Representative Test User | `x_gemjp_atf_genera_accessible_user` | Reference to `sys_user` |
| Inaccessible User Criteria | `x_gemjp_atf_genera_inaccessible_criteria` | Reference to `user_criteria` |
| Inaccessible Representative Test User | `x_gemjp_atf_genera_inaccessible_user` | Reference to `sys_user` |

- The six custom fields are not dictionary-mandatory. There is no UI Policy, Data Policy, publication validator, or generator-side completeness validator. Published Design is trusted.
- User Criteria is stored for intent and traceability only. The exact Representative Test User reference is used as the Impersonate input without membership evaluation, candidate selection, user mutation, or fallback.
- The dedicated authoring form contains Specification Identity, Permission Design, and Human Notes sections. Article Body and Short Description are non-authoritative.
- The dedicated authoring surface exposes separate **Catalog Test Specifications** and **Create New** modules in the **ATF Generation** application menu. **Create New** is a `DIRECT` module that opens `kb_knowledge` with the Catalog Test Specification view and the application-owned Knowledge Base query, bypassing the generic Knowledge Center wizard without a scoped list UI Action or view-specific UI Action mapping. Knowledge lists retain their OOB **New** behavior. New Specifications default the Knowledge Base but may change it, and a record moved to another Knowledge Base is outside generator eligibility.
- One authoring list is filtered only by the application-owned Knowledge Base and adds no lifecycle predicate. A manager-only Test Designer sees the Draft and Published records permitted by OOB Knowledge access; after Retire, the old article leaves that persona's authoring list and remains inspectable by an administrator or knowledge administrator. Generator eligibility is a separate query.
- The same trusted Test Designer persona authors and publishes Design and initiates generation. The person has `atf_test_admin` and is manually added to the Managers of the application-owned Knowledge Base. No custom Specification Author role is introduced.
- Publication is explicit and immediate, with no approval. Saving a Draft never publishes it automatically.
- Published Specifications are immutable by process. Replacement uses a separate Draft article, then Retire old followed by Publish new. Knowledge Management Advanced article versioning is not a dependency.
- UI Action eligibility requires exactly one record in the application-owned Knowledge Base for the current Catalog Item with Published workflow state. Zero and multiple matches both stop without enqueue or artifacts.
- UI Action compatibility requires exactly `Schema Version = 1`. Blank and unsupported values stop before enqueue.
- The UI Action remains visible based on role even when no Specification exists; eligibility errors are reported after click.
- Successful UI Action execution creates a UTC run stamp, binds the exact Specification `sys_id`, and queues one scoped Application Event. The Catalog Item is the event record context, `parm1` is the bound Specification `sys_id`, and `parm2` is the run stamp. Requester audit identity comes from `event.sys_created_by`.
- The UI Action returns to the same Catalog Item form. It uses outcome-specific `gs.addErrorMessage()` feedback for preflight failures and `gs.addInfoMessage()` for queued success. Form messages do not expose `sys_id` values.
- The Script Action is a thin System-context adapter. It does not contain generation rules, rebuild the Test Designer session, impersonate test users, execute Tests, or modify source Design.
- The worker rereads the exact bound Specification and repeats only the Schema Version compatibility guard. It does not resolve Current Specification again or substitute a later revision.
- Before creating artifacts, the generation service resolves the OOB **Impersonate** and **Open a Catalog Item (SP)** Step Configurations by exact OOB name and resolves required input definitions within the selected configurations. Each lookup must return exactly one record.
- `com.glide.automated_testing_impl.service_catalog_portal` is a manual demo prerequisite. The application neither declares a hard dependency nor activates it. Missing OOB metadata is handled as a zero-result preflight failure.
- The execution surface is the OOB Service Portal with suffix `sp` and OOB Catalog Item page ID `sc_cat_item`. Their demo-instance `sys_id` references are source constants with adjacent replacement comments. There are no System Properties, runtime lookups, portability validation, or consolidated post-install checklist.
- Every invocation creates a new Suite and two new Tests. There is no deduplication, idempotency key, reuse, update, reconciliation, or delete-before-create.
- Generated Suite naming includes the Catalog Item display value, Specification number/version, and run stamp. Accessible and Inaccessible Test names include their expected outcome and run stamp; the negative name includes **EXPECTED STEP FAILURE**.
- Descriptions contain human-readable and technical provenance: run stamp, Catalog Item display value and `sys_id`, Specification number/version and `sys_id`, requested-by username, expected access outcome, User Criteria display value and `sys_id`, Representative Test User display value and `sys_id`, and Service Portal surface.
- Generated Suite and Tests are active. Automatic execution is disabled.
- Both Tests contain exactly two ordered steps: Impersonate, then Open a Catalog Item (SP). The feature does not order or submit the Catalog Item.
- The Inaccessible Test intentionally retains native ATF status. A failed OOB open step remains red and is interpreted manually as expected evidence. A passed OOB open step remains green and is interpreted manually as an expectation violation.
- Any negative open failure cause counts as inaccessible evidence in v1. No denial-state classification, DOM inspection, error taxonomy, post-processing, or result inversion is added.
- Artifact insertion is best-effort and append-only. After preflight, creation order is Suite; complete Accessible Test and membership; complete Inaccessible Test and membership. Membership is inserted only after both steps and all input values for that Test exist.
- Insert failure does not roll back, delete, compensate, resume, or retry. Created artifacts remain for manual cleanup.
- Logs use `[ATF-GEN][<run stamp>]` and record start, each created artifact `sys_id`, completion, or a concise failure stage and summary followed by partial artifact identifiers. Full stack traces and persistent error records are excluded.
- There is no persistent Generation Run table, status state machine, polling surface, completion notification, retry action, or automatic cleanup.
- No implementation is allowed to infer expected behavior from live Catalog implementation, Article Body, Now Assist, an LLM, or any other AI tool.
- Detailed physical schemas for Variables, Variable Sets, UI Policies, Catalog Client Scripts, Script Includes/server dependencies, Flow/Subflow, and broader Expected Outcomes remain deferred until a future capability consumes them.

## Testing Decisions

- Tests must assert externally observable ServiceNow behavior and persisted artifact graphs, not helper method calls, private query construction, or logging implementation internals.
- Use the highest practical seams. V1 has two primary seams because the asynchronous boundary is an intentional architecture decision:
  1. The server-side **Create ATF** UI Action seam, observed through authorization, Platform UI messages, redirect behavior, and the queued event contract.
  2. The generation service seam, invoked with a Catalog Item, exact bound Specification, run stamp, requester username, and available OOB metadata, then observed through all generated ATF records and logs.
- Do not create separate unit-test seams for naming helpers, provenance formatting, metadata queries, or individual record-insert helpers unless the platform prevents exercising them through the generation service seam.
- UI Action integration coverage must include:
  - authorized `atf_test_admin` visibility and successful server authorization;
  - unauthorized direct invocation rejected without enqueue;
  - no Published Specification rejected with a human-readable error;
  - two Published Specifications rejected as ambiguous;
  - one Published Specification with blank Schema Version rejected;
  - one Published Specification with unsupported Schema Version rejected;
  - one valid Published Specification queues exactly one event with correct record context, `parm1`, `parm2`, and requester audit source;
  - success returns to the same Catalog Item form and displays the run stamp;
  - preflight failure creates no Suite, Test, step, input, or membership.
- Generation service integration coverage must include:
  - missing bound Specification stops before artifacts;
  - bound Specification with a non-`1` Schema Version stops before artifacts;
  - zero Impersonate Step Config matches stop before artifacts;
  - multiple Impersonate Step Config matches stop before artifacts;
  - zero Open a Catalog Item (SP) Step Config matches stop before artifacts;
  - multiple Open a Catalog Item (SP) Step Config matches stop before artifacts;
  - zero or multiple required input-definition matches stop before artifacts;
  - a complete valid input creates exactly one new Suite and two new Tests;
  - the Accessible Test uses the exact Accessible Representative Test User;
  - the Inaccessible Test uses the exact Inaccessible Representative Test User;
  - both Tests use the same hardcoded Portal and Page references and the Catalog Item Under Test;
  - both Tests contain Impersonate followed by Open a Catalog Item (SP);
  - names and descriptions contain the required outcome labels, run stamp, and provenance;
  - Suite and Tests are active and not configured for automatic execution;
  - each Suite membership is created only after its Test is fully assembled;
  - a second invocation creates an independent Suite and two independent Tests rather than reusing the first run;
  - an insert failure during Accessible assembly leaves the Suite and any partial Test artifacts without an Accessible membership and does not start the Inaccessible Test;
  - an insert failure during Inaccessible assembly preserves the completed Accessible membership and leaves the partial Inaccessible Test outside the Suite;
  - failures log the stage, summary, and every previously created artifact identifier without a full stack trace.
- Authoring acceptance checks must verify the list-module filter, list columns/order, the dedicated **Create New** module route, dedicated form sections, Knowledge Base default, editable Knowledge Base field, Schema Version default, Draft and Published visibility, the OOB Retired access boundary, immediate Publish behavior, and Knowledge Base Manager access for the demo Test Designer without `knowledge_admin`. The **Create New** route must open the Catalog Test Specification Platform view directly rather than the generic Knowledge Center wizard.
- Instance acceptance must verify the manually required Service Catalog Portal ATF plugin and the actual demo-instance Portal/Page `sys_id` constants before running generated Tests.
- Execute the generated Accessible Test on the demo instance and verify that a successful OOB open step produces ATF Passed and satisfies the permission expectation.
- Execute the generated Inaccessible Test on the demo instance and verify both manual interpretations:
  - OOB step Failed/red is recorded as expected POC evidence;
  - OOB step Passed/green is recorded as unexpected access.
- Do not write a test that expects the Inaccessible Test to become green after a failed open. Native ATF status must remain unchanged.
- Do not assert a specific denial DOM, error category, Portal message, or failure cause for the negative case.
- There is no existing application source or test suite in the repository, so no local prior-art test files exist. Platform behavior must be verified against ServiceNow Australia documentation, SDK definitions, transformed OOB metadata, and the configured demo instance.

## Out of Scope

- Generating tests for variables or variable values.
- Generating tests for Variable Sets or Multi-Row Variable Sets.
- Validating mandatory, visible, read-only, default, choice, or reference behavior.
- Generating or analyzing UI Policy scenarios.
- Generating or analyzing Catalog Client Script scenarios.
- Generating or analyzing Script Include or other server dependency scenarios.
- Generating or analyzing Flow or Subflow behavior.
- Ordering, adding to cart, submitting, or fulfilling the Catalog Item.
- Verifying created requests, requested items, tasks, approvals, or fulfillment outputs.
- Reading expected behavior from the live Catalog Item implementation.
- Comparing Expected Design with live implementation.
- Drift Finding or reconciliation records.
- Parsing Article Body.
- Using Now Assist, LLMs, AI agents, or heuristics to interpret Design.
- Using AI to select a Representative Test User.
- Evaluating User Criteria membership.
- Creating or mutating users, roles, groups, companies, departments, or locations.
- Validating completeness or correctness before Publish or generation.
- Supporting Employee Center, customized Service Portal, customized widgets, Classic Service Catalog, or configurable Portal surfaces.
- Creating a custom ATF Portal assertion or custom fallback step.
- Inverting negative ATF results or producing an automatic “2/2 expectations satisfied” result.
- Distinguishing access denial from Portal, widget, JavaScript, configuration, or timeout failures.
- Automatic Test execution.
- Test scheduling or continuous execution.
- Persistent Generation Run, Generation Error, or queue tables.
- Progress UI, polling, completion notification, retry, resume, rollback, compensating deletion, or automatic cleanup.
- Deduplication, idempotency, artifact reuse, reconciliation, or update-in-place generation.
- Knowledge Management Advanced article templates or article versioning.
- Custom tables extending Knowledge.
- Production approval workflows or separation of Specification Author and Test Designer personas.
- Hard application dependency or automatic activation of the Service Catalog Portal ATF plugin.
- System Properties or administrator-configurable Portal/Page references.
- Multi-instance portability guarantees.
- A consolidated post-install checklist.
- Implementation tickets; this PRD publication does not decompose the work into tickets.

## Further Notes

- The source Design is intentionally trusted. A Published Specification with missing or incorrect structured fields is outside the POC contract; resulting generation failure or incorrect Tests do not trigger validation or repair logic.
- `Permission Expectation Satisfaction` is deliberately different from native ATF Passed status. This distinction is most visible in the Inaccessible Test and must remain explicit in names, descriptions, documentation, and demo narration.
- The negative Test is a probe, not a true automated negative assertion. The team accepts that unrelated technical failure can satisfy the inaccessible expectation manually.
- The exact OOB ATF tables, fields, Step Configuration qualifiers, and input-definition identifiers are implementation facts, not open product decisions. Verify them from SDK types, transformed metadata, official documentation, or the demo instance before writing insertion logic.
- The actual OOB Service Portal and Catalog Item Page `sys_id` values and the actual demo Test Designer user are instance facts to populate during implementation/deployment. Do not invent them.
- Relevant official ServiceNow references include the Service Catalog in Service Portal ATF step category, client error behavior, ATF roles, Knowledge article publication, and Knowledge article versioning documentation for the Australia release.
- The repository domain glossary and ADRs are authoritative context for terminology and architectural trade-offs. If implementation discovery contradicts an ADR, surface the conflict instead of silently changing behavior.

### Definition of Done

- The application-owned Knowledge Base, v1 fields, list module, direct **Create New** module, list, and form view exist and match the authoring contract without a scoped list UI Action.
- The demo Test Designer can author and immediately Publish a Specification and is a Manager of the dedicated Knowledge Base.
- The Catalog Item form exposes a role-protected server-side **Create ATF** action.
- Every UI Action preflight outcome produces the specified human-readable behavior and never creates artifacts on failure.
- A valid click queues one correctly bound asynchronous Generation Run and returns to the same form with a UTC run stamp.
- Metadata preflight prevents artifact creation when OOB Step Configurations or inputs are missing or ambiguous.
- A successful worker invocation creates one independent Suite, two complete Tests, their ordered steps and inputs, and two Suite memberships with required names, descriptions, activity flags, and provenance.
- Generated Tests are not executed automatically.
- Partial insert failures produce deterministic retained artifacts and stamped diagnostic logs without rollback or retry.
- The Accessible and Inaccessible Tests execute on the demo instance with the agreed native ATF statuses and manual interpretations.
- Build succeeds with the repository's ServiceNow SDK configuration.
- No deferred capability or explicitly excluded infrastructure is introduced.

## Comments
