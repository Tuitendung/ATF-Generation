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

The workspace also has no `.git` directory. A fixed-point Standards/Spec diff review and the required Ticket 01 commit are therefore blocked by missing repository metadata; no commit hash exists.

Final verification note: a later repository-wide `npm.cmd run build` is red on 12 SDK `TS211` diagnostics in the out-of-scope, concurrently added `src/fluent/tests/v2-ticket-03-form-load.now.ts`. Ticket 01 did not create or modify that Ticket 03 file and did not repair it. The Ticket 01 focused test and all three Node syntax checks still pass; an earlier full SDK build containing the Ticket 01 Skill definitions completed successfully.
