# ATF Generation v2 POC — Runtime-AI Design-Derived Catalog Behavior Tests

Status: ready-for-agent

## Problem Statement

ATF Generation version 1 is a stable baseline that creates Catalog permission coverage. It does not turn the requester-facing behavioral Design of a Catalog Item into Automated Test Framework coverage. A Test Designer must currently translate relationships among variables, Variable Sets, conditions, test values, and observable form states into ATF Tests manually. That translation is slow, difficult to maintain, and especially error-prone when the behavior of one variable depends on values entered in other variables.

The organization needs a version-2 POC in which the Test Designer describes expected Catalog Form Behavior in the application-owned Specification Knowledge Base, clicks `Create ATF`, and receives a behavior-only ATF Test Suite derived from that Design. The authoring format must remain simple enough for a Test Designer who understands the Catalog's business rules but should not require the Test Designer to write ATF steps, map data to individual tests, or learn a rigid programming-like DSL.

The Current Specification must remain the sole source of expected behavior. Catalog UI Policies, Catalog Client Scripts, Script Includes called by Client Scripts, other implementation source, and observed runtime behavior may implement the Design, but none of them may teach the generator what result is expected. Different implementation mechanisms that satisfy the same Design must produce the same expected assertions.

The main feasibility question is whether Now Assist can interpret a constrained, English Guided Business Logic Template accurately enough during a Generation Run to create normalized Catalog Behavioral Contracts. Runtime model output cannot be trusted directly: two independent interpretations must agree canonically, and deterministic application code must validate, derive, and persist the complete test plan. A mandatory Runtime AI Feasibility Gate must prove this architecture on the target ServiceNow release before AI-dependent production work begins.

The POC must not change version-1 behavior, create custom tables, generate permission Tests, parse implementation source, submit the Catalog Item, infer missing business data, silently repair ambiguous Design, or include Deferred Grill Backlog capabilities.

## Solution

Extend the Catalog Test Specification with three version-2 long plain-text Structured Design Sections:

- Variable Design
- Business Logic
- Variable Test Data

Variable Design and Variable Test Data remain strict Design Text Tables parsed deterministically. Business Logic uses a Guided Business Logic Template. Each Behavior Block has deterministic structural anchors, one target, one trigger, and one or more explicitly named Outcomes. The instructions inside `TRIGGER` and `LOGIC` use English Bounded Natural Language; variable references use Variable Design `entry_key` values, and fixed choices use their internal values. Exact quoted message and scalar literals may contain any Unicode language and must be preserved exactly.

Version 2 creates no Now Assist Agent. It creates exactly two narrow Now Assist Skills:

1. Extract Catalog Behavioral Contract.
2. Independently Interpret Catalog Behavioral Contract.

For each deterministically delimited Behavior Block, both Skills receive the same original Variable Design, the same original Business Logic block, the supported capability catalog, and the same normalized output-schema contract. The independent Skill never receives the Extractor result. Deterministic server-side code canonicalizes both structured contracts and requires exact Canonical Interpretation Agreement before the contract can proceed.

AI interprets Business Logic only. AI does not split blocks, select Test Data, invent values, decide coverage, create a Generation Plan, generate ATF records, read implementation source, or repair Design. Deterministic application code owns structural parsing, canonical comparison, type and cross-Design validation, ownership and cycle checks, Coverage Assignment Search, Change Stimulus planning, immutable Generation Plan creation, and atomic ATF persistence.

`Create ATF` performs Schema-Directed Generation. Schema Version 1 continues to invoke the unchanged version-1 permission generator. Schema Version 2 performs a fast deterministic preflight, binds the exact Current Specification and Schema Version, creates a UTC run stamp, and queues Background Behavior Generation. The background worker performs both AI passes, deterministic validation and derivation, and atomic persistence. No ATF artifact may exist until the complete Generation Plan has passed.

