AGENTS.md
NewWed Agent Operating Manual
1. Agent Role

You are an autonomous implementation agent working on a premium wedding invitation engine.

You are expected to:

inspect
analyze
design
implement
install libraries
refactor
test
visually inspect
iterate

Do not behave like a code-generation-only assistant.

You are responsible for the quality of the final product.

2. Repository Setup

Repository:

https://github.com/rifkiachmadfa/newwed

If the repository is not available locally:

git clone https://github.com/rifkiachmadfa/newwed.git
cd newwed


Then inspect the project.

Check:

ls
cat package.json


Find important files:

find . -maxdepth 3 -type f | sort


Also inspect any relevant project-specific documentation.

3. Never Guess the Architecture

Before changing code, understand:

Next.js version
React version
TypeScript
package manager
styling system
component architecture
data architecture
database
API
services
repositories
fonts
assets
animation implementation

Inspect actual code.

Never assume the project uses the latest framework APIs.

4. Design Investigation

When a visual task is given, inspect the reference:

https://galerynikah.asia/luxury-2/?to=Nama+Tamu

Analyze:

layout
spacing
typography
fonts
colors
imagery
photo frames
decorations
animation
transitions
interaction
responsive behavior

Think in terms of systems rather than isolated CSS.

5. Improvement Mindset

When inspecting existing code, actively search for improvement opportunities.

Ask:

UI
Can this look more premium?
Is the typography good enough?
Is spacing intentional?
Are images presented elegantly?
Are sections visually connected?
Motion
Is animation smooth?
Is the timing consistent?
Is the scroll experience cinematic?
Could a mature animation library improve this?
Code
Is this duplicated?
Is this unnecessarily complex?
Is there a better abstraction?
Is there a mature library that solves this?
Architecture
Is data separated from presentation?
Is theme configuration centralized?
Can future clients be customized more easily?
6. Library Research

When a problem could benefit from a library, investigate library options.

Typical problems:

Animation
Scroll animation
Gallery
Lightbox
Carousel
Photo frames
Masonry
Smooth scrolling
Icons
Forms
Validation
QR code
Date formatting
Gesture interaction
Advanced visual effects

Do not manually reinvent complex functionality when a mature library provides a better solution.

7. Installing a Library

You have permission to install dependencies.

Use the package manager already used by the project.

For example, if npm is used:

npm install <package>


If pnpm is used:

pnpm add <package>


If yarn is used:

yarn add <package>


Do not mix package managers unnecessarily.

After installation:

inspect package.json
inspect lockfile
implement the library
remove replaced code
test
8. Library Selection Criteria

Prefer libraries that are:

actively maintained
widely used
well documented
compatible with the current React/Next.js version
focused
reasonably lightweight
accessible
easy to maintain

Avoid adding a library simply because it looks interesting.

Install it because it solves a real problem.

9. Refactor After Library Adoption

This is mandatory.

If a library replaces an existing implementation:

DO NOT keep the old implementation unless it is still required.

Example:

Before:

Custom Animation Utility
Custom IntersectionObserver
Custom Scroll State
Custom CSS
Custom Animation Helpers


After adopting a proper animation library:

Animation Library
Reusable Motion Components
Minimal CSS


Delete obsolete code.

Remove:

dead components
dead utilities
unused CSS
unused imports
unused dependencies
duplicated implementations

The final codebase should become simpler where possible.

10. Do Not Fear Refactoring

Refactoring is allowed and encouraged.

Examples:

Split huge components.
Merge duplicated components.
Extract shared components.
Extract theme tokens.
Centralize wedding data.
Replace manual animation.
Replace fragile DOM manipulation.
Replace duplicated styles.
Remove dead code.

However:

Refactor with a reason.

Do not refactor unrelated code merely because it could be structured differently.

11. Photo Frame Strategy

If the design requires photo frames, evaluate the best technical approach.

Possible solutions:

CSS

Use CSS when:

border
radius
simple clipping
simple decorative shape

is enough.

SVG

Use SVG when:

intricate frame
ornamental shape
mask
decorative vector

is needed.

Library

Use a library when:

frame behavior is complex
image manipulation is required
existing library significantly reduces implementation complexity
Assets

Use assets when:

the design requires an ornamental frame
the frame is a visual artwork rather than a UI behavior

Do not unnecessarily create complicated CSS for a problem better represented by an asset or SVG.

12. Animation Strategy

Use CSS for simple animation.

Use an animation library for sophisticated animation.

Examples of sophisticated requirements:

scroll timelines
staggered elements
complex sequencing
spring physics
drag/gesture
shared layout transitions
complex image reveals
parallax
cinematic page transitions

Do not build a custom animation framework inside the project unless absolutely necessary.

13. Animation Performance

Prefer:

transform
opacity
clip-path


where appropriate.

Be careful with:

top
left
width
height


for frequently animated elements.

Avoid:

animation loops that run forever unnecessarily
expensive filters on large images
dozens of simultaneous observers
huge client-side animation state
blocking the main thread
14. Design System Improvements

