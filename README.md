# The Ladder AI

AESOP's standards-aligned **AI capability ladder**: guided learning, test-out-first
certification (AI examiner + independent second-model validation), a durable transcript,
and public credentials — in a single Fensea-inspired page (AESOP navy/gold on white).

**Migrated from the Aesop repo (`ladder2` branch) on 2026-06-10.** Domain: theladderai.com.

## Entry point

- `theladder/ladder2.html` — the unified Ladder (AI Concepts / Products / Use Cases via an
  in-place focus toggle, one learner record). Preview with a static server from the repo
  root, e.g. `npx serve .`, then open `/theladder/ladder2.html`.

## Layout

- `theladder/` — the ladder2 page + skin (`ladder2.css`), orchestrator (`ladder2-app.js`),
  tier data (`ladder-data.js`), Concepts provider, hero images.
- `theladder-shared/` — catalog-agnostic engines: placement, certification (AI examiner +
  independent second-model validator, 7-dimension rubric), and the data layer
  (Firestore + localStorage).
- `theladder-products/`, `theladder-use-cases/` — the Products / Use-Cases providers.
- `aesop-api/proxy.php` — server-side Anthropic proxy. Needs `secrets.php` at the repo root
  **or** an `ANTHROPIC_API_KEY` env var on the server.
- `ai-academy/js/firebase-config.js` — Firebase config used by the data layer.
- `docs/` — product/use-case catalogs, data model, certification architecture, ADRs, and
  `backlog.json`.

## Skeletons — rebuild (see `docs/backlog.json`)

`ai-academy/students.html` (Student Hub), `student-transcript-live.html` (Transcript), and
`ladder-certifications.html` are **placeholders only**, migrated for link continuity. They
need to be rebuilt for The Ladder AI rather than ported from Aesop's legacy `ai-academy/`.

## Deploy

`.github/workflows/deploy.yml` (FTP to Mocahost) is a copy from Aesop and is **not yet
finalized** for theladderai — `server-dir` still points at the Aesop site and the predeploy
guard is Aesop-specific (so it currently fails before FTP). See backlog task #4 before
enabling auto-deploy.
