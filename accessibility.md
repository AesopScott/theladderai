# Accessibility Review

The Ladder AI welcome page was reviewed against WCAG 2.2 Level AA on June 11, 2026. The review used manual inspection of page structure, keyboard and focus behavior, form semantics, responsive behavior, and an automated axe-core 4.11.4 scan.

## Standard Used

We use WCAG 2.2 Level AA as the practical accessibility target for public marketing and product entry pages.

The automated scan supported the manual review, but it does not replace it. Automated tools typically detect only part of the accessibility surface, so we also check headings, landmarks, labels, focus behavior, contrast, image alternatives, and responsive layout manually.

## Results

The welcome page already had a strong semantic foundation:

- A single, descriptive `h1`.
- Logical heading levels across page sections.
- A named primary navigation landmark.
- Decorative images hidden from assistive technology.
- An email input with an accessible name and email autocomplete.
- Reduced-motion handling for decorative hero animation.

The review found several accessibility improvements:

- Small gold accent labels and some trust-strip text did not meet WCAG AA color contrast requirements.
- The learner signup panel was marked up as an `aside`, which exposed it as a nested complementary landmark.
- The page did not include a skip link for keyboard and screen reader users.
- The sign-in toggle used a link for a control that opens and closes an inline form.
- Focus styling was not consistent across all links, buttons, and form controls.

## Remediations

The following fixes were applied:

- Added a visible-on-focus "Skip to main content" link before the primary navigation.
- Changed the learner signup panel from a nested complementary landmark to a labelled section.
- Changed the sign-in toggle from an anchor link to a real button.
- Added `aria-expanded` and `aria-controls` to the sign-in toggle.
- Updated the sign-in script so the hidden sign-in form stays synchronized with the button state.
- Added a global `:focus-visible` style for links, buttons, inputs, textareas, and selects.
- Added an explicit focus-visible style for the signup email input.
- Introduced an accessible gold text color for small accent labels while preserving the decorative gold for visual elements.
- Increased trust-strip small-text contrast on the dark certification section.

## Current Commitment

The Ladder AI aims to meet WCAG 2.2 Level AA for public-facing pages. Accessibility is reviewed with both automated tools and manual checks, and issues are remediated as part of ongoing site maintenance.
