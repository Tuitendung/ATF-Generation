# Domain Docs

This repository uses a single domain context for ATF Generation.

## Before exploring

Before changing or reviewing the repository:

1. Read `CONTEXT.md` at the repository root.
2. Read the ADRs in `docs/adr/` that relate to the area being changed.
3. Read the Catalog Test Specification schema when work touches Design authoring or generation inputs.

If a referenced document does not exist, proceed without creating it preemptively. Domain-modeling workflows create or update these documents when terminology or architectural decisions actually change.

## File structure

The domain documentation layout is:

```text
/
├── CONTEXT.md
├── docs/
│   ├── catalog-test-specification-schema.md
│   ├── agents/
│   └── adr/
└── application source
```

This repository does not use `CONTEXT-MAP.md` or per-module context files.

## Use the glossary vocabulary

Use the canonical terms defined in `CONTEXT.md` in:

- Specifications
- Issues
- Test names
- Implementation plans
- Code comments
- Logs
- Reviews

Do not replace canonical terms with synonyms listed under `_Avoid_`.

## Respect architectural decisions

Before proposing or implementing a change, check the relevant ADRs. If a change contradicts an accepted ADR, state the conflict explicitly instead of silently overriding the decision.
