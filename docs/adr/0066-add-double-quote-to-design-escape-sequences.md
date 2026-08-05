---
status: accepted
---

# Add double quote to Design Escape Sequences

Structured Design recognizes exactly five backslash escapes: `\|` for a literal pipe, `\;` for a literal semicolon, `\=` for a literal equals sign, `\"` for a literal double quote, and `\\` for a literal backslash. The double-quote escape extends ADR-0036 because ADR-0065 now uses double quotes to delimit Text and choice internal-value literals; unsupported sequences and a trailing backslash remain Design errors.

Quotes still do not provide quoted-cell behavior. Parsing first identifies unescaped table delimiters, then applies context-specific choice separators, and finally decodes valid Design Escape Sequences, so a Test Designer must continue escaping reserved delimiters even inside a quoted scalar literal.
