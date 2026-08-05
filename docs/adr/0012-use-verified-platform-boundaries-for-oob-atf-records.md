---
status: accepted
---

# Use verified platform boundaries for OOB ATF records

Ticket 01 retains one server-side generation-service seam. Its public operation accepts explicit Catalog Item, Representative Test User, Portal, and Page references and synchronously creates one minimal, manually executable Accessible Test graph. Naming, metadata resolution, validation, input assignment, and record insertion remain private implementation details inside that operation.

The demo instance's OOB Application Access rules permit scoped creation of `sys_atf_test` and `sys_atf_step`, but reject scoped creation of `sys_atf_test_suite`, `sys_variable_value`, and `sys_atf_test_suite_test`. The service therefore inserts the Test and Steps with scoped `GlideRecord`, and inserts the protected Suite and Suite membership through the active Global Core **Create Record** action (`global.create_record`) using a foreground `sn_fd.FlowAPI` runner. The action's `values` input uses the SDK-verified TemplateValue encoding (`field=value^field=value`, with literal carets escaped as `^^`). The application does not modify OOB Application Access or create cross-scope privileges.

Step inputs are assigned through the Step record's OOB GlideVar interface before `sys_atf_step.insert()`, following the verified implementation in `global.AddTestTemplateAjax`: `step.inputs[element] = value`. The platform then materializes the protected `sys_variable_value` records. The service does not write that table directly and does not call the Global-only `getVariablesRecord()` helper from scoped code.

The service resolves exactly one active **Impersonate** and one active **Open a Catalog Item (SP)** Step Configuration by exact name. Within their owning configurations it resolves exactly one active, mandatory input definition for User, Portal, Page, and Catalog Item, qualifying `sys_class_name=atf_input_variable` and validating the real reference target. These lookups finish before any ATF artifact is inserted. The Service Portal ATF plugin remains a manually verified instance prerequisite and is neither activated nor declared as an application dependency.

The OOB Service Portal (`81b75d3147032100ba13a5554ee4902b`) and `sc_cat_item` Page (`9f12251147132100ba13a5554ee490f4`) are instance-bound constants in executable integration coverage, as required by ADR-0010. They must be manually replaced when the test targets another instance.

`sn_atf.UserTestProcessor.copyTestSuite()` is not used. Its verified UI implementation starts an asynchronous hierarchical progress worker and returns a progress-worker identifier, which would require polling outside Ticket 01. The generation service creates no `sys_atf_schedule` or `sys_atf_schedule_run` record and invokes no ATF executor. Suite membership is inserted last, only after the Test, both ordered Steps, and their required inputs exist.
