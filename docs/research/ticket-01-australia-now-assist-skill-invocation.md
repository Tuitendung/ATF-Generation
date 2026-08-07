# Ticket 01 — Australia Now Assist Skill Invocation Research

- Research date: 2026-08-06
- Target family: Australia
- Target build supplied for this research: `glide-australia-02-11-2026__patch2-hotfix3a-07-01-2026`
- Repository SDK: `@servicenow/sdk` 4.8.1 (`package.json:17`; `node_modules/@servicenow/sdk/package.json:3`)
- Ticket gate after this research: **BLOCKED**

This is a research artifact for the Ticket 01 feasibility prototype. The initial primary-source research did not contact or deploy to a target. A later operator-guided target follow-up supplied the sanitized observations classified below; none are simulated. The report contains no credentials, raw prompts, raw model responses, complete model conversations, target sys_ids, or target hostname.

## Classification method

Every conclusion uses one of the classifications required by the research request:

- **verified from official documentation** — stated by a ServiceNow Australia-family documentation page.
- **verified from installed SDK metadata** — stated by the installed ServiceNow SDK 4.8.1 documentation or reproducibly emitted by its local build.
- **requires target-instance confirmation** — plausible or family-documented, but not proven for the exact Patch 2 Hotfix 3a target, its installed application versions, its scope access, or its entitlement.
- **not found / blocker** — the reviewed primary sources do not define the required behavior precisely enough to run Ticket 01 without guessing.

The official documentation pages used below display `Release version: Australia`. They are family documentation, not a certificate that every API, table, access rule, or behavior is present in this target's exact patch and installed Store-application versions.

## Sanitized target follow-up

The following facts are **verified from target-instance observation** supplied by the operator, a refinement of the original requested classification vocabulary. Only non-content facts are retained:

- scope `x_gemjp_atf_genera` sees `sn_one_extend.OneExtendUtil.execute` as a callable function;
- both throwaway Skills, their four string inputs, and published prompt version 1 records exist;
- a post-publication call reached capability dispatch and real model inference with matching pre/post input hashes;
- the supplied `sn_nowassist_skill_config` record-id candidate was rejected by target security as a mismatched `skillConfigId` and nullified; execution then continued at capability level without proving Skill Config binding;
- the response envelope exposed `model_output` as a string, but the string was Markdown-fenced and therefore failed the strict JSON response seam;
- raw prompt/input/response content and internal identifiers were observed in target logging. No such content is reproduced or stored in this report.

The previous local conclusion that the deployed `sn_nowassist_skill_config.sys_id` was a usable candidate for this call path is therefore falsified on this exact target. The official documentation still labels the required meta value as a Skill Config sys_id, but its target meaning/binding must now be obtained from a target-generated supported caller or ServiceNow support rather than inferred from local resource mappings.

## Executive conclusion

1. **verified from official documentation** — Australia documentation gives one supported script example for a custom Now Assist Skill: call `sn_one_extend.OneExtendUtil.execute(request)` synchronously with a capability sys_id and a Skill Config sys_id. The example is on [Call a custom skill from a script](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/call-custom-skill-from-script.html).