One successful Schema Version 2 Generation Run creates one independent behavior-only Test Suite and one Derived Behavior Test Case for every Declared Outcome in every valid single-trigger Behavior Block. Every Test opens a fresh OOB Service Portal Catalog Item form, establishes non-trigger preconditions, applies the declared Change Stimulus last where applicable, waits through a bounded readiness seam, and verifies all target-owned observable effects. The POC supports `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and one optional typed `MESSAGE` property per Behavior Block.

A run ends fail-closed:

- invalid, unsupported, incomplete, ambiguous, or uncovered Design produces `DESIGN_INVALID` and zero ATF artifacts;
- semantic disagreement between the two successful AI interpretations produces `AI_INTERPRETATION_INCONSISTENT` and zero ATF artifacts;
- a technical AI failure that also fails one identical retry produces `AI_INTERPRETATION_TECHNICAL_FAILURE` and zero ATF artifacts;
- an artifact write failure leaves zero incomplete run-owned artifacts through a proven transaction or compensating cleanup seam.

The UI Action returns the run stamp. Success is visible through the generated Suite and Tests. Failure details are recorded only through run-stamped system logs. The POC creates no Generation Run table, prompt table, response table, result notification, Execution Tracker integration, or mutable status field on the Published Specification.

## Business Outcome

After a Test Designer publishes a valid Schema Version 2 Current Specification and clicks `Create ATF`, the system can turn the Design-owned Variable Design, Guided Business Logic, and Variable Test Data into a complete behavior-only ATF Test Suite that proves the Catalog Item's final requester-observable pre-submission behavior. The Test Designer enters expected behavior and reusable finite data, not implementation source, ATF steps, or manually mapped test cases.

The POC is successful when:

1. Supported Guided Business Logic is interpreted into the exact reviewed canonical contract through two independent Now Assist Skills.
2. Each Behavior Block has exactly one Declared Trigger and produces exactly one Derived Behavior Test Case per Declared Outcome.
3. Every generated expected result is traceable to the exact bound Current Specification and Business Logic source lines.
4. All test inputs come from Design-owned baselines, exact Business Logic literals, Candidate Test Values, or at most one Data Profile; AI never invents Test Data.
5. No UI Policy, Catalog Client Script, Script Include, source file, or observed runtime branch is used as the expected-behavior oracle.
6. Any blocking Design, AI, capability, binding, coverage, or persistence failure leaves zero ATF artifacts for that Generation Run.
7. Schema Version 1 continues to produce the stable permission behavior and is neither altered nor revalidated by version 2.
8. The Runtime AI Feasibility Gate passes before any AI-dependent production implementation is unblocked.

## User Stories

### Outcome and version boundary

1. As a Test Designer, I want to click the existing `Create ATF` action, so that I do not need a second generation entry point.
2. As a Test Designer, I want Schema Version 1 to retain its stable permission behavior, so that version 2 cannot regress the baseline.
3. As a Test Designer, I want Schema Version 2 to create behavior coverage only, so that permission Tests are not duplicated.
4. As a Test Designer, I want existing version-1 Permission Test Suites left unchanged, so that a behavior run cannot overwrite stable artifacts.
5. As a Test Designer, I want every version-2 click to bind one exact Current Specification, so that an in-flight run cannot drift to a later revision.
6. As a Test Designer, I want each successful version-2 run to create an independent Test Suite, so that prior runs are not reconciled or mutated.
7. As a Test Designer, I want one Test for each declared Outcome in each single-trigger Behavior Block, so that coverage follows Design rather than the number of Candidate values.
8. As a Test Designer, I want generated Tests to assert final observable behavior, so that UI Policy and Client Script implementation choices may change without changing the oracle.
9. As a Test Designer, I want the Current Specification to be the only expected-behavior source, so that implementation defects cannot teach the generator an incorrect result.
10. As a maintainer, I want this specification to be independent of the version-1 PRD, so that a fresh agent can implement version 2 without reconstructing prior conversations.

### Specification lifecycle and storage

11. As a Test Designer, I want version-2 Design stored in the application-owned Specification Knowledge Base, so that it follows the established publication lifecycle.
12. As a Test Designer, I want exactly one Published Current Specification per Catalog Item Under Test, so that generation has one unambiguous contract.
13. As a Test Designer, I want Variable Design, Business Logic, and Variable Test Data stored as three separate long plain-text fields, so that each concern has a clear authoring boundary.
14. As a Test Designer, I want no custom table for version-2 Design, so that the POC retains a minimal data model.
15. As a Test Designer, I want Article Body available for human notes, so that explanatory prose can accompany the contract.
16. As a Test Designer, I want Article Body ignored by interpretation and generation, so that notes cannot silently become executable Design.
17. As a Test Designer, I want the version-2 form view to emphasize only specification identity and the three Structured Design Sections, so that permission inputs are not confused with behavior inputs.
18. As a Test Designer, I want the version-1 authoring view to remain unchanged, so that stable permission authoring is preserved.
19. As a Test Designer, I want no automatic migration from Schema Version 1 to 2, so that behavior is never guessed from permission Design.
20. As a Test Designer, I want blank or unsupported Schema Versions rejected, so that the system never guesses which generator to invoke.
21. As a Test Designer, I want published revisioning to preserve all three version-2 fields and their physical line identity, so that AI evidence and diagnostics remain locatable.

### Variable Design

22. As a Test Designer, I want variables and Variable Sets declared in one Variable Design table, so that hierarchy does not require another field or table.
23. As a Test Designer, I want every entry to have a stable lowercase `entry_key`, so that Business Logic and Test Data do not depend on display labels.
24. As a Test Designer, I want each entry to declare whether it is a variable, Single Row Variable Set, or Multi Row Variable Set, so that ownership is explicit.
25. As a Test Designer, I want a blank parent key to mean direct Catalog Item ownership and a populated parent key to identify exactly one Variable Set, so that hierarchy is deterministic.
26. As a Test Designer, I want Variable Set nesting and nested MRVS rejected, so that the POC hierarchy remains bounded.
27. As a Test Designer, I want Catalog Control Type separated from Semantic Value Type, so that rendering and comparison meaning are not conflated.
28. As a Test Designer, I want every supported interactive variable to declare an explicit literal or `EMPTY` baseline, so that its initial value is Design-owned.
29. As a Test Designer, I want every supported interactive variable to declare visible, mandatory, and read-only baselines, so that `BASELINE` has one exact meaning.
30. As a Test Designer, I want Select Box and Multiple Choice variables to declare a fixed Choice Value Domain, so that choice internal values are Design-owned.
31. As a Test Designer, I want choice labels usable for display only, so that label changes do not alter logic.
32. As a Test Designer, I want Reference, List Collector, and reference-like Lookup Select variables to declare a reference table, so that live execution binding has a bounded table.
33. As a Test Designer, I want Structural Variable Entries representable but excluded from targets, triggers, conditions, and Test Data, so that layout metadata is not mistaken for behavior.
34. As a Test Designer, I want unsupported controls rejected before generation, so that a partial suite cannot appear complete.
35. As a Test Designer, I want exact Date and UTC Date/Time baseline formats, so that locale and wall-clock behavior do not become the oracle.
36. As a Test Designer, I want blank cells distinguished from explicit `EMPTY`, so that inapplicable schema data is not confused with runtime absence.

### Guided Business Logic authoring

37. As a Test Designer, I want to write ordinary but constrained English business rules, so that I do not need to learn the former Catalog Behavior DSL.
38. As a Test Designer, I want every Behavior Block anchored by `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END`, so that application code can split blocks deterministically.
39. As a Test Designer, I want every block to have one unique `BEHAVIOR_ID`, so that generated identity and diagnostics are stable.
40. As a Test Designer, I want every block to declare exactly one target, so that all expected effects have one owner.
41. As a Test Designer, I want every block to declare exactly one form-load or variable-change trigger, so that interpretation and test derivation remain isolated.
42. As a Test Designer, I want to author separate blocks when the same expected behavior reacts to two variables, so that each event path has an independent Test.
43. As a Test Designer, I want every branch to have a unique Test Designer-authored `OUTCOME_ID`, so that Tests are traceable without AI inventing identity.
44. As a Test Designer, I want conditional logic to use one `If`, ordered `Else if` cases, and one terminal `Otherwise`, so that reverse behavior is explicit.
45. As a Test Designer, I want every branch to declare the same target effect-property set, so that omitted reverse effects cannot be guessed.
46. As a Test Designer, I want nested branches rejected, so that the POC stays interpretable and testable.
47. As a Test Designer, I want conditions to reference multiple variables through `AND`, `OR`, and parentheses, so that ordinary cross-variable dependencies can be represented.
48. As a Test Designer, I want parentheses required whenever `AND` and `OR` are mixed, so that AI cannot infer precedence.
49. As a Test Designer, I want variable references to use `entry_key` values and choice references to use internal values, so that labels cannot introduce ambiguity.
50. As a Test Designer, I want a label reference rejected even if the system can suggest the correct technical identifier, so that Design is never silently changed.
51. As a Test Designer, I want Business Logic instructions restricted to English in the POC, so that one prompt and regression corpus define supported interpretation.
52. As a Test Designer, I want exact quoted message and scalar literals to allow any Unicode language, so that requester-visible text can remain multilingual.
53. As a Test Designer, I want quoted literals preserved exactly without translation, spelling correction, or whitespace rewriting, so that generated expectations match Design.
54. As a Test Designer, I want `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and `MESSAGE` to be the only effect families, so that behavior remains within a closed capability catalog.
55. As a Test Designer, I want one optional message type per Behavior Block, so that the POC does not need message collection ordering.
56. As a Test Designer, I want Field and Form Messages distinguished by scope, type, and exact text, so that a visually similar but incorrect message cannot pass.
57. As a Test Designer, I want unsupported, ambiguous, implementation-oriented, or unanchored prose rejected, so that AI never approximates an expected result.
58. As a Test Designer, I want AI forbidden from inventing a missing `Otherwise`, `CLEAR`, `BASELINE`, `KEEP`, value, or branch, so that all expected behavior remains mine.
59. As a Test Designer, I want blocks targeting different variables kept independent even when their conditions match, so that AI cannot infer cross-target grouping.
60. As a Test Designer, I want every trigger-target-property combination to have one Behavior Effect Owner, so that implementation execution order never resolves conflicting Design.

### Runtime AI interpretation

61. As a Test Designer, I want Business Logic interpreted when the version-2 Generation Run executes, so that I can author the Guided Business Logic Template without a separate normalization workflow.
62. As a Test Designer, I want two independent interpretations of every Behavior Block, so that one unverified AI response cannot generate Tests.
63. As a Test Designer, I want both Skills to receive the same original inputs, so that agreement is meaningful.
64. As a Test Designer, I want the independent Verifier hidden from the Extractor result, so that it cannot merely approve the first answer.
65. As a Test Designer, I want both Skills to return the complete normalized contract rather than a pass/fail opinion, so that semantic equality can be checked.
66. As a Test Designer, I want structured output enforced, so that free-form model prose cannot enter deterministic generation.
67. As a Test Designer, I want the two results canonicalized before comparison, so that irrelevant JSON property order does not cause a false mismatch.
68. As a Test Designer, I want exact semantic agreement on identity, target, trigger, branch order, conditions, effects, messages, literals, and source lines, so that only one interpretation can proceed.
69. As a Test Designer, I want any semantic disagreement to stop immediately without retry, voting, or choosing one answer, so that the system cannot search for a convenient interpretation.
70. As a Test Designer, I want a technical timeout or malformed response retried exactly once with identical inputs and settings, so that a transient failure has one bounded recovery attempt.
71. As a Test Designer, I want a second technical failure classified separately from invalid Design, so that I know whether to repair the Design or retry later.
72. As a Test Designer, I want no alternate model, prompt, reduced input, or deterministic DSL fallback, so that the runtime contract remains auditable.
73. As a Test Designer, I want the Now Assist model active at runtime used without version pinning, so that the POC avoids model-lifecycle coupling.
74. As a Test Designer, I want within-run agreement required even though cross-run model equality is not guaranteed, so that every individual run remains fail-closed.
75. As a Test Designer, I want AI limited to Business Logic interpretation, so that data selection and ATF creation remain deterministic.
76. As a Test Designer, I want no Now Assist Agent, so that application code remains the explicit orchestrator.
77. As a security reviewer, I want raw prompts, raw responses, and duplicate Design text excluded from persistent logs, so that the POC retains only necessary provenance.
78. As a maintainer, I want prompt versions, schema versions, hashes, attempt counts, agreement status, and structured differences recorded when applicable, so that interpretation is diagnosable without raw conversations.

