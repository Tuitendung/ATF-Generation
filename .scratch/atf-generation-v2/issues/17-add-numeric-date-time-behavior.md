# Add exact numeric, Date, and Date-Time behavior

Status: ready-for-agent
Type: task
Blocked by: 01, 05, 15

## What to build

Extend the complete runtime-AI behavior path for Integer, Decimal, Date, and Date/Time inputs, conditions, typed expected values, Candidate selection, stimuli, and semantic assertions.

## Acceptance criteria

- [ ] Parse signed base-10 Exact Design Numbers with at most 15 total digits and six fractional digits in the deterministic Design tables.
- [ ] Normalize supported Guided Business Logic numeric meanings into exact typed expressions.
- [ ] Reject grouping separators, exponent notation, excess precision, missing required digits, and locale numeric forms.
- [ ] Evaluate decimal values without JavaScript binary floating-point semantics.
- [ ] Support type-valid equality, inequality, ordering, ranges, addition, subtraction, multiplication, parentheses, and declared variable inputs.
- [ ] Require every division or scale reduction to state supported explicit rounding.
- [ ] Implement round-half-away-from-zero behavior and reject overflow or unrounded out-of-range results.
- [ ] Support and validate exact `YYYY-MM-DD` calendar dates.
- [ ] Support exact `YYYY-MM-DDTHH:mm:ssZ` Date/Time instants.
- [ ] Compare Date and Date/Time semantically rather than through localized display strings.
- [ ] Reject `TODAY`, `NOW`, relative dates, locale dates, and timezone-free timestamps.
- [ ] Derive valid numeric or temporal Change Stimuli without inventing an open-domain value.
- [ ] Require Candidate Test Data when literals and Baseline cannot cover an Outcome.
- [ ] Assert numeric and temporal effects only through Gate-5-proven mappings.
- [ ] Cover boundary values, invalid values, locale/timezone changes, changed literals, and deliberately wrong implementation values.
- [ ] Run zero-artifact, source-opacity, and v1 regression coverage.
- [ ] Complete a clean type check and SDK build.

## Comments

