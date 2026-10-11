# PROJECT: THARUN KUMAR — RESPONSIVE INTERACTIVE AI/ML PORTFOLIO

Act as a senior frontend engineer, creative developer, interaction designer, and motion designer.

Build the first landing page of my personal portfolio website based on the reference image I provide.

This must be a real, functional, responsive website—not a static mockup, screenshot, or image.

The design should closely follow the reference image: a clean white background, an oversized black name behind a central photographic portrait, animated blue/purple/red particles, small technical annotations, minimal navigation, and a circular cursor-following ASCII effect that transforms only the part of my portrait inside the lens.

The result should look like a premium, experimental AI/ML engineer portfolio: technically sophisticated, minimalist, editorial, and professional.

## IMPORTANT: PROJECT SCOPE

Build ONLY the initial landing page visible when the website first opens.

Do not implement the About, Projects, Skills, Experience, or Contact sections yet. We will design and build those after I approve the landing page.

However, the header must already display these navigation labels:

Home | About | Projects | Skills | Experience | Contact

The website must be responsive from the beginning. Desktop and mobile are equally important deliverables. Do not postpone mobile responsiveness until a later phase.

## 1. MY IDENTITY AND PROFILE

Use the following information accurately throughout the implementation.

Full name: Tharun Kumar

Visual wordmark: THARUN

Professional role: AI / ML Engineer

Education: 3rd-year B.Tech Computer Science and Engineering student

University: Lovely Professional University

Technical interests:
- Machine Learning
- Computer Vision
- Systems Development
- Open Source

The full professional name is THARUN KUMAR. The oversized central visual wordmark should remain THARUN, matching the supplied reference image.

Do not change the wordmark to THARUN KUMAR unless the layout is being explicitly revised with my approval. Use my full name in the appropriate document metadata and professional identity fields.

Do not invent work experience, employment, awards, achievements, personal URLs, or contact details.

## 2. MY PORTRAIT — MANDATORY

I already have a background-removed PNG of myself.

My portrait is located in this folder on my computer:

[INSERT THE FULL PATH TO MY EXISTING BACKGROUND-REMOVED PNG FOLDER HERE]

Before implementing the page:
1. Inspect the current project files.
2. Look for my existing portrait in the supplied folder and the project directory.
3. Use the actual background-removed PNG as the central hero portrait.
4. Do not generate, download, or substitute a different person's photograph.
5. Preserve the PNG's transparency and intrinsic aspect ratio.
6. If the image is outside the project directory, copy it into `public/images/portrait.png`, preserving the original file.
7. Use this same portrait for the normal photograph and the ASCII rendering.
8. If you cannot locate the file, ask me for its exact path instead of silently using another image.

The reference image is the design reference, not the source of my actual portrait.

If the portrait is unavailable, build the layout with a temporary, clearly documented placeholder. Do not claim the actual portrait has been integrated.

## 3. TECHNOLOGY STACK

Use:
- Next.js with the App Router
- React
- TypeScript
- Tailwind CSS if already configured, or clean CSS if it is not
- HTML Canvas for the animated particle field
- Canvas or another suitable rendering technique for the ASCII lens

Inspect the existing project before making changes. If a valid Next.js project already exists, reuse it. Do not overwrite existing work unnecessarily.

If the project is empty, initialize an appropriate Next.js project.

Use a small number of dependencies. Do not introduce a large animation library for effects that can be implemented efficiently using CSS, Canvas, and requestAnimationFrame.

No backend, database, authentication, CMS, or unnecessary API routes are needed for this stage.

Suggested structure:

src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Navbar.tsx
    Hero.tsx
    ParticleField.tsx
    AsciiLens.tsx
    TechnicalLabel.tsx
    SocialLinks.tsx

public/
  images/
    portrait.png
  resume.pdf

reference/
  hero-reference.png

Adapt this structure to the existing project when appropriate.

## 4. OVERALL VISUAL DIRECTION

