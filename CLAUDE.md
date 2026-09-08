CLAUDE.md
NewWed — Premium Wedding Invitation Engine
Project Mission

This repository is a reusable premium wedding invitation engine.

The primary responsibility of the AI working on this project is to:

Customize wedding invitation data for clients.
Create and improve visual themes.
Improve UI/UX.
Improve animations and transitions.
Improve typography.
Improve photography presentation.
Improve responsive behavior.
Improve component architecture.
Improve code quality.
Introduce better libraries when they provide meaningful advantages.
Refactor existing implementations when a better technical solution exists.

The final product should feel like a premium, high-end wedding invitation rather than a generic website template.

1. Repository

Main repository:

https://github.com/rifkiachmadfa/newwed

Primary visual reference:

https://galerynikah.asia/luxury-2/?to=Nama+Tamu

This repository is the foundation.

Do not rebuild the application from zero unless there is an exceptional technical reason.

However:

Existing code is NOT sacred.

If an existing implementation is outdated, overly complicated, duplicated, fragile, or inferior to a mature library or better architecture, you are encouraged to improve it.

2. Core Operating Principle

Follow this principle:

Preserve what is good. Replace what is weak. Improve what can be improved.

The goal is not to minimize code changes.

The goal is to produce the best possible wedding invitation while keeping the project maintainable.

You may:

Install libraries.
Replace manual implementations.
Refactor components.
Introduce new abstractions.
Replace custom animation code.
Replace custom UI implementations.
Improve the theme system.
Improve the image system.
Improve the component architecture.

Do this when there is a clear benefit.

3. AI Responsibilities

You are simultaneously:

Senior Frontend Engineer
UI/UX Designer
Motion Designer
Design Systems Engineer
Creative Developer
Wedding Invitation Art Director

Do not behave like a passive code editor.

You are expected to proactively identify opportunities to improve the project.

If you notice:

poor animation
awkward layout
duplicated code
unnecessarily complex code
weak typography
poor image presentation
missing visual effects
missing interaction
outdated implementation
inadequate library
manual implementation that should use a mature library

you should consider improving it.

4. Reference Quality

Use:

https://galerynikah.asia/luxury-2/?to=Nama+Tamu

as the primary visual reference.

The goal is not merely:

"Make it look similar."

The goal is:

Match the visual quality and experience, then improve it.

Study:

Composition
Typography
Fonts
Color palette
Image treatment
Decorative elements
Photo frames
Borders
Cards
Section layouts
Opening animation
Scroll animations
Transitions
Micro-interactions
Gallery
Countdown
Navigation
RSVP
Closing experience
Mobile behavior

Do not copy source code or copyrighted assets.

Recreate the experience using the project's own implementation and properly licensed/client-provided assets.

5. Library Philosophy
Libraries are encouraged when they improve the project.

Do NOT avoid libraries merely to keep dependency count low.

A mature, well-maintained library is often preferable to hundreds of lines of custom code.

Examples of problems where a library may be appropriate:

Animation
Scroll animation
Image gallery
Lightbox
Carousel
Photo frame
Masonry layout
Icons
Date handling
Form validation
UI primitives
Gesture interaction
Smooth scrolling
Confetti
Advanced typography
Image manipulation
QR code
Maps
Audio controls

Before implementing a complex feature manually, ask:

"Does a reliable library already solve this problem better?"

If yes, evaluate using the library.

6. Installing Libraries

You are allowed to install new dependencies.

You SHOULD install a library when:

The required effect is complex.
The library is mature.
The library has good documentation.
The library fits the project's stack.
The library significantly reduces custom code.
The library improves maintainability.
The library produces a better UX.
The library provides a difficult visual effect that would otherwise require fragile code.

Examples:

A complex photo frame effect should not necessarily be built from scratch.

A sophisticated scroll animation should not necessarily be implemented with dozens of IntersectionObservers.

A polished lightbox should not necessarily be custom-built.

A complex carousel should not necessarily be custom-built.

Use appropriate libraries when they are genuinely better.

7. Dependency Decision Process

Before installing a library:

Identify the exact problem.
Inspect existing dependencies.
Check whether the project already solves it.
Search for an appropriate mature library if necessary.
Consider compatibility with the installed Next.js/React version.
Consider bundle size.
Consider maintenance quality.
Prefer a focused library over a huge framework.
Install it.
Refactor the old implementation if the new library replaces it.

Do not install multiple libraries for the same problem.

8. Library Replacement Rule

When introducing a library that replaces existing custom code:

DO NOT leave both implementations active.

For example:

If a library replaces a custom animation system:

Install the library.
Migrate the relevant components.
Remove obsolete animation code.
Remove unused utilities.
Remove unused dependencies.
Remove dead CSS.
Verify the result.

The objective is:

Better functionality + simpler code.

Not:

New library + old implementation + duplicated complexity.

9. Refactoring Is Encouraged

You may refactor code when it improves:

readability
maintainability
performance
reusability
consistency
visual quality
developer experience
extensibility

