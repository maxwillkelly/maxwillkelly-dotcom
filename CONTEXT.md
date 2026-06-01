# Personal Portfolio

This context describes Max Kelly's personal portfolio site: a public, single-page profile for presenting experience, projects, values, education, downloadable CV, and contact options.

## Language

**Portfolio Site**:
A public personal website representing Max Kelly's professional profile.
_Avoid_: app, product, platform

**Section**:
A top-level content area in the Portfolio Site, such as About, Values, Experience, Education, Projects, or Contact.
_Avoid_: page, module

**Project**:
A featured work example with a summary, supporting detail, related technologies, and an outbound reference.
_Avoid_: case study, card

**Contact Message**:
A visitor-submitted enquiry sent to Max Kelly through the Portfolio Site.
_Avoid_: support request, ticket

## Relationships

- A **Portfolio Site** contains multiple **Sections**
- A **Section** may present zero or more **Projects**
- A **Contact Message** is submitted from the Contact **Section**

## Example Dialogue

> **Dev:** "Should each **Section** become its own route during the Astro migration?"
> **Domain expert:** "No, the **Portfolio Site** is a single-page profile; sections should remain visible in one scrolling experience."

## Flagged Ambiguities

- "application" can suggest product-like app behaviour, but this codebase currently behaves as a **Portfolio Site** with a small contact workflow.
