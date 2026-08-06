# Ticket 01 — Runtime AI Feasibility Gate Evidence

Gate result as of 2026-08-06: **BLOCKED**

The deterministic throwaway prototype is implemented and locally executable. The gate cannot be marked PASS or FAIL because this workspace has no configured ServiceNow target, credentials, target release identity, or Now Assist entitlement evidence. Local doubles cannot prove Now Assist behavior, scoped background invocation, platform logging, or target-instance artifact absence.

## Scope inventory

Exactly two throwaway Skill definitions are present in `src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts`:

1. `T01 Throwaway Contract Extractor`
2. `T01 Throwaway Independent Verifier`

They are separate `NowAssistSkillConfig` definitions with distinct record IDs, prompt IDs, prompt names, and prompts. Both expose only the same four original inputs: `Variable Design`, `Business Logic Block`, `Capability Catalog`, and `Output Schema`. Neither definition exposes an Extractor result, Variable Test Data, Article Body, implementation source, observed behavior, or model conversation input. No Now Assist Agent is defined.

The one throwaway background server-side harness is `src/server/prototypes/ticket-01-runtime-ai-feasibility-harness.js`. It accepts a target-verified Skill invocation adapter and contains no ServiceNow metadata API guess, parser, generator, ATF writer, or persistence call. The reviewed corpus and normalized expected contracts are separate evidence data in `src/server/prototypes/ticket-01-runtime-ai-fixtures.js`.

No production v2 path, custom table, ATF Test, ATF Suite, generated test plan, production Skill, or Now Assist Agent was added.

## Local executable evidence

Command:

```text
npm.cmd run test:ticket-01-v2-feasibility
```

Observed result on 2026-08-06 after the Typed Value Expression remediation:

```text
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)
```

The 11 reviewed fixtures cover:

- visibility, mandatory state, and multiple effects in one Outcome;
- ordered `Else if` branches;
- multi-variable `AND`;
- explicitly parenthesized mixed `AND`/`OR`;
- exact Unicode Field Message plus prompt-like quoted text;
- exact Form Message;
- form load plus an exact Unicode scalar literal with leading and trailing whitespace;
- ambiguous mixed boolean grouping;
- variable-label and fixed-choice-label technical-identifier violations;
- unsupported behavior;
- ambiguous prose.

The executable tests prove the deterministic harness behavior, not model accuracy:

- a complete versioned Draft 2020-12 normalized output schema (`ticket-01-v2`) with closed accepted/rejected responses, Catalog Behavioral Contract, typed trigger/condition/effect variants, source-line mappings, stable rejection codes, and `additionalProperties: false` on every object;
- a closed discriminated Typed Value Expression with seven typed literal variants, nine declared-variable semantic types, exact base-10 arithmetic, explicit `ROUND` with half-away-from-zero semantics, recursive ordered text `CONCAT`, and distinct `BASELINE`, `KEEP`, and `EMPTY` directive nodes;
- canonical exact-number strings bounded to 15 total and 6 fractional digits, with division excluded outside an enclosing `ROUND`; JavaScript binary floating point is never used as the expected-value oracle;
- a literal text value equal to `"EMPTY"` remains canonically distinct from the `EMPTY` directive node;
- recursive object-property sorting while preserving semantic array order;
- strict discriminated accepted/rejected response-envelope and normalized-contract schema validation;
- schema-invalid discriminators, unexpected properties, legacy primitive `VALUE` payloads, invalid exact-number/date shapes, invalid operands, unrounded division, unsupported rounding, and invalid directives receive one identical technical retry rather than becoming semantic disagreement;
- exhaustive prototype parity checks pin accepted/rejected envelopes, rejection codes, trigger/condition/effect discriminators, operator enums, state/message values, and the complete Typed Value Expression surface across the capability catalog, serialized JSON Schema, and strict response validator;
- every retry and Skill invocation receives a fresh copy of one immutable canonical original input;
- actual before/after invocation hashes terminally block mutation before a retry or Verifier call;
- ten harness runs for every reviewed fixture;
- identical original input hashes for Extractor and Verifier;
- exact equality to reviewed canonical contracts in the accepted-double seam;
- consistent reviewed rejection in the invalid-double seam;
- byte-for-byte preservation of Unicode, punctuation, and whitespace in reviewed literals;
- exactly two identical attempts for injected timeout, transport, unavailable-service, rate-limit, malformed-response, truncated-response, and response-schema failures;
- terminal `AI_INTERPRETATION_TECHNICAL_FAILURE` after the second failure;
- one Extractor call plus one Verifier call only for injected semantic disagreement;
- terminal `AI_INTERPRETATION_INCONSISTENT`, with no retry, third pass, vote, or result selection;
- structured differences containing paths, types, and value hashes but no raw values;
- evidence containing hashes, versions, attempt counts, agreement state, source locations, and artifact counts only;
- no raw prompt, response, duplicated Design, quoted literal, or complete conversation in evidence;
- a zero-artifact boundary through an injected before/after artifact-count seam;
- a closed aggregate corpus verdict that cannot return `PASS` for a missing/duplicate/unexpected run, fixture-result mismatch, input-hash breach, expected-contract hash mismatch, incomplete attempt evidence, or artifact delta;
- exactly two Skill definitions and zero Agent definitions in the prototype source.

