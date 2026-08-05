---
status: accepted
---

# Declare choice value domains inline

Version 2 stores the complete, fixed, ordered Choice Value Domain of each Select Box or Multiple Choice variable directly in its Variable Design Entry's `value_domain` cell. The cell uses semicolon-separated `value=Label` pairs, for example `hardware=Hardware;software=Software`; both the internal value and visible label are required and each internal value must be unique within the entry.

`value_domain` is empty for Reference variables, whose domain is identified by `reference_table`, and for non-choice controls with a type-defined or unrestricted domain. Business Logic may set `SELF.VALUE` only to a member of the fixed domain but cannot add, remove, filter, relabel, or reorder choices at runtime. Keeping choice definitions inline avoids another Structured Design Section or custom table and makes the Variable Design Entry self-contained, at the cost of reserving delimiters whose escaping rules belong to the versioned text grammar.
