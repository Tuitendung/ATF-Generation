---
status: accepted
---

# Gate v2 capabilities on platform prototypes

Every version-2 capability that depends on Now Assist Skill invocation, ServiceNow KB storage, OOB Service Portal behavior, ATF control adapters, protected metadata, asynchronous stabilization, or artifact cleanup must pass the corresponding repeatable gate in `docs/v2-platform-prototype-gates.md` on the target release before dependent production implementation. The Runtime AI Feasibility Gate precedes every AI-dependent production ticket and must prove two independent structured-output Skills, background invocation, exact repeated canonical contracts, invalid-input rejection, technical retry, semantic non-retry, non-raw evidence, and zero ATF artifacts.

This makes feasibility evidence an implementation entry criterion rather than an assumption hidden inside the generator. A failed gate blocks its dependent capability and requires an explicit scope decision; it never authorizes deterministic DSL fallback, one-pass AI, a Now Assist Agent, direct AI artifact generation, source inspection, weakened assertions, or partial generation.
