# Target-instance Knowledge lifecycle runbook

This runbook completes the portion of Ticket 02 that cannot be proven locally.
It must be run using externally managed authentication on the configured target
ServiceNow release. Never commit a hostname, username, token, cookie, password,
or authentication profile.

The repository currently has no target hostname or authenticated browser
session. Therefore the instance results are **not yet verified** and the gate
must remain `BLOCKED`.

## 1. Record the target facts

Create `evidence/instance/lifecycle-evidence.md` from
`evidence/instance/lifecycle-evidence-template.md` and record:

- target release family, patch/hotfix, and build tag;
- application scope/version and ServiceNow SDK version (`4.8.1` locally);
- throwaway update-set or application identifier;
- three throwaway dictionary column names on `kb_knowledge`;
- the platform UI field type selected for long **plain** text;
- the observed `sys_dictionary.internal_type` and `max_length` for each field.

Do not add production-prefixed v2 columns. Use clearly disposable column names
and do not alter the Catalog Test Specification view used by Schema Version 1.
The accepted capacity is at least 65,000 characters only if the target release
actually saves and returns that size for all three fields.

## 2. Create the throwaway fields and article

In an isolated throwaway update set:

1. Add three long plain-text fields to `kb_knowledge`, one each for Variable
   Design, Business Logic, and Variable Test Data.
2. Do not add them to the version-1 authoring view and do not deploy them as
   application production metadata.
3. Create a throwaway Draft article in the application-owned Specification
   Knowledge Base and record its exact `sys_id`.
4. Populate representative content containing both LF and CRLF inputs, blank
   lines, indentation, internal spaces, non-ASCII Unicode, an exact UTC instant,
   prompt-like quoted text, and `\|`, `\;`, `\=`, `\"`, `\\`.
5. Separately exercise an exact 65,000-character payload in every field. Record
   the requested length, saved length, server-read length, and any truncation.

## 3. Capture every lifecycle phase

At each phase below, set the constants in `capture-server-read.js`, execute it
as a server-side Background Script, and paste the complete `TICKET02_EVIDENCE`
JSON into the instance evidence file:

1. Draft immediately after create/save.
2. Published article after the real Knowledge publish action/flow completes.
3. Exact Published bound-record read using the recorded `sys_id`.
4. Replacement Draft created through the target release's real Knowledge
   revision/replacement action.
5. Published replacement revision after the real retire-and-replace lifecycle.

For each phase also record the article number, `sys_id`, Knowledge version,
workflow/publication state, replacement/predecessor identifiers exposed by the
release, and the server-read output. Never infer revision relationships from
timestamps or display order.

The capture script reports exact UTF-16 character length, base64-encoded field
content, detected line-ending counts, physical-line count, and each retained
physical line. Compare those values with the authored payload. If line endings
normalize, PASS is allowed only when semantic text and physical line identity
remain exact. Any truncation, escape change, Unicode change, lost blank line,
changed internal whitespace, changed UTC instant, or changed prompt-like text
fails the gate.

## 4. Cleanup and decision

After evidence has been exported, remove the throwaway article/revisions and
throwaway dictionary fields through the update-set/application cleanup process
approved for that instance. Record cleanup identifiers and whether recovery is
possible. Do not delete unrelated Knowledge or dictionary records.

Set the gate to:

- `PASS` only when all three fields pass create/save/publish/exact read,
  65,000-character capacity, and replacement revision;
- `FAIL` when the real lifecycle changes or truncates required content; or
- `BLOCKED` while access, release identity, or any lifecycle phase is missing.

