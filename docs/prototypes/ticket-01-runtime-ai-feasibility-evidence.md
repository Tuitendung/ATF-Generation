# Ticket 01 — Runtime AI Feasibility Gate Evidence

Gate result as of 2026-08-07: **NOT PASS** — Extractor prompt version 2 focused prompt-level semantic smoke **FAIL**; the aggregate target gate remains incomplete.

The deterministic throwaway prototype is implemented and locally executable. An operator supplied sanitized observations from the Australia target proving capability-level transport and real model invocation for Extractor prompt version 2. A separate Skill Builder Test Prompt run of the reviewed `unsupported_behavior` fixture returned a schema-valid but semantically wrong rejection, so version 2 failed that focused prompt-level smoke. Prompt version 3 is remediated only in local SDK output; it has not been deployed, published, or tested on the target. Skill Config binding, runtime role enforcement, Verifier execution, production-safe privacy, the capability-level full-schema canary, repeated corpus, failure injections, and target artifact inspection remain unproven. Local doubles cannot prove those target behaviors.

## Scope inventory

Exactly two throwaway Skill definitions are present in `src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts`:

1. `T01 Throwaway Contract Extractor`
2. `T01 Throwaway Independent Verifier`

They are separate `NowAssistSkillConfig` definitions with distinct record IDs, prompt IDs, prompt names, and prompts. Both expose only the same four original inputs: `Variable Design`, `Business Logic Block`, `Capability Catalog`, and `Output Schema`. Neither definition exposes an Extractor result, Variable Test Data, Article Body, implementation source, observed behavior, or model conversation input. No Now Assist Agent is defined.

The one throwaway background server-side harness is `src/server/prototypes/ticket-01-runtime-ai-feasibility-harness.js`. It accepts a target-verified Skill invocation adapter and contains no ServiceNow metadata API guess, parser, generator, ATF writer, or persistence call. The reviewed corpus and normalized expected contracts are separate evidence data in `src/server/prototypes/ticket-01-runtime-ai-fixtures.js`.

No production v2 path, custom table, ATF Test, ATF Suite, generated test plan, production Skill, or Now Assist Agent was added.

## Sanitized target observations

The operator reported the following observations from the configured Australia target. No target sys_id, hostname, credential, raw prompt, raw response, complete AI conversation, or raw logging attachment is retained here.

- scoped visibility of `sn_one_extend.OneExtendUtil.execute` passed (`namespaceType=object`, `utilType=function`, `executeType=function`);
- both distinct throwaway Skills and their four reviewed string inputs were present;
- Extractor prompt `Ticket 01 Independent Extraction` version 2 was deployed and published on the target;
- a scoped Background Script capability-level call reached dispatch and real model inference successfully; this resolved the earlier `Active prompt configuration not found` / `errorCode 100004` publication failure;
- the marker probe's canonical input hash equaled both the pre-invocation and post-invocation hashes; capability status was successful and provider and response fields were present;
- the supplied Skill Config candidate was rejected by target security as mismatched and nullified, after which capability-level execution continued without a bound Skill Config;
- one Skill Builder Test Prompt run used the unchanged reviewed `unsupported_behavior` fixture and a focused schema whose `status` property was constrained with `const: rejected`. Its sanitized response fields were raw-JSON-only with no Markdown/commentary and passed that focused closed response schema, but returned code `EFFECT_INVALID` and source lines `[1, 7]` instead of reviewed code `EFFECT_PROPERTY_UNSUPPORTED` and source lines `[7]`;
- that exact difference is a semantic disagreement, not `response_schema`; the prompt-level observation had no retry, second model call, third pass, majority vote, or contract selection. The version 2 focused prompt-level fixture verdict is **FAIL**;
- extended target logs retained raw synthetic input, assembled prompt, and response even while `com.sn.generative.ai.log_prompt=false`. The operator waived this only for the synthetic, non-sensitive functional POC. Privacy remains **FAIL/WAIVED**, not a production privacy PASS;
- Verifier target verification was deliberately skipped by the operator. No Verifier target result is claimed.

