# Catalog Test Specification Schema

This document defines the Logical Specification Schema used by ATF Generation. A Catalog Test Specification is the sole source of expected behavior. Neither generation version may derive a Test Expectation from Article Body, UI Policies, Catalog Client Scripts, Script Includes, other implementation source, or observed runtime behavior.

## Schema-directed generation

`schema_version` selects exactly one generation capability:

| Schema Version | Consumed Design | Generated coverage |
| --- | --- | --- |
| `1` | Permission Design | Stable permission Test Suite |
| `2` | Variable Design, Business Logic, Variable Test Data | Behavior-only Test Suite |

- Schema Version 1 remains behaviorally unchanged.
- Schema Version 2 never reads, validates, generates, updates, or deletes Permission Design or permission Tests.
- Blank and unsupported versions fail compatibility preflight; the system never guesses a version.
- There is no automatic migration from a version-1 Specification to version 2.
- The existing `Create ATF` action binds the exact Current Specification and Schema Version before queueing a background Generation Run.
- Each successful run creates an independent Test Suite; successful prior runs are not reconciled or updated.

## Current Specification lifecycle

A Test Designer may save and edit a Specification as Draft. The Test Designer explicitly publishes a completed Design. Only a Published record in the application-owned Specification Knowledge Base is eligible for ATF Generation.

A Current Specification is the single Published Specification for one Catalog Item Under Test. Generation requires exact cardinality:

- zero eligible Published records: generation stops;
- exactly one eligible Published record: generation binds that record;
- more than one eligible Published record: generation stops as ambiguous.

The worker uses the exact record bound at click time and never resolves a later Current Specification. A replacement Design is authored as a new Draft, then published through the established retire-and-replace lifecycle. Published Design is not edited in place by generation and never stores execution status.

## Physical storage

The application augments `kb_knowledge`. Because this is a shared table, physical columns use the complete application prefix `x_gemjp_atf_genera_`.

Version 2 adds no custom table and no child-record model. The Current Specification aggregate remains one Knowledge Article with three long plain-text Structured Design Sections.

### Shared identity fields

```yaml
catalog_item:
  column: x_gemjp_atf_genera_catalog_item
  reference: sc_cat_item

schema_version:
  column: x_gemjp_atf_genera_schema_version
  type: integer
  default: 1
```

### Version-1 Permission Design fields

```yaml
accessible_user_criteria:
  column: x_gemjp_atf_genera_accessible_criteria
  reference: user_criteria

accessible_representative_test_user:
  column: x_gemjp_atf_genera_accessible_user
  reference: sys_user

inaccessible_user_criteria:
  column: x_gemjp_atf_genera_inaccessible_criteria
  reference: user_criteria

inaccessible_representative_test_user:
  column: x_gemjp_atf_genera_inaccessible_user
  reference: sys_user
```

The version-1 permission generator and authoring behavior remain unchanged.

### Version-2 behavior fields

```yaml
variable_design:
  column: x_gemjp_atf_genera_variable_design
  type: long_plain_text
  target_capacity: at_least_65000_characters

business_logic:
  column: x_gemjp_atf_genera_business_logic
  type: long_plain_text
  target_capacity: at_least_65000_characters

variable_test_data:
  column: x_gemjp_atf_genera_variable_test_data
  type: long_plain_text
  target_capacity: at_least_65000_characters
```

The actual supported capacity and exact round-trip behavior must pass the Structured KB Text gate on the target release before production field assumptions are accepted.

Article Body and Short Description are human-facing only. Article Body is never parsed, interpreted by AI, or supplied to either Now Assist Skill.

## Common Design Text Table rules

Variable Design and Variable Test Data use deterministic fixed-header pipe tables.

- The exact header is the first physical line; a leading blank line is invalid.
- Every record occupies one physical line and contains exactly the declared number of cells.
- Spaces and tabs around cells are trimmed; internal whitespace is preserved.
- Blank lines after the header are ignored while retaining their physical line numbers.
- CRLF and LF are semantically equivalent.
- Markdown separator rows, comments, quoted-cell protection, and multiline cells are unsupported.
- Physical row order is meaningful where this schema declares deterministic selection or row order.
- The only Design Escape Sequences are `\|`, `\;`, `\=`, `\"`, and `\\`.
- Unsupported escape sequences and a trailing backslash are invalid.
- Quotes do not protect table delimiters; reserved characters still require escaping.

