---
name: nomonkeywork
description: "We do the monkey work. You do the real work."
colors:
  studio-canvas: "oklch(93% 0.022 66)"
  studio-canvas-high: "oklch(97% 0.012 66)"
  studio-canvas-low: "oklch(91% 0.022 66)"
  near-black-slate: "oklch(18% 0.008 75)"
  warm-brown: "oklch(32% 0.012 70)"
  sienna-ochre: "oklch(72% 0.10 62)"
  burnt-ochre: "oklch(52% 0.16 48)"
  field-border: "oklch(72% 0.035 66)"
  error-red: "oklch(50% 0.15 25)"
typography:
  display:
    fontFamily: "Space Grotesk Bold, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 11vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Space Grotesk Regular, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2.8vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Space Grotesk Regular, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  small:
    fontFamily: "Space Grotesk Regular, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
rounded:
  md: "8px"
  full: "50%"
spacing:
  section: "2rem"
  element: "2.5rem"
  page-x: "1.5rem"
  page-y: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.sienna-ochre}"
    textColor: "{colors.near-black-slate}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "label"
  button-primary-hover:
    backgroundColor: "{colors.sienna-ochre}"
    textColor: "{colors.near-black-slate}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  input-default:
    backgroundColor: "{colors.studio-canvas-high}"
    textColor: "{colors.near-black-slate}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  input-error:
    backgroundColor: "{colors.studio-canvas-high}"
    textColor: "{colors.near-black-slate}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: nomonkeywork

## 1. Overview

**Creative North Star: "The Warm Workshop"**

This system is a place where real work gets done. The aesthetic reads like a well-lit studio: warm, amber-tinted surfaces, tools that feel honest in the hand, nothing decorative that doesn't earn its place. The mascot — a grinning chimp — is the heart of the brand. Every design decision either gives the mascot room to breathe or gets out of its way.

Typography does one thing dramatically. The display title arrives at `clamp(3.5rem, 11vw, 7.5rem)` — massive, tight-tracked, commanding the viewport before anything else loads. Everything beneath it drops to body scale and disappears into support. This ratio is the system's primary hierarchy mechanism. When in doubt, make the important thing bigger and everything else smaller.

Color is committed, not safe. Sienna Ochre — drawn directly from the mascot's fur — ties the illustration to the UI. It lives on the primary button, the focus ring, the scrollbar thumb, the animated hover shadow. It is the one accent voice. This is explicitly not a SaaS purple palette, not glassmorphism, not a gradient. It is warm amber as a conscious material choice.

**Key Characteristics:**
- Mascot-led: the chimp is the primary brand signal; UI elements support it
- One accent voice: Sienna Ochre everywhere interactive, nowhere decorative
- Dramatic type hierarchy: 4-6x scale ratio between display and body
- Flat surfaces, state-based shadows: nothing elevates at rest
- Motion is purposeful: entrances, feedback, and state transitions only

## 2. Colors: The Studio Palette

One saturated accent (Sienna Ochre) carries the brand signal across all interactive elements. Everything else is a warm neutral that tints toward the same amber hue axis (hue 66-75), creating system coherence without visual noise.

### Primary

- **Sienna Ochre** (`oklch(72% 0.10 62)`): The mascot's fur, made into UI. Used on the primary button background, scrollbar thumb, and as the button hover shadow tint. The one color that signals "this is interactive."
- **Burnt Ochre** (`oklch(52% 0.16 48)`): A deeper, more saturated amber. Used exclusively on focus rings (2px ring, 2px offset) and as the active color in keyboard navigation paths. Higher chroma than Sienna Ochre so it reads clearly against the warm canvas.

### Secondary

None. This system intentionally has one accent. Introducing a second accent color requires explicit approval against the brand guidelines.

### Neutral

- **Studio Canvas** (`oklch(93% 0.022 66)`): The page background. Warm enough to feel chosen — not default white, not SaaS cream — but light enough to let the mascot command the space.
- **Studio Canvas High** (`oklch(97% 0.012 66)`): Elevated surface. Used as the email input background — slightly lighter than the page to create gentle depth differentiation without a shadow.
- **Studio Canvas Low** (`oklch(91% 0.022 66)`): Recessed surface. Scrollbar track, any inset element. Slightly darker than the page background.
- **Near-Black Slate** (`oklch(18% 0.008 75)`): The primary text and icon color. Warm near-black with a slight warm tint (hue 75) so it reads as ink-on-paper, not screen-black.
- **Warm Brown** (`oklch(32% 0.012 70)`): Secondary text. Used for taglines, success states, and supporting copy. Warm dark brown, clearly subordinate to Near-Black Slate.
- **Field Border** (`oklch(72% 0.035 66)`): Default border on inputs. Low-chroma warm gray — present but not competing.
- **Error Red** (`oklch(50% 0.15 25)`): Used on input borders and error message text when validation fails. Hue 25 is a warm red (slightly orange), not a cold status red.

