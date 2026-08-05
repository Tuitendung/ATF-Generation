# Prove Structured KB text, table parsing, and block splitting

Status: ready-for-human
Type: prototype
Blocked by: None

## What to build

Create a throwaway prototype that proves the three version-2 long plain-text fields survive the Knowledge lifecycle, the two Design Text Tables parse deterministically, and Guided Business Logic can be split by structural anchors with stable physical-line diagnostics. Do not implement production metadata or readers.

## Acceptance criteria

- [ ] Identify and prototype the target-release field type and accepted capacity for Variable Design, Business Logic, and Variable Test Data.
- [ ] Round-trip representative content through create, save, publish, exact server-side read, and replacement revision.
- [ ] Cover CRLF/LF, blank lines, indentation, internal whitespace, Unicode, UTC instants, prompt-like text, and all five Design Escape Sequences.
- [ ] Prove line-ending normalization does not destroy physical-line identity.
- [x] Parse the exact Variable Design and Variable Test Data headers, cell counts, keys, types, and escapes repeatedly with identical results.
- [x] Split Business Logic only by `BEHAVIOR_ID`, `TARGET`, `TRIGGER`, `LOGIC`, and `END` while preserving original lines.
- [x] Prove the splitter does not interpret condition or effect meaning.
- [x] Reject missing, duplicate, malformed, or out-of-order anchors, nested blocks, missing `END`, content outside a block, duplicate Behavior IDs, and malformed Outcome markers.
- [x] Report the exact 1-based physical line for located failures and line `0` for section-level failures.
- [x] Prove a structurally invalid block causes no Now Assist invocation.
- [ ] Record all platform normalization, truncation, publication, escaping, and revision behavior.
- [ ] Do not alter the version-1 authoring view or generation behavior.

## Evidence required

- Target release, SDK version, prototype field definitions, and accepted capacity.
- Before-save and after-read payloads or hashes.
- Knowledge lifecycle and physical-line comparison.
- Valid and invalid parser/splitter fixture matrix with exact ordered diagnostics.
- Proof that invalid structure causes zero AI calls.

## Capability blocked if this prototype fails

- Version-2 physical Specification fields.
- Deterministic Variable Design and Variable Test Data readers.
- Safe Business Logic Skill invocation.
- Stable located Design Diagnostics.
- Every version-2 path beyond fast preflight.

## Comments

### 2026-08-05 — local prototype complete; target lifecycle and Git handoff blocked

Gate result: **BLOCKED**. The deterministic local portion is complete, but the
Knowledge lifecycle portion has not run on the configured target release. No
target hostname, release identifier, credentials/auth profile, or authenticated
browser session was available. No platform field type, capacity, normalization,
publication, or replacement-revision behavior has been inferred or marked as
verified.

The throwaway prototype is isolated under
`.scratch/atf-generation-v2/prototypes/ticket-02/`; it adds no production
metadata or production reader and does not edit `src/`, `dist/`, `package.json`,
or the Schema Version 1 authoring/generation files.

Local executable evidence:

- 18 fixture-matrix cases, each repeated 10 times with identical result hashes.
- LF and CRLF Variable Design results have the same SHA-256
  `e852fa8f203dccc6fcf46a7497edc2daa4cad8e388d342ba127c0f516b81f18c`
  and retain data at physical line 3 after a blank line.
- The valid corpus includes blank lines, indentation, internal double spaces,
  Unicode, `2026-08-05T08:09:10Z`, prompt-like quoted text, and all five Design
  Escape Sequences.
- Invalid table fixtures cover exact/reordered headers, cell counts,
  invalid/duplicate Design Keys, invalid entry/type mappings, invalid Candidate
  types, unsupported escapes, and a trailing backslash.
- Invalid Business Logic fixtures cover a blank section, content outside a
  block, missing/duplicate/malformed/out-of-order anchors, nested blocks,
  missing `END`, duplicate Behavior IDs, and malformed/duplicate Outcome IDs.
- Opaque condition/effect variants with incompatible nonsense prose produce the
  same structural envelope, proving that the splitter does not interpret their
  meaning.
- The invalid-structure gate returns `DESIGN_INVALID`, reports ordered located
  diagnostics, and records `now_assist_calls: 0` plus
  `observed_callback_calls: 0`.

Commands run successfully:

```text
node --test .scratch\atf-generation-v2\prototypes\ticket-02\test\prototype.test.js
# 9 passed, 0 failed

node .scratch\atf-generation-v2\prototypes\ticket-02\run-local-evidence.js
# 18 matrix cases x 10 identical runs; exit 0
```

Evidence and continuation paths:

- `.scratch/atf-generation-v2/prototypes/ticket-02/evidence/local-verification.json`
- `.scratch/atf-generation-v2/prototypes/ticket-02/fixtures/fixture-matrix.js`
- `.scratch/atf-generation-v2/prototypes/ticket-02/test/prototype.test.js`
- `.scratch/atf-generation-v2/prototypes/ticket-02/instance/README.md`
- `.scratch/atf-generation-v2/prototypes/ticket-02/instance/capture-server-read.js`
- `.scratch/atf-generation-v2/prototypes/ticket-02/evidence/instance/lifecycle-evidence-template.md`

The target operator must create disposable long plain-text fields, record the
observed `sys_dictionary.internal_type` and `max_length`, and capture create,
save, publish, exact bound-record read, 65,000-character capacity, and
replacement-revision evidence using the runbook. Keep this ticket
`ready-for-human` until those identifiers and outputs are committed.

Repository handoff is also blocked: `git status`, `git log`, and `git
rev-parse` report that this workspace is not a Git repository because `.git` is
absent. Therefore a fixed-point two-axis `$code-review` and the required Ticket
02 commit cannot be honestly produced in this workspace. No commit hash exists.
