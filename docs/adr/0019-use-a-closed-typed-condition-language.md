---
status: accepted
---

# Use a closed typed condition language

Version 2 Guided Business Logic may express only the closed, versioned condition meanings for equality, emptiness, membership, supported ordering and ranges, supported text operations, admitted change transitions, and integer-valued `ROW_COUNT(mrvs_key)`, composed with explicit `AND`, `OR`, and parentheses. Runtime Business Logic Interpretation must normalize the prose into the same typed condition tree independently in both Skills; deterministic validation then checks every operator against operand types and declared value domains.

Parentheses are mandatory when `AND` and `OR` are mixed. AI and code reject ambiguity, scripted or dynamically evaluated conditions, regex, encoded queries, dot-walking, implementation calls, and every unsupported meaning instead of guessing, executing, or silently ignoring it. Dependency operands are outside the POC under ADR-0055.

`ROW_COUNT` is the only MRVS collection operation in the POC. Child-cell triggers, `ANY_ROW`, `ALL_ROWS`, column aggregates, row comparisons, and arbitrary JSON traversal are rejected. This limits expressiveness in exchange for canonical agreement, deterministic validation, diagnostics, and test derivation.
