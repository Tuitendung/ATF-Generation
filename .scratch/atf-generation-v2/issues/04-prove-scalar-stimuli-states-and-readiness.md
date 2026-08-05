# Prove scalar stimuli, observable states, and readiness

Status: ready-for-agent
Type: prototype
Blocked by: 03

## What to build

Using the proven execution profile and fresh OOB form, create throwaway ATF evidence for scalar set/clear operations, a real trigger-last Change Stimulus, semantic state assertions, and bounded readiness. Numeric and temporal fidelity remains Ticket 05; message semantics remains Ticket 06.

## Acceptance criteria

- [ ] Prove set, clear, and semantic read operations for Single Line Text and Multi Line Text.
- [ ] Prove set, clear, and semantic read operations for Checkbox and Yes/No.
- [ ] Prove Select Box and Multiple Choice use internal values rather than display labels.
- [ ] Prove `VALUE`, `VISIBLE`, `MANDATORY`, and `READ_ONLY` assertions for every claimed scalar mapping.
- [ ] Establish non-trigger preconditions before applying one distinct before-to-after trigger value last.
- [ ] Prove reassigning the same value is not accepted as a Change Stimulus.
- [ ] Implement bounded readiness polling over stable observable state and relevant Portal signals.
- [ ] Prove repeated behavior under ordinary latency variation without fixed sleeps.
- [ ] Distinguish stimulus failure, readiness timeout, and assertion mismatch.
- [ ] Record each control-operation-effect mapping as passed or failed; do not generalize without evidence.
- [ ] Exercise correct and deliberately incorrect observable behavior.
- [ ] Keep all prototype artifacts identifiable and disposable.

## Evidence required

- Control-by-operation and control-by-effect matrix.
- OOB Step Configurations or disposable custom-step seams.
- Positive and deliberately nonconforming ATF results.
- Readiness measurements and injected timeout evidence.

## Capability blocked if this prototype fails

- Change Stimulus execution.
- Text, boolean, and fixed-choice behavior.
- Scalar `VALUE`, `VISIBLE`, `MANDATORY`, and `READ_ONLY` effects.
- Production readiness adapter.
- Every Behavior requiring a failed mapping.

## Comments

