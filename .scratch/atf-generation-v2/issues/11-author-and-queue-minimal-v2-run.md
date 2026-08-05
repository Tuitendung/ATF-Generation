# Author and queue a minimal Schema Version 2 run

Status: ready-for-agent
Type: task
Blocked by: 01, 02

## What to build

Deliver the first production version-2 authoring-to-background boundary without invoking production AI. A Test Designer can author the three Structured Design Sections, publish a Schema Version 2 Current Specification, click the existing `Create ATF` action, and receive a run stamp for an exactly bound queued worker. Schema Version 1 remains unchanged.

## Acceptance criteria

- [ ] Add Variable Design, Business Logic, and Variable Test Data as the proven long plain-text fields on `kb_knowledge`.
- [ ] Add no custom table or child-record model.
- [ ] Provide a behavior-focused form view containing Specification Identity, the three Structured Design Sections, and Human Notes.
- [ ] Keep Article Body optional and unparsed.
- [ ] Omit Permission Design from the v2 view without deleting or changing v1 fields or views.
- [ ] Preserve the established Draft, Published Current Specification, and replacement lifecycle.
- [ ] Route Schema Version 1 to the exact existing permission path with unchanged events, messages, artifacts, logs, and partial-failure behavior.
- [ ] Route Schema Version 2 to a separately named background behavior worker.
- [ ] Keep the existing `atf_test_admin` authorization boundary.
- [ ] Bind the exact Catalog Item, Current Specification, Schema Version, and UTC run stamp before queueing.
- [ ] Perform only required-field and structural-anchor preflight in the UI request.
- [ ] Reject blank, unsupported, missing, multiple, or structurally unqueueable Specifications without guessing.
- [ ] Recheck the bound identity in the worker without resolving a newer Current Specification.
- [ ] Return the run stamp and same-form queued feedback.
- [ ] Until Ticket 13 provides AI generation, terminate the v2 worker explicitly with zero ATF artifacts rather than falling back to v1 or a DSL.
- [ ] Prove no production Now Assist Skill or Agent is invoked by this ticket.
- [ ] Add routing, authoring, worker-binding, zero-artifact, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Out of scope

- Runtime Business Logic Interpretation.
- Semantic Design Validation and Test Data selection.
- Behavior artifact persistence.

## Comments