Use the supplied reference image as the primary visual specification.

Reference image: `reference/hero-reference.png`

The reference image is approximately 1648 × 900 pixels.

Visual style:
- Clean white or slightly warm-white background.
- Large, bold, black typography.
- Minimal navigation.
- Oversized central wordmark.
- Central photographic portrait.
- Tiny, carefully positioned technical annotations.
- Animated, scattered blue, violet, purple, magenta, and red particles.
- Thin black or grey rules.
- Generous negative space.
- Restrained, premium editorial styling.

Avoid:
- Dark backgrounds.
- Large gradient blobs.
- Glassmorphism cards.
- Excessive shadows.
- Generic portfolio templates.
- Large rounded cards.
- Unnecessary decorative illustrations.
- Excessive animation.
- Cartoonish typography.
- Unrequested sections below the hero.

Suggested typography:
- Space Grotesk or Inter for display text.
- JetBrains Mono for technical annotations.
- Appropriate sans-serif and monospace fallbacks.

Use a heavy, tightly spaced font for THARUN. Keep the technical annotations small, uppercase, and letter-spaced.

The finished result should feel intentionally art-directed, not like an ordinary developer template.

## 5. RESPONSIVE DESIGN IS MANDATORY

Build one adaptive website, not separate desktop and mobile websites.

Use:
- Responsive CSS
- Flexbox and Grid
- Fluid typography using clamp()
- Relative positioning where appropriate
- Sensible max-widths and min-widths
- Media queries based on actual layout needs
- Responsive image sizing
- Correct viewport handling on mobile

Do not rely on fixed desktop coordinates for every element. The portrait, wordmark, annotations, and effects must stay coordinated as the viewport changes.

### Large desktop: 1440px and above

Preserve the complete composition:
- Full navigation.
- Large THARUN wordmark behind the portrait.
- Large centered portrait.
- Centered AI / ML ENGINEER label.
- Four corner annotations.
- Animated particle field.
- Social links at the bottom-left.
- Scroll cue at the bottom-center.
- Availability indicator at the bottom-right.
- Resume button at the top-right.

The hero should occupy approximately one viewport in height while avoiding clipping of essential content.

### Laptop: 1024–1439px

- Scale the wordmark and portrait proportionally.
- Keep the portrait dominant.
- Reduce navigation gaps if necessary.
- Reposition annotations to prevent overlap.
- Maintain negative space.
- Reduce particle density when appropriate.
- Preserve the desktop identity.

### Tablet: 768–1023px

- Recompose the layout rather than uniformly shrinking it.
- Keep the portrait centered.
- Scale the wordmark and reduce its letter spacing.
- Keep the role label visible.
- Reposition or simplify technical annotations.
- Keep the Resume action accessible.
- Prevent the bottom indicators from colliding.
- Reduce particle density and animation workload.

### Mobile: 767px and below

Design a deliberate mobile composition.

Header:
- Display the TK monogram on the left.
- Use a compact menu button instead of forcing all six navigation links into a crowded row.
- Open an accessible mobile menu containing Home, About, Projects, Skills, Experience, and Contact.
- Keep the Resume action accessible.
- Support touch and keyboard navigation.
- Close the menu appropriately when a link is selected.

Hero:
- Preserve the white background.
- Keep THARUN behind the portrait.
- Make the wordmark fit within the available width.
- Keep the portrait centered and recognizable.
- Maintain the visual relationship between the name and portrait.
- Keep the AI / ML ENGINEER label above the wordmark where possible.
- Avoid cutting off the face or distorting the body.
- Adapt vertical spacing to short and tall screens.

Annotations:
- Do not force all four desktop annotations into the mobile layout.
- Keep the most useful information visible.
- Reposition or hide secondary annotations when space is limited.
- Never allow tiny labels to collide with the portrait.

Particles:
- Keep a lighter, efficient particle field.
- Reduce particle count and motion on smaller devices.
- Respect reduced-motion preferences.

