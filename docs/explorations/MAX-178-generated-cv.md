# MAX-178: Generate a CV from the Portfolio Site

Investigated on 9 October 2026 against `origin/main` at
`8b93c6d90edce12727b49822d9d0f82107cca585`.

## Recommendation

Trial a dedicated, static HTML CV view, rendered to PDF by server-side Chromium
when the visitor clicks Download CV. Share the website's Markdown content and
timeline metadata; give the CV its own print presentation. This best matches the
request to keep the content mostly the same, remove animations and the Contact
Section, and download a PDF directly.

This is a recommendation for a feasibility spike, not an accepted architecture.
The investigation covers source inspection and current primary documentation.
No PDF has been generated or visually reviewed, and Vercel compatibility,
download latency and employer-facing PDF quality remain unverified. This PR adds
only this investigation; it does not replace the current CV or add dependencies.

## Current implementation

| Concern               | Evidence in this checkout                                                                                                                                                    | Consequence                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Download              | `src/app/_components/hero-section.tsx` links to `public/cv.pdf` through `/cv.pdf`, with the filename `Max Kelly - CV.pdf`.                                                   | The downloaded file is maintained separately from the website.                                                                   |
| Copy                  | `src/content/hero.md`, `profile.md`, and the `experience`, `education` and `projects` directories contain the website's copy.                                                | These can remain the single source for both outputs.                                                                             |
| Timeline              | `src/components/max/timeline/timeline-section.tsx` discovers Markdown files, validates frontmatter with `timelineMetadataSchema` and sorts entries by descending start date. | Reuse discovery, validation and ordering rather than maintaining a CV list separately.                                           |
| Metadata              | `src/components/max/timeline.tsx` renders organisations, roles, locations, dates, durations and technology chips; `src/lib/site.ts` holds identity and contact details.      | Preserve this information, using plain text where icons or chips are unsuitable.                                                 |
| Animations            | `src/app/page.tsx` wraps the content in `BlurFade`; the hero uses `DiaTextReveal`. These start with opacity zero or transparent text.                                        | Rendering the current page immediately can capture invisible content. Removing CSS animations alone does not reset those styles. |
| Layout                | `src/app/layout.tsx` uses full-height elements, `overflow-hidden`, HeroUI `ScrollShadow` and a narrow container.                                                             | A print view must restore normal document flow and remove scroll masks to avoid clipping.                                        |
| Markdown presentation | `mdx-components.tsx` maps Markdown to HTML and HeroUI-backed links.                                                                                                          | A print-specific component mapping can retain copy and links without interactive decorations.                                    |
| Deployment            | `package.json` specifies Next.js 16.3.8 and Node.js 24. `next.config.ts` includes `src/content/**/*` in file tracing for `/` only.                                           | New routes need their own content tracing coverage if they discover files at runtime.                                            |

The current Section order is Hero, About, Experience, Education, Projects, Contact.
There is no Values Section in `src/app/page.tsx`. Projects already render inline.

## Options considered

| Approach                              | Content and presentation reuse                                                    | Download behaviour                                       | Trade-off / fit                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Browser print with print CSS          | Reuses HTML and CSS.                                                              | Opens a print dialog; the visitor chooses Save as PDF.   | Useful low-cost fallback, but does not provide the requested direct PDF download.                                              |
| Static HTML CV + server-side Chromium | Shares Markdown and much of the HTML/CSS rendering.                               | Creates PDF bytes on request and returns a download.     | Best first spike; browser packaging, startup time and pagination need proof.                                                   |
| `@react-pdf/renderer` on the server   | Shares source content, but requires PDF components and a separate styling system. | Creates PDF bytes on request without Chromium.           | Strong alternative if browser deployment or latency is unacceptable; greater adaptation cost for Markdown and existing UI.     |
| Browser-side PDF renderer             | Can share source data, but needs a PDF renderer in the client.                    | Can generate a downloadable file on click.               | Moves rendering cost to each visitor; bundle size, mobile performance and content-loading design need investigation.           |
| Generate PDF during deployment        | Can use either HTML or PDF components.                                            | Downloads a pre-generated file matching that deployment. | Meets automatic content synchronisation, but not literal generation on every click. Consider only if that requirement changes. |

