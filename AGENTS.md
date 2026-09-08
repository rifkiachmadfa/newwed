CLAUDE.md
Project Identity

This repository is a premium wedding invitation customization engine.

Repository:
https://github.com/rifkiachmadfa/newwed

Primary visual reference:
https://galerynikah.asia/luxury-2/?to=Nama+Tamu

Core Mission

Your ONLY primary responsibility is to customize and improve this existing wedding invitation application for clients.

You must focus on:

Wedding invitation data
Wedding invitation theme
Typography
Colors
Layout
Images
Decorations
Animations
Transitions
Micro-interactions
Responsive design
Overall visual polish

The target quality is:

Match or exceed the visual quality and experience of the Luxury 2 reference.

You are NOT a general-purpose software developer for this project.

Do not expand the project scope unless explicitly requested.

Mandatory Rules
1. Work on the Existing Repository

Do not rebuild the project from scratch.

Before modifying anything:

Inspect the repository.
Read this file.
Read AGENTS.md.
Read README.md.
Inspect package.json.
Understand the current architecture.
Inspect existing components, configuration, styling, fonts, services, and data flow.

Preserve the existing architecture whenever reasonably possible.

2. Data First

When a client provides new information, change the existing data/configuration layer whenever possible.

Typical client data:

Bride
Groom
Parents
Wedding date
Akad
Reception
Venue
Address
Google Maps
Live streaming
Love story
Gallery
Wedding gift
Bank account
RSVP
Wishes
Music
Guest name
Social media

Do not rewrite unrelated UI components just to change data.

3. Theme Customization

When the client requests a visual change, modify the theme/design system before rewriting components.

Centralize:

Colors
Fonts
Typography
Spacing
Borders
Shadows
Decorative colors
Backgrounds

Avoid scattering hard-coded values throughout the application.

4. Reference Fidelity

Use the Luxury 2 website as the primary visual benchmark.

Study:

Composition
Typography
Color
Spacing
Images
Decorations
Opening experience
Sections
Animations
Transitions
Navigation
Gallery
RSVP
Mobile layout

Do not copy its source code or assets.

Recreate the visual experience using this repository's own implementation.

5. Better Than Reference

After reaching visual parity, improve:

Typography
Animation smoothness
Transitions
Mobile experience
Image treatment
Performance
Accessibility
Micro-interactions
Visual consistency

"Better" means more refined, not simply more complicated.

6. Preserve Functionality

Never break existing functionality while customizing the visual layer.

Pay special attention to:

Guest query parameter
Invitation opening
Countdown
RSVP
Wishes
Gallery
Google Maps
Live streaming
Wedding gift
Copy-to-clipboard
Music/audio
API calls
Database functionality
7. Guest Parameter

The invitation may be accessed through:

?to=Nama+Tamu

Never hard-code the guest name.

Ensure URL-encoded guest names and special characters work correctly.

8. Responsive Design

Mobile quality is mandatory.

Test at minimum:

320px
375px
390px
414px
Tablet
Desktop
Wide desktop

No accidental horizontal overflow.

9. Animation

Animations must feel:

Elegant
Cinematic
Smooth
Intentional
Premium

Use motion for:

Opening invitation
Hero
Typography
Image reveals
Section reveals
Gallery
Navigation
Buttons
Countdown
Decorative elements

Avoid excessive bouncing, spinning, or constant movement.

Respect reduced-motion preferences where practical.

10. Performance

Wedding invitations may contain many images.

Prioritize:

Optimized images
Lazy loading where appropriate
CSS transform/opacity animations
Minimal JavaScript
Avoiding unnecessary client components
Avoiding unnecessary dependencies
11. Dependencies

Do not install dependencies unless necessary.

Always inspect existing dependencies first.

Prefer existing project solutions and native browser/CSS functionality.

12. Validation

After making changes:

Run lint if available.
Run type checking if available.
Run build when appropriate.
Start the application when needed.
Inspect runtime errors.
Visually inspect the result when browser access is available.

Never claim something was tested if it was not tested.

Scope Restrictions

Do NOT:

Migrate frameworks
Replace Next.js
Rewrite the backend unnecessarily
Replace the database unnecessarily
Add authentication unless requested
Build an admin dashboard unless requested
Change deployment infrastructure unless requested
Add unrelated features
Replace the existing architecture without strong justification

Stay focused on:

Premium wedding invitation customization.

Definition of Done

A customization is complete only when:

Client data is correctly applied.
Theme is visually coherent.
Typography is polished.
Mobile layout works.
Desktop layout works.
Animations feel intentional.
Existing functionality still works.
Guest name works.
No obvious runtime/build errors remain.
The result is visually comparable to or better than the reference.
Final Response

When finished, briefly report:

What changed.
Important files modified.
Validation performed.
Any remaining issue.

Do not provide unnecessary tutorials.

Actually modify and verify the repository when terminal access is available.