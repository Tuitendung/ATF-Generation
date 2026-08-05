# ATF Generation

This context describes the language used to generate Automated Test Framework artifacts for ServiceNow catalog items.

## Language

**Catalog Item Under Test**:
The catalog item selected by a test designer as the subject of generated automated tests.
_Avoid_: Current item, target item, project

**ATF Generation**:
The deliberate creation of automated-test artifacts for a Catalog Item Under Test.
_Avoid_: Test creation, record generation

**Generation Run**:
One independent invocation of ATF Generation that binds to the exact Current Specification present when the run starts and produces its own Test Suite and the Tests supported by that generation version, even when another run used the same inputs.
_Avoid_: Existing generation, synchronized generation, regenerated suite

**Test Designer**:
A trusted person who authors and publishes Catalog Test Specifications and initiates and maintains ATF Generation for catalog items; in the team demo this persona has `atf_test_admin` and is distinct from a requester who orders a catalog item.
_Avoid_: User, requester, end user, separate specification author

**Catalog Test Specification Template**:
The project-owned, versioned schema shared by Catalog Test Specifications across catalog items and test capabilities; “Template” means this structured contract, not ServiceNow's native Knowledge Article Template feature.
_Avoid_: KB design, native Knowledge Article Template, permission template, test-case template

**Logical Specification Schema**:
The evolving structured contract for Specification Sections; version 1 resolves Permission Design, version 2 resolves Catalog behavior Design, and later sections become authoritative only after their capability-specific grill is completed.
_Avoid_: Deployed fields, assumption that roadmap sections are already defined, live Catalog inventory

**V1 Physical Specification Schema**:
The permission-focused subset of the Logical Specification Schema that is deployed on `kb_knowledge` for the team demo.
_Avoid_: Complete template, future-section storage, logical contract

**Schema-Directed Generation**:
The rule that a Current Specification's Schema Version selects exactly one compatible generation capability: version 1 generates permission coverage, while version 2 generates Catalog behavior coverage.
_Avoid_: Combined v1-and-v2 run, inferred version, manual generator selection

**Catalog Test Specification**:
The authoritative, machine-readable description of the expected test-relevant behavior for a Catalog Item Under Test and the sole source used by ATF Generation.
_Avoid_: KB, project description, observed catalog model, free-form design document

**Specification Aggregate**:
One Catalog Test Specification revision together with all of its owned structured Design entries, validated, published, and treated as a single immutable whole for ATF Generation.
_Avoid_: Knowledge Article alone, independently mutable Design row, latest related data

**Specification Section**:
A capability-focused portion of a Catalog Test Specification, such as permissions, variables, client behavior, server behavior, or fulfillment.
_Avoid_: Test case, template

**Structured Design Section**:
A named Specification Section whose content follows a Schema-Versioned input contract; tabular sections use deterministic text grammars, while version-2 Business Logic uses the Guided Business Logic Template and Runtime Business Logic Interpretation.
_Avoid_: Free-form table, unanchored prose, Article Body notes, best-effort format

**Atomic Design Validation**:
The all-or-nothing validation of every Design Section consumed by the active generation version before artifact creation, where any Design Error prevents every ATF artifact in the Generation Run while safely discoverable diagnostics are reported together.
_Avoid_: Partial generation, skipped invalid behavior, fail-after-write, best-effort suite

**Design Diagnostic**:
A structured `ERROR` or `INFO` result identifying a Specification Section, physical line or `0` for a section-level problem, relevant Design key when available, stable code, and human-readable message; only `ERROR` blocks generation in the POC.
_Avoid_: Warning, unlocated parser message, silent correction, log-only failure

**Value-Change Graph**:
The directed Design graph whose edges run from each variable-specific `ON CHANGE` trigger to its target variable whenever any branch may assign `SELF.VALUE`; the POC requires this graph to be acyclic.
_Avoid_: UI Policy execution order, Client Script call graph, state-effect graph, inferred runtime loop

