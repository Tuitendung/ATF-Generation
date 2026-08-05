# Use fixed-header pipe tables for tabular Design

Every tabular Structured Design Section in version 2 uses a plain pipe-delimited text table. Its first line is the exact Schema-Versioned header, column names and their order are fixed, each subsequent record occupies one line, and no Markdown separator row is present.

The version-2 Variable Design header is exactly:

```text
entry_key | entry_kind | parent_key | label | control_type | semantic_type | value_domain | default | visible | mandatory | read_only | reference_table | order
```

`entry_key`, `entry_kind`, and `parent_key` identify and place each Variable Design Entry. `label`, `control_type`, `semantic_type`, and `value_domain` describe the control and its values. `default`, `visible`, `mandatory`, and `read_only` declare its Baseline Variable State. `reference_table` identifies the table for supported Reference controls, and `order` declares display order. Validation determines which cells are required, optional, or forbidden for each `entry_kind` and control type; Business Logic remains in its separate Structured Design Section.

The version-2 Variable Test Data header is exactly:

```text
test_value_key | variable_key | value | data_profile_key | mrvs_row_key
```

Each row declares one Candidate Test Value. `test_value_key` is its unique identity, `variable_key` resolves to one value-bearing Variable Design Entry, and `value` is a type-valid literal, fixture reference, supported Reference Candidate Binding, or Reference Set Candidate. Blank `data_profile_key` makes the candidate independently selectable; equal nonblank profile keys group values that must be selected together. `mrvs_row_key` is required only for variables directly owned by an MRVS and forbidden for every other entry. Variable Test Data never contains a Behavior ID, Outcome ID, or expected effect. The order of its nonblank data rows is semantically meaningful as the deterministic candidate and MRVS-row order.

The deterministic parser rejects a missing, renamed, reordered, duplicated, or additional header column and rejects data rows with missing or additional cells. It does not ask AI to infer a schema or repair malformed input. Multiline Business Logic remains in its own non-tabular Structured Design Section rather than being escaped into a table cell.

The parser applies these common formatting rules:

- The first physical line is the mandatory header; a leading blank line is invalid.
- Spaces and tabs at the start or end of every cell are trimmed. Within `value_domain`, the same trimming occurs around each choice value and label; whitespace inside content is preserved.
- Whitespace-only lines after the header are ignored, while their physical line numbers remain part of validation diagnostics.
- Each table record occupies one physical line. Quoted cells, multiline cells, Markdown separator rows, and comment lines are not supported.
- Windows and Unix line endings have the same meaning. Parsing never rewrites the saved Design text.

This deliberately favors simple implementation and reproducible diagnostics over flexible CSV-style schema inference or Markdown rendering conventions.
