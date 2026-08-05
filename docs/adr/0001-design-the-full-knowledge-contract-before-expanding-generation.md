---
status: superseded by ADR-0011
---

# Design the full knowledge contract before expanding generation

The knowledge template will describe the complete test-relevant design of a catalog item so that later releases can derive tests for variables, client behavior, server logic, and fulfillment flow without replacing the template. Version 1 deliberately consumes only the permission portion to generate two accessibility tests; accepting unused template sections now trades additional design work for a stable knowledge contract across later capabilities.

The complete contract will be designed and maintained as the Logical Specification Schema, while the v1 ServiceNow installation creates only the permission-focused physical fields on `kb_knowledge`. Future sections are therefore defined now but are not authorable on the v1 form and do not require unused child tables or relationships; adding a future generator capability also adds its physical storage and migration at that time.
