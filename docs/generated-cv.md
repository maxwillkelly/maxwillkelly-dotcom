# Generated CV trial (MAX-179)

The trial adds `/cv/print` and `/api/cv`. The home-page button and legacy
`/cv.pdf` still serve the existing CV until the deployment and document review
passes. This implements the first validation gate from MAX-178; it is not a
production rollout.

## Run locally

Use the normal `.env.local` configuration, including working Upstash credentials,
and add the local settings shown in `.env.example`. The Linux Chromium bundle
cannot run on macOS; point `CV_CHROMIUM_EXECUTABLE_PATH` at an installed Chrome.
`CV_LOCAL_ORIGIN` must be an HTTP loopback URL and must match the server port.

Run `pnpm build` and `pnpm start`, inspect `/cv/print`, then request `/api/cv`.
Run `pnpm test:cv` with `CV_CHROMIUM_EXECUTABLE_PATH` set to exercise real-browser
success, failed assets, recovery, HTTP failures, URL validation and external
request isolation. The browser suite explicitly skips without that executable.

## Deployment

Both runtime dependencies are pinned: Chromium 153 and Puppeteer 25.11.0, matching
[Puppeteer's supported browsers](https://pptr.dev/supported-browsers).
Next.js externalises the packages and traces Chromium's compressed binaries.
On Vercel, the renderer always uses the immutable `VERCEL_URL`; the request URL,
Host header and query parameters cannot choose its destination.

Protected deployments currently need `VERCEL_AUTOMATION_BYPASS_SECRET` configured
server-side. The renderer only adds it to same-origin requests and blocks
external requests. Do not disable deployment protection for the trial. A missing
or rejected protection credential results in a retryable failure, never a login
page downloaded as a PDF.

The endpoint allows five downloads per minute per IP through the existing
Upstash service, under a separate `cv-download` prefix. Rate-limit errors and
timeouts fail closed. Each function instance permits only one active generation;
this is not a global deployment concurrency cap. Excess concurrent requests
receive 503 and `Retry-After`. Successful responses are uncached and limited to
4 MB. HEAD does not launch Chromium.

## Initial local evidence

- Production build, TypeScript, lint and formatting passed.
- Three A4 pages, 613,432 bytes; all pages inspected without clipping or blank
  trailing pages. Full website copy is retained, so the last page is short.
- Selectable extracted text and 32 PDF link annotations; tagged PDF output.
  This does not establish PDF/UA or applicant-tracking-system compliance.
- Renderer-only requests: 0.95 seconds initially, 0.67 seconds repeated, using
  local Chrome 154. These are not Vercel latency measurements.
- The local endpoint returned a retryable 503 when Upstash timed out. Successful
  endpoint downloads remain a preview verification requirement.
- The local function trace totals approximately 145 MB before deduplicating
  symlink paths; all four Chromium binary archives are present. Vercel's final
  function size, memory use and cold-start behaviour still need verification.
- The reviewed local PDF is attached to MAX-179.

## Required before enabling the public button

- Verify the complete endpoint on a protected Vercel preview, including Linux
  Chromium launch, font/image readiness and successful rate limiting.
- Change a paragraph and add a temporary timeline entry in a preview, then prove
  both outputs contain the updated content. Remove the temporary content again.
- Record cold/repeated latency, final function size/resource use, concurrent
  requests, rate limiting, mobile download behaviour and forced failure/retry.
- Agree an acceptable wait and review the full PDF layout. Then add the download
  control with progress, duplicate-click prevention, response validation and a
  retryable error, and decide the legacy `/cv.pdf` behaviour.

If Chromium fails the deployment or latency gate, trial server-side React PDF
against the same sources before changing the requirement for fresh generation.
