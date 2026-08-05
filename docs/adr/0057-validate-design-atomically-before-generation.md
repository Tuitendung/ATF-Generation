---
status: accepted
---

# Validate Design atomically before generation

Every version-2 POC Generation Run performs **Atomic Design Validation** across the complete bound Current Specification before creating any ATF artifact. If at least one Design Diagnostic has severity `ERROR`, the run records `DESIGN_INVALID`, creates zero artifacts, and never generates only the apparently valid subset or silently skips unsupported behavior.

Under ADR-0077, Runtime Business Logic Interpretation precedes full semantic Design Validation. Canonical disagreement records `AI_INTERPRETATION_INCONSISTENT`, and a technical failure after one identical retry records `AI_INTERPRETATION_TECHNICAL_FAILURE`; neither is a Design Diagnostic, but both enforce the same zero-artifact boundary. Only a canonically agreed contract can enter Atomic Design Validation.

Validation collects all diagnostics that can be discovered safely without continuing from an invalid intermediate model. Each diagnostic includes its Structured Design Section, physical line number, relevant entry, Behavior, Outcome, or Test Value key when available, a stable error code, and a human-readable message. The POC supports only blocking `ERROR` and nonblocking `INFO`; it does not use `WARNING`, because an ambiguous nonblocking coverage problem could make an incomplete suite appear acceptable.

This front-loads feedback and prevents partial suites at the cost of withholding all generated output until the Specification is wholly valid. Artifact persistence must begin only after validation succeeds.
