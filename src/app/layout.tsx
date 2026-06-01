import { ScrollShadow } from "@heroui/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, cn } from "@/lib/utils";

import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GB",
    images: [
      {
        url: absoluteUrl(siteConfig.image, siteConfig.url),
        width: 400,
        height: 400,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.image, siteConfig.url)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        // "dark",
        "h-full",
        "antialiased",
        "font-sans",
        figtree.variable,
      )}
      // data-theme="dark"
    >
      <body className="h-full flex flex-col bg-background text-foreground overflow-hidden">
        {/* <div className="fixed inset-0 z-0 pointer-events-none">
          <DottedGlowBackground
            className="mask-radial-to-20% mask-radial-at-left"
            opacity={0.3}
            gap={10}
            radius={1.6}
            colorLightVar="--color-neutral-500"
            glowColorLightVar="--color-neutral-600"
            colorDarkVar="--color-neutral-500"
            glowColorDarkVar="--color-sky-800"
            backgroundOpacity={0}
            speedScale={0.3}
          />
        </div> */}
        <ScrollShadow className="flex-1" hideScrollBar size={60}>
          <div
            id="container"
            className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6"
          >
            {children}
          </div>
        </ScrollShadow>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