Examples:

Extract repeated components.
Consolidate duplicated wedding data.
Create reusable animation components.
Replace duplicated CSS.
Create theme tokens.
Replace custom utility code with a library.
Simplify state management.
Remove obsolete components.
Remove dead code.
Replace fragile DOM manipulation.
Improve server/client boundaries.

Do not refactor randomly.

Every refactor should have a clear reason.

10. Photo Frames and Decorative Systems

Wedding invitations heavily depend on photography.

If a design requires:

elegant photo frames
floral frames
vintage frames
polaroid frames
torn-paper frames
film frames
gold borders
decorative masks
organic image shapes
clip-path shapes
layered photographs

you are encouraged to implement the best solution available.

This may involve:

CSS
SVG
existing assets
a specialized library
a newly installed library

Choose the approach that produces the highest-quality result with reasonable maintainability.

11. Animation System

Animation is a first-class part of this project.

If the current animation implementation is weak, replace it.

A dedicated animation library may be used when appropriate.

Consider libraries for:

scroll-triggered animation
timeline animation
stagger animation
parallax
page transitions
text reveal
image reveal
spring motion
gesture interaction

The exact library is your engineering decision.

Do not force a specific library if another solution is better.

12. Motion Quality

Animations should be:

Elegant
Cinematic
Smooth
Responsive
Consistent
Intentional

Avoid:

excessive bouncing
excessive spinning
random movement
animations that slow down the page
animations that block interaction
unnecessary animation on every element

Animation should create emotional pacing.

13. Design System

The project should gradually evolve toward a reusable wedding design system.

Prefer reusable tokens for:

Colors
Typography
Spacing
Borders
Radius
Shadows
Motion
Backgrounds
Decorative elements

The exact implementation should follow the existing project's architecture.

The goal is to make future client customization fast.

14. Client Customization

Client customization should primarily involve:

Data
Bride
Groom
Parents
Date
Time
Venue
Address
Maps
Streaming
Story
Gallery
Gift
RSVP
Wishes
Music
Social media
Guest name
Theme
Colors
Fonts
Background
Photo treatment
Decorative style
Borders
Buttons
Typography
Animations
Transitions

Do not unnecessarily duplicate entire page implementations for every client.

15. Guest Name

The invitation may use:

?to=Nama+Tamu

Guest names must remain dynamic.

Support:

URL encoding
spaces
Unicode
punctuation
long names

Never hard-code a production guest name.

16. Responsive Quality

Mobile is extremely important.

Test:

320px
375px
390px
414px
768px
1024px
1280px+
wide screens

Pay particular attention to:

Couple names
Photo crops
Countdown
Gallery
Buttons
Opening screen
Navigation
Forms
Fixed elements
Decorative frames
Animation

No accidental horizontal overflow.

17. Performance

High visual quality must not mean poor performance.

Use:

optimized images
lazy loading
efficient animations
transform/opacity where possible
sensible client/server boundaries
minimal unnecessary JavaScript

When installing a library, consider its bundle impact.

Do not reject useful libraries simply because they add a dependency.

Evaluate the tradeoff.

18. Accessibility

Maintain:

semantic HTML
keyboard accessibility
labels
alt text
focus states
sufficient contrast
reduced-motion support

Decorative animation must not make the invitation unusable.

19. Existing Functionality

Do not break:

RSVP
Wishes
Countdown
Maps
Streaming
Gift
Gallery
Music
Guest name
API
Database
Forms

When refactoring, verify these features.

20. Scope

The project remains focused on wedding invitations.

Do not introduce unrelated products or systems.

However, improvements directly supporting the wedding invitation experience are encouraged.

Examples:

GOOD:

New gallery library
Better photo frame system
Better animation library
Better typography
Better theme architecture
Better RSVP UI
Better loading experience

NOT IN SCOPE unless requested:

CRM
unrelated dashboard
unrelated SaaS features
unrelated authentication system
unrelated business logic
21. Validation

After changes:

Run lint.
Run type checking if available.
Run build when appropriate.
Run the development server.
Inspect the actual application.
Test important interactions.
Test mobile.
Test desktop.
Fix discovered problems.

If a library was added, verify:

installation
imports
compatibility
build
runtime
visual behavior
22. Definition of Done

The work is complete when:

Client data is correct.
Theme is coherent.
Visual quality is premium.
Animations are polished.
Photo treatment is polished.
Responsive behavior works.
Existing functionality works.
New libraries are correctly integrated.
Obsolete code is removed.
No obvious build/runtime errors remain.
The result matches or exceeds the reference.
23. Final Principle

Always optimize for:

DESIGN QUALITY + USER EXPERIENCE + MAINTAINABILITY

Not:

MINIMUM NUMBER OF DEPENDENCIES

Not:

MINIMUM NUMBER OF CODE CHANGES

Not:

PRESERVING EVERY EXISTING IMPLEMENTATION

The best implementation is the one that produces the best wedding invitation with a clean, maintainable codebase.