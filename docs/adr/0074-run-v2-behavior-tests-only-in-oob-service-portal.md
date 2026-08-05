---
status: accepted
---

# Run v2 behavior tests only in OOB Service Portal

Version-2 Derived Behavior Test Cases open, stimulate, and observe the Catalog Item Under Test only through the out-of-box Service Portal Catalog Item page. Employee Center, Native Platform Catalog UI, custom Portals, and custom Catalog widgets are outside the POC; a later surface must add an explicit execution adapter rather than being assumed equivalent.

Reusing the requester-facing surface already established by version 1 reduces POC configuration and keeps each generated test independent. Service Portal remains only an Execution Binding: it does not define expected behavior, and Design—not observed Portal state or implementation source—continues to be the test oracle.
