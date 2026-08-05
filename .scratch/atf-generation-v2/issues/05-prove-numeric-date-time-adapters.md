# Prove exact numeric, Date, and Date-Time adapters

Status: ready-for-agent
Type: prototype
Blocked by: 04

## What to build

Extend the scalar prototype to prove semantic input and assertion for Integer, Decimal, Date, and Date/Time without localized strings or binary floating-point expectations.

## Acceptance criteria

- [ ] Prove valid and invalid Integer input and semantic assertion.
- [ ] Prove Decimal input and exact comparison through six fractional digits.
- [ ] Demonstrate a value that exposes binary floating-point approximation and prove exact expected comparison.
- [ ] Prove explicit rounding boundaries and half-away-from-zero ties for positive and negative values.
- [ ] Prove ISO Date input and comparison across the configured user locale.
- [ ] Prove one exact UTC Date/Time instant across at least two display timezone contexts.
- [ ] Reject invalid calendar dates, locale-formatted Design dates, relative dates, and timezone-free timestamps.
- [ ] Prove visible, mandatory, and read-only assertions for these controls where claimed.
- [ ] Record display formatting only as an Execution Binding, never as Design syntax.
- [ ] Exercise deliberately wrong values for every claimed mapping.

## Evidence required

- Numeric and temporal boundary matrix.
- Locale and timezone configuration.
- Exact-decimal and rounding evidence.
- Positive and negative ATF results per mapping.

## Capability blocked if this prototype fails

- Affected Integer or Decimal capability.
- Exact-decimal expected results.
- Affected Date or Date/Time capability.
- Every production Behavior requiring a failed mapping.

## Comments