### Named Rules

**The One Ochre Rule.** Sienna Ochre and Burnt Ochre are the only saturated colors in the system. Use them only on interactive elements (buttons, focus rings, scrollbars). Never on decorative elements, headings, or backgrounds. Their rarity makes them signal clearly.

**The Warm Tint Rule.** Every neutral in this system must have chroma between 0.004 and 0.022. Pure grays (`oklch(X% 0 0)`) are forbidden. Tint toward hue 66-75 (the amber-warm axis). `#000` and `#fff` are both prohibited.

## 3. Typography

**Display Font:** Space Grotesk Bold (loaded locally via `next/font/local`)
**Body Font:** Space Grotesk Regular (loaded locally via `next/font/local`)

**Character:** One font family, two weights, and extreme scale contrast as the hierarchy mechanism. There is no serif, no mono, no second family. The display title arrives at near-`8rem` with `-0.045em` tracking; body copy is calm and readable. The system derives all its typographic personality from scale, not variety.

### Hierarchy

- **Display** (Bold, `clamp(3.5rem, 11vw, 7.5rem)`, line-height 1, tracking -0.045em): The logotype and hero title only. One element per page. The `.` in `nomonkey.work` is rendered in `#ffffff` as a typographic mark — the sole exception to the warm tint rule, intentional as a negative-space punctuation device.
- **Body** (Regular, `clamp(1.2rem, 2.8vw, 1.75rem)`, line-height 1.4, tracking -0.01em): The primary tagline. The clamp scales with the viewport so the ratio between display and body remains dramatic at every breakpoint.
- **Label** (Regular, `1rem`, line-height 1.5): UI text — button labels, input placeholder, CTA copy. Fixed size; does not respond to viewport.
- **Small** (Regular, `0.875rem`, line-height 1.5): Error messages, helper text, fine print. Used sparingly.

### Named Rules

**The One Family Rule.** Space Grotesk is the only typeface in this system. No serif, no display face, no monospace accent. Hierarchy comes from weight (Bold vs Regular) and scale (extreme vs body). When the design feels flat, the fix is scale contrast, not a new typeface.

**The Tracking Gate.** Display type locks at `-0.045em`. Body locks at `-0.01em`. UI label text locks at `0em`. Never apply positive letter-spacing to Space Grotesk; it reads like a horror movie title at any weight.

## 4. Elevation

This system is flat at rest. No surface carries a shadow in its default state. Depth is expressed through tonal differentiation: `studio-canvas-high` (`oklch(97% 0.012 66)`) for elevated surfaces (inputs), `studio-canvas` (`oklch(93% 0.022 66)`) for the page, `studio-canvas-low` (`oklch(91% 0.022 66)`) for recessed elements. The three-step tonal scale replaces the conventional shadow stack.

Shadows appear only as state responses.

### Shadow Vocabulary

- **Ochre Hover Glow** (`0 4px 16px oklch(62% 0.14 58 / 0.35)`): Applied to the primary button on `:hover`. The shadow is tinted to match the button — it reads as a warm glow underneath the button, not a drop shadow. This is the only shadow in the current system.

### Named Rules

**The Flat-By-Default Rule.** No element carries elevation at rest. Shadows are responses to user intent (hover, focus), not passive decoration. If an element has a shadow without a hover/focus trigger, remove it.

**The Tonal Depth Rule.** When you need to show that one surface is above another (e.g., an input on a page), use tonal layering (lighter surface), not a shadow. Shadows are reserved for interactive state.

## 5. Components

### Buttons

The primary button is the Sienna Ochre anchor. It's the only place in the UI where the ochre appears at full saturation as a background color.

- **Shape:** Gently rounded (8px / `rounded-lg`)
- **Primary:** Sienna Ochre background (`oklch(72% 0.10 62)`), Near-Black Slate text (`oklch(18% 0.008 75)`), `12px 24px` padding
- **Hover:** `scale(1.03)` + Ochre Hover Glow shadow. Duration 150ms, `cubic-bezier(0.16, 1, 0.3, 1)`. The scale is perceptible but not theatrical.
- **Active / press:** `scale(0.97)`. Gives the button physical weight — it compresses under the finger.
- **Focus (keyboard):** Same 2px Burnt Ochre ring as inputs. Both interactive elements share the same focus treatment so keyboard users see a consistent signal.
- **Disabled:** Not yet implemented. When added: `opacity: 0.5`, `cursor: not-allowed`, no hover effects.

### Inputs / Fields

Email input only in current build. The input is a compound: a text field plus inline error message.

- **Style:** `studio-canvas-high` background, 1.5px `field-border` border, 8px radius
- **Focus:** 2px Burnt Ochre ring (`oklch(52% 0.16 48)`) with 2px offset. `border-color` transitions over 200ms ease.
- **Error state:** `error-red` border (`oklch(50% 0.15 25)`). The entire input container shakes on invalid submit (5-stop horizontal shake, 400ms). Error message slides down from above (250ms `fade-down` animation).
- **Clearing:** Error state clears immediately on any `onChange` event — never lingers after the user starts correcting.
- **a11y:** `aria-invalid`, `aria-describedby` pointing to the error `id`, `role="alert"` on error text.