Bottom elements:
- Reposition the social links, scroll indicator, and availability label so they do not overlap.
- Allow multiple rows or a simplified arrangement if necessary.
- Maintain readability and visual balance.

ASCII effect:
- Disable hover-only behavior on touch devices by default.
- Show the normal photographic portrait on mobile.
- Do not simulate a mouse cursor on a touchscreen.

Never introduce horizontal page overflow. Do not simply scale down the entire desktop composition uniformly.

## 6. HEADER AND NAVIGATION

Create a slim horizontal header approximately 15–30px from the top edge of the desktop viewport.

Use approximately 4–5% horizontal margins on large desktop screens, adjusting them responsively.

Left side:
1. Bold black monogram: TK
2. Thin vertical divider.
3. Home
4. About
5. Projects
6. Skills
7. Experience
8. Contact

Desktop typography:
- Approximately 12–14px for navigation labels.
- Monogram approximately 26–30px tall.
- Divider approximately 22px tall.
- Even spacing.
- Clean sans-serif typography.

Right side:
- Black pill-shaped Resume button.
- White Resume text.
- Small northeast-pointing arrow.
- Approximately 110–125px wide and 38–42px tall on desktop.
- Subtle hover transition.

Behavior:
- Home returns to the top of the landing page.
- The other navigation links must remain visible, but their future sections must not be invented yet.
- Until those sections exist, do not send users to broken anchors.
- The Resume button should link to `/resume.pdf` only when that file is available.
- If the résumé is missing, leave a clearly documented placeholder and tell me where to put the file.

On mobile, replace the crowded navigation row with an accessible menu.

## 7. OVERSIZED THARUN WORDMARK

This is one of the most important visual elements.

Create enormous, bold, uppercase black text reading:

THARUN

Position:
- Horizontally centered.
- Across the upper-middle portion of the hero.
- Behind the portrait.
- Occupying much of the available width.

Desktop size:
- Approximately 175–250px depending on the viewport and font.
- Use fluid sizing rather than a single fixed size.
- Tune letter spacing and line height to match the reference.

Layering:
- The name must be behind the portrait.
- The head and upper body should overlap the central letters.
- The left and right portions of the wordmark should remain visible.
- The name should feel integrated with the photograph.

Do not put the wordmark entirely above or below the portrait.

On mobile, scale the wordmark and letter spacing so the word remains legible within the viewport without horizontal overflow.

## 8. CENTRAL PORTRAIT

Use my actual background-removed portrait from `/images/portrait.png`.

Position:
- Center horizontally.
- Place above the wordmark in the visual stacking order.
- On desktop, let the head begin around the upper quarter of the viewport.
- Let the shoulders and torso extend to the bottom edge of the hero, matching the reference composition.
- Keep the portrait large enough to dominate the central visual field.

Implementation:
- Preserve the original aspect ratio.
- Use object-fit: contain where appropriate.
- Do not stretch or distort the face.
- Do not add a rectangular background.
- Avoid unnecessary shadows or borders.
- Use responsive sizing and positioning.
- Keep the face and wordmark aligned during viewport changes.

The portrait must remain a normal photograph except inside the interactive ASCII lens.

## 9. CENTERED ROLE LABEL

Place this label above the wordmark:

AI / ML ENGINEER

Style:
- Uppercase.
- Monospaced font.
- Approximately 13–16px on desktop.
- Moderate letter spacing.
- Black text.
- No background badge.
- Centered horizontally.
- Positioned above the wordmark and portrait head.

Keep adequate space between the navigation and this label.

## 10. UPPER-LEFT ANNOTATION

Exact text:

BUILDING
INTELLIGENT SYSTEMS

Position:
- Approximately 5–7% from the left edge.
- Approximately 19–24% from the top on large desktop screens.

Style:
- Two lines.
- Uppercase monospace.
- Approximately 11–13px.
- Generous letter spacing.
- Thin vertical technical rule.
- Small black circular marker near the top.
- Short corner line near the lower-right edge.

