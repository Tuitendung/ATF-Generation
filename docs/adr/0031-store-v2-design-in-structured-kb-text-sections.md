---
status: accepted
---

# Store v2 Design in structured KB text sections

Version 2 creates no custom tables for Variable Design, Business Logic, Variable Test Data, or any later Scenario or Catalog Dependency capability. The `kb_knowledge` Catalog Test Specification root receives three separate long, plain-text Structured Design Sections: deterministic Variable Design and Variable Test Data tables plus Guided Business Logic. Under ADR-0055 and ADR-0056 the POC adds no Dependency Design, Dependency Test Data, or Catalog Test Scenario fields; any later admitted capability must retain the zero-custom-table storage rule. This supersedes ADR-0026 and ADR-0030's child-record storage decisions.

Variable Design and Variable Test Data use strict Schema-Versioned text grammars with fixed headers, delimiters, identifiers, quoting, and empty-value rules. Business Logic uses ADR-0077's deterministic structural anchors and English Bounded Natural Language. Application code reads the exact bound fields, parses the two tables and Business Logic block structure, and rejects malformed anchors before any AI call; AI interprets conditions and effects without repairing the source. Article Body remains human notes and is never parsed.

ADR-0077 supersedes this ADR's original exclusion of AI from `Create ATF`: version 2 invokes two independent Now Assist Skills for Runtime Business Logic Interpretation after queueing. AI never interprets the two Design Text Tables, infers omitted columns, repairs invalid Design, selects Test Data, or writes ATF artifacts. Deterministic validation of the agreed contract preserves the Current Specification as the sole oracle.

The zero-custom-table model trades field-level pickers, row-level audit, and related-list editing for fewer application records, simpler aggregate versioning, and one-record generation reads. Published immutability applies to all structured Design fields, and changing any section requires a replacement Draft Specification under the existing Current Specification lifecycle.
