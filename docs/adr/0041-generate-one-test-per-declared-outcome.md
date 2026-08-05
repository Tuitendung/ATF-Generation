---
status: accepted
---

# Generate one test per Declared Outcome

Version 2 creates exactly one Derived Behavior Test Case for each Declared Outcome of one single-trigger Catalog Behavioral Contract. ADR-0077 supersedes ADR-0044's multi-trigger rule and therefore reinstates this count: one block has one trigger, while equivalent behavior for another trigger requires another block. Multiple Candidate Test Values or Data Profiles may reach the same Outcome, but they remain a finite selection pool rather than multiplying Tests.

This makes generated-test count follow Business Logic coverage instead of the amount of supplied data, prevents candidate combinations from causing test explosion, and keeps Test Designers from indirectly authoring test cases by adding values. The generator selects one satisfying assignment by a deterministic, versioned rule and fails Design Validation when no assignment covers an outcome; broader boundary or multiple-representative coverage is outside the default v2 rule.
