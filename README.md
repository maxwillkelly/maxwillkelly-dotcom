# maxwillkelly.com

Personal portfolio website for Max Kelly, a software engineer based in Bristol.

Live at [maxwillkelly.com](https://maxwillkelly.com)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router, React Compiler)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Components**: [HeroUI React](https://www.heroui.com)
- **Animations**: [Motion](https://motion.dev)
- **Icons**: [Lucide React](https://lucide.dev) + [thesvg/react](https://thesvg.co)
- **Email**: [Resend](https://resend.com) + React Email
- **Rate Limiting**: Upstash Redis
- **Analytics**: Vercel Analytics
- **Linting/Formatting**: Oxlint and Oxfmt

## Project Structure

```text
src/
├── app/
│   ├── _components/              # Page sections and content rendering
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── contact/
│   │   ├── education-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── hero-description.tsx
│   │   ├── hero-section.tsx
│   │   ├── hero/
│   │   ├── projects-section.tsx
│   │   ├── timeline-section.tsx  # Markdown discovery and date sorting
│   │   └── timeline.tsx          # Timeline rendering and metadata schema
│   ├── actions/
│   │   └── send-contact-email.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/                  # Reusable UI components
│   ├── max/
│   └── ui/
├── content/                     # Markdown CV copy and timeline metadata
│   ├── education/
│   │   └── university-of-dundee.md
│   ├── experience/
│   │   ├── the-key-group.md
│   │   └── udrafter.md
│   ├── hero.md
│   ├── profile.md
│   └── projects/
│       └── ev-charging-analyser.md
├── emails/
│   └── contact-email-template.tsx
├── lib/
│   ├── duration.ts              # Date formatting utilities
│   ├── env.ts                   # Environment validation (t3-env)
│   ├── headers.ts
│   ├── site.ts                  # Site metadata and links
│   ├── technologies.tsx         # Technology IDs, labels, logos and links
│   └── utils.ts                 # cn() helper
├── schemas/
│   └── contact-message.tsx       # Zod schema for contact form
└── types/
    └── markdown.d.ts            # Markdown module declarations
```

## Content

CV copy lives in `src/content`. Timeline files use YAML metadata for roles,
ISO dates and technology IDs mapped in `src/lib/technologies.tsx`. Folders load
automatically, newest first.

## Getting Started

Requires Node.js and [pnpm](https://pnpm.io).

I recommend using [fnm](https://github.com/Schniz/fnm) to use the appropriate
Node.js version in `.nvmrc`.

```bash
# Install and select Node.js
fnm install
fnm use

# Install pnpm
npx get-pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

| Variable                   | Description                               |
| -------------------------- | ----------------------------------------- |
| `RESEND_API_KEY`           | Resend API key for sending contact emails |
| `SEND_EMAIL`               | Verified sender email address             |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST URL for rate limiting  |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token                  |

## Scripts

| Command              | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `pnpm dev`           | Start development server                                  |
| `pnpm build`         | Build for production                                      |
| `pnpm start`         | Start production server                                   |
| `pnpm lint`          | Run Oxlint linting and Oxfmt formatting checks            |
| `pnpm check:quality` | Audit local changes against `origin/main` with fallow     |
| `pnpm lint:fix`      | Apply Oxlint automatic fixes                              |
| `pnpm format`        | Format files and sort imports                             |
| `pnpm format:check`  | Check formatting and import sorting without writing files |
| `pnpm email`         | Start React Email dev server                              |

## Code Quality

The [Fallow workflow](.github/workflows/fallow.yml) checks code quality on every
branch and pull request. Run `pnpm check:quality` to audit local changes against
`origin/main`; fetch it first to compare with the latest main branch.

## Deployment

The website is deployed on [Vercel](https://vercel.com). Pushing to `main`
creates a production deployment, but Vercel does not automatically assign the
production domains. The deployment remains **Staged** until it is promoted.

To release the website:

1. Merge the changes into `main` and wait for the Vercel deployment to become
   ready.
2. Open the `maxwillkelly-dotcom` project in Vercel and select **Deployments**.
3. Find the latest **Staged** deployment from `main`, open its ellipsis menu,
   select **Promote**, and confirm the promotion.

The equivalent Vercel CLI command is:

```sh
vercel promote <deployment-url-or-id>
```

Promotion assigns the production domains without rebuilding the deployment. It
also triggers the
[`Sync Linear release`](.github/workflows/linear-release.yml) GitHub Actions
workflow. Running that workflow manually performs a dry run only; it does not
release the website.

## License

MIT