### Variable Test Data and derivation

79. As a Test Designer, I want to supply Candidate Test Values rather than authored test cases, so that the generator remains responsible for derivation.
80. As a Test Designer, I want one variable to have multiple Candidate Test Values, so that different Outcomes can be reached without duplicating Variable Design.
81. As a Test Designer, I want independent Candidates selectable without a Data Profile, so that ordinary values require no grouping.
82. As a Test Designer, I want equal nonblank Data Profile keys to group correlated values, so that Design-known business data is selected together.
83. As a Test Designer, I want Data Profiles reusable across Behaviors and independent of Outcome IDs, so that they do not become manually authored test cases.
84. As a Test Designer, I want Business Logic literals and explicit empty-state semantics reused as input where sufficient, so that trivial values are not entered twice.
85. As a Test Designer, I want AI forbidden from reading Variable Test Data during interpretation, so that test values cannot influence expected behavior.
86. As a Test Designer, I want deterministic code to select Variable Test Data only after all AI contracts agree and validate, so that coverage cannot repair interpretation.
87. As a Test Designer, I want every declared Outcome covered by a satisfying finite assignment, so that no expected branch is silently omitted.
88. As a Test Designer, I want an unreachable or uncovered Outcome to block the whole run, so that the Suite remains complete.
89. As a Test Designer, I want the first satisfying assignment selected deterministically, so that extra Candidate values do not multiply Tests.
90. As a Test Designer, I want at most one Data Profile used in one Derived Behavior Test Case, so that unrelated data relationships are not combined without Design authority.
91. As a Test Designer, I want Coverage Assignment Search bounded, so that the POC cannot perform an unbounded Cartesian search.
92. As a Test Designer, I want the trigger value changed last after non-trigger setup, so that an `ON CHANGE` Test proves the declared event path.
93. As a Test Designer, I want the Change Stimulus to use distinct before and after values, so that reassigning the same value cannot masquerade as a change.
94. As a Test Designer, I want `ON LOAD` Outcomes selected only by state effective before or during a fresh open, so that post-open Test Data cannot manufacture load behavior.
95. As a Test Designer, I want Reference Candidates resolved by a direct unique field, so that live records are never chosen randomly.
96. As a Test Designer, I want List Collector membership and MRVS Test Rows represented through explicit Design-owned data, so that collection behavior remains finite.
97. As a Test Designer, I want missing reference records rejected rather than created, so that generation never mutates business data implicitly.
98. As a Test Designer, I want value-change cycles rejected, so that final propagated values are not dependent on implementation execution order.

### Background execution and operations

99. As a Test Designer, I want the UI Action to return quickly with a run stamp, so that Now Assist calls do not block the initiating request.
100. As a Test Designer, I want the worker to use the exact Specification bound before queueing, so that later publication changes cannot affect the run.
101. As a Test Designer, I want no ATF artifact created before the complete Generation Plan passes, so that failed interpretation or validation cannot leave a partial Suite.
102. As a Test Designer, I want one run-stamped system-log seam for failures, so that the POC needs no custom run table.
103. As a Test Designer, I want successful provenance in generated Suite and Test descriptions, so that artifacts remain traceable.
104. As a Test Designer, I want every behavior Test to impersonate one configured Behavior Execution User, so that execution context is deterministic.
105. As a Test Designer, I want every Test to open a fresh OOB Service Portal form, so that state cannot leak across cases.
106. As a Test Designer, I want readiness-based waiting instead of arbitrary fixed sleeps, so that asynchronous Catalog behavior is tested reliably.
107. As a Test Designer, I want timeout, binding, stimulus, and assertion failures distinguishable, so that failures can be diagnosed.
108. As a Test Designer, I want exact semantic values asserted instead of localized display strings, so that locale and timezone do not change results.
109. As a Test Designer, I want message scope, type, and text matched exactly, so that the wrong message cannot satisfy the Design.
110. As a Test Designer, I want generated Tests never to submit, order, or add the Catalog Item to a cart, so that the Pre-Submission Boundary is preserved.
111. As a Test Designer, I want artifact persistence to be atomic, so that write failures cannot leave an incomplete generated graph.
112. As an application administrator, I want protected ATF metadata seams revalidated on the target release, so that cross-scope assumptions are proven before production work.
113. As an application administrator, I want the Behavior Execution User resolved exactly and required to be active, so that requester identity is never guessed.
114. As a maintainer, I want the Runtime AI Feasibility Gate to precede every AI-dependent production ticket, so that feasibility is evidence-backed.
115. As a maintainer, I want a failed prototype to block the dependent capability, so that an implementation agent cannot silently choose another architecture.
116. As a maintainer, I want version-1 regression tests to remain green, so that the stable baseline stays unchanged.

## Implementation Decisions

### 1. Schema-directed lifecycle

- `Create ATF` remains one Catalog Item form UI Action protected by the existing `atf_test_admin` authorization boundary.
- The action resolves exactly one Published Current Specification for the Catalog Item Under Test.
- Schema Version 1 invokes the unchanged version-1 permission path.
- Schema Version 2 invokes only Background Behavior Generation.
- Blank and unsupported Schema Versions fail preflight; the generator never infers a version.
- A Schema Version 2 run never reads, validates, copies, generates, updates, or deletes Permission Design or permission Tests.
- Version-1 Specifications are not migrated automatically.
- Every successful Schema Version 2 run creates a new behavior-only Suite. The POC does not deduplicate, reconcile, reuse, update, or delete prior successful runs.
- The UI Action performs only fast deterministic authorization, Current Specification resolution, exact Specification and Schema Version binding, required-field and structural-anchor preflight, UTC run-stamp creation, and worker queueing.
- The UI Action does not call Now Assist, semantically interpret Business Logic, select Test Data, build a Generation Plan, or create ATF records.
- The worker rechecks that the bound record still exists, is the same Published Specification, identifies the same Catalog Item, and has Schema Version 2.
- Version 2 generates metadata but does not automatically execute the generated Suite.

### 2. Physical Specification schema

Version 2 reuses the Catalog Test Specification on `kb_knowledge` and creates no custom table or child-record model.

The three version-2 logical fields are:

| Label | Type | Meaning |
| --- | --- | --- |
| Variable Design | Long plain text | Fixed-header Variable Design Text Table |
| Business Logic | Long plain text | Guided Business Logic Template |
| Variable Test Data | Long plain text | Fixed-header Candidate Test Value table |

- Each field must support the maximum length proven by the Knowledge text round-trip prototype; the POC target is at least 65,000 characters.
- Catalog Item identity and Schema Version remain authoritative fields.
- Article Body and Short Description remain human-facing and non-authoritative.
- Dependency Design, Dependency Test Data, and Catalog Test Scenario fields are not added.
- The version-2 view exposes specification identity, the three Structured Design Sections, and Human Notes.
- Knowledge save, publish, read, and revision must preserve supported escapes, Unicode literals, line breaks, and Business Logic Physical Lines.

### 3. Design Text Table conventions

Variable Design and Variable Test Data use deterministic fixed-header tables.

- The exact header is the first physical line; a leading blank line is invalid.
- Cells use pipe (`|`) delimiters in the declared fixed order.
- Surrounding spaces and tabs are trimmed; internal whitespace remains exact.
- Blank lines after the header are ignored while retaining physical line numbers.
- CRLF and LF are semantically equivalent.
- Every row has exactly the declared number of cells.
- Markdown separator rows, comments, multiline cells, and quoted-cell delimiter protection are unsupported.
- The supported escapes are `\|`, `\;`, `\=`, `\"`, and `\\`.
- Any unsupported or trailing backslash escape is invalid.
- Test Designer-authored Design Keys use lowercase `snake_case`, begin with a letter, contain only lowercase letters, digits, and underscores, and contain 1 through 64 characters.
- Keys and technical values are never case-folded, generated, or silently normalized.

### 4. Variable Design contract

