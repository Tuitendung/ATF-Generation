---
status: superseded by ADR-0010
---

# Verify catalog access in Service Portal

The **Create ATF** action remains on the administrative Catalog Item form in Platform UI, but the generated permission tests will evaluate whether each Representative Test User can open the Catalog Item Under Test in Service Portal. The team selected this surface because it represents the intended requester experience, accepting the additional dependency on Service Portal pages and widgets instead of testing through the classic Service Catalog UI or Employee Center.

Both permission tests will use a reusable portal-render assertion rather than a server-side User Criteria or catalog-eligibility check. The accessible case passes only when the current Catalog Item is rendered; the inaccessible case passes only when the current item is not rendered and a denied-or-unavailable state is rendered. This preserves the user-visible meaning of “can open” while avoiding the unsupported assumption that an expected failure of the standard **Open a Catalog Item** step can be inverted into a passing negative assertion.

After impersonation, each permission Test will use one combined **Assert Catalog Item Access in Service Portal** step. That reusable step owns direct navigation to the configured Catalog Item route, waits for an out-of-box render outcome, and compares the observed outcome with its `expected_access` input. Using the same combined step for both outcomes keeps generated metadata small and preserves semantic symmetry; it deliberately accepts two responsibilities inside one custom step. Because the official custom-UI guidance normally assumes navigation has already occurred and the out-of-box **Open a Catalog Item (SP)** step cannot express the inaccessible expectation, reliable client-step navigation and waiting remain a prototype gate: implementation must prove this mechanism before the combined-step design is treated as feasible.

The team demo will use one Service Portal Execution Profile shared by every generated test. It supplies the Portal URL suffix and Catalog Item page identifier once at application level instead of repeating them in every Catalog Test Specification or inferring a Portal from live Catalog configuration. The profile chooses where tests execute; it does not provide expected behavior and therefore does not weaken the rule that the Current Specification is the sole test oracle.

Version 1 supports only the out-of-box Service Portal rendering contract, using the `sp` URL suffix, the `sc_cat_item` page, and the standard Catalog Item widget and unavailable state. Customized portals, customized Catalog Item widgets, configurable DOM selectors, and heuristic page interpretation are outside the demo scope. A future portal variant must add an explicit rendering adapter rather than changing the meaning of the v1 assertion.
