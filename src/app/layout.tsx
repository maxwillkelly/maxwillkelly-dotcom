import { ThemeProvider } from "@wrksz/themes/next";
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
      className={cn("h-full", "antialiased", "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider
          attribute={["class", "data-theme"]}
          defaultTheme="dark"
          storage="cookie"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
