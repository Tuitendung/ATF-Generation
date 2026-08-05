---
status: accepted
---

# Use bounded lowercase Design Keys

All Test Designer-authored keys use lowercase `snake_case`, begin with `a` through `z`, contain only lowercase letters, digits, and underscores, and contain 1 through 64 characters. This applies to entry, Behavior, Outcome, Candidate Test Value, Data Profile, and MRVS Test Row keys; the schema-reserved uppercase target `CATALOG_FORM` is not a Test Designer-authored key.

Behavior IDs are unique within Business Logic, Outcome IDs are unique within their Behavior Block, entry and Candidate Test Value keys are unique within their sections, Data Profile keys intentionally repeat to group candidates, and MRVS Test Row identity remains scoped by Data Profile plus MRVS parent plus row key. Invalid or duplicate keys fail Design Validation instead of being normalized, case-folded, or replaced with generated identifiers.
