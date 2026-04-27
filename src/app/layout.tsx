import { ScrollShadow } from "@heroui/react";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
// import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "Max Kelly",
  description:
    "A personal portfolio website for Max Kelly, a software engineer based in Bristol",
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
      </body>
    </html>
  );
};

export default RootLayout;
