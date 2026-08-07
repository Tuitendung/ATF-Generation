# Prove the Runtime AI Feasibility Gate

Status: ready-for-human
Type: prototype
Blocked by: None

## What to build

Create two separate throwaway Now Assist Skills and one throwaway background server-side harness that prove Guided Business Logic can be interpreted into exact reviewed Catalog Behavioral Contracts. This ticket produces evidence only: no production Skill, parser, generator, ATF artifact, or custom table.

## Acceptance criteria

- [ ] Create one throwaway Extractor Skill and one throwaway independent Verifier Skill; create no Now Assist Agent.
- [ ] Give both Skills the same original complete Variable Design, one original Business Logic block with physical-line identity, one supported capability catalog, and one normalized output schema.
- [ ] Prove the Verifier never receives the Extractor output or model conversation.
- [ ] Enforce structured output and deterministic canonicalization.
- [ ] Cover visibility, mandatory state, multiple effects, ordered `Else if`, multi-variable `AND`, explicitly parenthesized mixed `AND`/`OR`, Field Message, Form Message, form load, technical-identifier violations, unsupported behavior, ambiguous prose, prompt-like quoted text, and exact Unicode literals.
- [ ] Run every supported fixture ten times and require both Skills to equal each other and the exact reviewed canonical contract on all runs.
- [ ] Run every invalid or ambiguous fixture ten times and require rejection on all runs.
- [ ] Prove exact quoted literals are preserved without translation, correction, or whitespace rewriting.
- [ ] Inject timeout, transport, unavailable-service, rate-limit, malformed/truncated-response, and response-schema failures and prove exactly one identical retry for each failing call.
- [ ] Inject a semantic difference and prove no retry, third pass, majority vote, or contract selection occurs.
- [ ] Prove terminal `AI_INTERPRETATION_INCONSISTENT` and `AI_INTERPRETATION_TECHNICAL_FAILURE` semantics with zero ATF artifacts.
- [ ] Record only non-raw hashes, versions, attempts, agreement state, source locations, and structured differences.
- [ ] Prove no raw prompt, raw response, duplicate Design text, or complete AI conversation is persisted.
- [ ] Prove no ATF record and no custom table is created.
- [ ] Record a clear PASS or FAIL for the configured target release.

## Evidence required

- Target ServiceNow release and Now Assist configuration.
- Exported or captured definitions of the two distinct throwaway Skills and prompts.
- Harness invocation evidence proving background scoped execution and independent inputs.
- Reviewed fixture corpus, expected canonical contracts, and all repeated-run hashes.
- Technical retry and semantic non-retry evidence.
- Log and ATF-table inspection proving non-raw evidence and zero artifacts.

## Capability blocked if this prototype fails

- Both production Now Assist Skills.
- Runtime Business Logic Interpretation.
- AI-derived Catalog Behavioral Contracts.
- Every AI-dependent production ticket.
- The complete Schema Version 2 AI `Create ATF` path.

## Comments

### 2026-08-05 — Local prototype complete; target gate BLOCKED

Implemented the complete locally verifiable Ticket 01 feasibility seam without adding production v2 behavior, an Agent, a parser, a generator, an ATF artifact, or a custom table.

Evidence and sources:

- Gate report and local/target acceptance matrix: `docs/prototypes/ticket-01-runtime-ai-feasibility-evidence.md`
- Exactly two throwaway Skill definitions and distinct prompts: `src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts`
- One throwaway background server-side harness: `src/server/prototypes/ticket-01-runtime-ai-feasibility-harness.js`
- Reviewed 11-fixture corpus and expected canonical contracts: `src/server/prototypes/ticket-01-runtime-ai-fixtures.js`
- Executable deterministic coverage: `src/server/tests/ticket-01-runtime-ai-feasibility-harness.test.js`

Local verification:

```text
npm.cmd run test:ticket-01-v2-feasibility
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)

npm.cmd run build
[now-sdk] Build completed successfully
```

The local harness proves canonicalization, strict schema rejection, ten-run orchestration, exact literal preservation, identical one-retry semantics for every required technical failure, semantic non-retry, terminal result classification, structured hash-only differences, privacy shape, and the zero-artifact boundary. These runs use reviewed doubles and are not recorded as proof of real Now Assist accuracy.

