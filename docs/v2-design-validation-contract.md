# Version 2 Design Validation Contract

This document defines the closed validation, interpretation-result, and diagnostic contract for the version-2 POC. The current version-2 PRD is authoritative when this document and an older decision conflict.

## Zero-artifact rule

The background worker creates no ATF artifact until every Business Logic block has achieved Canonical Interpretation Agreement, all deterministic Design Validation has succeeded, every required Execution Binding and adapter has resolved, every Declared Outcome has a satisfying finite assignment, and one complete immutable Generation Plan exists.

Version 2 validates only Schema Version 2 identity, Variable Design, Business Logic, Variable Test Data, and required behavior Execution Bindings. Permission Design belongs to the stable Schema Version 1 generator and is neither read nor validated by version 2.

## Run-level results

The three blocking pre-persistence results have distinct meanings:

| Result | Meaning | Retry | Artifact result |
| --- | --- | --- | --- |
| `DESIGN_INVALID` | Source Design or an agreed normalized contract is malformed, ambiguous, unsupported, inconsistent, unreachable, or uncovered | The Test Designer must publish corrected Design and start another run | Zero artifacts |
| `AI_INTERPRETATION_INCONSISTENT` | Extractor and independent Verifier both returned schema-valid contracts but differ after deterministic canonicalization | No semantic retry | Zero artifacts |
| `AI_INTERPRETATION_TECHNICAL_FAILURE` | One AI phase failed technically on the first attempt and on one identical retry | At most two identical attempts in the run | Zero artifacts |

`AI_INTERPRETATION_INCONSISTENT` and `AI_INTERPRETATION_TECHNICAL_FAILURE` are not Design Diagnostics and must not be relabeled as `DESIGN_INVALID`.

A persistence failure occurs only after a complete Generation Plan exists. It must use the proven transaction or exact run-owned compensating cleanup seam and leave zero incomplete artifacts; its operational failure evidence is correlated by run stamp.

## UI Action preflight

The UI Action performs only fast deterministic checks before queueing:

1. authorize `atf_test_admin`;
2. resolve exactly one Published Current Specification;
3. bind Catalog Item, Specification identity, and Schema Version;
4. require the three version-2 fields;
5. verify that Business Logic can be structurally split by the required anchors;
6. create a UTC run stamp and queue the version-2 worker.

The UI Action does not call either Now Assist Skill, interpret Business Logic semantics, parse complete tables, select Test Data, build a Generation Plan, or create ATF records.

## Background validation phases

Later phases do not consume an invalid intermediate result. Every safely discoverable Design Diagnostic may be collected, but no phase attempts to repair source text.

1. Recheck the exact bound Specification, Catalog Item, publication identity, and Schema Version.
2. Parse Variable Design and Variable Test Data deterministically while retaining physical lines.
3. Split Business Logic deterministically by `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END`; validate anchor order, block boundaries, keys, target tokens, and Outcome markers without interpreting conditions or effects.
4. For each structurally valid block, call `Extract Catalog Behavioral Contract` and `Independently Interpret Catalog Behavioral Contract` with the same original allowed inputs.
5. Enforce the structured-output schema for each response. A response-schema, malformed-response, or truncated-response failure is technical and follows the one-identical-retry rule.
6. Canonicalize both contracts and require exact Canonical Interpretation Agreement. A semantic difference ends the run without retry.
7. Merge all agreed contracts and validate technical identifiers, types, fixed domains, conditions, expressions, branches, effects, targets, trigger cardinality, ownership, MRVS boundaries, and the Value-Change Graph.
8. Resolve the Behavior Execution User, references, control mappings, and other admitted Execution Bindings.
9. Perform bounded Coverage Assignment Search for every Declared Outcome of every single-trigger block and plan a real Change Stimulus where applicable.
10. Produce one complete immutable Generation Plan only when no blocking result exists.

## AI input and independence validation

Each Skill receives only:

- complete original Variable Design;
- one original complete Business Logic block with physical-line identity;
- the supported capability catalog;
- the normalized output-schema contract.

The Verifier never receives the Extractor output. Neither Skill receives Variable Test Data, Article Body, UI Policies, Catalog Client Scripts, Script Includes, other implementation source, observed runtime behavior, or a prior model conversation.

An input breach blocks the run and the Runtime AI Feasibility Gate. It is not repaired by removing source after a call has occurred.

## Canonical agreement contract

Deterministic canonicalization ignores irrelevant JSON object-property order but preserves every Design-semantic order and typed shape. Extractor and Verifier must agree on at least:

