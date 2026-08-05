---
status: accepted
---

# Use the OOB open step as an expected-failure probe

Both version-1 permission Tests will impersonate their exact Representative Test User and then execute the out-of-box **Open a Catalog Item (SP)** step against the Catalog Item Under Test. The accessible expectation is satisfied when that step succeeds. The inaccessible expectation is satisfied only by the team's manual interpretation when that step fails; ServiceNow still records the Test as **Failed**, may show the Test Suite as failed, and performs no automatic result inversion.

The POC deliberately adds no custom assertion step, DOM inspection, denied-or-unavailable-state validation, post-processing, or alternative result field. An inaccessible Test whose OOB step passes violates its permission expectation even though ATF displays **Passed**; a failed OOB step satisfies the expectation regardless of whether the cause was access denial, a Portal or widget failure, JavaScript error, bad configuration, or timeout. Generated names and descriptions must therefore label the inaccessible Test as **EXPECTED STEP FAILURE**, and a person must interpret its result.

Service Portal remains the Catalog Access Surface, using the out-of-box `sp` Portal and `sc_cat_item` page. This decision supersedes ADR-0006's reusable custom portal-render assertion, denied-state evidence, and fail-closed treatment of technical errors; those stronger semantics are intentionally traded away for the smallest OOB-only team demo.

The generator will hardcode the `sys_id` references of the out-of-box Service Portal and `sc_cat_item` Page from the single demo instance. It will not resolve them by URL suffix or Page ID, store them in System Properties, or validate their portability. Moving the application to another instance requires manually replacing these constants; stale or incorrect values are accepted as an instance-bound POC risk.

The out-of-box **Impersonate** and **Open a Catalog Item (SP)** Test Step Configurations will not be hardcoded or cloned. At runtime, the generator will resolve each configuration by its exact OOB name and resolve the required input definitions within that configuration before writing the generated step values. This deliberately combines instance-bound Portal/Page constants with name-based ATF metadata discovery: it adds lookup and ambiguity handling while avoiding duplicated OOB steps and hardcoded ATF-definition identities.

The worker will complete this ATF metadata resolution as a preflight before inserting any Test Suite, Test, step, or suite membership. Every Step Configuration and required input-definition lookup must return exactly one record; zero or multiple matches stop the Generation Run, log the cardinality error under its run stamp, and create no ATF artifacts. This also detects an unavailable Service Portal ATF plugin through its missing OOB metadata without a separate plugin-state check. Unexpected insert failures after a successful preflight remain subject to the accepted best-effort partial-artifact policy.

For the single-instance POC, `com.glide.automated_testing_impl.service_catalog_portal` is a manually verified demo prerequisite rather than a declared hard application dependency. The application will not activate the plugin, add dependency metadata, or provide a custom fallback step. If the prerequisite is absent, the same zero-result metadata preflight stops generation before artifacts are created; manual team preparation, rather than package installation, owns the activation check.

The POC will not create a consolidated post-install checklist or move instance-bound values into System Properties. The hardcoded Service Portal and Catalog Item Page `sys_id` constants will have adjacent source comments telling a developer to replace them for another instance. Knowledge-manager and plugin prerequisites remain recorded in these design ADRs, but the team accepts that demo preparation is not collected into a separate operational document.