2. **requires target-instance confirmation** — the page documents a server-side UI Action run by an `admin`; it does not state that `OneExtendUtil` is a public scoped API, does not describe cross-scope caller access, and does not demonstrate a scoped Background Script on Australia Patch 2 Hotfix 3a. The Australia [Server API reference](https://www.servicenow.com/docs/r/api-reference/server-api-reference/api-server.html) does not list `OneExtendUtil` or a Now Assist Skill invocation API. Ticket 01 must verify the Script Include and its application-access/caller-access policy on the exact target before adding an adapter.

3. **not found / blocker** — no reviewed primary source provides the complete callable contract needed by Ticket 01: how the four mandatory `string` inputs are encoded in `payload`, all returned fields and value types, timeout/unavailable/rate-limit representations, session retention, or a supported switch that guarantees independent calls.

4. **verified from installed SDK metadata** — SDK 4.8.1 says `roleMap` is for Australia Patch 3 or later and `roleRestrictions` is for pre-AP3 targets (`nowassist-skills-guide.md:372-390`; `nowassistskillconfig-api.md:134-141`). This target is Australia **Patch 2**; `hotfix3a` is a hotfix label, not Australia Patch 3. Both throwaway Skills currently use only `roleMap` (`src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts:97,162`). This is a target compatibility risk and a Ticket 01 blocker until confirmed or remediated from target-observed role metadata.

5. **verified from installed SDK metadata** — both source definitions request `temperature: 0`, but the SDK 4.8.1 build emits `<temperature>0.2</temperature>` for both generated prompt-version records (`src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts:105,176`; `dist/app/update/sys_generative_ai_config_cfb77aa564d94886991bedc80087d40d.xml:49`; `dist/app/update/sys_generative_ai_config_93af4c8a2bc84670b0f711c957038d8b.xml:49`). The guide states that `0.0` is valid and `0.2` is only the default (`nowassist-skills-guide.md:300-309`). Target-installed prompt metadata must therefore be checked; the source value cannot be assumed to have survived the 4.8.1 build.

6. **requires target-instance confirmation** — Ticket 01 remains **BLOCKED** until the exact target proves scope access, Skill activation, input encoding, output/error semantics, independent-call behavior, safe evidence fields, active provider/model mapping, role behavior, and the required repeated runs. This research alone is not runtime evidence.

7. **verified from official documentation** — `com.sn.generative.ai.log_prompt` is the Australia-documented boolean controlling whether Generative AI API calls are logged; its documented default is `true`. The same reference states that `sys_generative_ai_log` stores prompts, responses, and edited responses for 180 days. The effective target value must be read and controlled before another Ticket 01 model call.

8. **verified from installed SDK metadata** — the corrected prompts are now emitted as distinct draft version 2 records with the exact reviewed output rules inlined. They remain local build artifacts until redeployed and published through Skill Builder.

## Findings by research question

### 1. Supported scoped background server-side invocation path

#### Family-documented call

**verified from official documentation** — the Australia Skill Kit page documents this request and call shape (placeholders retained; no sys_id is invented):

```javascript
var request = {
    executionRequests: [
        {
            payload: inputsPayload,
            capabilityId: '<target capability sys_id>',
            meta: {
                skillConfigId: '<target Skill Config sys_id>',
            },
        },
    ],
    mode: 'sync',
}

var result = sn_one_extend.OneExtendUtil.execute(request)
var response = result.capabilities[request.executionRequests[0].capabilityId].response
var modelOutput = JSON.parse(response).model_output
```

Source: [Call a custom skill from a script](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/call-custom-skill-from-script.html), Australia, updated March 12, 2026. The page creates a server-side UI Action and states `Role required: admin`.

**verified from installed SDK metadata** — the local SDK build establishes the relationship between the two identifiers without requiring guessed target IDs:

- the Skill Config is a `sn_nowassist_skill_config` record;
- its `skill_id` field references a `sys_one_extend_capability` record;
- the Skill Config record's own `sys_id` was the `skillConfigId` candidate suggested by the local relationship;
- the referenced capability record's `sys_id` is the `capabilityId` candidate.

Representative emitted records: `dist/app/update/sn_nowassist_skill_config_07fe314bf5594f89bcb9af6dcc2d6efd.xml:3-14` and `dist/app/update/sys_one_extend_capability_d4e7afa5b20f4cf7972884ba0d7362a8.xml:3-12`. The guide independently says to query `sn_nowassist_skill_config` for `skill_id` (`node_modules/@servicenow/sdk/docs/guides/nowassist-skills-guide.md:757-759`).

**verified from target-instance observation** — the target rejected and nullified that Skill Config record-id candidate as mismatched. This proves that the local relationship alone is insufficient for the target-supported `meta.skillConfigId` binding. The distinct resource-mapping id observed during capability execution is not substituted: no official source or target-generated caller has identified it as `skillConfigId`.

#### Boundary of what is actually verified

**requires target-instance confirmation** — the official example proves that ServiceNow documents a custom-Skill script call at the Australia family level. It does not prove all of the following for the exact target:

- that the `sn_one_extend.OneExtendUtil` Script Include is installed at the required application version;
- that its `execute` method is callable from scope `x_gemjp_atf_genera`;
- that caller-access approval or a cross-scope privilege is not required;
- that it is supported from a scoped Background Script rather than only the documented UI Action context;
- that the exact Patch 2 Hotfix 3a implementation accepts the same request and returns the same shape;
- that both throwaway Skills are finalized, published, activated, and callable.

**not found / blocker** — `OneExtendUtil` is not present in the reviewed Australia Server API catalog, and the custom-Skill task is not a formal method reference with parameter, return, exception, and scope-support definitions. It must not yet be hard-coded into the prototype harness as though its complete contract were known.

### 2. Required plugins, entitlements, roles, and application access

| Requirement | Conclusion | Classification and source |
| --- | --- | --- |
| Product/application | The human-readable product is the **Now Assist Skill Kit plugin for Now Assist**. Relevant Now Assist product plugins must be updated in Application Manager. | **verified from official documentation** — [Exploring Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/exploring-now-assist-skill-kit.html) and [Configuring Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/configuring-now-assist-skill-kit.html). |
| Exact plugin technical IDs and installed versions | The reviewed pages do not publish a technical plugin ID or the minimum Store-application versions for the exact build. | **not found / blocker** — obtain them from the target's installed applications, not from a guessed `com.sn.*` name. |
| Entitlement | Skill Kit is included in various Now Assist packages; custom Skill creation/deployment is limited to the scope of the customer's purchased Now Assist products. | **verified from official documentation** — [Field of use for Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/nask-field-of-use.html). |
| Exact target entitlement | The supplied family/build does not prove a Now Assist package, Skill Kit entitlement, Now LLM Service access, or provider quota. | **requires target-instance confirmation**. |
| Author/test/publish role | `sn_skill_builder.admin`. It is assigned after installation and controls Skill authoring, tools, test/evaluation, publishing, and security controls. | **verified from official documentation** — [Now Assist Skill Kit roles](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/na-skill-kit-roles.html). |
| Install/activate/script-call role | `admin`; the roles page explicitly includes installing Skill Kit, activating published Skills, and calling custom Skills from scripts. The call page also says `Role required: admin`. | **verified from official documentation** — the roles and call pages above. |
| Custom-model role | `sn_skill_builder.sb_model_admin`, in addition to `sn_skill_builder.admin`, only when creating/updating custom LLMs. Standard Now LLM Service use does not require it. | **verified from official documentation** — the roles page above. |
| Diagnostics role | `sn_nowassist_admin.nsa_admin` for the Now Assist Admin “Run diagnostics” task. | **verified from official documentation** — [Troubleshoot a Now Assist skill](https://www.servicenow.com/docs/r/intelligent-experiences/troubleshoot-a-now-assist-skill.html). This is not an invocation role and diagnostics are available only for certain Skills. |
| Runtime Skill access | Authoring roles do not grant runtime access. The Skill ACL/user-access roles determine who may invoke it. The prototypes name `atf_test_admin` in `userAccess` and `roleMap`. | **verified from official documentation** for the separation of author and invocation access; **verified from installed SDK metadata** for the prototype configuration (`nowassistskillconfig-api.md:134-141`; prototype source lines 91-98 and 156-163). |
| `atf_test_admin` availability and access | Its existence, sys_id, assignment to the operator, runtime ACL effect, and behavior on pre-AP3 role storage are unknown. | **requires target-instance confirmation**; do not invent the role sys_id. |
| Caller application access | Cross-scope access from `x_gemjp_atf_genera` to `sn_one_extend.OneExtendUtil` is not specified by the call page. | **not found / blocker** — inspect the target Script Include's supported Application Access/Caller Access and perform a scoped canary. |
| Domain entitlement | If domain separation applies, `domain.llm.usage.entitled=false` prevents that domain and child domains from using Now Assist. | **verified from official documentation** — [Reference for Generative AI Controller](https://www.servicenow.com/docs/r/intelligent-experiences/generative-ai-controller/reference-for-generative-ai-controller.html). The target value and whether domain separation applies **require target-instance confirmation**. |

The Now Assist landing pages also warn that availability varies by region, in-country SKU, regulated market, and data-center type. **requires target-instance confirmation** — “Australia” here is a release family and does not by itself establish that the target is or is not an Australia IRAP-Protected data center. See [Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/now-assist-skill-kit-landing.html).

### 3. Exact input and output contract

#### Request envelope

**verified from official documentation** — the documented example contains:

- `executionRequests`: an array containing one request in the example;
- `payload`: an `inputsPayload` object;
- `capabilityId`: the capability sys_id;
- `meta.skillConfigId`: the Skill Config sys_id;
- `mode: 'sync'`.

For an example input, the page constructs `inputsPayload['input name']` as an object with `tableName`, `sysId`, and `queryString`.

**not found / blocker** — the page does not define a formal schema for `request`, cardinality constraints, optional fields, input-name normalization, maximum payload sizes, or the correct payload representation for a `NowAssistSkillConfig` input whose `dataType` is `string`. Using direct strings or inventing a wrapper would be an API guess.

**verified from installed SDK metadata** — SDK 4.8.1 emits the Ticket 01 inputs under these technical names, all with `data_type=string` and `mandatory=true`:

| Source label | Emitted technical input name |
| --- | --- |
| Variable Design | `variable_design` |
| Business Logic Block | `business_logic_block` |
| Capability Catalog | `capability_catalog` |
| Output Schema | `output_schema` |

Representative records are under `dist/app/update/sys_one_extend_definition_attribute_*.xml`; for the Verifier, see `47bdfa...xml:9-16`, `4a8c0a...xml:9-16`, `29c5dd...xml:9-16`, and `43c8ed...xml:9-16`. The same four names are emitted for the Extractor. These records identify the Skill contract; they do not reveal how `OneExtendUtil.execute` expects string values to be serialized.

#### Response envelope

**verified from official documentation** — the call example reads:

```text
result.capabilities[capabilityId].response
```

It treats `response` as a string, parses it as JSON, and then reads `model_output`. The page does not say whether `model_output` is always a string, an object, or another JSON-encoded string.

**verified from installed SDK metadata** — the API topic says that omitting `outputs` generates five `string` outputs: `response`, `provider`, `errorcode`, `status`, and `error` (`node_modules/@servicenow/sdk/docs/api/nowassistskillconfig-api.md:167-174,373-381`). The actual 4.8.1 build emits those five attributes as `string` outputs for both Ticket 01 capabilities under `dist/app/update/sys_one_extend_definition_attribute_*.xml`.

**verified from installed SDK metadata** — there is a documentation inconsistency: the guide instead names `response`, `confidence`, `explanation`, `metadata`, and `citations` (`nowassist-skills-guide.md:145-147`). The API topic and actual emitted records agree on `response`, `provider`, `errorcode`, `status`, and `error`. This inconsistency is another reason to inspect target records rather than relying on one guide paragraph.

**not found / blocker** — no source reviewed defines:

- the complete top-level return object from `execute`;
- whether all five Skill outputs appear directly under `capabilities[capabilityId]`;
- the allowed values and meanings of `status` and `errorcode`;
- whether `error` is populated, an exception is thrown, or both;
- the response shape for multiple `executionRequests`;
- whether the response is truncated or how truncation is indicated;
- whether `model_output` contains the exact raw model string or a parsed structured value.

The target adapter must be written only after a sanitized target observation or a target-generated official invocation snippet resolves these points.

### 4. Timeout, unavailable-service, and rate-limit failures

**verified from official documentation** — the example wraps `OneExtendUtil.execute`, nested response access, and JSON parsing in one `try/catch` and reports only a generic execution error. This verifies that callers are expected to handle thrown/parse/access failures, but not which operation throws or which technical condition occurred.

**verified from installed SDK metadata** — the generated Skill contract exposes `errorcode`, `status`, and `error` as strings. No enums or documented values are provided (`nowassistskillconfig-api.md:167-174,373-381`).

**not found / blocker** — no reviewed primary source maps timeout, transport failure, unavailable service, or rate limit to:

- a thrown exception class/message;
- a top-level `execute` result;
- `status`, `errorcode`, or `error` values;
- HTTP-style codes;
- retry-after metadata;
- partial `capabilities` entries.

Ticket 01 must not classify errors by guessed strings. On the target, record only sanitized condition, attempt count, input hash, observed exception class/code or documented output fields, and terminal harness classification. Do not retain raw responses while performing the mapping.

### 5. Conversation/session retention and independent invocations

**verified from official documentation** — the documented request contains no conversation ID, session ID, or previous-response field. The sample is a synchronous, single request.

**not found / blocker** — absence of a session field in one example does not prove that platform, provider, user, or Skill state is not retained. No reviewed primary source states whether `OneExtendUtil.execute` is stateless or documents a supported “new conversation”/“no history” option.

**requires target-instance confirmation** — Ticket 01 can and should continue creating a fresh JavaScript request and a fresh deep copy of the canonical inputs for every call, but this proves only caller-side isolation. The exact target must confirm by supported documentation or sanitized repeated-call observation that no hidden conversation/session history is reused. Until then, independent model invocations are not proven.

### 6. Official tables and logs for sanitized evidence

The Australia [Reference for Generative AI Controller](https://www.servicenow.com/docs/r/intelligent-experiences/generative-ai-controller/reference-for-generative-ai-controller.html) officially lists these tables:

| Table | Documented purpose | Ticket 01 use and classification |
| --- | --- | --- |
| `sys_gen_ai_log_metadata` | Request metadata including definition, errors, user, and feedback. | **verified from official documentation** as an official metadata log. **requires target-instance confirmation** for its exact fields, ACLs, Skill/capability correlation, retention, and whether a field-level export can be demonstrably non-raw. |
| `sys_generative_ai_metric` | Performance/accuracy metrics, guardrail activity, model details, and sensitive-topic trigger data. | **verified from official documentation**. It may help identify model details, but safe fields and correlation **require target-instance confirmation**. Do not export sensitive-topic content or scores unless explicitly necessary and approved. |
| `sys_generative_ai_log` | Prompts, responses, and edited responses for debugging; documented retention is 180 days. | **verified from official documentation**. This is explicitly a raw-content table and must **not** be copied into repository evidence. Use only an on-target, read-only inspection if required to prove that repository evidence does not retain raw content. |
| `sys_gen_ai_model_version_mapping` | Source/target model-version, provider, configuration, skill-type, and resource metadata. | **verified from official documentation** as configuration/model evidence, not as proof of one invocation. |
| `sys_one_extend_usage` | Usages of a capability in flows, Virtual Agent topics, and scripts. | **verified from official documentation**. It describes configured usage, not documented per-invocation run evidence. |

**verified from official documentation** — Now Assist Admin can run diagnostics for certain Skills and reports configuration/execution test results. The diagnostic task requires `sn_nowassist_admin.nsa_admin`; copied Skills cannot use it and the option is unavailable for some Skills. See [Troubleshoot a Now Assist skill](https://www.servicenow.com/docs/r/intelligent-experiences/troubleshoot-a-now-assist-skill.html).

**verified from official documentation** — the Australia [Reference for Generative AI Controller](https://www.servicenow.com/docs/r/intelligent-experiences/generative-ai-controller/reference-for-generative-ai-controller.html) documents `com.sn.generative.ai.log_prompt` as a `true | false` property that determines whether Generative AI API calls are logged, with default `true`. Combined with the documented raw-content purpose of `sys_generative_ai_log`, this is the target-supported control that must be checked before another invocation.

**requires target-instance confirmation** — read the effective property value and determine whether an instance owner authorizes a temporary `false` value for the controlled canary window. Record the original value outside the repository, verify `false` before the call, and restore the original value afterward. A false property value does not by itself prove privacy; inspect only a non-content allowlist in metadata/metric logs and confirm that no new raw prompt/response record was created for the canary correlation. Do not delete existing logs or export their raw fields.

**not found / blocker** — the reviewed pages do not document a sanitized Ticket 01 correlation key, exact safe field allowlist, or a dedicated per-Skill invocation-result table. Before retaining any target export, inspect the target dictionary and ACLs and define an allowlist limited to identifiers, timestamps, non-content status/error codes, versions, counts, and hashes. Never export the prompt/response columns from `sys_generative_ai_log`.

### 7. Metadata identifying Skill, prompt version, provider mapping, and model

The following chain is sufficient to plan target queries without inventing record IDs:

| Identity | Metadata | Classification |
| --- | --- | --- |
| Skill Config | `sn_nowassist_skill_config.sys_id`; its `skill_id` points to the capability. This metadata relationship exists locally, but the corresponding target record id was rejected as `meta.skillConfigId` by target security. | **verified from installed SDK metadata** for the relationship; **verified from target-instance observation** for rejection of that candidate; correct invocation binding remains **not found / blocker**. |
| Capability | `sys_one_extend_capability.sys_id`, name, and `type=skill`. | **verified from installed SDK metadata** — emitted capability records. `capabilityId` is also the placeholder required by the official call example. |
| Capability definition / provider flow selected by the Skill | `sys_one_extend_capability_definition.capability`, `.api`, and `.api_type`; SDK output emits `api_type=sys_hub_flow`. | **verified from installed SDK metadata** — representative `dist/app/update/sys_one_extend_capability_definition_ca03f1dcf8fe4f3fbe0d6e75a3d08f21.xml:3-12`. The emitted API sys_id must be checked against the target; it is not target evidence. |
| Prompt version | `sys_generative_ai_config.sys_id`, `capability`, `name`, `model`, `state`, `active`, `temperature`, and `version`. | **verified from installed SDK metadata** — both emitted prompt-version records. Do not export their `prompt` field. |
| Prompt-to-definition selection | `sys_generative_ai_prompt_config.ai_config`, `definition`, `filter_type`, and `is_default`. | **verified from installed SDK metadata** — emitted prompt-config records. |
| Provider | Query `sys_gen_ai_provider`; match the provider display identity through the active provider mapping. | **verified from installed SDK metadata** — `nowassist-skills-guide.md:67-83`. |
| Provider mapping / Provider API | Query `sys_generative_ai_provider_mapping` with `external=true^active=true`; `provider_implementation` is the Provider API flow used as `providerAPI.id`. | **verified from installed SDK metadata** — `nowassist-skills-guide.md:71-83`. |
| Model | Query `sys_generative_ai_model_config` for the active provider mapping; match its `model` field to `sys_generative_ai_config.model`. | **verified from installed SDK metadata** — `nowassist-skills-guide.md:71-87`. The prototype asks for `llm_generic_small_v2`; target availability is not proven. |
| Runtime/model-version mapping | `sys_gen_ai_model_version_mapping`. | **verified from official documentation** — Generative AI Controller reference page. |

**requires target-instance confirmation** — obtain the correct Skill Config binding from a target-generated supported invocation path, plus the two capability identities, two active/published prompt-version identities, provider mapping, provider implementation flow, model record, and applicable runtime model-version mapping directly from the target. Locally emitted sys_ids and the observed resource-mapping id must not be substituted for that generated binding.

### 8. Release-specific limitations and blockers

#### Pre-AP3 role storage

**verified from installed SDK metadata** — SDK 4.8.1 explicitly routes pre-AP3 targets to legacy `roleRestrictions`/`sys_agent_access_role_configuration.role_list`; `roleMap`/`sys_agent_access_role_mapping` is for AP3 or later (`nowassist-skills-guide.md:372-390`; `nowassistskillconfig-api.md:134-141`).

**verified from installed SDK metadata** — the current source has only `roleMap: ['atf_test_admin']`, and the local build emits empty `role_list` values plus M2M mapping rows (`src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts:97,162`; emitted `sys_agent_access_role_configuration_*.xml` and `sys_agent_access_role_mapping_*.xml`).

**requires target-instance confirmation** — determine whether Australia Patch 2 Hotfix 3a lacks the M2M table, ignores those rows, rejects installation, or supports them through a backport. Until this is observed, the Skills' runtime access cannot be trusted. If the target requires legacy storage, obtain the real `atf_test_admin` role record on the target and make any later source change under a separate authorized implementation task; this research does not invent its sys_id or edit the prototype.

#### SDK 4.8.1 temperature emission

**verified from installed SDK metadata** — `temperature: 0` in both sources becomes `0.2` in both generated `sys_generative_ai_config` records. The guide says `0.0-1.0` is valid and that `0.2` is merely the default. This is an SDK-source/build discrepancy, not target runtime proof.

**requires target-instance confirmation** — check the installed prompt-version records after deployment. Ticket 01 repeated-run evidence must record the actual prompt version and actual temperature. Do not report a zero-temperature configuration based only on the TypeScript source.

#### Draft/inactive emitted metadata

**verified from installed SDK metadata** — the build emits both corrected version 2 prompt records with `state=draft` and `active=false` (`sys_generative_ai_config_cfb77...xml:7,48-50`; `sys_generative_ai_config_93af4...xml:7,48-50`).

**requires target-instance confirmation** — complete the documented finalize/publish/activate lifecycle on the target before attempting calls. Neither successful build nor deployed draft metadata proves an invocable Skill.

#### Exact patch and Store-application boundary

**requires target-instance confirmation** — the official call page is Australia-family documentation, but it does not state a minimum Australia patch or Store-application version and does not mention Patch 2 Hotfix 3a. Confirm the installed Skill Kit/Generative AI Controller application versions and the exact Script Include method on the target.

#### Provider/model boundary

**verified from installed SDK metadata** — SDK 4.8.1 recommends `Now LLM Service`, a target-observed Provider API, and `llm_generic_small_v2` (`nowassist-skills-guide.md:67-87`).

**requires target-instance confirmation** — verify active provider, provider mapping, provider implementation flow, model record, entitlement, quota, region availability, and the Skill definition's emitted API link. Do not reuse a local or documentation sys_id without observing it on the target.

## Answer matrix

| Research question | Result |
| --- | --- |
| 1. Supported scoped background API | Family-documented call: `sn_one_extend.OneExtendUtil.execute(request)`. **Exact scoped Background Script support on AP2 HF3a: requires target-instance confirmation.** Formal method contract: **not found / blocker**. |
| 2. Plugins, entitlements, roles, access | Human-readable Skill Kit/Now Assist requirements and roles are **verified from official documentation**. Technical plugin IDs, installed versions, target entitlement, runtime role behavior, and cross-scope access **require target-instance confirmation**. |
| 3. Exact input/output contract | Partial request/response example and SDK Skill attributes are verified. String payload encoding and complete return contract are **not found / blocker**. |
| 4. Technical failures | Generic catch plus string output fields are verified. Timeout/unavailable/rate-limit mappings are **not found / blocker**. |
| 5. Session state | No session field appears in the example, but retention and a force-new-session mechanism are **not found / blocker**. |
| 6. Logs/evidence | Official metadata, metric, raw log, usage, and model-mapping tables are identified. A safe field allowlist/correlation contract **requires target-instance confirmation**; raw Generative AI Log content must not enter the repo. |
| 7. Skill/prompt/provider/model identity | Table/field chain is **verified from official documentation and installed SDK metadata**. Actual target records and IDs **require target-instance confirmation**. |
| 8. Release limitation | Pre-AP3 `roleMap` risk is verified from SDK metadata; temperature emission mismatch is locally reproduced. Exact effects on AP2 HF3a **require target-instance confirmation**. |

## Minimal target-instance confirmation procedure

Run these steps only with authorized target access. They are confirmation steps, not evidence already obtained.

1. Record the exact target family/build and installed versions of Now Assist Skill Kit, Generative AI Controller/OneExtend components, and the relevant Now Assist product plugin. Record the licensed Now Assist package and provider entitlement. Do not infer technical plugin IDs from product names.
2. Verify that `sn_one_extend.OneExtendUtil` and `execute` exist and inspect their supported application/caller access for `x_gemjp_atf_genera`. Confirm that a scoped Background Script can call them. If the platform requests cross-scope caller approval, retain only the sanitized approval/result identifier.
3. Resolve each Skill by its deterministic name/internal name. From `sn_nowassist_skill_config`, record its sys_id and `skill_id`; verify that `skill_id` resolves to the intended `sys_one_extend_capability` and not another record.
4. Verify finalized/published/active prompt metadata without exporting the prompt: prompt-version sys_id, capability, version, state, active flag, actual temperature, model token, prompt-config link, and capability-definition API link.
5. Verify active records in `sys_gen_ai_provider`, `sys_generative_ai_provider_mapping`, and `sys_generative_ai_model_config`. Match the Skill's capability-definition API to the observed provider implementation. Do not substitute an SDK-emitted or documentation sys_id.
6. Verify role storage for this pre-AP3 target. Confirm the actual `atf_test_admin` role, operator assignment, Skill user-access ACL, and whether `roleMap` rows are supported. Do not record the role sys_id in this report unless it is sanitized target evidence stored in the designated evidence directory.
7. Obtain a target-generated, officially supported script example for these four `string` inputs or observe one authorized canary call. Record only the exact field names and type/shape contract; do not retain input values or output content.
8. Adapt the throwaway harness only after steps 2 and 7 resolve the API seam. Return the parsed Skill JSON response expected by the harness; do not pass Extractor output or any conversation to the Verifier.
9. Use one fresh request object and one fresh deep-copied canonical input per call. Separately confirm from target behavior/support that the service does not reuse hidden session state; caller-side fresh objects alone are insufficient proof.
10. Map success and each controlled technical failure to observed exception/output fields. Keep only hashes, attempt counts, sanitized codes/classes, versions, timestamps, and record/result identifiers.
11. Inspect `sys_gen_ai_log_metadata` and `sys_generative_ai_metric` for a non-content evidence allowlist. Inspect `sys_generative_ai_log` only on target when necessary; never export its prompt, response, or edited-response fields.
12. Keep Ticket 01 **BLOCKED** unless all target-only acceptance criteria, including 110 real corpus runs, retry behavior, semantic disagreement, session independence, privacy, and zero artifacts, have actual reviewable evidence.

## Local verification performed

The research did not call or deploy to a ServiceNow instance. The following local checks were run only to verify the installed SDK facts cited above:

```text
npm.cmd run build
```

Observed result on 2026-08-06:

```text
[now-sdk] Build completed successfully
```

After the latest fresh build, both corrected prompt-version records have `active=false`, `state=draft`, `model=llm_generic_small_v2`, `temperature=0.2`, and `version=2`, while both TypeScript definitions still request `temperature: 0`. Both emitted role configurations still have an empty `role_list` and an `atf_test_admin` M2M role mapping. These are **verified from installed SDK metadata** and remain explicitly non-target evidence.

A no-index Git whitespace check produced no whitespace-error findings for the untracked research report.

## Current blockers to Ticket 01

- **not found / blocker** — no formal, complete scoped method contract for `sn_one_extend.OneExtendUtil.execute` was found.
- **requires target-instance confirmation** — scoped Background Script/cross-scope access on the exact target.
- **not found / blocker** — payload serialization for four mandatory string inputs.
- **not found / blocker** — complete success return shape and `model_output` type.
- **not found / blocker** — timeout, unavailable-service, rate-limit, and retry-after semantics.
- **not found / blocker** — session retention and a supported independent-session control.
- **requires target-instance confirmation** — exact technical plugins, versions, entitlement, region availability, provider mapping, model, and quota.
- **requires target-instance confirmation** — pre-AP3 role storage compatibility for the current `roleMap`-only definitions.
- **requires target-instance confirmation** — actual installed temperature because SDK 4.8.1 emitted `0.2` from source `0`.
- **requires target-instance confirmation** — safe metadata fields and per-run correlation without retaining raw content.

## Primary sources

### Official ServiceNow Australia documentation

- [Call a custom skill from a script](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/call-custom-skill-from-script.html)
- [Now Assist Skill Kit roles](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/na-skill-kit-roles.html)
- [Exploring Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/exploring-now-assist-skill-kit.html)
- [Configuring Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/configuring-now-assist-skill-kit.html)
- [Field of use for Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/nask-field-of-use.html)
- [Now Assist Skill Kit](https://www.servicenow.com/docs/r/intelligent-experiences/now-assist-skill-kit/now-assist-skill-kit-landing.html)
- [Troubleshoot a Now Assist skill](https://www.servicenow.com/docs/r/intelligent-experiences/troubleshoot-a-now-assist-skill.html)
- [Reference for Generative AI Controller](https://www.servicenow.com/docs/r/intelligent-experiences/generative-ai-controller/reference-for-generative-ai-controller.html)
- [API reference](https://www.servicenow.com/docs/r/api-reference/api-reference.html)
- [Server API reference](https://www.servicenow.com/docs/r/api-reference/server-api-reference/api-server.html)

### Installed ServiceNow SDK 4.8.1 metadata

- `package.json:17`
- `node_modules/@servicenow/sdk/package.json:3`
- `node_modules/@servicenow/sdk/docs/guides/nowassist-skills-guide.md:67-87,145-147,300-309,372-390,757-759`
- `node_modules/@servicenow/sdk/docs/api/nowassistskillconfig-api.md:121-141,161-174,201-213,373-381`
- `src/fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts:91-112,156-177`
- Reproducible SDK build metadata under `dist/app/update/` for:
  - `sn_nowassist_skill_config`
  - `sys_one_extend_capability`
  - `sys_one_extend_capability_definition`
  - `sys_one_extend_definition_attribute`
  - `sys_generative_ai_config`
  - `sys_generative_ai_prompt_config`
  - `sys_agent_access_role_configuration`
  - `sys_agent_access_role_mapping`

The `dist` records are local SDK output, not target-instance evidence. They are cited only to show what SDK 4.8.1 emitted from the current source.
