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

## License

MIT
