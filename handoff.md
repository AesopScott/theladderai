# Handoff Log

## ⚠️ CRITICAL — ALL SESSIONS

**Each session MUST work in its own unique worktree.** Do not share worktrees or work on shared branches.

- Your worktree is at: `/c/Users/scott/Code/theladderai/.claude/worktrees/[your-branch-name]/`
- You MUST work only in your own worktree
- Each worktree has its own branch checked out
- The orchestrator finds your work by matching the worktree branch name to handoff entries
- If you're not in your own worktree, the orchestrator cannot find and deploy your code

**If you're in the wrong directory, stop and switch to your worktree NOW.**

---

**Handoff entries below this line:**

## 2026-06-10 22:55 MDT — `claude/nice-northcutt-b9cff1` (status — already on `main`, no merge needed)

**Status:** All of this session's work is committed, pushed, AND deployed to `origin/main` (tip `5ede30d`). Nothing here needs the orchestrator to merge — this is a status note only.

**Shipped to `main` + deployed (Mocahost) this session:**
- `refactor` `39e9459` — relocated the 11 live homepage files `/theladder/` → `/components/`; `index.html` repointed.
- `feat` `0311880` — ported vigilant-benz work onto `/components`: open-courses list + local course-conversation store, Enter-sends/Shift+Enter chat inputs, signed-in hero baseline align.
- `feat` `b9eb2cf` — ported reverent-germain assessment rework onto `/components`: dark-text fix, raised/compacted conversation window, `#assessment` enlarge, nav-underline scroll-spy removal.
- `fix` `5ede30d` — learner ID is now the Firebase UID (UID-canonical); AESOP-XXXX mint/resolve removed.
- Data: migrated the 2 certs + email from `learners/AESOP-YAPT` onto the canonical uid record `learners/iJKSEZ…` (one-off admin script, verified).

**Open (awaiting Scott):** optional hardening so the app ignores/clears a stale `AESOP-####` value left in `localStorage` from the old build (otherwise a signed-out visitor briefly shows a leftover id until they sign in).

**Note:** `/theladder/` now holds only the 10 legacy + dead files; `/theladder-shared/` stays active.

---

## 2026-06-10 23:20 MDT — `claude/nice-northcutt-reset`

**Worktree:** /c/Users/scott/Code/theladderai/.claude/worktrees/nice-northcutt-reset

**Summary:** Redesigned the Training rail — it was an expand-in-place mess (rungs rendered inline under each tier, overlapping). Now the left rail is a clean clickable list of the 15 tiers (number + "Tier N" + title), and clicking a tier opens that tier's rungs in a navy "blue window with gold text" on the right.

**Branch HEAD to merge:** `622b2c4`, pushed to `origin/claude/nice-northcutt-reset` (branched off `origin/main`; also contains the already-merged Reset-button commit `7c12e84`). Please merge to `main`.

**Files changed:**
- `index.html` — added `<div id="l2RungPanel" class="rung-panel">` in the right `.topic-column`; CSS cache-buster `v79 → v80`, app `v12 → v13`.
- `components/ladder2-app.js` — `renderRail()` now renders 15 `.l2-tier-item` buttons (number + Tier N + title), no inline rungs; new `renderRungPanel()` populates `#l2RungPanel` with the selected tier's rungs (clickable → loads the guided conversation as before); `activateFocus()` calls `renderRungPanel()`.
- `components/ladder2.css` — `.l2-tier-item` clean-list styles; `.rung-panel` navy (#11203a) window with gold-tinted border, gold `.rung-pick` text (white when active/hover).

**How verified:** Local static preview (port 5602) + computed checks: exactly 15 tier items ("1 TIER 1 GENERAL AI LITERACY: AI ORIENTATION", …), 0 inline rungs in the rail, `#l2RungPanel` visible with bg `rgb(17,32,58)` showing the tier's 18 rungs; clicking Tier 2 updated the panel to "Chat Mastery…"; rung text gold (active = white), panel border `rgba(201,160,90,0.28)`. `node --check` clean.

**Note:** Same fresh worktree/branch `claude/nice-northcutt-reset` as the Reset-button change. Learner ID stays Firebase-UID-canonical.

---

## 2026-06-10 23:16 MDT — `claude/reverent-germain-assess` (re-append; entry dropped in a handoff reset)

**Worktree:** /c/Users/scott/Code/theladderai/.claude/worktrees/reverent-germain-assess

**Summary:** Assessment layout — shortened the description column AND the conversation window, and raised the pair to the top of the section (the request that failed 4x before). Prior attempts only narrowed the description and/or edited the now-dead `/theladder/ladder2.css`; the conversation column was `minmax(0,1fr)` (always full-width + tall) and was never capped. This edits the LIVE `/components/ladder2.css`.

**Branch HEAD to merge:** `248d703`, pushed to `origin/claude/reverent-germain-assess` (off `origin/main` `7c12e84`, which already includes the nice-northcutt-reset merge). Please merge to `main`.

**Files changed:**
- `components/ladder2.css` (`#assessment`-scoped):
  - `.placement-toolbar` grid -> `minmax(200px,18rem) minmax(0,1fr)` (narrower description).
  - `#assessment .placement-chat` add `max-width: 42rem` (conversation becomes a contained box, not full-width).
  - `#assessment .assessment-log` `max-height 30vh->24vh`, `min-height 150->130px` (compact box).
  - `#assessment { justify-content: flex-start }` (raise the pair; overrides `.l2-section` vertical-center).
- `index.html` — CSS cache-buster `?v=79 -> ?v=80`.

**How verified:** Worktree preview (port 5603), `components/ladder2.css?v=80` loaded; measured 1440x900 — description 216px (right edge x358), conversation 504px (x372->876, was full-width) next to it, both top-aligned y382 with ~275px whitespace below; screenshot confirms. Built on `7c12e84` so no conflict with nice-northcutt-reset.

---

## 2026-06-10 23:22 MDT — `cert-stats-fix` (Profile cert-tier counts + label)

**Branch HEAD to merge:** `f57e5c6`, pushed to `origin/cert-stats-fix` (off `origin/main` `7c12e84`). Please merge to `main`.

**Summary:** Profile stats strip read 0/0/0 for Core/Expert/Mastery despite 2 earned certs. `byDepth` filtered on `c.testDepth || c.certificationTier`, but the certs use `depthId`/`depthLabel` (and one older cert has no depth field at all). Now buckets by `depthId`/`depthLabel` with a title fallback, and relabels the first stat "certifications" → "core". Result for the sample account: **Core 1, Expert 1, Mastery 0**.

**Files changed:**
- `components/ladder2-app.js` — `renderMarketing()` depth bucketing via new `depthOf()`.
- `index.html` — stat label "certifications" → "core"; app cache-buster `v12 → v13`.

**How verified:** `node --check` clean; simulated `depthOf()` on the live cert data → Core 1, Expert 1, Mastery 0.

**⚠️ Merge note — overlaps `nice-northcutt-reset` (622b2c4):** both edit `components/ladder2-app.js` and both bump app `v12 → v13`. My change is in `renderMarketing()` (depth counts); theirs is in `renderRail()`/`renderRungPanel()` — different functions, so a 3-way merge should be clean apart from the identical app-version line. I did NOT touch CSS (theirs sets v80). Recommend merging both; keep app at the highest version.
