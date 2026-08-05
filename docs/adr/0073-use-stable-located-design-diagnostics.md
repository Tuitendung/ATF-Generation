---
status: accepted
---

# Use stable located Design Diagnostics

Version 2 exposes every validation result as a stable `ERROR` or `INFO` code with Specification Section, retained physical line or `0` for a section-level problem, relevant Design key when available, and a human-readable correction message. The closed code catalog is recorded in `docs/v2-design-validation-contract.md`; unknown, malformed, uncovered, or unsupported Design cannot be downgraded to a log-only event or an unlocated generic failure.

Stable codes allow tests and future authoring assistance to depend on diagnostic meaning without parsing prose, while physical locations keep long KB text sections repairable. Maintaining this contract costs explicit code/version management, which is preferable to best-effort validation that could make an incomplete generated suite appear trustworthy.

ADR-0077 adds two run-level terminal results that are deliberately not Design Diagnostics: `AI_INTERPRETATION_INCONSISTENT` for canonical semantic disagreement and `AI_INTERPRETATION_TECHNICAL_FAILURE` after one identical technical retry. Both retain Behavior and source-location evidence when available and create zero ATF artifacts; neither may be downgraded to `INFO` or mislabeled as `DESIGN_INVALID`.