Do not put the annotation in a card or filled box.

## 11. UPPER-RIGHT ANNOTATION

Exact text:

3RD YEAR CSE
LOVELY PROFESSIONAL UNIVERSITY

Position:
- Approximately 5–7% from the right edge.
- Approximately 20–24% from the top on large desktop screens.

Style:
- Two lines.
- Uppercase monospace.
- Approximately 11–12px.
- Thin vertical rule to the left.
- Small black circular marker near the top.
- Subtle technical corner detail.

Keep the full university name legible and prevent overlap with the portrait.

## 12. LOWER-LEFT ANNOTATION

Exact text:

MACHINE LEARNING
COMPUTER VISION
SYSTEMS DEVELOPMENT

Position:
- Approximately 5–7% from the left edge.
- Approximately 65–73% from the top on desktop.

Style:
- Three lines.
- Uppercase monospace.
- Approximately 11–13px.
- Generous character spacing.
- Thin vertical rule.
- Small circular marker near the top.
- Subtle lower-right corner detail.

Keep this annotation separate from the social links near the bottom.

## 13. LOWER-RIGHT ANNOTATION

Exact text:

OPEN SOURCE
REAL WORLD PROJECTS
CONTINUOUS LEARNING

Position:
- Approximately 5–7% from the right edge.
- Approximately 68–76% from the top on desktop.

Style:
- Three lines.
- Uppercase monospace.
- Approximately 11–12px.
- Thin vertical rule.
- Small black marker.
- Subtle corner detail.

Prevent collisions with the portrait and the availability indicator.

All four annotations must be repositioned, simplified, or hidden as needed on smaller screens.

## 14. ANIMATED PARTICLE FIELD

Create a real animated field of hundreds of small particles across the white background.

This is a defining visual element.

Particle appearance:
- Tiny dots.
- Short, narrow dashes.
- Occasional elongated specks.
- Varied rotations, sizes, and opacity.
- Mostly small marks with occasional slightly larger ones.

Colors:
- Electric blue.
- Blue-violet.
- Purple.
- Magenta.
- Occasional vivid red or coral.

Distribution:
- Spread particles throughout the hero.
- Use an organic, scattered distribution.
- Avoid a uniform grid.
- Keep the area behind the face and primary text visually readable.
- Maintain enough particles to reproduce the reference's energetic yet minimalist appearance.

Animation:
- Slow, continuous drifting.
- Subtle directional movement.
- Slight variations in rotation or opacity.
- Different particles should have different speeds.
- Motion must be smooth, elegant, and restrained.
- No explosions or distracting trails.

Cursor response:
- Particles near the cursor may drift away or gently swirl.
- Keep the reaction subtle.
- Do not interfere with the ASCII lens.

Implementation:
- Prefer a single Canvas.
- Use requestAnimationFrame.
- Handle resizing and device pixel ratio correctly.
- Do not trigger hundreds of React state updates every frame.
- Reduce the particle count on mobile.
- Pause or reduce animation when the page is hidden.
- Respect `prefers-reduced-motion`.
- Ensure the canvas does not block clicks or keyboard interaction.

Do not substitute a static particle image for the actual animation.

## 15. INTERACTIVE CIRCULAR ASCII LENS

This is the most important custom interaction.

When the pointer is outside the portrait, the photograph must look completely normal.

When the mouse moves over the portrait, display an invisible circular lens centered on the cursor.

Only the area inside the circle should transform into ASCII art.

Everything outside the circle must remain the original photograph.

There must be no visible glass border or decorative circular outline.

### Visual effect

Inside the lens:
- Render a character-based representation of the same underlying portrait.
- Use monochrome black, white, and grey character values.
- Use characters such as `@`, `%`, `#`, `*`, `+`, `=`, `:`, `.`, and spaces.
- Use character density and brightness to represent facial structure, shadows, hair, and skin.
- Aim for a dense, detailed ASCII texture similar to the supplied reference image.
- Do not replace the whole portrait with text.
- Do not affect the THARUN wordmark or the rest of the page.