Gate result remains **BLOCKED**, not PASS or FAIL. The workspace has no configured target, credentials, target release identity, or Now Assist entitlement/configuration. Consequently the following mandatory evidence does not yet exist: deployed Skill/prompt record IDs, real background scoped invocation, 110 real repeated model runs, real failure injections, runtime independence observation, target log privacy inspection, and target ATF/schema zero-artifact inspection. The evidence report contains a short target-run procedure that requires the invocation API to be verified from target-supported documentation before use.

At the time of this entry the workspace had no `.git` directory. Repository metadata was subsequently configured on 2026-08-06; the current remediation uses fixed point tag `baseline-before-ticket-01-remediation` on branch `ticket/01-runtime-ai-feasibility`.

Final verification note: a later repository-wide `npm.cmd run build` is red on 12 SDK `TS211` diagnostics in the out-of-scope, concurrently added `src/fluent/tests/v2-ticket-03-form-load.now.ts`. Ticket 01 did not create or modify that Ticket 03 file and did not repair it. The Ticket 01 focused test and all three Node syntax checks still pass; an earlier full SDK build containing the Ticket 01 Skill definitions completed successfully.

### 2026-08-06 — Four P1 local harness findings remediated by TDD

Remediated the four blocking local review findings without changing the target gate result or adding production behavior:

- replaced the placeholder output contract with a complete closed Draft 2020-12 schema covering accepted/rejected responses, Catalog Behavioral Contract identity, typed trigger/condition/effect variants, physical source lines, stable rejection codes, and `additionalProperties: false`;
- preserved one canonical original input and supplied a fresh deep copy to every retry and Skill phase; actual pre/post invocation hashes now terminally block an input mutation before retry or Verifier execution;
- made schema validation discriminated and closed so extra variant fields, unsupported operators, invalid typed effect values, and unknown rejection codes receive exactly one identical `response_schema` retry;
- added a closed corpus verdict that rejects missing/duplicate/unexpected runs, wrong terminal results, incomplete attempt evidence, input-hash drift, canonical expected-hash differences, and any artifact delta.

Regression tests were observed red at each public seam before the minimal corresponding implementation and are now green. Final local verification on 2026-08-06:

```text
node --check src/server/prototypes/ticket-01-runtime-ai-feasibility-harness.js
node --check src/server/prototypes/ticket-01-runtime-ai-fixtures.js
node --check src/server/tests/ticket-01-runtime-ai-feasibility-harness.test.js
npm.cmd run test:ticket-01-v2-feasibility
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)

npm.cmd run build
[now-sdk] Build completed successfully
```

The Runtime AI Feasibility Gate remains **BLOCKED** pending real target-release, Now Assist, background invocation, repeated model-run, privacy-log, and zero-artifact table evidence. No target PASS evidence was simulated.

### 2026-08-06 — Typed Value Expression Standards P1 remediated by TDD

Closed the follow-up Standards P1 without expanding the throwaway prototype into production behavior:

- bumped the incompatible normalized response contract and capability catalog to `ticket-01-v2`;
- replaced primitive `VALUE.value` payloads with six discriminated expression kinds: typed literal, declared-variable reference, exact-decimal arithmetic, `ROUND`, `CONCAT`, and explicit directive;
- covered text, integer, decimal, boolean, choice, ISO Date, and ISO UTC Date/Time literals; declared-variable references additionally admit the reviewed reference and reference-set semantic types;
- represented exact numbers as canonical base-10 strings with the reviewed 15-total-digit and 6-fractional-digit bounds; division is schema-valid only within explicit `ROUND`, whose only mode is `HALF_AWAY_FROM_ZERO`;
- made `CONCAT` recursively accept only ordered typed text operands, and made literal `"EMPTY"` structurally distinct from the `EMPTY` directive;
- added response-schema retry cases for legacy primitive values, unknown discriminators, unexpected properties, non-canonical numbers, impossible dates, invalid operands, unrounded division, invalid rounding, non-text concatenation, and unknown directives;
- added exhaustive parity assertions for accepted/rejected envelopes, rejection codes, trigger/condition/effect discriminators, operator enums, state/message values, and Typed Value Expressions across the capability catalog, serialized JSON Schema and runtime response validator rather than introducing a reusable production contract framework.