**Design Text Table**:
A Structured Design Section whose first line is its exact Schema-Versioned header and whose subsequent records use the fixed header order and pipe (`|`) delimiter.
_Avoid_: Markdown table, inferred columns, reordered header, free-form row

**Design Key**:
A stable, lowercase `snake_case` identifier of 1 through 64 characters, beginning with a letter and used to reference a Design-owned entry, Behavior, Outcome, Candidate Test Value, Data Profile, or MRVS Test Row within its defined scope. Guided Business Logic names variables by their Variable Design `entry_key`, never by their display label.
_Avoid_: Display label, technical label, row number, generated ID, whitespace-bearing name, case-insensitive alias

**Design Escape Sequence**:
One of the five supported backslash forms `\|`, `\;`, `\=`, `\"`, or `\\`, representing a literal pipe, semicolon, equals sign, double quote, or backslash in Structured Design text.
_Avoid_: Quoted-cell protection, arbitrary backslash sequence, implicit escape repair

**Test Expectation**:
A structured rule within a Specification Section that states behavior the Catalog Item Under Test is expected to exhibit.
_Avoid_: Observed behavior, implementation rule, discovered behavior

**Catalog Behavioral Contract**:
A structured, implementation-mechanism-independent expected-behavior definition within a Catalog Test Specification that declares relevant triggers, preconditions, inputs, dependency outcomes, and observable effects without storing or interpreting executable implementation code.
_Avoid_: UI Policy contract, Client Script contract, source-code snapshot, script copy, inferred implementation logic, executable Design

**Variable Design**:
The Specification Section that declares the stable identity, hierarchy, supported type, value domain, and baseline state of Catalog variables and supported Variable Sets.
_Avoid_: Live variable inventory, variable spreadsheet, separate Variable Set Design, implementation snapshot

**Variable Design Entry**:
One authoritative Variable Design record identified by `entry_key`; its `entry_kind` declares whether it is a variable, Single Row Variable Set, or Multi Row Variable Set, and its optional `parent_key` places a variable inside a Variable Set. Variable Sets cannot be nested, and among Variable Design Entries only variable entries may be Behavior Block targets.
_Avoid_: Variable Design Row, separate Variable Set row type, duplicate variable entry, implementation variable record

**Variable Test Data**:
The Specification Section containing Candidate Test Values and optional Data Profile membership from which ATF Generation derives behavior coverage without Test Designer-authored Behavior or Outcome mappings.
_Avoid_: Generated test case, outcome-bound dataset, observed runtime value, expected effect

**Candidate Test Value**:
A named, typed literal or fixture reference explicitly supplied for one variable in an ordered finite input pool that ATF Generation may evaluate and select when constructing a Derived Behavior Test Case; it is not assigned by the Test Designer to a Behavior or Outcome.
_Avoid_: Expected effect, generated value, outcome mapping, random live value

**Reference Candidate Binding**:
A `REFERENCE_BY(unique_field, "value")` Candidate Test Value that resolves exactly one existing record from the target variable's Design-declared `reference_table` for test execution without making that live record a source of expected behavior.
_Avoid_: Raw sys_id, display-label match, arbitrary query, dot-walk, random reference record

**Reference Set Candidate**:
An unordered, duplicate-free `REFERENCE_SET(...)` Candidate Test Value for a List Collector whose members are Reference Candidate Bindings and whose exact resolved membership, but not display order, is test-relevant.
_Avoid_: Ordered reference list, comma-separated sys_ids, partial membership assertion, duplicate member

**Reference-Like Lookup Select**:
A supported Lookup Select whose semantic value is the `sys_id` of exactly one record from its Design-declared `reference_table` and whose Candidate Test Values therefore use Reference Candidate Bindings.
_Avoid_: Code-valued lookup, dynamic option-domain test, lookup-label oracle, arbitrary qualifier behavior

**Data Profile**:
An optional named group of Candidate Test Values that must be selected together to preserve a Design-known business-data relationship; it may be evaluated for multiple behaviors and does not declare a test case, Outcome, sequence, or expected effect.
_Avoid_: Variable Set, Catalog Test Scenario, outcome dataset, generated test case

