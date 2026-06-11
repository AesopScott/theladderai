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