Regression tests were first observed red at the public `validateSkillResponse` and serialized `Output Schema` seams, then made green one vertical slice at a time. Verification after this remediation:

```text
node --check src/server/prototypes/ticket-01-runtime-ai-feasibility-harness.js
node --check src/server/prototypes/ticket-01-runtime-ai-fixtures.js
node --check src/server/tests/ticket-01-runtime-ai-feasibility-harness.test.js
npm.cmd run test:ticket-01-v2-feasibility
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)

npm.cmd run build
[now-sdk] Build completed successfully

git diff --check baseline-before-ticket-01-remediation
No whitespace errors; Git emitted only the repository's Windows LF/CRLF conversion warnings.
```

Evidence matrix, target-only procedure, and updated source hashes: `docs/prototypes/ticket-01-runtime-ai-feasibility-evidence.md`.

The gate remains **BLOCKED**. No target release, Now Assist entitlement, verified scoped invocation API, real model-run result, target privacy-log inspection, or target zero-artifact table inspection was created or inferred.

### 2026-08-06 — Final Standards and Spec review

The `/code-review` parallel workers returned empty payloads on repeated fresh attempts, so no empty response was treated as a pass. The same two axes were completed independently at the root against `git diff baseline-before-ticket-01-remediation`:

- **Standards:** the earlier incomplete `VALUE` representation was fixed with the closed Typed Value Expression. The duplication judgement call was resolved with an exhaustive behavioral parity matrix covering the complete response contract instead of introducing a production abstraction. Strict Draft 2020-12 compilation then found two portability defects—the non-standard root `version` keyword and strict-unfriendly union-type shorthand—and both were fixed. No Standards finding remains open.
- **Spec:** no remaining missing Ticket 01 remediation requirement, wrong behavior, or Ticket 02/production scope creep was found. Target-only acceptance criteria remain deliberately unclaimed.

Strict schema verification result:

```text
Ticket 01 output schema: COMPILED; all reviewed responses valid
```

The final gate classification remains **BLOCKED**, not PASS or FAIL, solely because the required real ServiceNow/Now Assist target evidence is still unavailable.

### 2026-08-06 — Generated prompt and first target-call findings

The first real target call supplied useful capability-level evidence but did not pass the gate. Sanitized observations only:

- scoped `sn_one_extend.OneExtendUtil.execute` visibility, capability dispatch, actual model inference, and pre/post input integrity passed;
- the Skill Config candidate was rejected as mismatched and nullified, so Skill Config-bound invocation and runtime role enforcement remain unproven;
- the model response wrapper contained a Markdown-fenced `model_output`, which is a technical `response_schema` failure and requires exactly one fresh identical retry through the harness after remediation;
- target logging exposed raw Design, schema, assembled prompt, response, and internal identifiers. No raw attachment or raw content was copied into the repository.

TDD then reproduced a deployment defect at the SDK-generated XML seam: both prompt records contained the unresolved literal `outputRules`. The regression was observed red, the exact reviewed six-line output rules were inlined in both throwaway prompts, and both prompts were moved to new draft version 2 records rather than modifying target-published version 1. SDK 4.8.1 verification:

```text
npm.cmd run build
[now-sdk] Build completed successfully

npm.cmd run test:ticket-01-generated-prompts
ticket-01 generated Now Assist prompt tests passed

npm.cmd run test:ticket-01-v2-feasibility
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)
```

The Australia documentation identifies `com.sn.generative.ai.log_prompt` as the boolean switch controlling Generative AI API-call logging (default `true`) and `sys_generative_ai_log` as the 180-day prompt/response/edited-response debug log. The effective target property value must be read and raw logging disabled for the canary window before any further model call. The corrected version 2 prompts still require redeployment and Skill Builder publication. The correct target-supported/generated Skill Config binding is still required; no resource-mapping ID will be guessed.

Gate result remains **BLOCKED**. No corrected target canary, identical retry, repeated corpus, privacy proof, or zero-artifact proof has been claimed.

