---
status: accepted
---

# Limit the v2 POC to five Behavior Effects

The version-2 POC accepts exactly five Design-owned Behavior Effect properties: `VALUE`, `VISIBLE`, `MANDATORY`, `READ_ONLY`, and `MESSAGE`. Label and help-text mutation, dynamic choice changes, reference-qualifier behavior, variable ordering, layout, styling, and other UI mutation are outside the POC and fail capability validation rather than being skipped or approximated.

These five properties cover the agreed requester-observable Catalog behavior while keeping the DSL, type validation, ATF adapters, and assertions closed and prototypeable. Expanding the effect set later requires an explicit schema and capability decision instead of interpreting arbitrary UI behavior.