The capability-level marker probe proves server-side reachability, real model invocation, and input integrity for that probe. The separate Test Prompt result proves only prompt-level raw JSON shape plus rejection-code and source-line behavior under a schema that forced `status=rejected`; it does not prove that the model independently chose rejected. It also does not prove Skill Config binding, runtime ACL/`atf_test_admin` enforcement, scoped Background Script behavior for the focused response, immutable/fresh-copy retry behavior, or zero runtime artifacts. Those claims require the complete-schema Background Script harness canary.

## Local executable evidence

Command:

```text
npm.cmd run test:ticket-01-v2-feasibility
```

Observed result on 2026-08-07 after the version 3 rejection-policy remediation:

```text
Ticket 01 local feasibility harness: PASS (11 fixtures x 10 runs; deterministic controls only)
```

The real version 2 observation is captured by an executable characterization regression using only the sanitized status, code, and source lines at the public response-validation and canonical-difference seams. **Characterization regression: GREEN on first execution because those existing seams already accepted the observed shape but rejected exact equality with the independently reviewed result.** It does not synthesize invocation counts, retry state, artifact state, a selected result, or aggregate target evidence. Separate existing `runFixture` coverage proves local-double semantic non-retry, no vote/selection, terminal inconsistency, and zero artifact delta. The reviewed fixture remains `EFFECT_PROPERTY_UNSUPPORTED` at `[7]`; the validator and two-Skill runtime orchestration were not changed.

The generated-prompt metadata seam is separately protected by a regression test. The new regression was first observed failing against the current SDK output because it contained only Extractor v2 and Verifier v2 and lacked the required rejection decision rules. The remediation retains the byte-for-byte Extractor v2 prompt, adds a distinct Extractor v3 record, and leaves the Verifier prompt independent and otherwise unchanged.

```text
npm.cmd run build
[now-sdk] Build completed successfully

npm.cmd run test:ticket-01-generated-prompts
ticket-01 generated Now Assist prompt tests passed
```

The fresh SDK 4.8.1 output contains exactly three Ticket 01 `sys_generative_ai_config` records:

- Extractor v2 retains the previous prompt bytes and six reviewed output rules; its lifecycle is represented as `version=2`, `state=published`, `active=true` because SDK 4.8.1 requires a lower prompt version to be published or archived when v3 is present and the target evidence already establishes publication;
- Extractor v3 has a distinct generated identity, explicit `version=3`, the same six reviewed output rules, and reviewed decision rules for `BOOLEAN_PARENTHESES_REQUIRED`, `TECHNICAL_IDENTIFIER_REQUIRED`, `EFFECT_PROPERTY_UNSUPPORTED`, and `EFFECT_INVALID`, including exact source-line attribution policy; it remains `state=draft`, `active=false`;
- Verifier v2 remains a distinct `version=2`, `state=draft`, `active=false` record and receives no fabricated target evidence.