**Coverage Assignment Search**:
The bounded deterministic evaluation of Baseline Variable State, exact Business Logic literals, at most one Data Profile, and independently selectable Candidate Test Values to find the first complete assignment satisfying one trigger-outcome pairing.
_Avoid_: Random sampling, unbounded Cartesian product, multiple combined Data Profiles, solver-invented value

**Generation Plan**:
The complete immutable description of one behavior-only Test Suite, its Derived Behavior Test Cases, selected Design-owned inputs, ordered stimuli, expected effects, and provenance that must exist before any version-2 ATF artifact is written.
_Avoid_: Partial plan, AI artifact output, incrementally discovered test, written Suite shell

**MRVS Test Row**:
One ordered row of Candidate Test Values for variables directly owned by a Multi Row Variable Set, identified within a Data Profile and MRVS parent by a shared `mrvs_row_key`.
_Avoid_: Database row, custom-table record, nested MRVS row, independent candidate

**MRVS Behavioral Boundary**:
The version-2 limit that treats an MRVS as a whole ordered collection for Test Data, Change Stimulus setup, verification, `ON CHANGE(mrvs_key)`, and integer `ROW_COUNT(mrvs_key)` conditions, but never as a Behavior target that receives effects.
_Avoid_: MRVS `SELF` target, row-level behavior engine, MRVS JSON script, nested collection logic, arbitrary aggregate

**Explicit Test Data**:
Concrete, Design-owned Variable Test Data or Dependency Test Data supplied for values that are not already unambiguously present as literals or empty-state semantics in a Behavior Block.
_Avoid_: Inferred test value, random live record, generated business data, constraint-solver output

**Explicit Empty Value**:
The `EMPTY` Design token declaring that a value-bearing variable state or test input is expected to contain no value; it is distinct from an empty Design Text Table cell, which declares no value because that column is inapplicable or omitted where permitted.
_Avoid_: Blank Design cell, missing value, inferred empty value, null metadata

**Behavior Block**:
One explicitly identified, targeted, and delimited `BEHAVIOR_ID: ...`, `TARGET: ...`, `TRIGGER: ...`, `LOGIC: ...`, `END` unit in the Business Logic Structured Design Section that describes a trigger, optional conditions, and target-owned expected effects; its target is a variable entry or the reserved Catalog Form Target, and it may declare at most one message type.
_Avoid_: Unanchored logic, free-form paragraph, duplicated variable row, unterminated rule, mixed message types

**Catalog Control Type**:
The Design-declared kind of requester-facing ServiceNow control or form structure used by a Variable Design entry, independent of how the entry's value is interpreted.
_Avoid_: Semantic type, inferred live control, arbitrary field type

**Semantic Value Type**:
The Design-declared meaning and comparison domain of a variable's value, such as text, decimal, choice, or reference, independent of the Catalog Control Type used to render it.
_Avoid_: Display control, storage guess, inferred data type

**Choice Value Domain**:
The fixed, ordered set of allowed internal values and display labels declared inline in a choice variable's `value_domain` cell as semicolon-separated `value=Label` pairs; version 2 does not change this set at runtime, and Guided Business Logic references a choice only by its internal value.
_Avoid_: Choice display label as logic input, comma-only choice list, label-only choice list, dynamic choice list, live choice discovery, separate Choice Design table

**Supported Variable Type**:
A Catalog Control Type explicitly included in the closed, versioned ATF Generation capability boundary and therefore eligible for deterministic validation and test generation.
_Avoid_: Best-effort type, silently skipped type, arbitrary custom control

**Structural Variable Entry**:
A non-interactive Variable Design entry, such as a label, annotation, container, or split, that describes form presentation but cannot be a Behavior target, Declared Trigger, condition input, or Candidate Test Value owner in the version-2 POC.
_Avoid_: Input variable, testable UI state, supported Behavior target, silently ignored variable

