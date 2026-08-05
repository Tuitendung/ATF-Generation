---
status: accepted
---

# Require ON LOAD inputs before form opening

A Derived Behavior Test Case for `ON LOAD` may select an outcome only from its **Load Context**: Baseline Variable State, a fixed execution record prepared before opening, or another explicitly supported execution context effective at that time. Variable Test Data cannot be assigned after the Catalog form opens to force an `ON LOAD` branch, because that would exercise change behavior rather than load behavior. Dependency Test Data and dependency bindings are unavailable inside ADR-0055's POC boundary.

If no valid Load Context reaches a declared load outcome, Design Validation fails and identifies the unreachable Behavior ID and Outcome ID. The Test Designer must provide a supported fixed pre-load context, declare the behavior as `ON CHANGE` when that is its real trigger, or correct an unreachable branch. This preserves event-level Behavioral Conformance instead of verifying only a coincidentally matching final state.
