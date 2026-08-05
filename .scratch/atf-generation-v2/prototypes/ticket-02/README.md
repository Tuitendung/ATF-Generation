# Ticket 02 throwaway feasibility prototype

This directory contains disposable evidence for Ticket 02. It is deliberately
outside `src/`, creates no ServiceNow metadata, defines no production reader,
and does not change the Schema Version 1 authoring or generation path.

## Local executable seams

- `parseVariableDesign(text)` parses only the exact 13-column Variable Design
  Text Table contract.
- `parseVariableTestData(text, variableDesignResult)` parses only the exact
  five-column Candidate Test Value contract and checks Candidate scalar types
  against the supplied Variable Design result.
- `splitBusinessLogic(text)` recognizes only `BEHAVIOR_ID`, `TARGET`,
  `TRIGGER`, `LOGIC`, `END`, and structural `OUTCOME_ID` markers. Condition and
  effect prose is intentionally opaque.
- `validateBeforeNowAssist(text, invokeNowAssist)` is the prototype validation
  gate. Any structural diagnostic returns `DESIGN_INVALID` and calls the
  supplied invocation seam zero times.

Run the local proof:

```powershell
node --test .scratch\atf-generation-v2\prototypes\ticket-02\test\prototype.test.js
node .scratch\atf-generation-v2\prototypes\ticket-02\run-local-evidence.js
```

The fixture matrix covers LF and CRLF, blank physical lines, indentation,
internal whitespace, Unicode, an exact UTC instant, prompt-like quoted text,
all five Design Escape Sequences, exact and reordered headers, cell counts,
valid/invalid/duplicate keys, supported and mismatched types, invalid and
trailing escapes, every required Business Logic anchor failure class,
malformed/duplicate Outcome markers, and deterministic ordered diagnostics.

## Platform boundary

Local mocks cannot prove ServiceNow dictionary type/capacity, Knowledge save or
publication behavior, server-side field normalization, or replacement
revision behavior. Follow [instance/README.md](instance/README.md) on the
configured target release. Do not mark the platform acceptance criteria as
complete until the resulting identifiers and captured outputs are committed
under `evidence/instance/`.