- `BEHAVIOR_ID`;
- target;
- trigger kind and change variable;
- ordered Outcomes;
- `OUTCOME_ID` values;
- canonical typed condition trees;
- technical variable keys and fixed-choice internal values;
- complete effect-property set per Outcome;
- typed effect values and explicit directives;
- Field or Form Message scope, type, exact text, and clear semantics;
- quoted literal content;
- Business Logic Physical Line mapping for triggers, conditions, Outcomes, and effects.

The application does not prove differently shaped conditions equivalent, choose one response, apply confidence thresholds, ask a third pass, or retry semantic disagreement.

## Technical retry contract

A technical AI failure includes timeout, transport failure, service unavailability, rate limit, malformed or truncated response, and structured-output-schema failure.

Each Extractor or Verifier call receives exactly one retry, for at most two attempts. The retry uses the same:

- runtime model deployment and version available for that Skill;
- prompt version;
- original Variable Design and Business Logic block;
- capability catalog;
- output schema;
- generation settings.

There is no alternate model, prompt repair, reduced input, fallback parser, or extra retry. Model metadata is evidence only when exposed; missing metadata does not block a run. Cross-run equality is not validated.

## Design Diagnostic shape

Every Design Diagnostic contains:

```text
severity | code | section | physical_line | relevant_key | message
```

- `severity` is exactly `ERROR` or `INFO`; there is no Design Diagnostic severity named `WARNING`.
- `code` is one of the stable meanings below.
- `section` names the affected Structured Design Section or deterministic validation phase.
- `physical_line` is the retained 1-based source line, or `0` when no physical line exists.
- `relevant_key` is the closest entry, Behavior, Outcome, Candidate, Data Profile, or MRVS Test Row key when safely available.
- `message` gives a corrective explanation for the Test Designer and does not expose raw sys_id or raw AI content.

At least one `ERROR` produces `DESIGN_INVALID` and zero ATF artifacts. `INFO` never compensates for an `ERROR`.

## Stable `ERROR` codes

### Specification and Design Text Tables

| Code | Meaning |
| --- | --- |
| `SCHEMA_VERSION_UNSUPPORTED` | Schema Version is blank or not exactly `2` for the version-2 worker. |
| `SECTION_MISSING` | A required version-2 Structured Design field is absent or blank. |
| `SECTION_LEADING_BLANK` | A Design Text Table has a blank line before its header. |
| `HEADER_MISMATCH` | A table header is missing, renamed, reordered, or otherwise not exact. |
| `COLUMN_COUNT_INVALID` | A table row has the wrong number of cells. |
| `INVALID_ESCAPE` | An unsupported or trailing backslash escape exists. |
| `REQUIRED_CELL_BLANK` | An applicable required cell is blank. |
| `INAPPLICABLE_CELL_POPULATED` | A cell is populated for an entry or type to which it cannot apply. |
| `DESIGN_KEY_INVALID` | A Test Designer-authored key violates the lowercase 1-to-64-character grammar. |
| `DESIGN_KEY_DUPLICATE` | A key repeats within a scope that requires uniqueness. |

### Variable Design

| Code | Meaning |
| --- | --- |
| `ENTRY_KIND_INVALID` | `entry_kind` is outside the closed version-2 set. |
| `CONTROL_TYPE_UNSUPPORTED` | `control_type` is unknown or outside the POC boundary. |
| `SEMANTIC_TYPE_UNSUPPORTED` | `semantic_type` is unknown or outside the POC boundary. |
| `CONTROL_SEMANTIC_MISMATCH` | Control and semantic types are not an accepted mapping. |
| `PARENT_UNKNOWN` | A populated `parent_key` does not resolve. |
| `PARENT_KIND_INVALID` | The resolved parent is not an eligible Variable Set. |
| `VARIABLE_SET_NESTING_FORBIDDEN` | A Variable Set is nested. |
| `MRVS_NESTING_FORBIDDEN` | An MRVS contains or is contained by another MRVS. |
| `STRUCTURAL_PROPERTY_INVALID` | A Structural Variable Entry declares a testable property or use. |
| `BASELINE_REQUIRED` | A supported interactive variable omits an explicit baseline value or state. |
| `BASELINE_TYPE_MISMATCH` | A baseline is invalid for the declared Semantic Value Type. |
| `CHOICE_DOMAIN_INVALID` | A Choice Value Domain is missing, malformed, or inapplicable. |
| `CHOICE_VALUE_DUPLICATE` | A Choice Value Domain repeats an internal value. |
| `CHOICE_VALUE_UNKNOWN` | A baseline, Candidate, condition, or effect uses an undeclared internal value. |
| `REFERENCE_TABLE_REQUIRED` | A reference-like variable has no direct `reference_table`. |
| `REFERENCE_TABLE_FORBIDDEN` | A non-reference variable declares `reference_table`. |
| `ORDER_INVALID` | `order` is not a nonnegative integer. |