Test Designer-authored Design Keys:

- use lowercase `snake_case`;
- begin with a lowercase letter;
- contain only lowercase letters, digits, and underscores;
- contain 1 through 64 characters;
- are never generated, case-folded, renamed, or silently normalized.

## Version-2 Variable Design

The exact header is:

```text
entry_key | entry_kind | parent_key | label | control_type | semantic_type | value_domain | default | visible | mandatory | read_only | reference_table | order
```

| Column | Contract |
| --- | --- |
| `entry_key` | Unique Design Key and technical identifier used by Business Logic and Test Data |
| `entry_kind` | `variable`, `single_row_variable_set`, or `multi_row_variable_set` |
| `parent_key` | Blank for Catalog Item ownership; otherwise one Variable Set `entry_key` |
| `label` | Human-readable display and diagnostic text; never a logic identifier |
| `control_type` | Closed requester control token for variable entries |
| `semantic_type` | Closed comparison and value meaning for interactive variables |
| `value_domain` | Fixed internal-value/display-label pairs for fixed choices |
| `default` | Required typed literal, Reference form, Reference Set form, or `EMPTY` for interactive variables |
| `visible` | Required boolean baseline for interactive variables |
| `mandatory` | Required boolean baseline for interactive variables |
| `read_only` | Required boolean baseline for interactive variables |
| `reference_table` | Required direct table for Reference, List Collector, and reference-like Lookup Select |
| `order` | Required nonnegative integer for deterministic traversal, not layout testing |

Supported interactive mappings are:

| `control_type` | `semantic_type` | Additional contract |
| --- | --- | --- |
| `single_line_text` | `text` | None |
| `multi_line_text` | `text` | None |
| `integer` | `integer` | Exact base-10 integer |
| `decimal` | `decimal` | Exact decimal with at most six fractional digits |
| `checkbox` | `boolean` | `true` or `false` |
| `yes_no` | `boolean` | `true` or `false` |
| `select_box` | `choice` | Fixed Choice Value Domain required |
| `multiple_choice` | `choice` | Fixed Choice Value Domain required |
| `reference` | `reference` | `reference_table` required |
| `list_collector` | `reference_set` | `reference_table` required |
| `lookup_select` | `reference` | Reference-like stored sys_id semantics and `reference_table` required |
| `date` | `date` | Exact `YYYY-MM-DD` |
| `date_time` | `date_time` | Exact `YYYY-MM-DDTHH:mm:ssZ` |

Variable Set rows leave interactive control, semantic, value, and state cells blank while retaining label and order. Variable Sets cannot be nested, an MRVS cannot contain another MRVS, and one variable has at most one parent.

Structural variable entries such as Label, Annotation, Container, and Split may be recorded but cannot be a Behavior target, Declared Trigger, condition input, value-expression input, or Candidate owner. They do not authorize UI layout testing.

Choice domains use ordered `internal_value=Display Label` pairs separated by semicolons. Internal values are unique and are the only valid choice identifiers in Guided Business Logic. Dynamic choice addition, removal, filtering, relabeling, and reordering are outside the POC.

Tabular text and choice values are double quoted. Integers and decimals are unquoted base-10 values, booleans are lowercase `true` or `false`, explicit absence is `EMPTY`, dates are ISO dates, and Date/Time values are exact UTC instants. Relative time and locale-dependent values are unsupported.

## Version-2 Guided Business Logic

Business Logic is a sequence of non-nested Behavior Blocks. Application code recognizes only the structural anchors and physical lines; two independent Now Assist Skills interpret the English Bounded Natural Language into normalized Catalog Behavioral Contracts.

Every block has this structural shape:

```text
BEHAVIOR_ID: <design_key>
TARGET: <variable_entry_key or CATALOG_FORM>

TRIGGER:
<one English form-load or variable-change statement>

LOGIC:
<one unconditional Outcome or ordered If / Else if / Otherwise branches>

END
```

