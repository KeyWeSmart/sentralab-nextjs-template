---
description: Read before React or Next.js implementation, review, refactoring, or performance work when applying sentralab-react-ui-ux or vercel-react-best-practices. Defines this project's frontend skill precedence and architecture safeguards.
globs:
  - "**/*.{tsx,jsx,ts,js,mjs,cjs,css}"
  - "package.json"
alwaysApply: false
---

# Frontend skill precedence

This is a project-owned frontend policy, not a global agent behavior. Projects
copied from this template may edit or remove this file to choose their own
frontend conventions. Do not modify installed upstream skills to encode local
policy.

## Precedence

For frontend work, apply these instructions subject to higher-priority harness
instructions:

1. Explicit human task instructions and applicable project requirements govern.
2. Preserve the project's established architecture and the behavioral contracts
   in `sentralab-react-ui-ux`.
3. Apply `vercel-react-best-practices` as complementary performance guidance
   where it preserves those contracts. Its examples do not authorize changes to
   the project's libraries, architecture, or product behavior.

Read the relevant rules and skill references before applying them. If a material
conflict remains unresolved by this order, explain the conflict rather than
silently replacing the project contract. Check version-sensitive advice against
installed React/Next.js documentation and APIs.

## Architecture safeguards

- Keep TanStack Query as the client server-state owner. Translate Vercel's SWR
  deduplication examples into the existing Query setup; do not add SWR or a
  second client cache solely to follow an example.
- Preserve the distinction between freshness and inactive retention and the
  project's default-retained, fresh-retained, and no-cache-authoritative
  policies. Request-scoped deduplication and cross-request caching are different
  decisions. Do not use a cross-request cache to replace fresh authorization,
  permission, dependency, or mutation-prerequisite reads.
- Keep selection, controlled input, and overlay-opening feedback immediate.
  Transitions may schedule non-urgent rendering, but do not cancel network
  requests or guarantee async response ordering. Retain request identity,
  freshness, error, retry, and mutation-readiness checks; `isPending === false`
  is not proof of backend success.
- Preserve stable shells, retained context, and active drafts. Keep pending and
  error boundaries local to the data-owning region, with size-matched Skeletons.
  Performance changes must not bypass fresh-authoritative hydration or either
  the UI or mutation-function safety check.
- Keep next-themes as the theme owner and the server-loaded localization
  boundary intact. Do not add a competing theme bootstrap, hide useful children
  behind a mounted gate, or suppress real hydration errors. The existing
  next-themes exception belongs on `<html>`, not broad descendant wrappers.
- Account for the enabled React Compiler. Do not mechanically add `memo`,
  `useMemo`, or `useCallback`; require a concrete need and verify the result.
- Preserve native form semantics, accessibility, localization, and
  backend-confirmed success behavior while optimizing. Validate the changed
  user-visible scenario, not merely compilation.
