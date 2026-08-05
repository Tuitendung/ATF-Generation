# Issue tracker: Local Markdown

Issues and PRDs for this repository live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The PRD is `.scratch/<feature-slug>/PRD.md`
- Implementation issues are `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`
- Triage state is recorded as a `Status:` line near the top of each issue file
- Comments and conversation history are appended under a `## Comments` heading

## Publishing

When a skill says “publish to the issue tracker,” create the appropriate Markdown file under `.scratch/<feature-slug>/`, creating the directory if necessary.

## Fetching work

When a skill says “fetch the relevant ticket,” read the referenced Markdown file. The user normally supplies its path or issue number.

## Wayfinding operations

For a large effort managed by `wayfinder`:

- Map: `.scratch/<effort>/map.md`
- Child ticket: `.scratch/<effort>/issues/<NN>-<slug>.md`
- Ticket type: a `Type:` line containing `research`, `prototype`, `grilling`, or `task`
- Ticket state: a `Status:` line containing `claimed` or `resolved`
- Blocking edges: a `Blocked by: NN, NN` line
- Frontier: the first open, unblocked, and unclaimed ticket by number
- Claim: set `Status: claimed` before starting work
- Resolve: append the result under `## Answer`, set `Status: resolved`, and add a context pointer to the map