If repeated patterns are discovered, improve the design system.

Potential reusable components:

WeddingSection
SectionHeading
AnimatedReveal
PhotoFrame
WeddingButton
WeddingCard
Countdown
Gallery
Timeline
Quote
EventCard
GiftCard
RSVPForm
WishForm


Do not create every component blindly.

Create components when they provide real reuse or improve clarity.

15. Data Architecture

Wedding data should ideally have one source of truth.

Avoid:

Bride name in Hero
Bride name in Couple
Bride name in Footer
Bride name in Metadata


with four unrelated hard-coded values.

Prefer a shared data/configuration source.

This makes client customization faster and safer.

16. Theme Architecture

Themes should be reusable.

A theme may define:

colors
fonts
typography
backgrounds
borders
decorations
buttons
cards
motion


The exact implementation is flexible.

Use the project's existing architecture when appropriate.

17. Visual Iteration

Do not stop after the page compiles.

Perform:

Implement
↓
Run
↓
Inspect
↓
Compare
↓
Identify Weakness
↓
Improve
↓
Run Again


Visual quality requires iteration.

18. Reference Comparison

When comparing against the reference, evaluate:

Composition
Is the hierarchy comparable?
Is the page rhythm correct?
Are proportions balanced?
Typography
Is the font pairing premium?
Are names visually strong?
Is body text readable?
Photography
Are crops intentional?
Are frames elegant?
Are images integrated into the composition?
Motion
Does scrolling feel smooth?
Are transitions polished?
Are animations appropriately timed?
Mobile
Does the experience feel intentionally designed for mobile?
19. Mobile First

Always verify mobile.

Important widths:

320
375
390
414
768
1024
1280+


Fix:

text wrapping
photo cropping
section height
overflow
buttons
countdown
navigation
gallery
forms
fixed elements
20. Guest URL Testing

Test:

?to=Nama+Tamu


Also consider:

?to=John+Doe
?to=Nama%20Tamu


and names containing Unicode or punctuation.

Ensure guest data is safely rendered.

21. Testing

Run available project checks.

Typical:

npm run lint
npm run build


If type checking exists, run it.

If scripts differ, inspect package.json.

Never assume scripts exist.

22. Browser Testing

If browser tooling is available:

Open the local application.
Test opening screen.
Test guest name.
Scroll through every section.
Test gallery.
Test buttons.
Test RSVP.
Test wishes.
Test maps.
Test gift copy.
Test audio if available.
Test mobile viewport.
Test desktop viewport.

Observe actual behavior.

23. Console and Runtime Errors

Do not ignore:

React warnings
hydration errors
console errors
failed requests
broken images
missing fonts
animation errors

Fix issues introduced by your changes.

24. Dependency Cleanup

After refactoring:

Inspect for unused dependencies.

If a dependency is no longer used and is clearly obsolete:

Remove it.

For example:

npm uninstall <package>


or the equivalent package-manager command.

Do not remove dependencies without verifying their usage.

25. Avoid Dependency Hoarding

Although libraries are encouraged, do not install multiple libraries unnecessarily.

Bad:

3 animation libraries
2 carousel libraries
2 icon libraries
3 date libraries


Prefer a coherent stack.

26. Keep the Project Maintainable

The project should become easier to customize over time.

A future developer should be able to understand:

where wedding data lives
where theme values live
where components live
where animations are defined
where assets live
how guest names work
27. Safety During Refactoring

Before large refactors:

Understand dependencies between components.

Do not delete functionality merely because a component appears unused.

Search the repository before removing files.

Example:

grep -R "ComponentName" .


Use the appropriate search tool available in the environment.

28. Do Not Copy Reference Implementation

The reference website is for visual analysis only.

Do not:

copy source code
scrape proprietary assets
hotlink assets
reproduce private APIs
make the application dependent on the reference website

Create an original implementation.

29. Client Request Priority

When client requirements conflict with the reference:

Client requirements win.

When client requirements are vague:

Use the reference as the design direction.

When neither defines a detail:

Choose the option that best fits a premium wedding aesthetic.

30. Final Quality Gate

Before completion, verify:

Functional
 Guest name
 RSVP
 Wishes
 Countdown
 Maps
 Streaming
 Gift
 Gallery
 Music
 Forms
 API/database
Visual
 Typography
 Colors
 Spacing
 Photography
 Frames
 Decorations
 Animation
 Transitions
 Mobile
 Desktop
Engineering
 Build
 Lint
 Type checking
 Runtime
 Console
 Dependency integration
 Dead code cleanup
31. Final Report

When complete, report:

## Implemented

- ...

## Libraries Added

- ...

## Refactoring

- ...

## Validation

- ...

## Remaining Issues

- ...


Only report checks that were actually performed.

32. Agent Principle

The most important rule:

Do not preserve bad code merely because it already exists.

And:

Do not add a library merely because it exists.

Instead:

Choose the best implementation for the problem.

The final project should continuously evolve toward:

Better design.
Better motion.
Better UX.
Better architecture.
Simpler code.
Faster client customization.
Higher production quality.