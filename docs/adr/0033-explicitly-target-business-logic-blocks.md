---
status: accepted
---

# Explicitly target Business Logic blocks

Version 2 stores multiline Business Logic in its own Structured Design Section rather than in a Variable Design table cell. Every block contains the exact anchors `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END`; the target must resolve to one supported variable-kind Variable Design Entry in the same Specification or the reserved `CATALOG_FORM` target.

Multiple independent blocks may target the same variable without duplicating its Variable Design Entry. Within a block, expected effects remain target-owned, and other variables appear only as the one change trigger, condition inputs, or value inputs. Missing, unknown, label-based, unsupported, or ambiguous targets and unterminated blocks fail Design Validation with section, Behavior, and line diagnostics.

Every block declares exactly one form-load or one variable-specific change trigger in English Bounded Natural Language. A block cannot list multiple triggers; equivalent behavior for another trigger requires a separate block with a separate `BEHAVIOR_ID`.

Each Outcome may declare one or more supported expected effects on that target, such as visibility, mandatory state, read-only state, value, or one typed message. A Derived Behavior Test Case verifies all effects declared for its Outcome together; Test Data never maps itself to that Outcome.

Across Behavior IDs, each Declared Trigger, target entry, and effect-property combination has exactly one Behavior Effect Owner. Design Validation rejects a duplicate owner without attempting to prove that the behaviors' conditions are mutually exclusive or applying an implementation-derived execution order; multi-condition ownership belongs in one ordered Branch-Complete Behavior.

This preserves ADR-0022's explicit block boundaries and one-entry-per-variable rule while superseding its former assumption that the Business Logic program lived inside each row.
