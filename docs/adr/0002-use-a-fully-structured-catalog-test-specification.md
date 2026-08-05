---
status: accepted
---

# Use a fully structured Catalog Test Specification

Catalog Test Specifications represent test-relevant knowledge through versioned Structured Design Sections rather than implementation source, observed runtime behavior, or unanchored narrative. Variable Design and Variable Test Data remain deterministic text tables; version-2 Business Logic uses the anchored Guided Business Logic Template and is interpreted into a typed Catalog Behavioral Contract under ADR-0077.

ADR-0077 supersedes this decision's original prohibition on Runtime Business Logic Interpretation, but not the requirement that the Current Specification remain the sole expected-behavior source or that only validated structured contracts may drive deterministic test derivation. This retains auditable Design ownership while accepting a runtime AI dependency for one bounded section.
