---
status: accepted
---

# Use bounded exact-decimal arithmetic

Version 2 represents Integer and Decimal Design values as signed base-10 **Exact Design Numbers** with at most 15 total digits and at most 6 fractional digits. Literals require a digit before any decimal point, use no thousands separator or exponent notation, and are compared by numeric value rather than textual scale; for example, `1.0` and `1.00` are equal.

Expected-result evaluation uses exact decimal arithmetic rather than JavaScript binary floating point. Addition, subtraction, and multiplication never round implicitly; every division must be enclosed by `ROUND(expression, scale)`, where scale is an integer from 0 through 6, and any other reduction to the supported output scale also requires `ROUND`. Ties use half-away-from-zero rounding, so `ROUND(2.5, 0)` is `3` and `ROUND(-2.5, 0)` is `-3`; an evaluated result outside the digit or scale limits fails Design Validation instead of being truncated.

The bounds reduce parser and execution risk while covering ordinary Catalog quantities, amounts, percentages, and rates. The implementation must use an exact-decimal representation or library; native floating-point output is not a valid Test Expectation oracle.