Outside the lens:
- Preserve the original photographic image.
- Do not apply global grayscale, filters, or character effects.

### Lens behavior

- The circle must track the actual pointer coordinates.
- Desktop lens radius: approximately 100–140px, tuned to the reference and viewport.
- Movement must be smooth, responsive, and accurate.
- When the pointer leaves the portrait, remove the lens immediately and restore the normal appearance.
- The circular region must be clipped correctly.
- Account for portrait scaling, positioning, aspect ratio, transparency, and responsive layout.
- The effect must continue to align correctly after window resizing.

### Technical implementation

Use a Canvas overlay or another appropriate rendering method.

Recommended approach:
1. Load the same portrait image used by the normal photographic layer.
2. Generate a reduced-resolution brightness or luminance grid.
3. Map brightness values to an ordered ASCII character ramp.
4. Render the characters at a controlled density.
5. Clip the rendered characters to a circular region around the cursor.
6. Keep the underlying normal photograph visible everywhere outside that circle.

Avoid regenerating an expensive full-resolution ASCII image on every mouse movement.

Handle image loading, pointer entry, pointer movement, pointer exit, and resizing safely.

If the image fails to load, disable the lens without throwing runtime errors.

### Touchscreens

- Disable hover-only behavior by default on touch devices.
- Display the normal photograph.
- Do not simulate a cursor.
- If tap-to-toggle behavior is introduced, it must be explicit, intuitive, and accessible.

Do not claim the ASCII lens is implemented until it has actually been built and tested.

## 16. BOTTOM-LEFT SOCIAL LINKS

Create three black social/contact icons near the bottom-left:

1. GitHub
2. LinkedIn
3. Email

Style:
- Approximately 20–24px on desktop.
- Black or near-black.
- Even spacing.
- No filled circular backgrounds.
- Subtle hover transitions.
- Visible keyboard focus.
- Accessible labels.

Use real link destinations only when supplied.

Create clearly documented configuration placeholders for:
- My GitHub profile URL.
- My LinkedIn profile URL.
- My email address.

Do not invent my URLs or email address.

After the icon group, add a thin horizontal line extending a short distance to the right, ending in a small dot or marker.

Position approximately 3% from the left edge and 4–6% from the bottom on desktop.

On mobile, rearrange the group if necessary to prevent overlap.

## 17. BOTTOM-CENTER SCROLL INDICATOR

Exact text:

SCROLL TO EXPLORE

Position:
- Near the bottom-center of the viewport.
- Centered horizontally.
- Over the dark upper torso area when the portrait allows it.

Style:
- Small uppercase monospaced font.
- Approximately 10–12px.
- Moderate letter spacing.
- High contrast against the portrait.

Below the text:
- Thin vertical line.
- Small dot at the end.

A very subtle looping movement is acceptable.

This is only a visual cue for future sections. Do not implement the sections below the fold or create fake scroll destinations.

Keep it unobtrusive and responsive.

## 18. BOTTOM-RIGHT AVAILABILITY INDICATOR

Exact text:

AVAILABLE FOR OPPORTUNITIES

Elements:
- Short, thin horizontal line.
- Small black marker.
- Small green circular status dot.
- Uppercase monospaced text.

Style:
- Approximately 9–11px on desktop.
- All elements aligned horizontally.
- Restrained spacing.
- Positioned near the bottom-right edge.

Green should be reserved for this status indicator.

Keep the text readable and prevent collisions with the lower-right annotation.

Reposition this element on mobile when necessary.

## 19. RESPONSIVE VALIDATION

Responsiveness must be implemented and checked before the landing page is considered complete.

Test the actual running website at these viewport sizes:

- 1648 × 900
- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 390 × 844
- 375 × 667
- 360 × 800

