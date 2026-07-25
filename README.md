# maxwillkelly.com

Personal portfolio website for Max Kelly, a software engineer based in Bristol.

Live at [maxwillkelly.com](https://maxwillkelly.com)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, React Compiler)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Components**: [HeroUI React v3](https://www.heroui.com)
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

Requires [pnpm](https://pnpm.io) (managed via `corepack`).

```bash
# Enable corepack (if not enabled already)
corepack enable

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
| `pnpm format` | Run Biome formatting |
| `pnpm email` | Start React Email dev server |

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers an automatic production deployment.

### Linear release tracking

Promoted production deployments are recorded in Linear by the
[`Sync Linear release`](.github/workflows/linear-release.yml) workflow. The
workflow checks out the exact commit promoted by Vercel, creates a completed
release in a continuous Linear release pipeline, and links back to the Vercel
deployment.

To enable release tracking:

1. Use a Linear Business or Enterprise workspace.
2. Create a continuous pipeline in **Settings → Releases**.
3. Generate the pipeline access key.
4. Add the key to this GitHub repository as an Actions secret named
   `LINEAR_ACCESS_KEY`.
5. Keep Vercel's repository dispatch events enabled for the connected GitHub
   repository.

After the workflow is present on `main`, run it manually from GitHub Actions to
perform a dry-run validation. Automatic runs only process production promotions
for the maxwillkelly.com Vercel project. Linear issue identifiers such as
`MAX-83` should appear in branch names, commit messages, or linked pull requests
so the corresponding issues can be associated with a release.

## License

MIT
