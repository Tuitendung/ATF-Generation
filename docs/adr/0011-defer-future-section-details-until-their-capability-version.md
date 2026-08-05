---
status: accepted
---

# Defer future-section details until their capability version

Version 1 will resolve and implement only Identity, Knowledge lifecycle, and Permission Design. The Logical Specification Schema keeps named roadmap sections for Variables, Variable Sets, UI Policies, Catalog Client Scripts, server dependencies, fulfillment, and broader expected outcomes, but their fields, cardinalities, and behavioral contracts are deliberately deferred until a version intends to consume them.

Each future capability must resume the recorded Deferred Grill Backlog and complete its section design before implementation. This supersedes ADR-0001's requirement to finish the entire logical contract during the permission POC, reducing speculative schema work at the accepted risk that later sections may require new physical records, migration, or changes to the roadmap outline.