### Guided Business Logic structure and language

| Code | Meaning |
| --- | --- |
| `BUSINESS_CONTENT_OUTSIDE_BLOCK` | Nonblank content appears outside a Behavior Block. |
| `BEHAVIOR_ANCHOR_INVALID` | A required anchor is missing, duplicated, malformed, or out of order. |
| `BEHAVIOR_ID_DUPLICATE` | A `BEHAVIOR_ID` repeats within the Specification. |
| `BEHAVIOR_UNTERMINATED` | A block has no closing `END`. |
| `BEHAVIOR_NESTED` | A new block begins before the current block ends. |
| `TARGET_UNKNOWN` | `TARGET` does not resolve to a Design target. |
| `TARGET_UNSUPPORTED` | A Variable Set, MRVS, Structural Entry, or unsupported control is targeted. |
| `TRIGGER_INVALID` | `TRIGGER` does not normalize to exactly one supported load or change event. |
| `TRIGGER_MULTIPLE` | One block names more than one trigger or combines load and change. |
| `TRIGGER_UNKNOWN` | A change-trigger technical key does not resolve. |
| `TRIGGER_UNSUPPORTED` | An excluded entry is used as the trigger. |
| `OUTCOME_ID_INVALID` | A branch lacks one valid Test Designer-authored `OUTCOME_ID`. |
| `OUTCOME_ID_DUPLICATE` | An `OUTCOME_ID` repeats inside one block. |
| `BRANCH_ORDER_INVALID` | `If`, `Else if`, and `Otherwise` do not follow the accepted order. |
| `TERMINAL_OTHERWISE_MISSING` | A conditional block lacks exactly one terminal `Otherwise`. |
| `BRANCH_NESTING_FORBIDDEN` | A branch contains a nested conditional structure. |
| `INSTRUCTION_LANGUAGE_UNSUPPORTED` | Non-English or code-switched instruction text appears outside an exact quoted literal. |
| `TECHNICAL_IDENTIFIER_REQUIRED` | A display label is used where an `entry_key` or choice internal value is required. |
| `CONDITION_INVALID` | A condition is ambiguous, malformed, or outside the closed meaning catalog. |
| `CONDITION_REFERENCE_UNKNOWN` | A condition or value expression names an unknown Design key. |
| `CONDITION_TYPE_MISMATCH` | An operator is invalid for its operand types. |
| `BOOLEAN_PARENTHESES_REQUIRED` | `AND` and `OR` are mixed without explicit parentheses. |
| `EFFECT_INVALID` | An expected effect is ambiguous, malformed, incomplete, or unsupported. |
| `EFFECT_PROPERTY_UNSUPPORTED` | The effect property is outside the five-effect POC boundary. |
| `EFFECT_TARGET_UNSUPPORTED` | The effect is not valid for the declared target. |
| `EFFECT_VALUE_INVALID` | The effect uses an invalid literal or directive. |
| `EFFECT_VALUE_TYPE_MISMATCH` | A normalized value cannot produce the target property's type. |
| `EFFECT_DUPLICATE` | One Outcome repeats the same target effect property. |
| `EFFECT_SET_ASYMMETRIC` | Conditional Outcomes do not declare the same effect-property set. |
| `MESSAGE_TYPE_INVALID` | Message type is not `INFO`, `WARNING`, or `ERROR`. |
| `BEHAVIOR_MESSAGE_TYPE_MULTIPLE` | One block declares more than one message type. |
| `EFFECT_OWNER_DUPLICATE` | Multiple Behavior IDs own one trigger-target-property combination. |
| `QUOTED_LITERAL_CHANGED` | A normalized exact quoted literal differs from the source literal. |
| `NUMERIC_LITERAL_INVALID` | A number violates the Exact Design Number contract. |
| `NUMERIC_DIVISION_REQUIRES_ROUND` | Division or scale reduction lacks explicit supported rounding. |
| `NUMERIC_RESULT_OUT_OF_RANGE` | An evaluated number exceeds the POC precision boundary. |
| `FEATURE_DEPENDENCY_UNSUPPORTED` | Dependency semantics appear inside the Dependency-Free POC. |
| `FEATURE_SCENARIO_UNSUPPORTED` | Scenario or cross-contract sequence semantics are supplied. |
| `FEATURE_MRVS_BEHAVIOR_UNSUPPORTED` | Business Logic targets or mutates MRVS rows or uses an excluded operation. |
| `FEATURE_PRESENTATION_UNSUPPORTED` | Design attempts to test a Catalog Presentation Detail. |
| `VALUE_CHANGE_CYCLE` | The Value-Change Graph contains a self-edge or directed cycle. |

