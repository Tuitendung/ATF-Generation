---
status: superseded by ADR-0031
---

# Author Variable Design as KB-owned structured records

Version 2 keeps `kb_knowledge` as the Catalog Test Specification aggregate root and authors each **Variable Design Row** as a structured child record owned by that exact Knowledge Article. The child record holds the stable variable key, control and semantic types, value domain, baseline state, ordering and ownership information, and a large-text Business Logic field containing zero or more `BEHAVIOR ... END` blocks. Test Designers edit these records through the Specification form and its Variable Design related surface rather than through an Excel generation input or free-form Article Body.

This one-to-many model supports an arbitrary number of variables while preserving exactly one authoritative row per stable variable key. Adding numbered variable columns directly to `kb_knowledge` would impose a fixed limit, while storing the whole model as hand-edited JSON or prose would weaken field-level authoring, reference selection, validation, auditability, and diagnostics. Version 2 does not require a compiled Design Snapshot merely to avoid Excel parsing; the generator may read the structured records owned by the exact bound Specification.

Publication and immutability apply to the entire **Specification Aggregate**, not only its `kb_knowledge` root. Once Published, its Variable Design children cannot be inserted, changed, or deleted; a changed Design requires a replacement Draft Specification. Article Body remains human notes and is never parsed. Physical storage for repeatable Variable Test Data, Catalog Test Scenarios, Catalog Dependency Contracts, and Execution Bindings is decided separately rather than assuming one table for every nested node.