Build command:

```text
npm.cmd run build
```

Observed result on 2026-08-06 after the ServiceNow SDK was allowed to read its user-profile dependency paths:

```text
[now-sdk] Build completed successfully
```

A final repository-wide build was run again after the Ticket 01 remediation and completed successfully. Ticket 01 did not edit any Ticket 02-or-later source.

The serialized Output Schema was also compiled in strict Draft 2020-12 mode with the installed AJV 8 and `ajv-formats` packages, then evaluated against every reviewed accepted/rejected fixture response. Observed result on 2026-08-06:

```text
Ticket 01 output schema: COMPILED; all reviewed responses valid
```

This check exposed and removed a non-standard root `version` keyword and replaced the otherwise legal union-type shorthand with explicit `oneOf` branches for strict-compiler portability. Version identity remains machine-readable through the versioned `$id`, `contract.schemaVersion`, and evidence `outputSchemaVersion`.

The Skill metadata shape, input types, security-control shape, prompt configuration, model token, and build constraints were verified against the installed official ServiceNow SDK 4.8.1 documentation:

- `node_modules/@servicenow/sdk/docs/guides/nowassist-skills-guide.md`
- `node_modules/@servicenow/sdk/docs/api/nowassistskillconfig-api.md`

The default documented Now LLM Service model token is used in the throwaway definitions. The target provider mapping and active model still must be verified on the target instance; no provider API sys_id was guessed.

Source SHA-256 values after the local run:

| Evidence source | SHA-256 |
| --- | --- |
| Throwaway Skills | `CAF8D7D6B8E03BAEBB96493C469302D14595B0DD0D35EEE7F440F5CD851DC829` |
| Background harness | `61FC612BCA359B2A34EBE0D2BCE5C7E87B78EB921E38F7FBFBBB0FD0165F9AB2` |
| Reviewed corpus and output schema | `EF6B7CC35AF2AC5759A60EB559C5AAA260C3C59D8D581986381723BF188BFC9D` |
| Executable tests | `B4B83C156FA3B918C0D72C5066571E4AF577CC80078AFFF935CC2EFFC2BF6AAA` |

## Acceptance classification

| Ticket requirement | Local status | Target-instance status |
| --- | --- | --- |
| Two distinct throwaway Skills; no Agent | Source and SDK build proven | Deployment, distinct record IDs, and zero Agent inspection required |
| Same four original inputs | Definition, immutable original envelope, fresh-copy, and actual per-call hash seams proven | Captured invocation records/evidence required |
| Verifier receives no Extractor output/conversation | Input surface proven; mutation terminally blocks before Verifier | Runtime invocation observation required |
| Structured output and deterministic canonicalization | Complete machine-checkable `ticket-01-v2` schema, closed Typed Value Expression, strict discriminated validator, and schema/validator parity checks locally proven | Real Skill response enforcement required |
| Full supported/invalid corpus | Reviewed corpus present | Real model execution required |
| Ten runs per fixture | Closed aggregate verdict and exact run matrix proven with doubles | All 110 real repeated fixture runs required |
| Exact quoted literal preservation | Reviewed seam proven | Real Skill responses required |
| One identical retry for all technical failures | Locally proven by failure injection | Target invocation failure injection required |
| Semantic difference has no retry/vote/selection | Locally proven | Target background invocation evidence required |
| Terminal inconsistent/technical/input-integrity/artifact-boundary results and zero artifacts | Locally proven at harness boundary | ATF table inspection required |
| Non-raw evidence only | Evidence serializer locally proven | System/Now Assist log inspection required |
| No persisted raw Design or AI conversations | No local persistence exists | Target log/config inspection required |
| No ATF record or custom table | No such metadata/source was added | Before/after target table/schema inspection required |
| Clear PASS/FAIL for configured release | Not locally decidable | Blocked until all target evidence exists |