### 2026-08-07 — Extractor v2 focused prompt-level smoke FAIL; v3 remediated locally

The operator deployed and published `Ticket 01 Independent Extraction` version 2 on the Australia target. A capability-level scoped Background Script invocation reached the model and returned successfully, resolving the earlier active-prompt/error-code failure. The marker probe preserved its canonical input hash before and after invocation and reported successful capability status with provider and response present. The target still rejected and nullified the supplied `skillConfigId`, so Skill Config-bound invocation and runtime role enforcement remain unproven; no alternate resource/config/definition ID is inferred.

The unchanged reviewed `unsupported_behavior` Skill Builder Test Prompt fixture then produced a raw-JSON-only response with no Markdown/commentary that passed the focused closed response schema but was semantically wrong. That focused schema constrained `status` with `const: rejected`, so the result did not prove that the model independently selected between accepted and rejected:

- expected: `EFFECT_PROPERTY_UNSUPPORTED`, source lines `[7]`;
- observed sanitized fields: `EFFECT_INVALID`, source lines `[1, 7]`.

This is semantic disagreement, not `response_schema`. The prompt-level observation had no retry, second model invocation, third pass, majority vote, or contract selection. Extractor v2 focused prompt-level fixture verdict is **FAIL**. The reviewed expected result was not weakened. This Test Prompt result does not prove Skill Config binding, runtime ACL/`atf_test_admin` enforcement, scoped Background Script execution for this response, immutable/fresh-copy attempt handling, identical retry behavior, or zero runtime artifacts.

The exact sanitized response is retained as a characterization only at the public response-validation and canonical-difference seams. **Characterization regression: GREEN on first execution because those existing seams already rejected the observed response as different from the reviewed contract.** No harness behavior was intentionally broken to manufacture RED, and the two-Skill runtime orchestration remains unchanged. Separate existing `runFixture` coverage proves local semantic non-retry, no vote/selection, terminal inconsistency, and zero artifact delta; none of those local-double facts is presented as target Test Prompt evidence.

The actual RED→GREEN cycles were at missing V3 seams: the distinct Extractor v3 generated record/rules and the incomplete rejection policy/parity coverage. The machine-reviewable throwaway Capability Catalog now defines apply/non-apply conditions, physical source-line citation, and valid-anchor exclusions for every rejection code used by the reviewed invalid corpus: `BOOLEAN_PARENTHESES_REQUIRED`, `TECHNICAL_IDENTIFIER_REQUIRED`, `EFFECT_PROPERTY_UNSUPPORTED`, and `EFFECT_INVALID`. Independent fixture literals preserve every reviewed code/source mapping, including `unsupported_behavior` as `EFFECT_PROPERTY_UNSUPPORTED` at `[7]` and `ambiguous_prose` as `EFFECT_INVALID` at `[7]`. The normalized contract remains `ticket-01-v2`.

SDK 4.8.1 generated metadata proves:

- Extractor v2 prompt bytes remain unchanged and are represented as the already-published lower version;
- Extractor v3 has a distinct identity, explicit `version=3`, equivalent decision rules for all four reviewed rejection codes plus the exact required effect/source-line rules and original six output rules, and remains draft/inactive;
- Verifier v2 remains independent and draft/inactive;
- actual generated model/temperature are `llm_generic_small_v2` / `0.2`.

Extended target logs retained raw synthetic input, assembled prompt, and response even with `com.sn.generative.ai.log_prompt=false`. The operator waived this only for synthetic, non-sensitive functional POC testing. Privacy remains **FAIL/WAIVED** for production. Verifier target verification is deliberately skipped/not verified. Extractor v3 remains only locally remediated until deployment/publication, the focused prompt-level semantic smoke, and a separate scoped Background Script capability-level strict canary with the complete `ticket-01-v2` schema.

Current classification: V3 local remediation **PASS**; V3 target prompt-level semantic smoke **NOT VERIFIED**; V3 capability-level strict canary **NOT VERIFIED**; overall Ticket 01 aggregate gate **NOT PASS**. Privacy is waived rather than passed, Skill Config binding and role enforcement are unproven, Verifier is skipped, and no v3 target result is claimed.