**Catalog Presentation Detail**:
A requester-facing layout or styling concern such as a label, annotation, container, split, ordering, color, or CSS that is outside Behavioral Conformance in the version-2 POC.
_Avoid_: Variable visibility, mandatory state, read-only state, value, Field Message

**Guided Business Logic Template**:
The versioned Business Logic text format in which every Behavior Block is anchored by `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END`, and every declared branch is named by `OUTCOME_ID`; anchors and logic references use Design Keys, Variable Design `entry_key` values, and choice internal values, while Runtime Business Logic Interpretation converts Bounded Natural Language into Catalog Behavioral Contracts.
_Avoid_: Catalog Behavior DSL, unanchored free-form prose, display-label reference, JavaScript, source-code fragment

**Bounded Natural Language**:
The flexible wording permitted inside a Guided Business Logic `LOGIC` section to state only the closed, versioned condition and effect semantics supported by ATF Generation; an ambiguous, invented, or unsupported meaning is invalid rather than interpreted approximately.
_Avoid_: Unrestricted prose, hidden expected behavior, best-effort semantic match, implementation narrative

**POC Business Logic Language**:
The English-only Bounded Natural Language used for Guided Business Logic instructions in version 2; exact quoted message text and scalar text values may contain any Unicode language and must be preserved without translation or rewriting.
_Avoid_: Bilingual instruction, code-switched logic, translated expected literal, English-only message value

**Business Logic Expression**:
A guided natural-language expected-behavior statement authored inside the `LOGIC` portion of one Behavior Block and interpreted into typed conditions and target-owned effects during a Generation Run.
_Avoid_: Unanchored narrative, Variable Design cell, source-code fragment, implementation rule

**Runtime Business Logic Interpretation**:
The AI-mediated interpretation of the Current Specification's published Business Logic during each version-2 Generation Run, without a separate Test Designer confirmation of the interpreted result before ATF Generation continues.
_Avoid_: Authoring-only AI assistance, pre-publish AI draft, user-confirmed normalized Design

**Background Behavior Generation**:
The version-2 Generation Run that begins after `Create ATF` binds and queues the exact Current Specification, then performs Runtime Business Logic Interpretation, validation, test derivation, and atomic behavior-artifact persistence outside the initiating UI request.
_Avoid_: Synchronous AI UI Action, unbound background lookup, pre-validation ATF writes

**Validated AI Interpretation**:
A Runtime Business Logic Interpretation that conforms to the versioned structured-output contract and passes deterministic cross-validation against the complete Design before it may drive test derivation; any invalid or incomplete interpretation blocks the whole Generation Run.
_Avoid_: Trusted raw model output, partial AI interpretation, best-effort AI generation

**AI Logic Extraction**:
The first Runtime Business Logic Interpretation pass that converts one complete Guided Business Logic Behavior Block into a normalized Catalog Behavioral Contract and cites the Business Logic Physical Lines supporting every extracted trigger, condition, outcome, and effect.
_Avoid_: Direct ATF generation, uncited model output, implementation-derived logic

**AI Interpretation Verification**:
The second, independent Runtime Business Logic Interpretation pass that receives the same original Design context but never sees AI Logic Extraction and produces another normalized contract with complete source-line evidence for canonical comparison.
_Avoid_: Extractor-aware review, Extractor self-approval, PASS-only verdict, user confirmation

**Canonical Interpretation Agreement**:
The exact semantic equality required between independently produced, deterministically canonicalized AI Logic Extraction and AI Interpretation Verification contracts before either may drive validation or test derivation.
_Avoid_: Majority choice, approximate match, confidence threshold, raw JSON equality

**AI Interpretation Inconsistency**:
The blocking result when independently produced AI contracts lack Canonical Interpretation Agreement; it ends the Generation Run without retrying for a more convenient interpretation and creates no ATF artifacts.
_Avoid_: Retried semantic vote, selected interpretation, majority agreement, partial generation

**AI Interpretation Technical Failure**:
The non-Design failure result after an Extractor or Verifier transport, timeout, availability, rate-limit, malformed-response, or schema-response error also fails on one identical retry; it ends the Generation Run with no ATF artifacts without classifying the Current Specification as invalid.
_Avoid_: Design Diagnostic, semantic retry, alternate-model fallback, unlimited retry

