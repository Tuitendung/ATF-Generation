# Prove exact Field and Form Message assertions

Status: ready-for-agent
Type: prototype
Blocked by: 04

## What to build

Create throwaway Service Portal ATF evidence that distinguishes Field Messages from Form Messages and verifies exact scope, one exact message type, exact Unicode text, and explicit clear semantics.

## Acceptance criteria

- [ ] Produce and assert representative `INFO`, `WARNING`, and `ERROR` Field Messages.
- [ ] Produce and assert a Form Message through form scope rather than a synthetic variable.
- [ ] Prove identical text at the wrong scope fails.
- [ ] Prove identical text with the wrong type fails.
- [ ] Prove changed text at the correct scope and type fails.
- [ ] Preserve and assert an exact Unicode message literal.
- [ ] Prove clear semantics means no message of the declared type remains on the exact target or form scope.
- [ ] Exercise message creation and removal after a real Change Stimulus.
- [ ] Use the proven readiness strategy rather than fixed sleep.
- [ ] Avoid generic whole-page text search and custom-widget-specific selectors.
- [ ] Determine whether OOB steps suffice or one reusable semantic assertion seam is required.
- [ ] Introduce no message collection or ordering behavior.

## Evidence required

- Message scope/type/text matrix.
- Positive, negative, Unicode, and clear-state ATF results.
- Exact OOB or disposable custom assertion seam.
- Readiness observations.

## Capability blocked if this prototype fails

- `MESSAGE` Behavior Effect.
- `CATALOG_FORM` message target.
- Exact Field Message verification.
- Exact Form Message verification.
- Every production Behavior requiring messages.

## Comments