`QUOTED_LITERAL_CHANGED` is a deterministic defense after agreement. A malformed, truncated, or schema-invalid model response remains a technical failure rather than this Design error.

### Variable Test Data and Execution Bindings

| Code | Meaning |
| --- | --- |
| `TEST_VARIABLE_UNKNOWN` | `variable_key` does not resolve to Variable Design. |
| `TEST_VARIABLE_UNSUPPORTED` | A Candidate belongs to a Variable Set, Structural Entry, or unsupported control. |
| `TEST_VALUE_MISSING` | A Candidate row has no explicit value or binding. |
| `TEST_VALUE_TYPE_MISMATCH` | A Candidate is invalid for its Semantic Value Type. |
| `TEST_VALUE_DOMAIN_MISMATCH` | A Candidate is outside a fixed declared value domain. |
| `DATA_PROFILE_ASSIGNMENT_CONFLICT` | One Data Profile assigns incompatible values to one scalar variable. |
| `MRVS_PROFILE_REQUIRED` | An MRVS child Candidate has no Data Profile. |
| `MRVS_ROW_KEY_REQUIRED` | An MRVS child Candidate has no `mrvs_row_key`. |
| `MRVS_ROW_KEY_FORBIDDEN` | A non-MRVS Candidate declares `mrvs_row_key`. |
| `MRVS_ROW_DUPLICATE_CELL` | One MRVS Test Row assigns the same child variable more than once. |
| `MRVS_PARENT_MISMATCH` | One MRVS row identity contains children from different MRVS parents. |
| `REFERENCE_EXPRESSION_INVALID` | `REFERENCE_BY` or `REFERENCE_SET` is malformed or incompatible. |
| `REFERENCE_TABLE_MISMATCH` | A Reference binding conflicts with Variable Design. |
| `REFERENCE_LOOKUP_FIELD_INVALID` | A lookup field is absent, indirect, or not uniquely identifying. |
| `REFERENCE_RECORD_NOT_FOUND` | A Reference binding resolves no record. |
| `REFERENCE_RECORD_AMBIGUOUS` | A Reference binding resolves more than one record. |
| `REFERENCE_SET_DUPLICATE_MEMBER` | A Reference Set repeats a member. |
| `BEHAVIOR_EXECUTION_USER_INVALID` | The configured Behavior Execution User is missing, inactive, ambiguous, or unresolved. |

### Coverage and capability

| Code | Meaning |
| --- | --- |
| `OUTCOME_LOGICALLY_UNREACHABLE` | Ordered conditions or a closed domain prove an Outcome unreachable. |
| `ON_LOAD_OUTCOME_UNREACHABLE` | An `ON LOAD` Outcome cannot exist before or during form opening in the POC Load Context. |
| `CHANGE_TRANSITION_UNAVAILABLE` | No distinct before and after values can create the declared Change Stimulus. |
| `OUTCOME_NOT_COVERED` | No allowed finite assignment satisfies one Declared Outcome. |
| `COVERAGE_SEARCH_LIMIT_EXCEEDED` | More than 10,000 complete assignments are required for one Outcome. |
| `EXTERNAL_RESULT_NOT_CONTROLLED` | Identical admitted inputs may yield different external results inside the Dependency-Free boundary. |
| `ATF_MAPPING_UNSUPPORTED` | No proven adapter exists for a declared control, stimulus, effect, or assertion. |

## Stable `INFO` codes

| Code | Meaning |
| --- | --- |
| `AI_INTERPRETATION_AGREED` | Records non-raw hashes, attempts, schema and prompt versions, and agreement for one block. |
| `COVERAGE_ASSIGNMENT_SELECTED` | Records the selected literals, Data Profile, and Candidate keys for one Outcome. |
| `CANDIDATE_NOT_SELECTED` | Identifies a valid Candidate unused by every selected assignment; it creates no extra Test. |
| `GENERATION_PLAN_READY` | Records the complete behavior-only Suite and Test count before persistence. |

## No silent downgrade or repair

Unknown, malformed, ambiguous, unsupported, label-based, uncovered, unbound, or over-limit Design is never converted to `INFO`. Neither Skill nor deterministic code inserts an `Otherwise`, chooses a technical identifier, changes a quoted literal, creates Test Data, combines Data Profiles, inspects implementation source, or omits an unsupported block. A later diagnostic may be omitted only when an earlier failure makes it unsafe or meaningless to compute.
