import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
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
        "dark",
        "h-full",
        "antialiased",
        "font-sans",
        figtree.variable,
      )}
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div
          id="container"
          className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6"
        >
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