The exact header is:

~~~text
entry_key | entry_kind | parent_key | label | control_type | semantic_type | value_domain | default | visible | mandatory | read_only | reference_table | order
~~~

Column meanings are:

| Column | Contract |
| --- | --- |
| `entry_key` | Unique Design Key used by Business Logic and Variable Test Data |
| `entry_kind` | `variable`, `single_row_variable_set`, or `multi_row_variable_set` |
| `parent_key` | Blank for Catalog Item ownership; otherwise one Variable Set `entry_key` |
| `label` | Human-readable display and diagnostic text; never a logic identifier |
| `control_type` | Closed requester control token for variable entries |
| `semantic_type` | Closed comparison and value meaning for interactive variables |
| `value_domain` | Fixed internal-value/display-label pairs for fixed choices |
| `default` | Required typed literal, reference form, reference set, or `EMPTY` for interactive variables |
| `visible` | Required boolean baseline for interactive variables |
| `mandatory` | Required boolean baseline for interactive variables |
| `read_only` | Required boolean baseline for interactive variables |
| `reference_table` | Required direct table for Reference, List Collector, and reference-like Lookup Select |
| `order` | Required nonnegative integer used for deterministic traversal, not layout testing |

Supported interactive mappings are:

| `control_type` | `semantic_type` | Additional rule |
| --- | --- | --- |
| `single_line_text` | `text` | None |
| `multi_line_text` | `text` | None |
| `integer` | `integer` | Exact integer |
| `decimal` | `decimal` | Exact decimal with at most six fractional digits |
| `checkbox` | `boolean` | `true` or `false` |
| `yes_no` | `boolean` | `true` or `false` |
| `select_box` | `choice` | Fixed Choice Value Domain required |
| `multiple_choice` | `choice` | Fixed Choice Value Domain required |
| `reference` | `reference` | `reference_table` required |
| `list_collector` | `reference_set` | `reference_table` required |
| `lookup_select` | `reference` | Reference-like sys_id semantics and `reference_table` required |
| `date` | `date` | Exact `YYYY-MM-DD` |
| `date_time` | `date_time` | Exact `YYYY-MM-DDTHH:mm:ssZ` |

- Variable Set rows leave interactive control, semantic, value, and state cells blank while retaining label and order.
- Variable Sets cannot be nested; an MRVS cannot contain another MRVS; one variable has at most one parent.
- Structural controls such as Label, Annotation, Container, and Split may be represented but cannot be a target, trigger, condition input, Typed Value Expression input, or Candidate owner.
- Unsupported interactive controls are blocking Design errors and are never silently skipped.
- A fixed choice domain uses ordered `internal_value=Display Label` pairs separated by semicolons. Business Logic references only the internal value.
- Dynamic choice addition, removal, filtering, relabeling, and reordering are unsupported.
- Text and choice values are double quoted. Integer, decimal, boolean, `EMPTY`, Date, and UTC Date/Time forms are typed deterministically.
- Numeric values use exact decimal evaluation. Division or scale reduction requires explicit rounding under the supported normalized expression contract.
- Relative time tokens, locale dates, and timezone-free Date/Time values are invalid.

### 5. Variable Test Data contract

The exact header is:

~~~text
test_value_key | variable_key | value | data_profile_key | mrvs_row_key
~~~

| Column | Contract |
| --- | --- |
| `test_value_key` | Unique Candidate Test Value Design Key |
| `variable_key` | Supported value-bearing Variable Design `entry_key` |
| `value` | Type-valid scalar, `EMPTY`, `REFERENCE_BY`, or `REFERENCE_SET` |
| `data_profile_key` | Blank for independent selection; repeated nonblank key for one indivisible Data Profile |
| `mrvs_row_key` | Required only for a direct MRVS child Candidate |

- There are no Behavior ID, Outcome ID, expected result, test name, ATF step, `from_value`, or `to_value` columns.
- One variable may have many Candidate Test Values.
- Physical row order is semantic for deterministic selection.
- All rows with one nonblank Data Profile key are selected together as one Design-known business-data relationship.
- A Data Profile is not a test case, Outcome, sequence, or expected effect and may be reused by many Behavior Blocks.
- At most one Data Profile may contribute to one Derived Behavior Test Case; independent Candidates may supplement it.
- AI Skills do not receive Variable Test Data. Only deterministic derivation consumes it after interpretation and validation.
- `REFERENCE_BY` resolves one existing record through one direct unique field within the Variable Design `reference_table`. Zero or multiple matches are blocking.
- Raw sys_id values, display-label matching, dot-walking, encoded queries, arbitrary queries, random records, and first-record selection are invalid.
- `REFERENCE_SET` represents exact unordered List Collector membership and contains only valid same-table Reference Candidate Bindings.
- MRVS child Candidates use a Data Profile and `mrvs_row_key`; row identity is Data Profile plus MRVS parent plus row key.
- Missing business or reference data is never created implicitly.

### 6. Guided Business Logic Template

Business Logic is a sequence of non-nested Behavior Blocks. Application code deterministically recognizes block boundaries and anchors but does not interpret condition or effect prose.

Required anchors are:

~~~text
BEHAVIOR_ID: <design_key>
TARGET: <variable_entry_key or CATALOG_FORM>

TRIGGER:
<one English load or variable-change statement>

LOGIC:
<one unconditional Outcome or ordered If / Else if / Otherwise branches>

END
~~~

Rules:

- Each block has one globally unique Test Designer-authored `BEHAVIOR_ID`.
- `TARGET` names one supported interactive Variable Design `entry_key`, or the reserved `CATALOG_FORM` for a Form Message.
- Each block has exactly one Declared Trigger: form load or one variable-specific change.
- A block cannot combine load and change or name more than one change variable.
- Equivalent behavior for another trigger requires another block and another `BEHAVIOR_ID`.
- Every unconditional or conditional branch has an `OUTCOME_ID` unique within the block.
- Conditional logic has one initial `If`, zero or more ordered `Else if` cases, and exactly one terminal `Otherwise`.
- Nested conditional blocks are invalid.
- Every branch declares exactly the same target effect-property set.
- Variables are referenced only by `entry_key`; fixed choices are referenced only by internal value.
- Display labels are invalid even if they map unambiguously. Diagnostics may suggest the correct technical identifier, but neither AI nor application code may substitute it.
- Instructions in `TRIGGER` and `LOGIC` are English-only in the POC.
- Exact quoted message and scalar literals may contain any Unicode language and must be preserved exactly.
- Unsupported, ambiguous, approximate, implementation-oriented, bilingual, or code-switched instructions are invalid.
- One block may declare zero messages or one message type from `INFO`, `WARNING`, or `ERROR`.
- Blocks are independent contracts. Different targets are never grouped into one Test, and there is no cross-target grouping key.

A representative valid block is:

~~~text
BEHAVIOR_ID: manager_by_employee_type
TARGET: manager

TRIGGER:
When employee_type changes

LOGIC:
If employee_type is contractor:
OUTCOME_ID: contractor
- manager is visible.
- manager is mandatory.
- Show WARNING on manager: "Vui lòng chọn người quản lý".

Else if employee_type is intern:
OUTCOME_ID: intern
- manager is visible.
- manager is not mandatory.
- Clear WARNING on manager.

Otherwise:
OUTCOME_ID: employee
- manager is hidden.
- manager is not mandatory.
- Clear WARNING on manager.

END
~~~

The words `employee_type`, `manager`, `contractor`, and `intern` are technical Design values. Their display labels are not valid substitutes.

### 7. Closed normalized behavior semantics

The two Skills may accept minor equivalent English phrasing, but every valid interpretation must normalize completely into the same closed, versioned contract.

The normalized contract contains at least:

- exact `BEHAVIOR_ID` and target;
- one typed Declared Trigger;
- ordered Declared Outcomes with exact `OUTCOME_ID` values;
- one optional typed condition tree per branch;
- technical variable keys and choice internal values;
- complete target-owned effect-property sets and typed effect values;
- exact Field or Form Message scope, type, text, or clear semantics;
- Business Logic Physical Line evidence for each trigger, condition, Outcome, and effect.

Supported condition semantics include:

- equality and inequality;
- empty and nonempty checks;
- membership and non-membership;
- numeric and date ordering and supported ranges;
- supported text containment, prefix, and suffix operations;
- exact transition semantics where admitted;
- MRVS `ROW_COUNT` only;
- `AND`, `OR`, and parentheses.

When `AND` and `OR` appear in the same condition, explicit parentheses are mandatory. Neither AI nor code applies implicit precedence. Conditions may reference multiple supported variables, but all identifiers, literals, operators, and operand types must validate deterministically.

Supported Behavior Effects are:

| Effect | Supported normalized values |
| --- | --- |
| `VALUE` | Type-valid literal or expression, `EMPTY`, `BASELINE`, or `KEEP` |
| `VISIBLE` | `true`, `false`, `BASELINE`, or `KEEP` |
| `MANDATORY` | `true`, `false`, `BASELINE`, or `KEEP` |
| `READ_ONLY` | `true`, `false`, `BASELINE`, or `KEEP` |
| `MESSAGE` | Exact text or `CLEAR`, with exact scope and one type |

- `BASELINE` restores the Variable Design baseline for the property.
- `KEEP` preserves the target's pre-stimulus property state.
- `EMPTY` expects no variable value.
- `CLEAR` expects no message of the declared type at the declared scope.
- AI must never create any of these directives when the source does not state them.
- Arbitrary JavaScript, regex, encoded queries, dynamic identifiers, dot-walking, runtime queries, implementation calls, current-time functions, and unsupported aggregates are invalid.
- One Behavior Effect Owner is allowed for one Declared Trigger plus target plus effect-property identity.
- The directed Value-Change Graph includes an edge from a variable-change trigger to its target when any Outcome assigns `VALUE`; self-edges and cycles are invalid.

### 8. Runtime Business Logic Interpretation

Runtime interpretation is Block-Scoped.

For each Behavior Block, server-side application code invokes:

1. `Extract Catalog Behavioral Contract` with complete Variable Design, the original block and its physical lines, the supported capability catalog, and the normalized output schema.
2. `Independently Interpret Catalog Behavioral Contract` with the same original inputs and no Extractor output.

Exactly two Now Assist Skills exist for this architecture. There is no Now Assist Agent.

The application, not AI, owns:

- structural block splitting;
- invocation orchestration and retry counting;
- deterministic output-schema enforcement;
- canonicalization and exact comparison;
- cross-Design reference and type validation;
- effect ownership, branch completeness, value-change-cycle, and cross-block checks;
- Variable Test Data selection and Coverage Assignment Search;
- Change Stimulus planning;
- immutable Generation Plan construction;
- ATF adapter selection and atomic persistence.

AI is not allowed to:

- see or interpret UI Policy, Catalog Client Script, Script Include, other implementation source, or observed runtime behavior;
- receive Variable Test Data or use data to decide expected behavior;
- split blocks or infer missing anchors;
- silently map display labels to technical identifiers;
- invent a branch, effect, directive, value, test input, dependency, scenario, or grouping key;
- select Candidate Test Values;
- emit ATF records or executable ATF steps.

### 9. Canonical agreement and deterministic validation

Both Skill responses must satisfy the same versioned structured-output schema. Application code canonicalizes them before comparison. Raw JSON object-property order does not matter; semantic order does matter where the Design declares order.

Canonical Interpretation Agreement covers at least:

- Behavior identity and target;
- trigger type and variable;
- ordered Outcomes and Outcome identity;
- canonical typed condition trees;
- technical identifiers and internal values;
- effect-property identity and completeness;
- typed effect values and directives;
- message scope, type, exact text, and clear semantics;
- cited source-line mappings.

Canonical semantic equivalence is exact according to the deterministic canonicalizer. Application code does not attempt theorem proving between differently shaped boolean expressions and does not choose a preferred interpretation.

After every block achieves agreement, deterministic code merges the contracts and validates:

1. schema compatibility and required fields;
2. Variable Design and Variable Test Data physical grammar;
3. anchors, unique Design Keys, and required Business Logic structure;
4. technical identifiers and internal choice values;
5. typed conditions, typed values, effects, messages, and symmetric branch effect sets;
6. target, trigger, effect-owner, Variable Set, MRVS, and capability boundaries;
7. cross-block completeness and the acyclic Value-Change Graph;
8. Behavior Execution User and reference Execution Bindings;
9. finite Outcome coverage and Change Stimulus feasibility;
10. immutable Generation Plan completeness.

No later phase consumes an invalid intermediate result. Every safely discoverable located Design Diagnostic may be collected, but any blocking result prevents the plan and all writes.

### 10. AI retry and terminal results

Semantic disagreement is never retried. When two successful responses differ canonically, the run records `AI_INTERPRETATION_INCONSISTENT`, records structured non-raw differences, and creates zero ATF artifacts. The system does not retry until two answers happen to match, choose one answer, vote, or ask a third model.

A technical failure includes timeout, transport failure, service unavailability, rate limit, malformed or truncated response, or response-schema failure. Each Skill call receives exactly one retry, for at most two attempts, using identical:

- model deployment and version available at runtime;
- prompt version;
- original input Design;
- output schema;
- generation settings.

There is no alternate model, prompt repair, reduced-input fallback, or deterministic DSL fallback. If the identical retry also fails, the run records `AI_INTERPRETATION_TECHNICAL_FAILURE` and zero ATF artifacts. This result is not classified as invalid Design.

If both responses agree but the source or agreed contract is ambiguous, unsupported, incomplete, invalid, uncovered, or inconsistent with the other Design Sections, the run records `DESIGN_INVALID` and zero ATF artifacts.

The POC uses the Now Assist model active for the configured capability at run time. It does not pin, qualify, or compatibility-gate model versions. Model metadata is recorded only when exposed; missing metadata does not block generation. Within-run Canonical Interpretation Agreement is mandatory. Cross-run equality for an unchanged Design is not guaranteed or tested.

### 11. Derived tests and deterministic assignment selection

Each Behavior Block has one Declared Trigger. Generation creates exactly one Derived Behavior Test Case per Declared Outcome. Extra Candidate assignments reaching the same Outcome do not create extra Tests.

For each Outcome, deterministic Coverage Assignment Search:

1. reuses exact type-valid Business Logic literals and explicit empty-state semantics where sufficient;
2. preserves Baseline Variable State where change is unnecessary;
3. evaluates a literal-plus-Baseline assignment first;
4. evaluates at most one complete Data Profile at a time in physical order, supplemented by independent Candidates where necessary;
5. evaluates the no-profile independent Candidate space;
6. orders variables and Candidates by first physical appearance;
7. enumerates deterministically and selects the first satisfying complete assignment;
8. records selected literals, Data Profile, and Candidate keys as provenance.

The search is capped at 10,000 complete assignments per Outcome. Exhausting the finite domain without a satisfying assignment or exceeding the cap is blocking. The generator does not invent values, solve an open domain, sample randomly, combine multiple Data Profiles, or inspect live records to discover possible inputs.

For an `ON CHANGE` Test:

1. open a fresh form;
2. establish non-trigger preconditions;
3. determine a valid trigger before-value;
4. stabilize the pre-stimulus form;
5. apply a semantically distinct trigger after-value last;
6. wait through bounded readiness;
7. assert all effects in the selected Outcome.

Baseline is the preferred before-value. If it equals the required after-value, another Design-owned Candidate may be selected. An unavailable distinct transition blocks generation.

An `ON LOAD` Outcome must be reachable from state effective before or during a fresh form open: Baseline Variable State, the fixed Behavior Execution User, and explicitly admitted fixed execution records. Post-open Candidate assignment cannot manufacture load behavior.

### 12. Execution profile and adapters

Version 2 uses one application-owned Behavior Execution Profile stored without a custom table. It binds:

- the OOB Service Portal route;
- the Catalog Item page;
- one active Behavior Execution User;
- one bounded readiness timeout, initially 15 seconds.

The Behavior Execution User is an Execution Binding, not a Permission Audience and not an expected-behavior source. It must already be able to open the Catalog Item and read fixed POC records.

OOB Service Portal is the only execution surface. Employee Center, Native Platform Catalog UI, custom Portals, and custom widgets are unsupported.

