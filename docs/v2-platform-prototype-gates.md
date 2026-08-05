# Version 2 Platform Prototype Gates

These gates must be proven on the configured target ServiceNow release before dependent version-2 production implementation. Prototype code is disposable evidence, not production implementation. A gate report records repeatable setup, exact steps, observed results, relevant screenshots or exported artifacts, run stamps, failure injection, and a clear pass/fail conclusion.

Every failed gate blocks the capability stated under **Failure blocks** and returns for an explicit scope decision. Failure never authorizes source-code interpretation, a deterministic DSL fallback, one-pass AI, a Now Assist Agent, direct AI artifact generation, fixed sleeps, weakened assertions, silent capability removal, or partial generation.

## Gate 1: Runtime AI Feasibility Gate

Create only:

- two separate throwaway Now Assist Skills;
- one throwaway background server-side harness;
- reviewed fixture inputs and expected canonical contracts;
- no production parser or generator;
- no ATF artifacts;
- no custom table.

The two Skills receive the same original complete Variable Design, one original Guided Business Logic block with physical-line identity, the supported capability catalog, and the normalized output schema. The independent Verifier never receives the Extractor output. The harness enforces structured output, canonicalizes both contracts, compares them with each other and the reviewed expected contract, and records only non-raw evidence.

The corpus covers at least:

- visibility;
- mandatory state;
- multiple effects in one Outcome;
- ordered `Else if` branches;
- multi-variable `AND`;
- mixed `AND` and `OR` with explicit parentheses;
- ambiguous mixed boolean grouping without parentheses;
- Field Message;
- Form Message;
- technical-identifier and choice-label violations;
- unsupported behavior;
- ambiguous prose;
- prompt-like quoted message text;
- form-load behavior;
- exact Unicode quoted text.

Every supported fixture must produce the exact reviewed canonical contract through ten repeated runs. Every invalid or ambiguous fixture must be rejected on all ten runs. Technical-failure injection proves exactly one identical retry per failing Skill call. Semantic-difference injection proves no semantic retry, no third pass, no voting, and terminal `AI_INTERPRETATION_INCONSISTENT`.

**Pass evidence:**

- exported/configuration evidence for two distinct Skills and separate prompts;
- background server-side invocation evidence;
- captured input hashes proving identical original inputs and no Extractor-to-Verifier data flow;
- output-schema enforcement evidence;
- reviewed expected contract and per-run canonical hashes for all ten runs of every fixture;
- exact literal preservation evidence;
- retry-attempt evidence for technical failure;
- no-retry evidence for semantic disagreement;
- log inspection proving no raw prompt, response, duplicate Design, or model conversation was persisted;
- ATF and schema inspection proving zero artifacts and zero custom tables.

**Failure blocks:**

- production `Extract Catalog Behavioral Contract` Skill;
- production `Independently Interpret Catalog Behavioral Contract` Skill;
- Runtime Business Logic Interpretation;
- AI-derived Catalog Behavioral Contracts;
- every AI-dependent version-2 production ticket;
- the complete Schema Version 2 AI `Create ATF` path.

## Gate 2: Structured KB text round trip

Prove that Variable Design, Business Logic, and Variable Test Data long plain-text fields preserve the version-2 schema through create, save, publish, exact bound-record read, and replacement-revision operations.

Cover CRLF and LF, blank lines, indentation, pipes, semicolons, equals signs, double quotes, backslashes, all five Design Escape Sequences, exact UTC timestamps, technical identifiers, prompt-like data, and non-ASCII quoted literals. Line-ending normalization is acceptable only when semantic text and physical line identity remain stable. Article Body remains excluded.

**Pass evidence:** source fixture hashes, saved and published field exports, physical-line comparison, capacity evidence at the accepted POC size, exact bound-record worker read, and a replacement-revision demonstration.

**Failure blocks:** physical version-2 fields, reliable Business Logic source evidence, and every production capability that consumes the three Structured Design Sections.

## Gate 3: Deterministic table parsing and Business Logic block splitting

Prove deterministic parsing of the two fixed-header Design Text Tables and deterministic structural splitting of Guided Business Logic by `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END`.

