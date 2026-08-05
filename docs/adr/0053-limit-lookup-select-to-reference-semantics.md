---
status: accepted
---

# Limit Lookup Select to Reference semantics

Version 2 supports a Lookup Select only as a **Reference-Like Lookup Select**: its Variable Design Entry declares `control_type = lookup_select`, `semantic_type = reference`, an empty `value_domain`, and a nonblank `reference_table`, while the live execution mapping stores the selected record's `sys_id`. Candidate Test Values use `REFERENCE_BY(...)` and must resolve exactly one record under ADR-0049.

The generator may inspect the live variable metadata only to bind and operate the supported control; it does not use lookup records, labels, qualifiers, or observed options as expected behavior. Code- or text-valued lookups, dynamic option-domain verification, qualifier behavior, and complete live option-list assertions are outside v2 and fail capability validation rather than being skipped.

This keeps Lookup Select compatible with fixed Choice Value Domains and Reference execution binding without expanding Variable Design into a live lookup implementation model.