### Email Capture Form (Signature Component)

The primary conversion mechanic. A single-field inline form with three animation states.

- **Layout:** `flex-row` on `sm+` breakpoint, `flex-col` below. Max-width `448px`, centered.
- **Idle:** Input + "Get early access" button side by side.
- **Leaving (on valid submit):** Form fades to opacity 0 and lifts `translateY(-10px) scale(0.98)` over 260ms ease-out-expo. `pointer-events: none` during exit.
- **Done:** Success message ("You're on the list. We'll be in touch.") rises in via `fade-up` animation. `role="status"` for screen readers.
- **Reduced motion:** All transitions collapse to instant. State still changes; animation does not.

### Interactive Mascot (Signature Component)

The primary brand element. A 520px (capped at 92vw) viewport-responsive SVG of the nomonkeywork chimp with animated eye tracking and head tilt.

- **Eyes:** Two 40×40px black discs positioned at `calc(42.5% - 20px)` top, `calc(39% - 20px)` and `calc(61.5% - 20px)` left. Each contains a 14×14px white pupil.
- **Tracking:** Pupils follow the cursor via `requestAnimationFrame` with exponential smoothing (factor 0.15). Max movement radius: 10px.
- **Tilt:** The head tilts up to ±12° on X and Y axes using CSS `perspective: 1000px` and `rotateX`/`rotateY`. Updated on `mousemove`, animated with 200ms ease-out-expo transition.
- **Reduced motion:** The `rAF` loop and tilt transition are disabled when `prefers-reduced-motion: reduce` matches. The mascot renders statically.
- **Alt text:** `"nomonkeywork mascot — a grinning chimp"`

## 6. Do's and Don'ts

### Do:

- **Do** use Sienna Ochre (`oklch(72% 0.10 62)`) and Burnt Ochre (`oklch(52% 0.16 48)`) for all interactive states: button backgrounds, focus rings, scrollbar thumbs. These are the only accent colors in the system.
- **Do** use Space Grotesk Bold only for the display title. All other text uses Space Grotesk Regular at varying sizes.
- **Do** create hierarchy through extreme scale contrast: 4-6x ratio between display and body text. If the hierarchy reads flat, the display element isn't large enough.
- **Do** wrap all CSS animations in `@media (prefers-reduced-motion: no-preference)` and include a `@media (prefers-reduced-motion: reduce)` catch-all at the end of globals.css.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for all UI transitions and entrance animations.
- **Do** use OKLCH for all new colors. Tint every neutral toward hue 66-75 with chroma 0.004-0.022.
- **Do** give the mascot the dominant position on any screen it appears. Support it; don't compete with it.
- **Do** use tonal layering (surface `oklch` steps) to express depth. Shadows appear only on hover/focus state.
- **Do** use `role="alert"` and `aria-describedby` for error messages, and `role="status"` for success states.

### Don't:

- **Don't** use gradient text (`background-clip: text` with a gradient background). This is an absolute ban — it existed in an earlier version of this design and was removed deliberately.
- **Don't** use the purple `primary` color scale in `tailwind.config.ts`. It is vestigial from a previous design direction. It predates the current visual system and must not be used. Remove it in the next config cleanup.
- **Don't** use glassmorphism: blurred `backdrop-filter` cards, frosted surfaces, or glass-style containers. This is explicitly listed in PRODUCT.md's anti-references.
- **Don't** use generic SaaS landing page patterns: floating feature grids, icon+heading+text card grids (identical card grids), hero metric templates, purple/indigo gradients.
- **Don't** use cluttered agency site patterns: too many scroll animations, stacked sections that each shout for attention, multiple competing CTA buttons.
- **Don't** apply `border-left` or `border-right` greater than 1px as a colored stripe accent on any element. Use background tints, full borders, or leading icons instead.
- **Don't** animate layout properties (`width`, `height`, `top`, `left`, `margin`). Use `transform` and `opacity` for all motion.
- **Don't** use bounce or elastic easing (`cubic-bezier(0.34, 1.56, ...)` or equivalents). They cheapen the interaction.
- **Don't** add a shadow to a surface at rest. Shadows are reserved for hover and focus state responses.
- **Don't** introduce a second typeface. When the design feels like it needs a display serif or mono accent, add scale contrast instead.
- **Don't** use `#000` or `#fff` directly. The one exception is the `.` period in `nomonkey.work`, which is `#ffffff` as a deliberate typographic mark — not a color system choice. All other neutrals must be OKLCH with a warm tint.
- **Don't** use corporate or enterprise tone in copy. Avoid jargon, passive voice, and sentences that could appear in a SaaS pitch deck. Per PRODUCT.md: "Playful, sharp, no-BS."