A versioned capability registry maps supported control and semantic types plus operations to target-release-proven Service Portal adapters. OOB ATF steps are preferred when they implement the exact semantic operation. A custom ATF step is admitted only after a prototype proves that an OOB step cannot satisfy the required operation and the custom seam works safely.

Required semantic operations are:

- open a fresh Catalog Item;
- set and clear supported values;
- establish a distinct Change Stimulus;
- set and observe a complete MRVS collection within the bounded MRVS capability;
- wait through bounded readiness;
- read semantic value and visible, mandatory, and read-only states;
- observe exact Field or Form Message scope, type, text, and clear state;
- compare exact reference identity, unordered List Collector membership, and admitted MRVS rows.

Missing or unproven adapter mappings block generation before writes. Fixed sleeps are not a readiness mechanism.

### 13. Generated artifacts and atomicity

One successful Generation Run creates:

- one behavior-only Test Suite;
- one Test per Behavior Block and Declared Outcome;
- the ordered ATF steps and Suite memberships required by proven adapters.

Recommended names are:

~~~text
Suite: [ATF Gen v2] <Catalog Item> - Catalog Behavior - <UTC run stamp>
Test: [<behavior_id>] <trigger> -> <outcome_id>
~~~

Generated descriptions contain:

- bound Specification identity and Schema Version;
- UTC run stamp;
- Behavior ID, target, trigger, and Outcome ID;
- selected Data Profile and Candidate keys;
- Change Stimulus before and after values where applicable;
- expected effect summary;
- non-raw AI Interpretation Evidence, including prompt and output-schema versions, contract hashes, attempt counts, agreement state, and model metadata only when exposed.

Descriptions do not contain implementation source, raw AI prompts or responses, raw reference sys_id values, or Article Body.

No ATF insert occurs until the complete immutable Generation Plan exists with no blocking result. The platform prototype must prove either one transaction across every required record or exact run-owned compensating cleanup. Failure injection at Suite, Test, step, and membership stages must leave zero incomplete artifacts.

### 14. Diagnostics, reporting, and evidence

The UI Action returns a UTC run stamp after the worker is queued. The POC does not attempt to return semantic AI or validation results in the initiating request.

Successful runs are discoverable through the generated Suite and Tests. Failed runs use the existing run-stamped system-log seam. Failure evidence includes, where applicable:

- run stamp and bound Specification identity;
- terminal result code;
- Behavior ID, Outcome ID, and Business Logic Physical Lines;
- failing AI phase and attempt count;
- prompt and output-schema versions;
- input and canonical contract hashes;
- agreement state and structured semantic differences;
- confirmation that zero ATF artifacts were created.

The POC does not persist raw prompts, raw responses, duplicate Variable Design, duplicate Business Logic, or complete AI conversations. It creates no custom Generation Run, Prompt, Response, or Interpretation table. It sends no email, creates no Execution Tracker record, adds no Last Generation fields, and does not update execution state on the Published Specification.

The Test Designer must retain permission to find the terminal system-log entry by run stamp. This operational limitation is accepted for the POC.

### 15. Source opacity, security, and permission boundary

Expected-behavior derivation may read only:

- the exact bound Current Specification;
- versioned schema, prompt, canonicalization, and capability contracts;
- the application-owned Behavior Execution Profile;
- live records explicitly resolved as Execution Bindings;
- proven control metadata needed only to operate a Design-declared control.

It may not read UI Policies, Catalog Client Scripts, Script Includes, source code, observed branches, live choice domains, or runtime results to infer a Test Expectation.

- `Create ATF` retains the existing `atf_test_admin` authorization boundary.
- Knowledge authoring remains controlled by the Specification Knowledge Base and trusted Test Designer persona.
- The background worker must not gain broad Knowledge administration or change OOB Application Access.
- Protected ATF creation uses only target-release-proven scoped or OOB seams.
- Reference resolution uses an explicitly chosen server-side security model without broadening the Behavior Execution User's requester experience.
- Diagnostics and generated descriptions do not expose raw sys_id values or raw AI content.

### 16. Mandatory platform gates

The Runtime AI Feasibility Gate is the first entry criterion for all runtime-AI production work. It uses throwaway artifacts only:

- two separate throwaway Now Assist Skills;
- one throwaway background server-side harness;
- no production parser or generator;
- no ATF artifacts;
- no custom table.

The prototype corpus includes at least:

- visibility;
- mandatory state;
- multiple effects in one Outcome;
- ordered `Else if` branches;
- multi-variable `AND`;
- mixed `AND` and `OR` with parentheses;
- ambiguous boolean grouping without required parentheses;
- Field Message and Form Message behavior;
- technical-identifier violations;
- unsupported behavior;
- ambiguous prose;
- prompt-like quoted message text;
- form load;
- an exact Unicode quoted literal.

Every supported fixture must produce the exact reviewed canonical contract through ten repeated runs. Every invalid or ambiguous fixture must be rejected on all ten runs. The gate must also prove:

- server-side scoped Skill invocation;
- background invocation;
- structured-output enforcement;
- independent Skill inputs;
- exact literal preservation;
- one identical retry for technical failure;
- no retry for semantic disagreement;
- non-raw evidence only;
- zero ATF artifacts.

If this gate fails, Runtime Business Logic Interpretation, AI-derived Catalog Behavioral Contracts, v2 AI behavior-test derivation, and the v2 AI `Create ATF` path remain blocked. Failure returns for an explicit scope decision. It does not authorize a deterministic DSL parser, one-pass AI, a Now Assist Agent, direct AI ATF generation, or a partial Suite.

The remaining capability gates are:

1. Structured KB text round trip through save, publish, read, and revision.
2. Deterministic Variable Design and Variable Test Data parsing with retained physical-line diagnostics.
3. OOB Service Portal opening, fixed-user impersonation, and fresh-Test isolation.
4. Scalar stimulus and `VALUE`, `VISIBLE`, `MANDATORY`, and `READ_ONLY` assertions for supported controls.
5. Exact Field and Form Message scope, type, text, and `CLEAR` assertions.
6. Bounded readiness-based stabilization.
7. Numeric, Date, and Date/Time adapters.
8. Reference, List Collector, and reference-like Lookup Select bindings and assertions.
9. Single Row Variable Set addressing and bounded MRVS collection operations.
10. Genuine `ON LOAD` context and reachability.
11. Bounded Coverage Assignment Search and Design-only oracle behavior.
12. Protected ATF metadata access and atomic persistence or cleanup.

A failed gate blocks every dependent production capability. Removing a failed capability requires an explicit scope and documentation decision; silent skip, source inspection, heuristic assertion, fixed-sleep fallback, or partial generation is forbidden.

## Testing Decisions

### Testing philosophy and seams

- Tests assert externally observable contracts, terminal results, and complete Generation Plans, not internal helper calls or prompt wording.
- The first and mandatory high-level seam is the Runtime AI Feasibility Harness: original fixture Design in, two independent canonical contracts or a terminal interpretation result out, with zero ATF artifacts.
- The production high-level seam is one complete Schema Version 2 Generation Run: `Create ATF` binds and queues a run; the worker ends with either one complete behavior-only Suite or one run-stamped terminal failure with zero artifacts.
- Deterministic local tests cover structural parsing, canonicalization, semantic validation, Coverage Assignment Search, Change Stimulus planning, and Generation Plan construction below the production seam where platform invocation is not required.
- ServiceNow platform behavior is tested through throwaway prototypes and target-instance integration tests because local mocks cannot prove Now Assist Skills, Knowledge revision, Service Portal controls, protected ATF metadata, background execution, or cross-scope behavior.
- Version-1 regression tests remain mandatory and prove Schema Version 1 routes to the unchanged permission generator.
- Test fixtures carry explicit reviewed Design expectations. Observed implementation behavior is never copied into expected results.

### Runtime AI Feasibility Gate acceptance

For each supported corpus fixture and each of ten runs:

1. both Skills receive identical original inputs;
2. the Verifier receives no Extractor output;
3. each response satisfies the structured-output schema;
4. each canonical response equals the reviewed expected contract;
5. Extractor and Verifier canonically agree with each other;
6. exact quoted Unicode and prompt-like literals remain unchanged;
7. only non-raw evidence is retained;
8. no ATF artifact is created.

For each invalid or ambiguous corpus fixture and each of ten runs, the harness must reject the fixture consistently and create no ATF artifact.

Technical-failure injection must prove exactly two identical attempts and the terminal `AI_INTERPRETATION_TECHNICAL_FAILURE`. Semantic-difference injection must prove one comparison, no semantic retry, terminal `AI_INTERPRETATION_INCONSISTENT`, and structured non-raw differences.

The gate passes only when every fixture and operational assertion passes on the configured target release. A partial pass does not unblock production runtime-AI work.

### Required deterministic automated coverage

1. Schema Version 1 routes to the v1 generator without invoking version-2 code or either Skill.
2. Schema Version 2 binds the exact Current Specification, creates a run stamp, and queues the worker without creating ATF records.
3. Blank, unsupported, missing, multiple, draft-only, or wrongly bound Specifications fail preflight.
4. The worker never resolves a newer Current Specification in place of the bound one.
5. Exact table headers pass; renamed, reordered, missing, or extra columns fail.
6. Leading blank lines, invalid cell counts, invalid escapes, and unsupported structural syntax produce located Design Diagnostics.
7. CRLF and LF inputs preserve equivalent semantics and correct physical lines.
8. All Design Key scope, length, character, and uniqueness rules are covered.
9. Every supported and unsupported control-to-semantic mapping is covered.
10. Variable Set ownership, structural entries, fixed choices, baselines, references, and MRVS boundaries are validated.
11. Block splitting accepts only complete required anchors and never interprets condition or effect meaning.
12. Missing, duplicated, nested, or unterminated blocks fail before Skill invocation.
13. Every block has one target, one trigger, unique Behavior ID, and unique Outcome IDs.
14. Multiple trigger variables in one block are rejected.
15. Separate blocks with separate triggers remain independent even when their logic is equivalent.
16. Label-based variable and choice references fail and may produce only a non-mutating technical-name suggestion.
17. English instructions pass; Vietnamese, bilingual, and code-switched instructions fail outside quoted literals.
18. Quoted Unicode message and scalar literals preserve exact characters and whitespace.
19. Conditional blocks require ordered `If`, optional `Else if`, terminal `Otherwise`, and symmetric effect-property sets.
20. Nested branches and missing `Otherwise` fail without invented reverse behavior.
21. Every supported condition operator and valid type combination has a positive fixture.
22. Unsupported operators, ambiguous prose, invalid operands, and unknown identifiers fail.
23. Mixed `AND` and `OR` without parentheses fails; explicit grouping produces the exact canonical condition tree.
24. Every supported target-effect-directive combination is type checked.
25. One optional message type passes; mixed message types fail.
26. Exact Field and Form Message scope, type, text, and `CLEAR` semantics are preserved.
27. Duplicate Behavior Effect ownership and value-change cycles fail globally.
28. Canonicalization ignores irrelevant object-property order but preserves branch order and typed tree structure.
29. Any canonical difference in identity, trigger, branch, condition, effect, message, literal, or source lines produces `AI_INTERPRETATION_INCONSISTENT`.
30. Semantic disagreement invokes no retry, voter, third pass, or contract selection.
31. Each technical failure type receives one identical retry and no alternate model or prompt.
32. Two technical failures produce `AI_INTERPRETATION_TECHNICAL_FAILURE`, not `DESIGN_INVALID`.
33. An agreed but invalid or unsupported contract produces `DESIGN_INVALID`.
34. Variable Test Data is never included in either Skill input.
35. Candidate parsing covers independent values, repeated variables, physical order, Data Profiles, references, List Collectors, and MRVS rows.
36. Data Profile selection is indivisible, deterministic, limited to one profile, and supplementable by independent Candidates.
37. Coverage search prefers literals and Baseline, then profiles and Candidates in deterministic order.
38. Coverage search selects only the first satisfying assignment and does not multiply Tests for extra data.
39. The 10,000-assignment boundary, uncovered Outcome, and unavailable Change Stimulus all block the plan.
40. Every single-trigger Behavior Block produces exactly one planned Test per Outcome.
41. `ON CHANGE` plans establish non-trigger inputs first and apply one distinct trigger transition last.
42. `ON LOAD` plans reject Outcomes that require post-open Candidate assignment.
43. Reference resolution rejects zero, multiple, random, label, raw sys_id, dot-walk, and query-based matches.
44. Generated expectations never contain values inferred from source or observed runtime behavior.
45. One invalid aggregate collects all safely discoverable diagnostics without unsafe cascading.
46. Any blocking result prevents the persistence seam from being called.
47. AI Interpretation Evidence contains hashes and version identities but no raw prompt, response, or duplicate Design text.
48. Missing model metadata does not block generation, and cross-run contract equality is not asserted.

### Required target-instance prototype and integration coverage

1. Long-text fields round-trip every grammar-sensitive escape, line break, and Unicode literal through save, publish, read, and revision.
2. Two separate Now Assist Skills can be called from scoped background server-side code with structured outputs.
3. Skill independence is observable and the Verifier cannot access the Extractor output.
4. Background queueing retains the exact bound Specification identity and run stamp.
5. The configured Behavior Execution User is resolved, impersonated, and begins each Test in a fresh OOB Service Portal form.
6. Each supported control can be set and semantically read through a proven ATF seam.
7. Every supported scalar effect passes when the Catalog conforms and fails when the observable state is deliberately wrong.
8. Exact Decimal, Date, and UTC Date/Time comparisons are locale independent.
9. References and reference-like Lookup Select controls compare exact record identity.
10. List Collector assertions compare exact unordered membership.
11. Field and Form Messages distinguish scope, type, exact text, and clear state.
12. Readiness polling tolerates ordinary latency variation and reports a distinct timeout.
13. Single Row Variable Set children are addressable by Design identity.
14. MRVS setup, replacement, observation, whole-collection change, and `ROW_COUNT` are proven without row-level logic.
15. `ON LOAD` evidence proves post-open assignments cannot manufacture a load Outcome.
16. Protected Suite, Test, step, and membership writes work through target-release-supported boundaries.
17. Failure injection at every persistence stage leaves zero incomplete artifacts.
18. An instrumented run proves no UI Policy, Catalog Client Script, or Script Include source is queried for expected behavior.
19. Changing implementation while Design remains fixed changes only the observed ATF result, not the generated expectation.
20. Schema Version 1 continues to execute the unchanged permission path.

### End-to-end acceptance scenarios

The target instance must demonstrate at least:

1. A two-Outcome variable-change Behavior with one literal-reachable branch and one Candidate-reachable branch.
2. An ordered three-Outcome `If` / `Else if` / `Otherwise` Behavior.
3. A condition using two variables with `AND`.
4. A condition mixing `AND` and `OR` with explicit parentheses.
5. One rejected equivalent condition without required parentheses.
6. One Behavior asserting multiple effects on one target.
7. One exact Unicode Field Message and one exact Form Message in separate blocks.
8. One rejected display-label reference with a technical identifier suggestion and no silent substitution.
9. One form-load Behavior reachable only through baseline and fixed context.
10. One Reference, one List Collector, and one reference-like Lookup Select binding.
11. One Date and one exact UTC Date/Time assertion.
12. One Single Row Variable Set child Behavior.
13. One bounded MRVS whole-collection example where `ROW_COUNT` influences a supported scalar target.
14. One invalid Design containing multiple located errors and producing zero artifacts.
15. One canonical AI disagreement producing `AI_INTERPRETATION_INCONSISTENT` and zero artifacts.
16. One repeated technical AI failure producing `AI_INTERPRETATION_TECHNICAL_FAILURE` and zero artifacts.
17. One uncovered Outcome and one Value-Change Graph cycle rejection.
18. One successful run producing the exact expected Suite and Test count with non-raw provenance.
19. One deliberately broken Catalog implementation producing a failed ATF assertion without changing the generated oracle.
20. One Schema Version 1 run proving the permission baseline remains unchanged.

## Out of Scope

