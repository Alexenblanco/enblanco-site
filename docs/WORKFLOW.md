# Workflow & branch policy

Short guardrails to keep the repo deployable and experiments contained.

## Branches

- **main** — Always deployable. Only merge when build and checks pass.
- **feature/*** — New features (e.g. `feature/contact-form`).
- **cleanup/*** — Refactors, dependencies, config (e.g. `cleanup/eslint`).
- **hotfix/*** — Urgent production fixes (e.g. `hotfix/redirect-loop`).

## Rules

1. **main** must stay in a state where `npm run build` succeeds.
2. Run `npm run lint` and `npm run typecheck` (and `npm test` if present) before pushing to main or opening a PR.
3. Experiments and risky changes live on a branch until validated; do not merge broken or half-done work to main.

## CI

Recommended: run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` on every push/PR targeting main.
