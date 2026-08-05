---
status: superseded by ADR-0066
---

# Use backslash escaping in structured Design text

Version 2 uses backslash escaping when literal data contains a character reserved by the Structured Design grammar: `\|` represents a literal pipe, `\;` a literal semicolon, `\=` a literal equals sign, and `\\` a literal backslash. No other escape sequence is valid; a trailing or unsupported backslash fails Design Validation rather than being preserved or guessed.

The deterministic parser first splits a Design Text Table row on unescaped `|`. Within a Choice Value Domain it then splits on unescaped `;` and splits each pair on its unescaped `=`, and only afterward converts valid escape sequences to literal characters. This keeps ordinary authoring compact while allowing reserved characters in real values and labels without adding CSV quoting or JSON syntax.

Backslash escaping is the only quoting mechanism in a Design Text Table. Double-quoted or single-quoted cells have no special parsing behavior, and an inline `#` or `//` is content rather than a comment marker.