All generated prompt records report the actual SDK output `model=llm_generic_small_v2` and `temperature=0.2`. No record contains an unresolved JavaScript template placeholder or literal rules-variable identifier. Extractor v3 is only a local remediation until both the prompt-level semantic smoke and the capability-level strict canary are completed on the target.

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
- a machine-reviewable Capability Catalog rejection policy states apply/non-apply conditions, cited physical lines, and excluded valid anchors for every code used by the reviewed invalid corpus: `BOOLEAN_PARENTHESES_REQUIRED`, `TECHNICAL_IDENTIFIER_REQUIRED`, `EFFECT_PROPERTY_UNSUPPORTED`, and `EFFECT_INVALID`;
- exhaustive policy parity checks use independent literal expectations for every reviewed invalid fixture, require every reviewed fixture code to exist in both the policy and Output Schema enum, reject policy keys absent from the enum, preserve `unsupported_behavior` as `EFFECT_PROPERTY_UNSUPPORTED` at `[7]`, preserve `ambiguous_prose` as `EFFECT_INVALID` at `[7]`, and exclude valid `BEHAVIOR_ID` line 1;
- every retry and Skill invocation receives a fresh copy of one immutable canonical original input;
- actual before/after invocation hashes terminally block mutation before a retry or Verifier call;
- ten harness runs for every reviewed fixture;
- identical original input hashes for Extractor and Verifier;
- exact equality to reviewed canonical contracts in the accepted-double seam;
- consistent reviewed rejection in the invalid-double seam;
- byte-for-byte preservation of Unicode, punctuation, and whitespace in reviewed literals;
- exactly two identical attempts for injected timeout, transport, unavailable-service, rate-limit, malformed-response, truncated-response, and response-schema failures;
- terminal `AI_INTERPRETATION_TECHNICAL_FAILURE` after the second failure;
- one Extractor plus one independent Verifier call for injected runtime semantic disagreement, followed by no retry, third pass, vote, or result selection;
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

Observed result on 2026-08-07 using the installed/pinned ServiceNow SDK 4.8.1:

```text
[now-sdk] Build completed successfully
```

A final repository-wide build was run again after the Ticket 01 remediation and completed successfully. Ticket 01 did not edit any Ticket 02-or-later source.

The serialized Output Schema was also compiled in strict Draft 2020-12 mode with the installed AJV 8 and `ajv-formats` packages, then evaluated against every reviewed accepted/rejected fixture response. Observed result on 2026-08-07:

```text
Ticket 01 output schema: COMPILED STRICT; all reviewed responses valid; rejection parity covered
```

This check exposed and removed a non-standard root `version` keyword and replaced the otherwise legal union-type shorthand with explicit `oneOf` branches for strict-compiler portability. Version identity remains machine-readable through the versioned `$id`, `contract.schemaVersion`, and evidence `outputSchemaVersion`.

The Skill metadata shape, input types, security-control shape, prompt configuration, model token, and build constraints were verified against the installed official ServiceNow SDK 4.8.1 documentation:

- `node_modules/@servicenow/sdk/docs/guides/nowassist-skills-guide.md`
- `node_modules/@servicenow/sdk/docs/api/nowassistskillconfig-api.md`

The default documented Now LLM Service model token is used in the throwaway definitions. The target provider mapping and active model still must be verified on the target instance; no provider API sys_id was guessed.

Source SHA-256 values after the local run:

| Evidence source | SHA-256 |
| --- | --- |
| Throwaway Skills | `EAA97EC56054286482C7F08710B8CC6A6540C9739C94323F1E9242A410766132` |
| Background harness | `61FC612BCA359B2A34EBE0D2BCE5C7E87B78EB921E38F7FBFBBB0FD0165F9AB2` |
| Reviewed corpus and output schema | `59376F8BA96872C18431D51CCD79529768CC29B01F156EE80BC298FEB9BAA009` |
| Executable tests | `225CACB74B5934861523CFB4958808E1C58E4984E61515D4E765C943897740A5` |
| Generated-prompt regression test | `750EF40EDFCA3B0811F6C98A3E2561BFDDDACD3895474F8850486116ED189C08` |

## Standards and Spec review

The clarified two-axis review was attempted twice with independent Standards and Spec workers. One attempt failed at model capacity and the other returned an empty payload on each round, so none was treated as PASS. An evidence-backed root review was then completed against `baseline-before-ticket-01-remediation`, including the untracked generated-prompt regression test.