**AI Interpretation Evidence**:
The non-raw provenance that correlates a Generation Run to its Specification, Business Logic source locations, exposed model deployment and version, prompt and output-schema versions, attempt counts, canonical hashes, agreement result, and structured differences without copying Design text or model conversations.
_Avoid_: Raw prompt log, raw model response, duplicated Design archive, custom AI run table

**Runtime AI Feasibility Gate**:
The mandatory pre-production proof that the target ServiceNow release can invoke both independent interpretation Skills from background application code and produce exact expected canonical contracts for the supported repeated corpus while consistently rejecting invalid Design and creating no ATF artifacts.
_Avoid_: Production experiment, one successful demo, best-effort accuracy, silent deterministic fallback

**Block-Scoped AI Interpretation**:
The rule that each deterministically delimited Guided Business Logic Behavior Block receives its own AI Logic Extraction and AI Interpretation Verification while cross-block ownership, cycles, and completeness are validated only after all normalized contracts are merged.
_Avoid_: Whole-section AI interpretation, AI-based block splitting, independently generated partial suite

**Block-Independent Test Derivation**:
The version-2 POC rule that each single-trigger Guided Business Logic Behavior Block remains an independent Catalog Behavioral Contract and produces one Derived Behavior Test Case for each of its Declared Outcomes without grouping or merging effects from another block.
_Avoid_: Cross-target Behavior Key, AI-inferred block grouping, multi-target merged test

**Technical Identifier Enforcement**:
The rule that Guided Business Logic may refer to variables only by `entry_key` and fixed choices only by internal value; a detected display label blocks generation even when the system can suggest the corresponding technical identifier.
_Avoid_: Silent label mapping, label-based expected behavior, automatic identifier correction

**Business Logic Physical Line**:
One retained physical line of the Guided Business Logic Template used to locate source evidence and Design Diagnostics for Runtime Business Logic Interpretation.
_Avoid_: AI-only location, rewritten source position, unlocated interpretation error

**Typed Condition Expression**:
A normalized condition tree produced by Runtime Business Logic Interpretation and accepted only when its Design Keys, internal values, closed operators, operands, types, and explicit boolean grouping pass deterministic validation; mixing `AND` and `OR` requires parentheses and has no implicit precedence.
_Avoid_: Implicit boolean precedence, scripted condition, label-based reference, encoded query, opaque unvalidated condition, dynamically evaluated expression

**Typed Value Expression**:
A normalized expression produced by Runtime Business Logic Interpretation that derives one expected effect value from typed literals and declared variable values using only the closed, type-valid operator and function set of its Schema Version.
_Avoid_: JavaScript expression, label-based reference, arbitrary function, runtime query, implementation-derived value

**Design Scalar Literal**:
A typed scalar value owned by Design: Variable Design and Variable Test Data use double-quoted text and choice values, unquoted integers and decimals, lowercase `true` or `false`, `EMPTY`, an ISO Date, or an ISO UTC Date/Time; Guided Business Logic names a fixed choice by its exact unquoted internal-value token and preserves explicitly quoted text literals exactly.
_Avoid_: Choice display label, locale number, locale date, AI-rewritten literal, implementation-derived value

**Exact Design Number**:
A signed base-10 Integer or Decimal with at most 15 total digits and at most 6 fractional digits, evaluated with exact decimal semantics and explicit `ROUND` for division or scale reduction.
_Avoid_: Floating-point approximation, exponent notation, grouped number, locale-formatted number, implicit rounding

**Design Date Literal**:
An exact calendar date written as `YYYY-MM-DD`, independent of display locale and timezone.
_Avoid_: Locale-formatted date, TODAY, relative date, observed system date

**Design Date-Time Literal**:
An exact UTC instant written as `YYYY-MM-DDTHH:mm:ssZ` and compared semantically rather than by its user-timezone display string.
_Avoid_: Local display timestamp, NOW, relative time, timezone-free timestamp

