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

Each promotion syncs the shipped changes into Linear, sets the release name and
version, and completes that exact release. Use the Linear pipeline's existing
changelog to review shipped changes.

The workflow has three steps: check out the promoted commit, sync the release,
and complete it using Linear's official release action. Versions use GitHub's
built-in workflow run number: `v0.1.42`, `v0.1.43`, and so on. Each new run
increments the number; rerunning a failed run keeps its version. Read-only
previews and failed runs can leave gaps. These are deployment versions, rather
than versions based on commit types. No versioning package, Git tags, or custom
scripts are needed, and `package.json` is unchanged.

Linear's release action selects the commit range using the pipeline's recent
release history. The workflow no longer maintains a separate Git-tag baseline
or custom rollback and duplicate-promotion checks. A new promotion event gets a
new version, even when it promotes the same commit. Promotions queue rather than
cancel another release sync in progress.

The Max Kelly team's **Workflows & automations → Release automations** rule
already moves issues to **Done** on completion of any production pipeline,
including `maxwillkelly-dotcom`. Keep this enabled. Linear completes issues with
no linked PRs or a merged closing PR, provided no linked PRs remain open; issues
linked only through contributing PRs remain open. Use a closing issue reference
on PRs that finish an issue. See [Linear's release automation rules](https://linear.app/docs/releases#status-automations).

The workflow uses the existing `LINEAR_ACCESS_KEY` repository secret and the
automatic GitHub token with read-only repository access. It
does not need a personal Linear API key. Linear's pipeline remains **Scheduled**;
the workflow runs `sync` followed by `complete`, both targeting the same version.

To preview, run **Sync Linear release** manually from the desired branch. Linear
logs the proposed version and changes in read-only dry-run mode; the completion
step is skipped. If a promotion workflow fails, rerun that workflow before
promoting newer changes. Reruns target the same release version.

The release workflow does not install Node or project dependencies. Its actions
provide their own runtime. Workflows that set up Node read `.nvmrc`.

## License

MIT
