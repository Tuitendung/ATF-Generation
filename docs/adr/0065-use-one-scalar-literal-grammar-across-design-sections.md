---
status: accepted
---

# Use one typed scalar meaning across Design Sections

Variable Design defaults and Variable Test Data use one Design Scalar Literal grammar: text and choice internal values are double quoted, integers and decimals are unquoted base-10 values, Boolean values are lowercase `true` or `false`, explicit absence is `EMPTY`, Date values use `YYYY-MM-DD`, and Date/Time values use `YYYY-MM-DDTHH:mm:ssZ`; Reference and List Collector values retain their dedicated forms.

ADR-0077 changes only the Business Logic authoring surface. Guided Business Logic names a fixed choice by its exact technical internal-value token, such as `contractor`, and may contain explicitly quoted text or message literals. The two Skills normalize those forms into the same typed scalar meanings used by deterministic validation; they may not translate, correct, or rewrite an exact quoted literal.

The two Design Text Tables still have no quoted-cell behavior: quotes do not protect a pipe, semicolon, equals sign, double quote, or backslash from the escape rules. Typed meaning remains consistent across sections even though Guided Business Logic uses a human-readable surface rather than the table literal parser.