## Target-instance run instructions

These steps deliberately stop where the installed SDK documentation stops. Do not invent or copy an undocumented Skill execution API.

1. Record the exact ServiceNow family/patch, application scope/version, Now Assist entitlement/plugin state, provider name, active provider API mapping, active model, and the operator identity. Query the provider/model records described by the installed official SDK guide (`sys_gen_ai_provider`, `sys_generative_ai_provider_mapping`, and `sys_generative_ai_model_config`).
2. Confirm the provider/model values in the throwaway definitions against those observed records. Supply a `providerAPI` only if its `sys_hub_flow` identifier is observed on this target.
3. Deploy the application, publish only these two throwaway prompts through the target-supported Skill Builder lifecycle, and capture the two Skill record IDs, prompt/version IDs, export/configuration, and screenshots. Confirm there is no Now Assist Agent created for Ticket 01.
4. From official documentation installed on the target or from the target's supported APIs, identify and record the scoped server-side Skill invocation API and its response/error contract. Adapt it to the harness dependency `invokeSkill(skillName, inputEnvelope)`. The adapter must pass the four supplied fields unchanged and return only the Skill response. It must not retain conversation state or pass the Extractor result to the Verifier.
5. In a scoped background execution context, load `ticket-01-runtime-ai-feasibility-harness.js` and `ticket-01-runtime-ai-fixtures.js`, provide the verified adapter, a `GlideDigest().getSHA256Hex` wrapper, and a read-only ATF artifact-count function. Run `runCorpus(Ticket01RuntimeAiFixtures.fixtures, Ticket01RuntimeAiFixtures.contracts, dependencies)` and retain its sanitized closed verdict object.
6. Require the returned verdict to be `PASS`, require an empty `failures` array, and confirm `evidence` contains exactly 110 fixture-run records. Every supported record must be `AI_INTERPRETATION_AGREED`, every invalid record must be the exact reviewed `DESIGN_INVALID` rejection, all canonical hashes must equal the reviewed expected hash, every actual before/after invocation input hash must equal the immutable original hash, and every record must report zero artifact delta.
7. Execute each technical injection twice for each Skill phase as supported by the verified adapter: timeout, transport, unavailable service, rate limit, malformed response, truncated response, and response-schema failure. Capture two identical input hashes and exactly two attempts followed by `AI_INTERPRETATION_TECHNICAL_FAILURE`.
8. Inject one schema-valid semantic difference at the adapter/harness seam. Capture exactly two total Skill calls, one comparison, structured hash-only differences, `AI_INTERPRETATION_INCONSISTENT`, and no later call or artifact write.
9. Inspect the target's system and Now Assist usage logs using target-verified table names. Search by the recorded time window, Skill IDs, prompt IDs, and run correlation. Demonstrate that the retained Ticket 01 evidence has no raw prompt, raw response, duplicated Variable Design, duplicated Business Logic, quoted fixture text, or complete conversation. Do not export raw content into this repository while performing the inspection.
10. Compare before/after queries for `sys_atf_test_suite`, `sys_atf_test`, their run-owned related records, and application-owned custom-table definitions. Record the exact query, counts/IDs, time window, and screenshots or sanitized exports proving zero Ticket 01 artifacts and zero new custom tables.
11. Save only sanitized evidence under `docs/prototypes/evidence/ticket-01/<target-release>/`, update the ticket Comments with target release/configuration and record/result identifiers, and set the gate to PASS only if every requirement passes. Any model mismatch or invalid-fixture acceptance makes the gate FAIL; missing access/evidence keeps it BLOCKED.

## Current blockers

- `.now/` contains only `bom.json`; `SN_INSTANCE_URL`, `SN_USERNAME`, and `SN_PASSWORD` are not set.
- No target ServiceNow release or Now Assist entitlement/configuration is available in the workspace.
- No target-supported scoped server-side Skill invocation API has been verified. The installed SDK documents Skill definition metadata but not the background invocation contract needed here.
- Git is configured on branch `ticket/01-runtime-ai-feasibility` with fixed point tag `baseline-before-ticket-01-remediation`; only the dedicated remediation commit remains in the local close-out.

No instance PASS evidence has been simulated or inferred from local doubles.