For each viewport, verify:
- No unintended horizontal scrolling.
- Navigation remains usable.
- The portrait is not distorted.
- The name stays behind the portrait.
- The wordmark does not overflow.
- The face remains visible.
- Technical annotations do not collide with the portrait.
- Bottom elements do not overlap.
- The particle canvas resizes correctly.
- The ASCII lens remains aligned with the portrait on desktop.
- The mobile menu works.
- The page remains visually balanced.

Also test mobile landscape where practical.

If browser tools are available, inspect the actual rendered website at the listed sizes and correct any issues you observe.

Do not claim that a viewport was tested unless it was actually tested.

## 20. PERFORMANCE AND ACCESSIBILITY

Performance:
- Clean up event listeners, animation frames, and observers.
- Avoid unnecessary component re-renders.
- Reduce animation workload on mobile.
- Avoid expensive pixel processing on every pointer event.
- Optimize image delivery without visibly degrading the portrait.
- Avoid embedding huge base64 images in source code.
- Keep initial loading fast.

Accessibility:
- Use semantic HTML.
- Provide accessible labels for icon links.
- Add visible keyboard focus styles.
- Respect reduced-motion preferences.
- Ensure readable contrast.
- Make the mobile menu keyboard accessible.
- Do not rely on color alone to communicate information.
- Ensure canvas layers do not intercept pointer events unnecessarily.

## 21. VISUAL REFINEMENT

Prioritize the following, in order:

1. Correct use of my actual portrait.
2. Correct THARUN wordmark and portrait layering.
3. Accurate overall composition and white-space balance.
4. High-quality animated colored particles.
5. Genuine cursor-following circular ASCII lens.
6. Precise technical annotations and typography.
7. Navigation and bottom-corner details.
8. Responsive refinement and performance.

Do not replace custom effects with static images or generic CSS effects.

Do not add unrelated design elements.

Do not implement the sections below the landing page.

## 22. IMPLEMENTATION WORKFLOW

Follow this sequence.

PHASE A — INSPECT
- Inspect the project and its dependencies.
- Locate the reference image.
- Locate my background-removed portrait.
- Confirm the image paths before implementation.
- Preserve existing valid project work.

PHASE B — BUILD THE COMPOSITION
- Create the white background and header.
- Add the oversized THARUN wordmark.
- Position the portrait above the wordmark.
- Add the centered role label.
- Add all four technical annotations.
- Add the social links, scroll indicator, and availability indicator.
- Match the reference's composition before introducing animation.

PHASE C — IMPLEMENT INTERACTIONS
- Implement the animated particle Canvas.
- Add subtle cursor-based particle interaction.
- Implement the circular ASCII portrait lens.
- Ensure only the region inside the lens is transformed.
- Add restrained hover and scroll-cue animations.

PHASE D — RESPONSIVE REFINEMENT
- Implement desktop, tablet, and mobile layouts.
- Add the accessible mobile menu.
- Reposition or simplify annotations as needed.
- Verify portrait and wordmark alignment.
- Check the required viewport sizes.
- Fix overlaps and horizontal overflow.

PHASE E — TEST
- Run lint and build checks available in the project.
- Start the development server if possible.
- Preview the actual site in a browser if available.
- Compare the result against the reference image.
- Fix obvious visual and functional issues.
- Report any untested behavior honestly.

Do not stop after creating a static skeleton if the environment supports full implementation and testing.

## 23. FINAL DELIVERABLE

Deliver a working, responsive landing page.

When finished, report:
- Files created or modified.
- How to run the project locally.
- The exact portrait path used.
- Where to put `resume.pdf`.
- Where to configure GitHub, LinkedIn, and email.
- Which particle and ASCII interactions are implemented.
- Which viewport sizes were actually tested.
- Whether lint and build checks passed.
- Any remaining issues or missing assets.

Do not implement the sections below the hero yet.

The final result must preserve the distinctive reference design while functioning as a real, adaptive website across desktop, laptop, tablet, and mobile devices.