# The Ladder AI

AESOP's standards-aligned **AI capability ladder**: guided learning, test-out-first
certification (AI examiner + independent second-model validation), a durable transcript,
and public credentials — in a single Fensea-inspired page (AESOP navy/gold on white).

**Migrated from the Aesop repo (`ladder2` branch) on 2026-06-10.** Domain: theladderai.com.

## Entry point

- `/` (`index.html`) — the unified Ladder (AI Concepts / Products / Use Cases via an
  in-place focus toggle, one learner record). Preview with a static server from the repo
  root, e.g. `npx serve .`, then open `/`.

## Layout

- `site.css` — the single consolidated website stylesheet.
- `components/` — active Ladder app scripts, tier data, Concepts provider, and images.
- `theladder-shared/` — catalog-agnostic engines: placement, certification (AI examiner +
  independent second-model validator, 7-dimension rubric), and the data layer
  (Firestore + localStorage).
- `aesop-api/proxy.php` — server-side Anthropic proxy. Needs `secrets.php` at the repo root
  **or** an `ANTHROPIC_API_KEY` env var on the server.
- `ai-academy/js/firebase-config.js` — Firebase config used by the data layer.
- `docs/` — product/use-case catalogs, data model, certification architecture, ADRs, and
  `backlog.json`.

## Deprecated Standalone Surfaces

The following directories are deprecated as standalone product surfaces/routes, but
they are not dead code. Their files still contain product and use-case functionality
that has not been fully migrated into the unified Ladder experience yet:

- `theladder/`
- `theladder-products/`
- `theladder-use-cases/`

Do not delete or casually rewrite these directories. Treat them as transitional source
areas: maintain them when required, but do not build new standalone product surfaces
there. The active user-facing Ladder experience lives at `/` and uses `index.html`,
`site.css`, `components/`, and `theladder-shared/`.

## Skeletons — rebuild (see `docs/backlog.json`)

`ai-academy/students.html` (Student Hub), `student-transcript-live.html` (Transcript), and
`ladder-certifications.html` are **placeholders only**, migrated for link continuity. They
need to be rebuilt for The Ladder AI rather than ported from Aesop's legacy `ai-academy/`.

## Deploy

Production deploys from the new GitHub repo, `AesopScott/theladderai`, not the legacy
Aesop repo. Pushing to `main` runs `.github/workflows/deploy.yml`, which deploys the
repo contents to Mocahost by FTPS at `/public_html/theladderai/`.

Sensitive server files are not deployed from Git. Keep local `.env`, `secrets.php`,
`secrets.local.php`, and `config.local.php` out of the repo; provision production
secrets directly on the server.