**Catalog Dependency Contract**:
A Design-owned definition of external information needed by Catalog Form Behavior, expressed as typed inputs, declared outcomes, and typed outputs independently of whether the implementation uses a Script Include, API, cache, or another mechanism.
_Avoid_: Script Include Design, live call definition, implementation interface, observed response

**Scenario Dependency Result**:
The expected outcome and concrete typed outputs that a Catalog Test Scenario declares for one Catalog Dependency Contract and from which dependency expressions derive expected behavior.
_Avoid_: Live dependency response, observed Script Include output, implementation-derived expected data

**Dependency Test Data**:
A named, reusable Design dataset for one Catalog Dependency Contract that supplies typed inputs, an expected outcome, required typed outputs, and an explicit Execution Binding for Derived Behavior Test Cases or optional Catalog Test Scenarios.
_Avoid_: Live dependency response, manually authored test case, implementation-derived expected data

**Target-Owned Business Logic**:
The rule that a Business Logic Expression may declare expected effects only for its declared variable or Catalog Form Target through `SELF`, while other variables may appear only as triggers, conditions, or dependency inputs.
_Avoid_: Cross-entry mutation, arbitrary rule owner, driver-owned effect block

**Behavior Effect Owner**:
The single Behavior ID authorized to declare one effect property for one variable or Catalog Form Target under one Declared Trigger; another Behavior ID cannot own the same trigger-target-property combination.
_Avoid_: Overlapping rule, condition-priority guess, implementation execution order, shared effect owner