Required rules:

- `BEHAVIOR_ID` is globally unique within one Specification.
- `TARGET` names one supported interactive Variable Design `entry_key`, or `CATALOG_FORM` for a Form Message.
- Each block has exactly one Declared Trigger: form load or one variable-specific change.
- A block cannot combine load and change or name multiple change variables.
- Equivalent behavior for another trigger requires a separate block with another `BEHAVIOR_ID`.
- Every unconditional or conditional branch declares `OUTCOME_ID: <design_key>`, unique within the block.
- A conditional block has one `If`, zero or more ordered `Else if` branches, and exactly one terminal `Otherwise`.
- Nested conditional branches are invalid.
- Every branch states exactly the same target effect-property set.
- Different target blocks are never grouped or merged; `BEHAVIOR_ID` is not a cross-target grouping key.
- One Declared Trigger plus target plus effect-property combination has exactly one Behavior Effect Owner.
- One block may contain zero messages or one message type from `INFO`, `WARNING`, and `ERROR`.

Technical identifiers are mandatory:

- variables use Variable Design `entry_key` values;
- fixed choices use exact internal values;
- display labels are invalid even when they map unambiguously;
- a diagnostic may suggest the correct technical identifier, but AI and code never substitute it.

Instructions in `TRIGGER` and `LOGIC` are English-only in the POC. Exact explicitly quoted message and scalar literals may contain any Unicode language and must be preserved exactly without translation, correction, or whitespace normalization.

Supported condition meaning is closed to equality, inequality, emptiness, membership, supported ordering and ranges, supported text operations, admitted transitions, `ROW_COUNT` for MRVS, and explicit `AND`, `OR`, and parentheses. Parentheses are mandatory when `AND` and `OR` are mixed. Arbitrary JavaScript, regex, encoded queries, dot-walking, implementation calls, dynamic identifiers, and dependency expressions are invalid.

Supported target-owned Behavior Effects are:

| Effect | Accepted normalized values |
| --- | --- |
| `VALUE` | Type-valid literal or expression, `EMPTY`, `BASELINE`, or `KEEP` |
| `VISIBLE` | `true`, `false`, `BASELINE`, or `KEEP` |
| `MANDATORY` | `true`, `false`, `BASELINE`, or `KEEP` |
| `READ_ONLY` | `true`, `false`, `BASELINE`, or `KEEP` |
| `MESSAGE` | Exact text or `CLEAR`, with exact Field/Form scope and one type |

`BASELINE`, `KEEP`, `EMPTY`, and `CLEAR` have distinct meanings and may be normalized only when explicitly authored. Neither Skill nor deterministic code invents a missing terminal branch, reverse behavior, directive, effect, value, Outcome, or technical identifier.

## Runtime Business Logic Interpretation

Version 2 defines exactly two Now Assist Skills and no Now Assist Agent:

1. `Extract Catalog Behavioral Contract`.
2. `Independently Interpret Catalog Behavioral Contract`.

For each deterministically delimited Behavior Block, both Skills receive:

- the complete original Variable Design;
- the same original Business Logic block with physical-line identity;
- the supported capability catalog;
- the same normalized structured-output contract.

The independent Skill never receives the Extractor output. Variable Test Data, Article Body, implementation source, and observed runtime behavior are not Skill inputs.

Both Skills return a complete normalized Catalog Behavioral Contract with source-line evidence. Deterministic canonicalization requires exact agreement on Behavior and Outcome IDs, target, trigger, ordered branches, typed condition tree, technical identifiers, internal values, effect-property set, effect values, exact messages and literals, and source mappings. Raw JSON object-property order is irrelevant; semantic differences are blocking.

After agreement, deterministic code owns cross-Design validation, cross-block ownership and cycles, Variable Test Data selection, Coverage Assignment Search, Change Stimulus planning, Generation Plan creation, adapter selection, and atomic ATF persistence.

## Version-2 Variable Test Data

The exact header is:

```text
test_value_key | variable_key | value | data_profile_key | mrvs_row_key
```

| Column | Contract |
| --- | --- |
| `test_value_key` | Unique Candidate Test Value Design Key |
| `variable_key` | Supported value-bearing Variable Design `entry_key` |
| `value` | Type-valid scalar, `EMPTY`, `REFERENCE_BY`, or `REFERENCE_SET` |
| `data_profile_key` | Blank for independent selection; repeated nonblank key for one indivisible Data Profile |
| `mrvs_row_key` | Required only for a direct MRVS child Candidate |

Variable Test Data never contains Behavior ID, Outcome ID, expected effect, test name, ATF step, before-value, or after-value columns. It is not interpreted by AI.

A variable may have many Candidate Test Values. Rows sharing one nonblank Data Profile key form one reusable Design-known correlation and must be selected together. At most one Data Profile contributes to one Derived Behavior Test Case; independent Candidates may supplement it. Physical order determines deterministic candidate and row ordering.

`REFERENCE_BY(direct_unique_field, "value")` resolves exactly one existing record within the Variable Design `reference_table`. `REFERENCE_SET(...)` represents exact unordered List Collector membership. Raw sys_id, display-label lookup, encoded query, dot-walk, first/random selection, and implicit record creation are invalid.

MRVS child Candidates require both a Data Profile and `mrvs_row_key`. MRVS behavior is limited to complete Design-owned rows, whole-collection setup and observation, whole-collection change, and `ROW_COUNT`; MRVS is not a Behavior target.

## Test derivation and generated count

Each Behavior Block has one Declared Trigger. Version 2 derives exactly one Test per Declared Outcome in that block. Additional Candidate values reaching the same Outcome do not create additional Tests.

Deterministic Coverage Assignment Search evaluates, in order:

1. exact Business Logic literals and otherwise unchanged Baseline Variable State;
2. one whole Data Profile at a time in physical order, supplemented by independent Candidates when required;
3. the no-profile independent Candidate space in deterministic physical order.

The first satisfying assignment is selected. At most 10,000 complete assignments are evaluated per Outcome. The generator never invents a value, samples randomly, combines multiple Data Profiles, or creates a cross-contract Cartesian product.

For a variable-change Test, all non-trigger preconditions are established first and one semantically distinct before-to-after Change Stimulus is applied to the declared trigger last. For a form-load Test, the Outcome must be reachable from state effective before or during a fresh form open; post-open Candidate assignment cannot manufacture load behavior.

## Background execution and result boundary

The Schema Version 2 UI Action performs only fast authorization, exact Current Specification and Schema Version binding, required-field and structural-anchor preflight, UTC run-stamp creation, and queueing. All Runtime Business Logic Interpretation, semantic validation, Test Data selection, Generation Plan construction, and persistence occur in the bound background worker.

No ATF record is created before the complete immutable Generation Plan passes. A successful run creates one complete behavior-only Suite. Any blocking Design, AI, binding, capability, coverage, or persistence result leaves zero run-owned artifacts.

Failure reporting uses run-stamped system logs only. The POC creates no Generation Run table, Prompt table, Response table, Interpretation table, notification, Execution Tracker integration, Last Generation field, or mutable execution state on the Published Specification. Raw prompts, raw responses, duplicate Design text, and complete model conversations are not persisted.

## Version-2 POC exclusions

The schema contains no fields for:

- Permission Design within version-2 generation;
- Catalog Test Scenarios or cross-contract sequences;
- Dependency Design, Dependency Test Data, Script Include contracts, dependency fixtures, or dependency test doubles;
- UI Policy Design or Catalog Client Script Design as implementation-specific expected behavior;
- UI layout or Catalog Presentation Detail expectations;
- submission, order, request, fulfillment, or approval behavior;
- multiple triggers or multiple targets in one Behavior Block;
- dynamic choice-domain mutation;
- multiple Behavior Execution Users;
- result-tracking records or raw AI evidence.

These exclusions are not implicit future tickets. Any later capability requires a new explicit Design decision and schema revision; the version-2 Deferred Grill Backlog is not implementation scope.