[`window.print()` opens the print dialog](https://developer.mozilla.org/en-US/docs/Web/API/Window/print).
[Puppeteer's `page.pdf()` renders HTML using print media](https://pptr.dev/api/puppeteer.page.pdf).
[React PDF's Node API](https://react-pdf.org/docs/v4/node) supports buffer and stream
generation, but its examples use `Document`, `Page` and `Text` components;
[its styling API](https://react-pdf.org/docs/v4/styling) uses `StyleSheet` and style
props. It is not a drop-in renderer for the existing HTML, Tailwind or HeroUI
components. Screenshot-to-PDF is a poor fit because the CV needs selectable text
and working links rather than page-sized images.

## Proposed spike

### Shared content and a static print view

Introduce a `/cv/print` view with a plain name and hero description, About,
Experience, Education and Projects in the current order. Reuse Markdown imports
and extract the timeline loader from `TimelineSection` so both presentations use
the same schema, ordering and date formatting. Pass plain HTML components into
the Markdown renderer for paragraphs, headings and links. Translate technology
IDs through the existing labels instead of duplicating label text.

Exclude the Contact Section, its form, animation wrappers, tooltips and download
controls. Keep a compact contact line containing email, location, website,
GitHub and LinkedIn from shared configuration. This is a proposed presentation
choice: removing the Contact card should still leave employers a way to reply.
Initially retain the profile photo and full copy; review the actual page count
before deciding whether a shorter CV or a photo-free version is desirable.

A nested page still inherits `src/app/layout.tsx`. Merely adding a nested layout
will not remove `ScrollShadow` or the outer height constraints. For the spike,
add scoped print-media overrides for `html`, `body`, `.scroll-shadow` and
`#container`: automatic height, visible overflow, no masks and reduced padding.
If a fully isolated preview layout is later needed, use separate root layouts
through route groups rather than relying on a nested layout to replace the root.

Use A4 portrait with a light theme, readable text and explicit margins. Keep
headings with their following paragraph, and avoid splitting short metadata
blocks. Allow long entries to split naturally; applying `break-inside: avoid`
to whole Sections could create blank space or overflow. Wait for fonts and images
to finish loading and fail generation if required assets are missing. The
existing `next/font` setup should be checked in the deployed print view.

### Request-time PDF download

1. Add a Node.js `GET` Route Handler at `/api/cv` that launches a compatible
   Chromium build through `puppeteer-core` and loads the fixed `/cv/print` URL.
2. Bind that URL to the same immutable deployment as the handler. Do not load the
   production alias from a preview, or derive the renderer's destination from an
   arbitrary URL parameter or untrusted Host header. Configure preview-protection
   access on the server if necessary, without exposing bypass credentials.
3. Wait for an explicit document-ready condition, fonts and images; avoid an
   arbitrary delay or waiting on analytics requests. Generate with print media,
   A4 sizing, print backgrounds and bounded navigation/render timeouts.
4. Return `Content-Type: application/pdf`,
   `Content-Disposition: attachment; filename="Max Kelly - CV.pdf"` and
   `Cache-Control: no-store`. Do not opt the handler into static generation or
   response caching: each successful download request should generate a new PDF.
5. Close the page/browser in `finally`, including after timeouts. Apply a download
   rate limit and bound rendering concurrency so repeated public requests cannot
   launch an uncontrolled number of browsers in one function instance.
6. Point the CV control at `/api/cv` only after the spike passes. Provide visible
   progress, prevent duplicate clicks, check HTTP status and PDF content type,
   and show a retryable error if generation fails. Do not download an error page
   as a PDF or silently substitute the old static CV.

“Current content” means content in the deployment serving the website. Editing
Markdown updates both outputs after deployment; it does not expose unpublished
repository changes. Keep the existing `/cv.pdf` download while evaluating the
spike and decide its legacy-URL behaviour when implementing the replacement.

The installed Next.js Route Handlers guide confirms that handlers use Web
`Request`/`Response`, do not participate in layouts and are uncached by default.
The installed runtime guide lists Node.js as the default and Edge as deprecated.
The local MDX guide documents per-import component overrides. These guides are
under `node_modules/next/dist/docs/01-app/` and were read for this investigation.

### Deployment and document risks to resolve

- **Browser packaging:** trial compatible, pinned `puppeteer-core` and
  `@sparticuz/chromium` versions. The
  [Chromium project's guidance](https://github.com/Sparticuz/chromium) requires
  version matching and a separate local browser on macOS because its bundled
  binary targets Linux. Include both required runtime packages in production
  dependencies and inspect the traced deployment files.
- **Vercel limits:** the
  [current Functions limits](https://vercel.com/docs/functions/limitations)
  document a standard 250 MB uncompressed Node.js bundle, a large-function beta
  up to 5 GB, and a 4.5 MB request/response body limit. Check the actual project's
  plan, Fluid Compute settings, bundle size, memory and duration before relying
  on any limits or beta. Prefer fitting the standard path. Measure the generated
  PDF size; if it exceeds the response limit, evaluate streaming or storage
  separately.
- **Latency and cost:** measure browser launch, navigation, asset readiness,
  rendering and total download time for first and repeated requests. Preview
  results establish feasibility, not a production latency guarantee. Agree an
  acceptable download wait before enabling the new button. Fresh generation on
  every click consumes compute even when the content has not changed.
- **Content discovery:** extend `outputFileTracingIncludes` for `/cv/print` if
  it uses the filesystem loader. Verify a new Markdown entry appears in both
  outputs on a preview deployment; local rendering alone cannot prove tracing.
- **Text and accessibility:** confirm extraction order, selectable text, clickable
  links, font embedding and contrast. Puppeteer's
  [PDF options](https://pptr.dev/api/puppeteer.pdfoptions) support font readiness
  and experimental tagged PDFs. Check support in the chosen Chromium build;
  neither tagging nor successful extraction proves PDF/UA compliance or that
  every employer's applicant-tracking system will parse the document correctly.

## Evidence needed before choosing an implementation

Run a small follow-up spike with the button unchanged, and attach a sample PDF
and recorded measurements to its review:

- Render all current Markdown files and metadata in the expected order, without
  the Contact Section, hidden text, blur or interactive controls. Compare extracted
  PDF text against the shared source and inspect every rendered page visually.
- Verify A4 size, real page count, no clipped content or blank trailing pages,
  readable technology labels, working links and sensible breaks. Do not promise
  a two-page CV without reviewing the full content.
- Change a paragraph and add a timeline entry, redeploy, then prove the next
  download reflects both changes. Verify the preview PDF contains preview copy.
- Test first and repeated downloads, concurrent requests, mobile download
  behaviour and a forced rendering failure. Record timings, output size,
  deployment bundle size and resource use; confirm browser cleanup and retry.
- Run repository lint, formatting, TypeScript and build checks for implementation
  changes, then verify the same flow on a protected Vercel preview.

Choose HTML + Chromium if that evidence shows acceptable layout, deployment and
latency. Trial server-side React PDF if browser packaging or request-time cost is
unacceptable, preserving the same source files and checking Markdown adaptation.
If both on-demand approaches are too slow or costly, revisit the requirement to
generate on each click before selecting deployment-time generation or caching.
