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
- **Linting/Formatting**: Biome

## Project Structure

```text
src/
├── app/
│   ├── _components/          # Page sections
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── Timeline.tsx
│   │   ├── ValuesSection.tsx
│   │   └── contact/
│   │       └── ContactForm.tsx
│   ├── actions/
│   │   └── sendContactEmail.tsx  # Server action for contact form
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/ui/            # Reusable UI components
│   ├── blur-fade.tsx
│   └── dia-text-reveal.tsx
├── emails/
│   └── ContactEmailTemplate.tsx
├── lib/
│   ├── duration.ts           # Date formatting utilities
│   ├── env.ts                # Environment validation (t3-env)
│   └── utils.ts              # cn() helper
└── schemas/
    └── contact-message.tsx   # Zod schema for contact form
```

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

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for sending contact emails |
| `SEND_EMAIL` | Verified sender email address |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linting |
| `pnpm check:quality` | Audit local changes against `origin/main` with fallow |
| `pnpm format` | Run Biome formatting |
| `pnpm email` | Start React Email dev server |

## Code Quality

The [Fallow workflow](.github/workflows/fallow.yml) checks code quality on every
branch and pull request. Run `pnpm check:quality` to audit local changes against
`origin/main`; fetch it first to compare with the latest main branch.

## Deployment

### Staging

Open the [staging site](https://maxwillkelly-dotcom-git-main-max-kellys-projects-ea88b442.vercel.app)
to review the latest successful deployment from `main`. Vercel's Git integration
updates this stable branch URL after each successful build. While a build is
running, or if it fails, staging continues to serve the previous successful build.

Staging uses the existing `maxwillkelly-dotcom` project and the same production
build and environment variables that will be released. It does not require a
separate Vercel project, paid custom environment, or deployment workflow.

The Vercel project settings that keep this working are:

| Setting | Value |
|---------|-------|
| Git repository | `maxwillkelly/maxwillkelly-dotcom` |
| Production branch | `main` |
| Auto-assign custom production domains | Disabled (`autoAssignCustomDomains: false`) |
| Deployment Protection | Vercel Authentication with Standard Protection (`all_except_custom_domains`) |

Vercel Authentication protects the staging branch URL and individual deployment
URLs. Sign in with Max's personal Vercel account (`maxwillkelly`) to view staging.
Max is the only confirmed team member. Keep team/project access restricted and do
not grant external access, create shareable links, or enable protection bypasses
if staging must remain accessible only to Max. Authentication permits authorised
team/project members; it is not an allowlist for one email address.

To check staging, open its URL in a private browser window and confirm that Vercel
requires sign-in. Then sign in with Max's account and review the website. In the
Vercel deployment details, confirm that the branch is `main` and the commit matches
the latest successful build. The public site stays on its last promoted release.

See Vercel's documentation for [branch URLs](https://vercel.com/docs/deployments/generated-urls)
and [Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication).

### Production releases

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
