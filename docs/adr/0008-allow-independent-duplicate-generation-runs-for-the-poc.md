# Allow independent duplicate generation runs for the POC

Every **Create ATF** click in the POC will start an independent Generation Run and create a new Test Suite and two new Tests, even when the Catalog Item and Current Specification are identical to a previous run. The demo deliberately omits generation identity, duplicate detection, reuse, update, reconciliation, and deletion logic; duplicate artifacts are accepted in exchange for the smallest append-only generator, and must be distinguished operationally rather than treated as an error.

Each run will create one UTC timestamp token and include it, the Catalog Item name, and the Published Specification number and version in the Test Suite name. The two Test names reuse the same token and identify their `ACCESSIBLE` or `INACCESSIBLE` expectation. Names are display-only traceability and are neither unique constraints nor lookup keys; records created in the same second may have equal names and remain distinct by `sys_id`.

Every generated Test Suite and both generated Tests are Active immediately because the bound Published Design is already trusted. Active artifacts are merely ready for an administrator to run; neither the queue worker nor any follow-on automation executes them automatically.

Source traceability is stored only in the existing Test Suite and Test names and descriptions. These human-readable fields include the run stamp, Catalog Item, bound Specification number/version and `sys_id`, requester, expectation, User Criteria, and Representative Test User as applicable; they are never parsed or used as lookup keys. The POC adds no provenance columns to ATF tables and no separate Generation Run record, accepting that structured provenance reporting is unavailable.