The splitter does not interpret conditions or effects. Invalid headers, cells, escapes, keys, anchor order, duplicate anchors, missing `END`, nested blocks, content outside blocks, duplicate Behavior IDs, and malformed Outcome markers produce stable located diagnostics without modifying input. Diagnostics retain correct 1-based physical lines after blank lines and either line-ending style; section-level failures use line `0`.

**Pass evidence:** reviewed valid and invalid corpus, repeated identical parsed tables/block envelopes, exact ordered diagnostics, and proof that no Now Assist call occurs for a structurally invalid block.

**Failure blocks:** production Design readers, safe Skill invocation, located diagnostics, and every version-2 path beyond UI Action preflight.

## Gate 4: OOB Service Portal opening and fresh-Test isolation

Prove that each Derived Behavior Test Case can impersonate the configured active Behavior Execution User and open the Catalog Item Under Test on the out-of-box Service Portal in a fresh form and execution session. No Test may depend on another generated Test, browser residue, preserved values, or Suite order.

**Pass evidence:** repeated isolated opens, exact user identity, OOB route and page evidence, baseline observations for in-scope controls, and proof that no custom DOM selector or custom Portal assumption is required.

**Failure blocks:** the OOB Service Portal execution surface and all production behavior Tests.

## Gate 5: Scalar stimulus and state assertions

For each supported interactive control, prove type-valid set and clear operations, one real trigger-last Change Stimulus, and semantic assertions for every claimed `VALUE`, `VISIBLE`, `MANDATORY`, and `READ_ONLY` mapping.

Controls include Single Line Text, Multi Line Text, Integer, Decimal, Checkbox, Yes/No, Select Box, Multiple Choice, Reference, List Collector, Lookup Select, Date, and Date/Time. Choice operations use internal values; references compare resolved identity rather than display text.

**Pass evidence:** a matrix of control, operation, effect, passing conformance observation, deliberately broken observation, stable OOB or custom-step seam, and exact unsupported mappings.

**Failure blocks:** only the unproven control-effect mappings, plus any end-to-end Behavior that requires them. An unproven mapping must produce `ATF_MAPPING_UNSUPPORTED`; it cannot be silently skipped.

## Gate 6: Exact Field and Form Message assertions

Prove that ATF distinguishes Field Messages from Form Messages and verifies exact visible text plus exact `INFO`, `WARNING`, or `ERROR` type after a trigger. Prove `CLEAR`, meaning that no message of the block's one declared type remains at the exact target or form scope.

**Pass evidence:** positive and deliberately wrong scope/type/text cases, clear-state cases, exact Unicode text, and proof that the seam does not use generic page-text search or arbitrary custom-widget DOM assumptions.

**Failure blocks:** the `MESSAGE` effect and every production Behavior that declares a Field or Form Message, pending explicit scope revision.

## Gate 7: Readiness-based stabilization

Prove a bounded readiness strategy for requester-visible Catalog behavior, including admitted asynchronous client behavior. The adapter waits for declared observable state and relevant Portal readiness signals to stabilize or reports an explicit timeout; fixed sleeps are not accepted.

**Pass evidence:** repeated runs under ordinary latency variation, bounded timing measurements, explicit success criteria, injected timeout, and distinct stimulus/readiness/assertion failure results.

**Failure blocks:** every behavior whose final observable state cannot be stabilized deterministically and the production readiness adapter.

## Gate 8: Exact numeric, Date, and Date/Time adapters

Prove semantic input and assertion behavior for exact integers and decimals, explicit rounding boundaries, ISO Dates, and exact UTC Date/Time instants across the configured Test user's display locale and timezone.

**Pass evidence:** boundary values, negative values, decimal scale and round-half-away-from-zero cases, leap dates, invalid dates, UTC instant comparison under at least two display contexts, and deliberately wrong expected values.

**Failure blocks:** the affected numeric, Date, or Date/Time control/value capabilities and every production Behavior requiring them.

## Gate 9: Reference-like bindings and collections