- Changing, regenerating, validating, updating, deleting, or combining version-1 permission Tests.
- Auto-migrating a Schema Version 1 Catalog Test Specification to Schema Version 2.
- A combined permission-and-behavior Suite.
- A Now Assist Agent, third semantic pass, majority vote, or direct AI generation of ATF artifacts.
- AI interpretation of Variable Design or Variable Test Data.
- A deterministic Catalog Behavior DSL parser as a fallback for failed Runtime AI Interpretation.
- Test Designer confirmation of normalized AI contracts before generation continues.
- Persisting raw prompts, raw responses, complete AI conversations, or duplicate Design text.
- Model pinning, model qualification, model compatibility gates, or cross-run equality guarantees.
- A custom Generation Run, Prompt, Response, Interpretation, Variable, Scenario, Dependency, or Test Data table.
- Result email, notification, Execution Tracker integration, Last Generation fields, or mutable execution status on a Published Specification.
- Catalog Test Scenarios, authored cross-contract sequences, state preservation across Behavior Blocks, or cross-target grouping.
- Cross-contract Cartesian test generation.
- Dependency Design, Dependency Test Data, Catalog Dependency Contracts, `USE DEPENDENCY ... WITH ...`, dependency fixtures, or dependency test doubles.
- Parsing or interpreting UI Policies, Catalog Client Scripts, Script Includes, APIs, source code, or observed implementation behavior.
- Inferring the Script Include called by a Client Script as expected behavior.
- A general constraint solver, open-domain value synthesis, generated business data, random data, or random/first live-record selection.
- Silent correction of identifiers, labels, internal values, branches, conditions, effects, directives, or literals.
- Multiple triggers in one Behavior Block.
- Nested Business Logic branches.
- Multiple targets or multiple message types in one Behavior Block.
- Dynamic choice addition, removal, filtering, relabeling, or reordering.
- Reference qualifier behavior and code-valued Lookup Select behavior.
- UI layout and Catalog Presentation Detail testing, including labels, annotations, containers, splits, order, color, CSS, and help text.
- Employee Center, Native Platform Catalog UI, custom Portals, and custom Catalog widgets.
- Catalog submission, add-to-cart, order, request, requested-item, Catalog Task, approval, fulfillment, and post-submission behavior.
- `ON SUBMIT` behavior.
- Current-time-dependent behavior, relative dates, locale dates, and timezone-free timestamps.
- Multiple Behavior Execution Users, persona matrices, or permission-dependent behavior coverage.
- MRVS child-cell triggers, row predicates, per-row effects, cross-row logic, unsupported aggregates, arbitrary JSON traversal, or nested MRVS.
- Deduplication, reconciliation, in-place Suite updates, successful-run cleanup, or automatic Suite execution.
- Silently skipping, approximating, downgrading, or partially generating unsupported Design.
- Any Deferred Grill Backlog item not explicitly included in this specification.

## Further Notes

### Complete authoring example

Variable Design:

~~~text
entry_key | entry_kind | parent_key | label | control_type | semantic_type | value_domain | default | visible | mandatory | read_only | reference_table | order
employee_type | variable | | Employee Type | select_box | choice | employee=Employee;contractor=Contractor;intern=Intern | "employee" | true | true | false | | 100
country | variable | | Country | select_box | choice | vietnam=Vietnam;singapore=Singapore | "vietnam" | true | true | false | | 200
manager | variable | | Manager | reference | reference | | EMPTY | false | false | false | sys_user | 300
~~~

Business Logic:

~~~text
BEHAVIOR_ID: manager_by_employee_type
TARGET: manager

TRIGGER:
When employee_type changes

LOGIC:
If employee_type is contractor and country is vietnam:
OUTCOME_ID: vietnam_contractor
- manager is visible.
- manager is mandatory.
- Show WARNING on manager: "Vui lòng chọn người quản lý".

Else if employee_type is intern:
OUTCOME_ID: intern
- manager is visible.
- manager is not mandatory.
- Clear WARNING on manager.

Otherwise:
OUTCOME_ID: other_employee
- manager is hidden.
- manager is not mandatory.
- Clear WARNING on manager.

END
~~~

Variable Test Data:

~~~text
test_value_key | variable_key | value | data_profile_key | mrvs_row_key
employee_contractor | employee_type | "contractor" | vietnam_contractor_profile |
country_vietnam | country | "vietnam" | vietnam_contractor_profile |
employee_intern | employee_type | "intern" | |
employee_standard | employee_type | "employee" | |
~~~

The Test Designer has entered one reusable variable model, one target-owned behavior with three Outcomes, and a finite Candidate pool. The Test Designer has not authored Test names, Outcome-to-data mappings, ATF steps, before/after columns, source code, or implementation details.

When both Skills return the same canonical contract and deterministic validation finds coverage, the generator derives three independent Tests for the one declared `employee_type` change trigger: `vietnam_contractor`, `intern`, and `other_employee`.

### Runtime flow

~~~text
Published Current Specification
        ↓
Create ATF: bind Specification + Schema Version + run stamp
        ↓
Queue Background Behavior Generation
        ↓
Deterministically split Business Logic into blocks
        ↓
For each block:
  Extractor Skill ───────────────→ Contract A
  Independent Verifier Skill ───→ Contract B
        ↓
Canonical A == Canonical B
        ↓
Deterministic cross-Design and global validation
        ↓
Variable Test Data selection and test derivation
        ↓
Complete immutable Generation Plan
        ↓
Atomic ATF persistence
~~~

Any terminal failure before the last step produces zero ATF artifacts. The only accepted terminal successes are a complete behavior-only Suite and its complete Tests.

### Recommended implementation sequence

1. Execute the Runtime AI Feasibility Gate with two throwaway Skills and the repeated reviewed corpus.
2. Stop for an explicit scope decision if the gate fails; do not begin runtime-AI production implementation.
3. Execute remaining ServiceNow capability prototypes and capture the required evidence before dependent production work.
4. Add or validate the three version-2 KB fields and authoring view without altering version-1 behavior.
5. Implement deterministic table parsing, structural block splitting, canonical contract schema, canonicalization, semantic validation, coverage derivation, and immutable Generation Planning.
6. Create the two production Now Assist Skills and the server-side background orchestrator only after the feasibility gate passes.
7. Add Schema-Directed Generation and background queueing while keeping the Schema Version 1 route unchanged.
8. Implement only adapters whose platform gates pass.
9. Implement exact Execution Binding validation and atomic artifact persistence.
10. Add target-instance integration coverage and acceptance examples.
11. Prove source opacity by changing implementation while keeping Design fixed.
12. Package only after every in-scope gate, automated test, type check, lint check, build check, and v1 regression check passes.

### Definition of done

The POC is done only when:

- the Runtime AI Feasibility Gate passes in full on the configured target release;
- every other claimed platform capability has a passing prototype with recorded evidence;
- the two production Now Assist Skills are independent, structured, background-callable, and used only for Business Logic interpretation;
- every supported repeated fixture produces the exact reviewed canonical contract and every invalid fixture is rejected;
- all three Structured Design fields round-trip through the real Knowledge lifecycle;
- all blocking terminal results leave zero ATF artifacts;
- every supported example produces the exact complete Generation Plan required by this specification;
- a successful real-instance run creates one complete behavior-only Suite with exactly one Test per Behavior Block Outcome;
- all supported Service Portal control and effect mappings have positive and negative evidence;
- no generated Test submits the Catalog Item;
- no expected result is derived from source or observed implementation;
- no raw AI prompt or response is persisted;
- no custom table or Now Assist Agent has been created;
- Schema Version 1 permission generation and tests remain unchanged;
- no out-of-scope or Deferred Grill Backlog capability has been silently included;
- documentation, diagnostics, generated names, and issues use the canonical domain language.

### Handoff state

This PRD records the confirmed shared understanding for the ATF Generation version-2 POC and is published with Status `ready-for-agent`. It authorizes prototype work first. It does not authorize AI-dependent production implementation before the Runtime AI Feasibility Gate passes. A failed gate that would remove or materially weaken a promised capability returns the work for an explicit scope decision instead of allowing an implementing agent to improvise a fallback.
