# Generate exclusively from the expected design

The approved Catalog Test Specification is the sole source from which tests are generated; generation will not inventory or compare the live catalog implementation and will not create drift classifications. This keeps generation deterministic and small, while deliberately placing responsibility for stale or incorrect expectations on the specification authoring and review process and leaving implementation discrepancies to surface through ATF execution.