- **Standards:** follow-up review found that the first characterization revision manually assigned retry, artifact, and aggregate facts before asserting them. The characterization now exercises only response validation and canonical differences; orchestration claims remain in the existing `runFixture` tests. Extractor and Verifier v2 generated prompt bytes are both pinned, Verifier v2 explicitly excludes Extractor v3 rules, and the unrequested explicit `maxTokens` setting was removed. No documented-standard violation or remaining baseline smell remains after these fixes.
- **Spec:** the follow-up review removed the unsolicited V3 token-setting change, protected the unchanged Verifier v2 prompt, and removed current V3 prompt metadata from the historical V2 characterization. The characterization remains explicitly GREEN rather than a manufactured harness RED; the actual RED→GREEN cycles cover the missing v3 generated rules and reviewed-corpus policy/parity. Prompt-level and capability-level procedures, the focused `status.const=rejected` limitation, all four reviewed rejection codes, independent fixture literals, exact strict-canary controls, privacy waiver, skipped Verifier, and unproven target v3 state are documented or tested directly. Ticket 02-or-later and production source remain untouched.

## Acceptance classification

| Ticket requirement | Local status | Target-instance status |
| --- | --- | --- |
| Two distinct throwaway Skills; no Agent | Source and SDK build proven | Extractor deployment observed; Verifier and zero-Agent target inspection remain unverified |
| Same four original inputs | Definition, immutable original envelope, fresh-copy, and actual per-call hash seams proven | Extractor input-integrity marker passed; full-schema and Verifier calls remain unverified |
| Verifier receives no Extractor output/conversation | Input surface proven; mutation terminally blocks before Verifier | Runtime invocation observation required |
| Structured output and deterministic canonicalization | Complete machine-checkable `ticket-01-v2` schema, closed Typed Value Expression, strict discriminated validator, reviewed-corpus rejection policy, and exhaustive parity checks locally proven | Focused v2 prompt-level response schema passed, but exact reviewed code/line comparison failed; v3 untested |
| Full supported/invalid corpus | Reviewed corpus present | `unsupported_behavior` v2 focused prompt-level smoke FAIL; complete-schema capability canary and remaining corpus not run |
| Ten runs per fixture | Closed aggregate verdict and exact run matrix proven with doubles | All 110 real repeated fixture runs required |
| Exact quoted literal preservation | Reviewed seam proven | Real Skill responses required |
| One identical retry for all technical failures | Locally proven by failure injection | Target invocation failure injection required |
| Semantic difference has no retry/vote/selection | V2 prompt observation characterized as schema-valid semantic mismatch; existing two-Skill runtime disagreement test still proves no semantic retry/vote/selection after the independent calls | V2 Test Prompt observation is focused prompt-level FAIL only; capability-level full-schema path remains unverified |
| Terminal inconsistent/technical/input-integrity/artifact-boundary results and zero artifacts | Locally proven at harness boundary | ATF table inspection required |
| Non-raw evidence only | Evidence serializer locally proven | System/Now Assist log inspection required |
| No persisted raw Design or AI conversations | No local persistence exists | FAIL/WAIVED for synthetic functional POC: extended logs retained raw content despite the documented property being false; production privacy unproven |
| No ATF record or custom table | No such metadata/source was added | Before/after target table/schema inspection required |
| Clear PASS/FAIL for configured release | V3 local remediation PASS | V3 prompt-level semantic smoke NOT VERIFIED; V3 capability-level strict canary NOT VERIFIED; overall gate NOT PASS |

## Extractor V3 prompt-level semantic smoke handoff

Use only the same synthetic, non-sensitive reviewed fixture. Do not add raw prompt/response, screenshots, target identifiers, credentials, or model conversation to this repository.

1. Deploy the new throwaway metadata.
2. Verify that `Ticket 01 Independent Extraction` version 3 exists as a distinct prompt version; do not edit version 2 in place.
3. Verify the exact required effect/source-line rules, equivalent rules for all four reviewed rejection codes, and all six reviewed output rules in the generated version 3 prompt.
4. Publish version 3 through the target-supported Skill Builder lifecycle.
5. Ensure Skill Builder Test Prompt is explicitly using version 3 and the same focused closed schema with `status.const=rejected`.
6. Run the same synthetic `unsupported_behavior` fixture unchanged. This is an **Extractor V3 prompt-level semantic smoke**, not a Skill runtime or capability-level canary.
7. Report only: raw JSON only (yes/no), Markdown/commentary (yes/no), status, rejection code, source lines, and unexpected properties (yes/no).