Prove `REFERENCE_BY(direct_unique_field, "value")` resolution against Variable Design `reference_table`, including exact one-result success and zero/multiple-result failure before artifact creation. Prove Reference and reference-like Lookup Select setting/assertion by stored identity and exact unordered List Collector membership with duplicate rejection.

**Pass evidence:** direct unique-field metadata, success and ambiguity fixtures, exact resolved identity, List Collector set equality, and proof that no raw sys_id, display-label matching, encoded query, dot-walk, first/random selection, or record creation occurs.

**Failure blocks:** the affected Reference, reference-like Lookup Select, and List Collector mappings and every production Behavior requiring them.

## Gate 10: Variable Set and bounded MRVS behavior

Prove that Single Row Variable Set child variables can be addressed by Variable Design technical keys. For MRVS, prove complete Design-owned row setup, replacement, removal, exact ordered-row observation, one real whole-collection change stimulus, and `ROW_COUNT` evaluation.

The prototype must not use child-cell triggers, per-row effects, arbitrary JSON traversal, nested MRVS, unsupported aggregates, or MRVS as a Behavior target.

**Pass evidence:** set ownership and addressing records, complete MRVS input/output fixtures, deterministic row order, whole-collection transition, row count assertions, and rejected unsupported operations.

**Failure blocks:** Single Row Variable Set or MRVS production support as applicable and every Behavior requiring the failed mapping. MRVS cannot degrade to partial row-level support.

## Gate 11: Genuine form-load context

Prove that Baseline Variable State, the fixed Behavior Execution User, and each admitted fixed execution record are effective before or during a fresh Catalog form open. Variable Test Data applied after opening must not manufacture a form-load branch.

**Pass evidence:** pre-open context fixtures, fresh-open observations, post-open negative controls, bounded stabilization, and an unreachable Outcome reported before artifact creation.

**Failure blocks:** `ON LOAD`/form-load generation and every production Behavior whose Outcome depends on unproven pre-open context.

## Gate 12: Bounded Coverage Assignment Search and Design-only oracle

Prove deterministic assignment selection from exact Business Logic literals, Baseline Variable State, at most one Data Profile, and independent Candidate Test Values. Cover first-assignment success, profile order, candidate order, distinct before/after selection, MRVS rows, an uncovered Outcome, and the 10,000-assignment limit.

Instrument both interpretation and derivation to prove that expected triggers, branches, values, states, and messages come only from the bound Current Specification. Implementation metadata may be read only through admitted Execution Bindings needed to operate controls; UI Policies, Catalog Client Scripts, Script Includes, observed behavior, and implementation source are never used as the expected-behavior oracle.

**Pass evidence:** repeated identical assignments and Generation Plans, selected Candidate/Profile provenance, exact limit behavior, no random sampling, source-access instrumentation, and a demonstration where fixed Design plus deliberately changed implementation changes only the observed ATF result.

**Failure blocks:** deterministic test derivation, source-opacity claims, and the complete production behavior generator.

## Gate 13: Protected ATF metadata and atomic persistence

Revalidate every target-release table, OOB action, custom step, role, and cross-scope privilege required to create the behavior-only Suite, Tests, steps, inputs, and memberships. Reuse a v1 seam only after proving it with the new v2 artifact shapes.

After a complete Generation Plan exists, inject a failure at every write stage and prove that no incomplete run-owned Suite, Test, step, input, or membership remains. If one transaction cannot span the protected records, prove exact run-owned compensating cleanup.

**Pass evidence:** protected-boundary inventory, cross-scope configuration export, successful complete graph, failure-injection matrix, post-failure artifact queries showing zero incomplete records, and proof that OOB Application Access and runtime privileges were not broadened.

**Failure blocks:** the production artifact writer and the complete Schema Version 2 generation path. Failure does not weaken Atomic Design Validation or authorize manual cleanup as normal behavior.

## Gate dependency rule

Gate 1 must pass before any AI-dependent production ticket starts. Every other gate must pass before its dependent adapter or production slice starts. Gates may run in parallel only when their own prerequisites are satisfied and they do not depend on production artifacts from one another. Passing one gate never implies another gate has passed.
