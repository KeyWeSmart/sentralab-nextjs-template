---
name: sentralab-frontend-patterns
description: Implement or review a requested SentraLab frontend feature using guidance for localized routing, Next.js proxy/middleware, authentication, login/logout Server Actions, session cookies and refresh, forms, lists, detail reads, mutations, dates, and file uploads, or assess a utility for template inclusion. Use when one of these patterns is needed in a project based on this template. Do not generate features, APIs, or product rules merely because a reference exists.
---

# SentraLab frontend patterns

## Purpose and ownership

Make familiar implementation techniques easy to reuse without deciding product
behavior. This is a project-owned companion to `sentralab-react-ui-ux`, not a
replacement for it or a fork of an upstream skill. Derived projects may change
this skill and `.agents/frontend-skill-precedence.md` independently.

The template has three layers:

1. **Executable baseline:** working tools, providers, semantic primitives, and
   utilities whose contracts are genuinely shared.
2. **Conditional playbook:** the references below; instantiate only the pattern
   needed by the requested feature. Examples are not starter application pages.
3. **Product decisions:** requirements supplied by the project, not inferred from
   another application or this playbook.

Repeated code across products is evidence of a candidate, not proof of a shared
requirement. Prefer familiar names and signatures when they are sound; fix
incorrect semantics rather than reproducing them for consistency.

## Before choosing a pattern

- Read applicable project instructions and the project-root policy
  `.agents/frontend-skill-precedence.md` before applying a pattern. This policy
  is agent-neutral; do not depend on a particular client's rule discovery.
  Human requirements and project contracts take precedence over illustrative
  examples, subject to higher-priority instructions.
- Inspect the requested feature, existing components, dictionary, query keys,
  backend contracts, and installed framework documentation. Reuse a working
  pattern already present instead of creating a second convention.
- Read `sentralab-react-ui-ux` and only its relevant references for behavioral
  guarantees. Use `vercel-react-best-practices` for compatible performance work,
  not to replace the installed architecture.
- Separate known requirements from unanswered choices. Resolve discoverable
  facts first. Ask only about material decisions that remain unknown; continue
  independent work. Do not silently invent a role, endpoint, schema, search
  rule, timezone, or mutation outcome.
- Do not activate Lantern or another human-invoked workflow automatically.

## Reference routing

Read only the applicable reference; do not load the whole playbook for every
React task. Several references may apply to one feature.

- [Pattern and utility adoption](references/adoption.md): deciding what belongs
  in executable baseline code versus guidance versus a particular product.
- [Localized routing and Proxy](references/auth-routing.md): complete examples
  for locale/route classification, safe return targets, and a thin `proxy.ts`.
- [Sessions and authentication](references/auth-session.md): typed backend
  boundaries, cookie rotation, login/logout Server Actions, authorization, and
  identity transitions. Apply these examples only when the feature is requested;
  do not install an auth scaffold merely because this reference exists.
- [Forms](references/forms.md): RHF/Zod validation, native submission, and
  accessible field/save errors. A create form does not inherently need an
  existing-record fetch.
- [Lists](references/lists.md): query-owned list states, controlled filters and
  pagination, URL ownership, and retained refresh. Select a backend-supported
  pagination/search contract first.
- [Detail reads](references/detail-reads.md): immediate sheet opening and
  read-only detail loading. Retained display data is not editing authority.
- [Mutations](references/mutations.md): confirmed writes, failure recovery,
  duplicate prevention, invalidation, and conditional authoritative edit checks.
- [Dates and times](references/date-time.md): distinguish instants, date-only
  values, and durations before choosing formatters or utilities.
- [File selection and upload](references/file-upload.md): native selection,
  explicit submission, validation boundaries, and server-confirmed upload state.

## Example contract

- Examples teach techniques, not domain models. Types, component names, fields,
  schemas, and chosen pagination modes are illustrative contracts explicitly
  called out in each reference.
- Code blocks are independent examples, not files to copy as a group. They use
  actual installed packages and direct imports from the existing UI primitives.
- Service callbacks are required integration boundaries, not working backend
  implementations. Connect them to the project's validated service layer; never
  add fake endpoints, successful no-ops, or pretend progress to make a demo work.
- Required copy props keep examples independent of a product dictionary. In a
  feature, source those strings from the approved localization dictionary; do
  not paste example labels or invent translation keys in production.
- Preserve semantic HTML, stable async regions, and accurate pending/error/
  success states. Tailor geometry to the actual feature; example dimensions are
  not an approved design system for product pages.
- Explicitly assess optimistic behavior, retention, and fresh-read requirements.
  Do not infer that every view needs a fresh fetch or that every write is safe
  to present optimistically. Server authorization remains mandatory regardless
  of client presentation or freshness checks.

## Completion

Before finishing a feature built from these references:

1. State the product choices actually used and any remaining blocker.
2. Remove example-only assumptions; use project DTOs, dictionary, and services.
3. Verify pending, empty, failure, retry, success, and retained-refresh behavior
   where applicable. Exercise keyboard interaction and realistic identity/race
   boundaries, not only the happy path.
4. Run the existing project quality checks and inspect the rendered behavior.
5. Leave no sample gallery, temporary route, fake API, or unused abstraction in
   the application unless explicitly requested.

Do not broaden a task into a feature implementation merely because this skill
contains a matching recipe.
