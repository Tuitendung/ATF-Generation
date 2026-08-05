---
status: accepted
---

# Use one configured Behavior Execution User

Every version-2 Derived Behavior Test Case impersonates one active Behavior Execution User from the application-owned Behavior Execution Profile before opening the Catalog Item Under Test in OOB Service Portal. The Current Specification does not select this user, and version 2 neither reads nor reuses the version-1 Accessible Representative Test User because Permission Design is outside version-2 validation and generation.

The user is resolved exactly before artifact creation and must already be able to open the POC Catalog Item and use its required reference data. This preserves a deterministic execution context without adding a custom table or turning identity into expected behavior; Catalog behavior requiring multiple user personas or permission outcomes remains outside the POC and cannot be simulated from the fixed profile.
