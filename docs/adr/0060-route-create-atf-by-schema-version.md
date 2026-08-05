---
status: accepted
---

# Route Create ATF by Schema Version

The existing **Create ATF** entry point uses the bound Current Specification's Schema Version to select exactly one compatible generator: version 1 runs the stable permission generator, while version 2 runs the behavior-only generator defined by ADR-0059. A blank or unsupported version fails compatibility validation instead of guessing a generator, and the Test Designer does not choose a generator through a second action or runtime option.

This preserves one user workflow and makes the published Design contract determine generation semantics. The trade-off is that a version-2 click does not refresh version-1 permission artifacts; the previously generated permission suite remains independent.
