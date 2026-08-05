---
status: accepted
---

# Use absolute ISO date and time values

Version 2 represents a Date as the exact `YYYY-MM-DD` calendar form and a Date/Time as an exact UTC instant `YYYY-MM-DDTHH:mm:ssZ`. Variable Test Data, Business Logic literals, dependency outputs, type validation, and expected-value evaluation use these semantic forms; generated ATF adapters may render them for the execution user's locale and timezone but compare the underlying date or instant rather than the displayed string.

The DSL has no implicit `TODAY`, `NOW`, relative date/time arithmetic, locale-formatted date, or timezone-free timestamp. Current-time-dependent behavior is outside ADR-0055's Dependency-Free POC Boundary; if dependency capability is later admitted, it must use a controlled clock contract, Dependency Test Data, and an explicit Execution Binding. This avoids wall-clock, timezone, and day-boundary nondeterminism.