The focused prompt-level smoke passes only for exactly this sanitized result:

```json
{
  "status": "rejected",
  "rejection": {
    "code": "EFFECT_PROPERTY_UNSUPPORTED",
    "sourceLines": [7]
  }
}
```

A schema-valid but semantically different result receives no retry and is **FAIL**. An exact match may be recorded only as:

- prompt-level raw JSON shape: PASS;
- stable rejection code for `unsupported_behavior`: PASS;
- exact source-line attribution for `unsupported_behavior`: PASS;
- focused V3 prompt-level smoke: PASS.

Because the focused schema forces `status=rejected`, this smoke does not prove that the model independently selected rejected and must not be called full Skill runtime PASS, capability-level strict canary PASS, Extractor semantic feasibility PASS, or Ticket 01 PASS.

## Extractor V3 capability-level strict canary handoff

Only after the focused prompt-level smoke passes, run the target-supported scoped Background Script harness with the complete `ticket-01-v2` Output Schema, including both discriminated `accepted` and `rejected` variants:

1. Send the same unchanged reviewed `unsupported_behavior` fixture in one immutable canonical original envelope.
2. Give each attempt a fresh deep copy of that original envelope and hash the actual input immediately before and after invocation.
3. Let the model independently choose `rejected`; validate the raw output unchanged without trimming, repairing, or stripping Markdown fences.
4. Require exact code `EFFECT_PROPERTY_UNSUPPORTED` and exact `sourceLines=[7]`.
5. Retry exactly once with an identical input only if the raw response has a technical `response_schema` failure.
6. Do not retry a schema-valid response that differs semantically from the reviewed code or source lines.
7. Read artifact/custom-table counts before and after and require zero delta.

Only an exact full-schema Background Script result satisfying all of those controls may be recorded as `Extractor capability-level strict canary: PASS`.

After that strict canary PASS, proceed to the full repeated corpus, remaining technical failure injections, Verifier independence proof, and complete before/after ATF/custom-table inspection required by the ticket. Do not fabricate or pre-record any target result.

## Current gate classification

- V3 local remediation: **PASS** based on local tests, strict schema compilation, SDK build, and generated XML inspection.
- V3 target prompt-level semantic smoke: **NOT VERIFIED**.
- V3 capability-level strict canary: **NOT VERIFIED**.
- Overall Ticket 01 aggregate gate: **NOT PASS**.

## Current blockers

- `.now/` contains only `bom.json`, the SDK reports no saved authentication profile, and the available browser session has no authenticated target tab.
- Extractor v2 capability-level invocation succeeded, but the target rejected and nullified the supplied Skill Config candidate. Skill Config binding and runtime role enforcement remain unproven; no alternate resource/config/definition ID will be guessed.
- Extended target logs retained raw synthetic input, assembled prompt, and response even with `com.sn.generative.ai.log_prompt=false`. The operator waiver is limited to this non-sensitive functional POC; production privacy remains failed/unproven.
- Extractor v2 failed the reviewed `unsupported_behavior` focused prompt-level semantic smoke. Extractor v3 exists only in local generated metadata until target deployment, publication, prompt-level smoke, and capability-level strict canary.
- Verifier target verification is skipped/not verified. The source remains independent, but there is no target Verifier evidence.
- The full 110-run corpus, target technical retry injections, background full-schema canary, Verifier independence observation, and ATF/custom-table before/after inspection remain outstanding.

No Extractor v3 prompt-level, capability-level, or overall Ticket 01 target PASS evidence has been simulated or inferred from local doubles.
