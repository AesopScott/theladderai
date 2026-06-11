# Handoff Log

## PRIORITY ORDER

**FIRST:** Deploy all your current work changes to the CORRECT files (not the deprecated folders)
- You've been editing the wrong files — re-do all changes in the correct live files
- Test them
- Commit and push
- Append entries to this handoff file
- Orchestrator will deploy

**THEN:** Do the cleanup task below only after all current work is deployed to production

---

## MANDATORY CLEANUP TASK (after current work is deployed)

**Once all changes are in production:**

1. **Move all necessary components to `/components` folder (new root-level folder)**
   - Identify all component files (JS, CSS, HTML) in `/theladder/`, `/theladder-products/`, or `/theladder-use-cases/` that are still being used
   - Do NOT touch `/theladder-shared/` — this folder remains active for shared code
   - For each component that is still being used by the live site:
     - Move it to `/components/`
     - Update all references throughout the codebase to point to `/components/component-name`
     - Commit and push
   - Leave unused/legacy code in the deprecated folders

2. **Search the entire codebase** for any remaining references to files in `/theladder/`, `/theladder-products/`, or `/theladder-use-cases/`
   - Check all JS imports, HTML script/link tags, JSON configs
   - Find every remaining reference to those three folders

3. **For each remaining reference found:**
   - Determine if that code is still actually being used by the live site
   - If YES (still being used):
     - This should have been moved in step 1. Move it to `/components/` if missed
     - Update all references to point to `/components/`
     - Commit and push
   - If NO (not being used):
     - Leave it in the deprecated folder — do nothing

3. **Architectural requirements that MUST be met:**
   - `index.html` must NOT reference anything from `/theladder/`, `/theladder-products/`, or `/theladder-use-cases/`
   - All CSS must come from a **single CSS folder** (not scattered across multiple locations)
   - Nothing should reference anything with "ladder2" in the name — that naming is deprecated
   - All references must be cleaned up so the architecture is clean

4. **When complete:**
   - Verify that nothing is being imported from those three folders anymore
   - Verify that `index.html` has zero references to deprecated folders
   - Verify that all CSS comes from one centralized location
   - Verify that no "ladder2" references exist in the codebase
   - All necessary code has been moved out; unused code remains in deprecated folders
   - Verify that the live site still works correctly
   - Append an entry to this file confirming cleanup is done


---

## The Real Workflow

From now on, this is the only process that works:

```
1. BUILD SESSION: Write and test code in your worktree
   - Edit HTML, CSS, JS files directly
   - Test in browser
   - Make sure changes look right

2. BUILD SESSION: Commit your changes to your branch
   - git add -A
   - git commit -m "your message"
   - git push origin <branch-name>

3. BUILD SESSION: Append to this file (handoff.md)
   - Only append when code is already committed and pushed
   - Use the template below
   - Include what you actually did

4. ORCHESTRATOR: Automatically detect, commit, push, merge, deploy
   - Reads handoff.md every 60 seconds
   - Finds new entries
   - Merges branches to production
   - Runs GitHub Actions deployment
```

**The orchestrator cannot write code.** It can only commit what's already in the worktree, push it, and merge it. If the code isn't written, there's nothing to deploy.

---

## Handoff Entry Template

**Only append to this file when your code is ready.** Use this format:

```
## YYYY-MM-DD HH:MM MDT — `branch-name`

**Worktree:** /c/Users/scott/Code/theladderai/.claude/worktrees/branch-name

**Summary:** One sentence of what you did and why

**Files changed:**
- path/to/file.css — specific changes made
- path/to/file.html — specific changes made

**How verified:** Tested at [port/URL], confirmed [behavior] works as expected

---
```

Example:

```
## 2026-06-11 03:30 MDT — `claude/nice-northcutt-b9cff1`

**Worktree:** /c/Users/scott/Code/theladderai/.claude/worktrees/nice-northcutt-b9cff1

**Summary:** Enlarged Start Assessment button and moved it to upper-right corner

**Files changed:**
- index.html — moved button element from placement-actions to assessment-chat-head
- theladder/ladder2.css — added .assessment-chat-head flex rules, enlarged .l2-cta font/padding

**How verified:** Tested at port 5601, button now 1.25rem font in upper-right, gold fill visible

---
```

---

## What Happens Next

1. **Sessions check this file every minute** — you'll see this notice
2. **Sessions write actual code** in your worktrees — CSS, HTML, JS changes
3. **Sessions test locally** — make sure it looks right
4. **Sessions commit and push** — git workflow on your branch
5. **Sessions append here** — only when code is ready
6. **Orchestrator automatically deploys** — on the next 60-second tick

There is no other way forward. The handoff file is now monitored continuously. It is a **commit confirmation**, not a **specification**.

---

**Handoff entries below this line:**
