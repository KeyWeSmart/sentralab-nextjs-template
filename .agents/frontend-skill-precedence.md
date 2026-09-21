# Frontend skill precedence

This is a project-owned frontend policy, not a global agent behavior. Projects
copied from this template may edit or remove this file to choose their own
frontend conventions. Do not modify installed upstream skills to encode local
policy.

## Scope and discovery

Read this policy before React or Next.js implementation, review, refactoring, or
performance work. It applies to any agent working on this project, subject to
that agent's higher-priority instructions; it does not depend on OMP or any other
particular client.

All paths in this policy are relative to the project root. The canonical file is
`.agents/frontend-skill-precedence.md`. The project-owned frontend pattern skill
explicitly directs its readers here, and the README links here for other entry
points.

A shared file location does not guarantee automatic discovery by every client.
When configuring an agent, reference this same file from its supported
project-instruction mechanism, or explicitly include it in the task context.
Do not duplicate the policy into client-specific rule files. Client setup is an
adapter to this policy, not its source of truth.

## Precedence

For frontend work, apply these instructions subject to higher-priority harness
instructions:

1. Explicit human task instructions and applicable project requirements govern.
2. Preserve the project's established architecture and applicable behavioral
   contracts in `sentralab-react-ui-ux`. Interpret editing-specific requirements
   in their editing context, not as requirements for every read-only view.
3. Use the project-owned `sentralab-frontend-patterns` skill for the requested
   feature's conditional implementation technique. Its example DTOs, callbacks,
   layout, and chosen interaction modes are not product requirements.
4. Apply `vercel-react-best-practices` as complementary performance guidance
   where it preserves those contracts. Its examples do not authorize changes to
   the project's libraries, architecture, or product behavior.

Read the relevant rules and skill references before applying them. If a material
conflict remains unresolved by this order, explain the conflict rather than
silently replacing the project contract. Check version-sensitive advice against
installed React/Next.js documentation and APIs.

## Bootstrap versus product behavior

Read `.agents/skills/sentralab-frontend-patterns/SKILL.md` when a requested
feature needs forms, lists, detail reads, mutations, dates, or file uploads, or
when assessing a shared utility. Load only the relevant references.

- Repeated code is a reuse candidate, not proof of a universal requirement.
  Preserve familiar sound APIs; do not copy entire product utility directories.
- Keep general infrastructure executable, variable patterns in the playbook,
  and business behavior in each project. Do not generate a feature or add an
  abstraction merely because an example exists.
- Resolve API, permissions, validation, search/pagination, timezone, and write
  semantics from project evidence. Ask about material missing decisions rather
  than silently borrowing answers from another product.
- Read-only detail can display retained data while refreshing. A create form
  does not inherently require an existing-record snapshot. Apply fresh-read and
  revision requirements when the operation's correctness requires them; neither
  cached data nor a successful client fetch establishes server authorization.
- Follow the existing confirmed-write default unless the project explicitly
  calls for optimistic presentation. Pending/optimistic UI must never masquerade
  as backend-confirmed success or bypass server authorization.

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
