---
status: accepted
---

# Keep Choice Value Domains fixed

Version 2 treats each Select Box or Multiple Choice variable's Variable Design `value_domain` as its complete and immutable runtime Choice Value Domain. Business Logic may set `SELF.VALUE` to a declared internal value but has no `SELF.CHOICES`, `ADD_CHOICE`, `REMOVE_CHOICE`, filtering, relabeling, or reordering effect.

ATF Generation validates selected values against the fixed domain and may verify its baseline availability, but it does not generate dynamic-choice mutation tests. This deliberately narrows Catalog Form Behavior and materially reduces parser, composition, and ATF-observation complexity while preserving the stated v2 business requirements.