**Behavior Effect**:
One observable target property declared as the expected result of a Behavior branch; the version-2 POC recognizes only `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and `MESSAGE`.
_Avoid_: Label mutation, help-text mutation, choice mutation, reference qualifier, layout or style change

**Effect Value Directive**:
A reserved effect value with one exact purpose: `BASELINE` restores a Variable Design baseline, `KEEP` preserves the target's pre-stimulus state, `EMPTY` expects no variable value, and `CLEAR` expects no message of the declared type.
_Avoid_: Implicit reverse, universal keyword, implementation instruction, guessed prior state

**Catalog Form Target**:
The reserved `CATALOG_FORM` Behavior Block target representing the requester-facing form itself rather than a Variable Design Entry; version 2 uses it only for form-level observable effects such as Form Messages.
_Avoid_: Synthetic variable, Variable Set target, DOM selector, custom widget target

**Field Message**:
An `INFO`, `WARNING`, or `ERROR` message observably associated with one target variable and declared through that variable's target-owned Business Logic; Behavioral Conformance requires the declared scope, type, and visible text to match exactly.
_Avoid_: Form Message, HTML injection, inferred client-script message

**Behavior Message Type**:
The single optional `INFO`, `WARNING`, or `ERROR` message category selected by one Behavior Block and used consistently across all of that block's Declared Outcomes.
_Avoid_: Multiple message types in one Behavior, inferred severity, untyped message

**Form Message**:
An `INFO`, `WARNING`, or `ERROR` message observably associated with the Catalog form as a whole and declared through the Catalog Form Target; Behavioral Conformance requires the declared scope, type, and visible text to match exactly.
_Avoid_: Field Message, custom banner, DOM notification, inferred client-script message

**Behavior ID**:
A Test Designer-authored Design Key declared by `BEHAVIOR_ID` that uniquely identifies one independent Guided Business Logic Behavior Block within a Specification; the POC never shares it across blocks or uses it to group different targets.
_Avoid_: Cross-target grouping key, AI-generated ID, row number, variable label, generated rule name

**Catalog Form Behavior**:
Expected pre-submission behavior observable while a requester-facing Catalog Item form loads or reacts to variable changes, including variable values, fixed choice domains, messages, visibility, mandatory state, and read-only state.
_Avoid_: Order behavior, request fulfillment, Catalog Task behavior

**Change Stimulus**:
The final, real value transition applied to the variable named by an `ON CHANGE` trigger after all other preconditions are established; it consists of distinct before and after values selected from explicit Business Logic, Baseline Variable State, or Candidate Test Values.
_Avoid_: Re-setting the same value, setup assignment, inferred live transition, authored ATF step

**Declared Trigger**:
Exactly one load event or one variable-specific change event explicitly named by a Guided Business Logic Behavior Block; a block cannot combine load and change events or name multiple change variables.
_Avoid_: Multiple triggers in one block, discovered implementation event, combined trigger, inferred UI Policy watch list

**Load Context**:
The Design-owned baseline, execution context, Managed Fixture state, and bound dependency results already effective before or during Catalog form opening and therefore eligible to select an `ON LOAD` outcome.
_Avoid_: Post-load variable assignment, simulated load branch, observed live context

**Behavioral Conformance**:
The agreement between the observable Catalog Form Behavior produced when the implementation runs and the expected behavior declared by the Current Specification, regardless of which implementation mechanism produces it.
_Avoid_: UI Policy existence check, Client Script inspection, source-code conformance, structural implementation conformance

**Execution Binding**:
A non-authoritative mapping from a Design identity or declared dependency to the live record, ATF metadata, managed fixture, or test seam required to execute a generated test; it enables execution but never determines expected behavior.
_Avoid_: Test oracle, expected result, inferred behavior, implementation Design

**Behavior Execution User**:
The single application-configured active user impersonated by every version-2 Derived Behavior Test Case to operate the Catalog Item Under Test in OOB Service Portal; this user is an Execution Binding and never a Permission Audience or source of expected behavior.
_Avoid_: Representative Test User, Test Designer, requester selected in Design, permission oracle

**Behavior Execution Profile**:
The application-owned configuration that binds version-2 tests to the OOB Service Portal route, Behavior Execution User, and bounded readiness timeout without contributing any Test Expectation.
_Avoid_: Catalog Test Specification, Permission Design, per-Behavior user, expected behavior

**Managed Fixture**:
An explicitly selected Execution Binding that prepares or verifies isolated prerequisite data so the real dependency implementation can encounter a Scenario Dependency Result deterministically.
_Avoid_: Production data assumption, live lookup as oracle, implicit test setup

**Dependency Test Double**:
An explicitly selected, ATF-isolated Execution Binding that supplies a Scenario Dependency Result to the real consuming Catalog behavior when a deterministic real-dependency outcome cannot be produced safely with a Managed Fixture.
_Avoid_: Mocked expected result, global override, production fallback, provider-conformance test

**Baseline Variable State**:
The expected value, visibility, mandatory state, and read-only state declared by Variable Design before a conditional Catalog Form Behavior changes them.
_Avoid_: Current runtime state, observed default, inferred initial state

**Branch-Complete Behavior**:
A conditional Business Logic Expression whose Guided Business Logic Template explicitly states its first conditional case, any ordered intermediate cases, and one terminal `Otherwise`; every case declares the same target-property effect set and assigns each effect an explicit value or explicitly requested `BASELINE`, `KEEP`, or `CLEAR` semantics.
_Avoid_: AI-inferred reverse, omitted Otherwise, missing branch effect, assumed opposite state

**Unconditional Behavior**:
A Guided Business Logic Behavior Block with exactly one Declared Outcome named by `OUTCOME_ID` inside `LOGIC`, followed by its complete target-owned effect list and no `If`, `Else if`, or `Otherwise` branches.
_Avoid_: Outcome without an ID, implicit branch, unnecessary Otherwise, Outcome on a trigger line

**Pre-Submission Boundary**:
The version-2 capability boundary that ends before ordering or submitting the Catalog Item and excludes Request, Requested Item, Catalog Task, approval, and fulfillment behavior.
_Avoid_: End-to-end fulfillment, successful submission path, downstream task testing

**Dependency-Free POC Boundary**:
The version-2 POC limit in which Variable Design, Business Logic, Variable Test Data, fixed execution records, and observable final effects are sufficient to generate tests, while dependency contracts, dependency outcomes, dependency bindings, and nondeterministic external-result branches are unsupported.
_Avoid_: Script Include model, partial dependency support, live dependency oracle, silently skipped external branch

**Derived-Tests-Only POC Boundary**:
The version-2 POC limit in which ATF Generation creates only independent Derived Behavior Test Cases and neither accepts Catalog Test Scenarios nor composes sequences across Catalog Behavioral Contracts.
_Avoid_: Authored scenario field, automatic cross-behavior sequence, Cartesian behavior suite, implicit chained behavior

**Declared Outcome**:
A behavioral branch within a Catalog Behavioral Contract, identified by an Outcome ID, that states the conditions or dependency result for that branch and its observable expected effects; version 2 generates one Derived Behavior Test Case for each pairing of that outcome with a Declared Trigger.
_Avoid_: Discovered branch, inferred path, implementation branch

**Outcome ID**:
A Test Designer-authored Design Key declared by `OUTCOME_ID` and unique within one Behavior Block that names a Declared Outcome for generated-test identity and validation diagnostics without mapping Test Data or supplying that outcome's expected effects.
_Avoid_: AI-generated ID, branch position, Test Data field, expected result, test-case number, inferred branch name

**Derived Behavior Test Case**:
A test case ATF Generation constructs for one Declared Trigger and Declared Outcome pairing by selecting Candidate Test Values or a Data Profile that satisfies its preconditions and stimulus, without requiring the Test Designer to map data to the Outcome or author a Catalog Test Scenario.
_Avoid_: Manually authored scenario, cross-contract combination, Cartesian permutation

**Catalog Test Scenario**:
A post-POC Design-owned composition that may bind initial state, test data, stimulus, dependency outcome, and participating Catalog Behavioral Contracts for one coherent cross-contract behavior whose expected effects remain owned by those contracts; it is not accepted by the version-2 POC.
_Avoid_: POC input, automatic combination, Cartesian combination, generated permutation

**Current Specification**:
The single published revision of a Catalog Test Specification that currently authorizes ATF Generation for its Catalog Item Under Test.
_Avoid_: Latest draft, working copy, any published version

**Specification Knowledge Base**:
The single application-owned Knowledge Base dedicated exclusively to Catalog Test Specifications.
_Avoid_: General Knowledge Base, administrator-selected Knowledge Base, title-matched Knowledge Base

**Permission Audience**:
The group of people represented by one User Criteria reference in a permission Test Expectation.
_Avoid_: Role, test user, candidate pool

**Representative Test User**:
The exact user named by a permission Test Expectation for ATF to impersonate on behalf of its Permission Audience.
_Avoid_: Candidate user, resolved user, requester

**Catalog Access Surface**:
The end-user experience in which a permission Test Expectation evaluates whether the Catalog Item Under Test can be opened; for the team demo, this is Service Portal.
_Avoid_: ATF Generation form, administrative Catalog Item form, Platform UI

**Catalog Behavior Execution Surface**:
The requester-facing surface on which Derived Behavior Test Cases stimulate and observe Catalog Form Behavior; the version-2 POC uses only the out-of-box Service Portal Catalog Item page.
_Avoid_: Expected-behavior source, Employee Center, Native Platform Catalog UI, custom Portal, custom Catalog widget

**Portal Access Outcome**:
The team-demo interpretation of attempting to open the Catalog Item Under Test as a Representative Test User: a successful open means accessible, while any failed open means inaccessible without classifying the cause of failure.
_Avoid_: User Criteria evaluation, server-side eligibility result, orderability, denial-cause classification

**Permission Expectation Satisfaction**:
The team's conclusion that a Portal Access Outcome matches the Current Specification; it is distinct from the platform's ATF execution status, so an inaccessible expectation may be satisfied while ATF reports a failure.
_Avoid_: ATF Passed status, green Test result, successful execution

**Service Portal Execution Profile**:
The single team-demo configuration that identifies the Service Portal route where every Portal Access Outcome is observed; it is execution context, not expected Catalog Item behavior.
_Avoid_: Catalog Test Specification, per-item Portal selection, inferred Portal
