---
status: accepted
---

# Reject value-change cycles

Atomic Design Validation constructs a **Value-Change Graph** with an edge from every variable-specific `ON CHANGE` trigger to its target variable when any branch can assign `SELF.VALUE`. The version-2 POC rejects self-edges and directed cycles with a `VALUE_CHANGE_CYCLE` diagnostic that reports the involved variable path.

Visibility, mandatory, read-only, and message effects do not create value-change edges. Acyclic value propagation is permitted, but the POC does not attempt to prove that a cycle stabilizes because of conditions, unchanged values, platform event suppression, or implementation execution order; those mechanisms are not Design-owned expected behavior and cross-contract sequences are outside ADR-0056's boundary.

This conservative graph check may reject an implementation that happens to terminate, but it prevents cyclic final-state ambiguity without executing or interpreting implementation code.
