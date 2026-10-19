import { ScrollShadow } from "@heroui/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { locale } from "@/lib/locale";
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
    locale: locale.code.replace("-", "_"),
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
      lang={locale.code}
      suppressHydrationWarning
      className={cn(
        // "dark",
        "h-full has-[[data-print-document]]:h-auto has-[[data-print-document]]:overflow-visible has-[[data-print-document]]:bg-white has-[[data-print-document]]:text-[#202020] has-[[data-print-document]]:scheme-light",
        "antialiased",
        "font-sans",
        figtree.variable,
      )}
      // data-theme="dark"
    >
      <body className="h-full flex flex-col bg-background text-foreground overflow-hidden has-[[data-print-document]]:h-auto has-[[data-print-document]]:overflow-visible has-[[data-print-document]]:block has-[[data-print-document]]:bg-white has-[[data-print-document]]:text-[#202020] has-[[data-print-document]]:scheme-light">
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
        <ScrollShadow
          className="flex-1 has-[[data-print-document]]:h-auto has-[[data-print-document]]:overflow-visible has-[[data-print-document]]:mask-none has-[[data-print-document]]:block"
          hideScrollBar
          size={60}
        >
          <div
            id="container"
            className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6 has-[[data-print-document]]:max-w-[210mm] has-[[data-print-document]]:p-[14mm] print:has-[[data-print-document]]:max-w-none print:has-[[data-print-document]]:m-0 print:has-[[data-print-document]]:p-0"
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
