---
status: accepted
---

# Group MRVS candidates with row keys

Variable Test Data adds the optional `mrvs_row_key` column. Every Candidate Test Value for a variable directly owned by a Multi Row Variable Set must provide both a nonblank `data_profile_key` and `mrvs_row_key`; variables outside MRVS must leave `mrvs_row_key` blank. Values sharing the same Data Profile, MRVS parent, and row key form one **MRVS Test Row**.

Within an MRVS Test Row each child variable may occur at most once. Row identity is scoped to its Data Profile and MRVS parent, and row order follows the first physical occurrence of each row key in Variable Test Data. A selected Data Profile carries all of its MRVS rows together, while top-level and Single Row Variable Set candidates may participate in the same profile with blank row keys. Nested MRVS remains invalid.

This fifth fixed column keeps MRVS data line-addressable and type-validatable without a nested mini-language, custom table, or separate MRVS Test Data section.
