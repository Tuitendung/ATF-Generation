---
status: accepted
---

# Distinguish empty values from blank Design cells

Version 2 uses the exact token `EMPTY` to declare an **Explicit Empty Value** that ATF Generation can use as input or verify as an expected runtime value. A blank Design Text Table cell instead means that the column is inapplicable or not supplied where the entry-specific schema permits omission; it never silently means an empty runtime value.

Every interactive variable must therefore declare either a type-valid literal or `EMPTY` in its `default` cell. Variable Sets and structural entries leave value-bearing cells blank where those fields do not apply, while type-specific validation controls other permitted blanks such as `reference_table` on a Select Box. This removes ambiguity from parsing, validation, and expected-result derivation.
