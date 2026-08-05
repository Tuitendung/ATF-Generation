---
status: accepted
---

# Represent variables and Variable Sets in one Design table

Version 2 represents variables, Single Row Variable Sets, and Multi Row Variable Sets as **Variable Design Entries** in the same Variable Design Text Table. Each entry has a unique `entry_key` and an `entry_kind`; a blank `parent_key` means the Catalog Item directly owns the entry, while a variable's populated `parent_key` identifies its owning Variable Set.

Variable Sets cannot be nested, and among Variable Design Entries only variable entries may be Behavior Block targets. ADR-0047 separately introduces the reserved `CATALOG_FORM` target, which is not a Variable Design Entry. The parser rejects unknown parents, parents that are not Variable Sets, Variable Set entries with parents, and cycles. This avoids a separate Variable Set section or custom table while preserving enough hierarchy to validate ownership and generate tests deterministically.
