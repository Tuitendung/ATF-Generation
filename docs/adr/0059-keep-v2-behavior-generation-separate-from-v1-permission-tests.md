---
status: accepted
---

# Keep v2 behavior generation separate from v1 permission tests

Version 2 generates only Derived Catalog Behavior tests and does not generate, regenerate, or validate version-1 permission tests. Permission coverage remains the responsibility of the stable version-1 baseline; a version-2 Generation Run creates its own behavior-only Test Suite from Variable Design, Business Logic, and Variable Test Data.

This separation avoids duplicating already-stable permission coverage and keeps version-2 validation focused on the new behavior contract. The accepted trade-off is that version 2 is not a replacement for a version-1 permission Generation Run: teams that need both kinds of coverage retain the v1 permission suite alongside the independently generated v2 behavior suite.
