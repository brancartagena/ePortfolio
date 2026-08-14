import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SkipLink } from "@/components/skip-link";
import { AmbientEffects } from "@/components/providers/ambient-effects";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

// TODO: update once the Vercel deployment URL (or a custom domain) is known.
const siteUrl = "https://brandon-cartagena.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brandon Cartagena | Portfolio",
  description: "Welcome to my portfolio!",
  openGraph: {
    title: "Brandon Cartagena | Portfolio",
    description: "Welcome to my portfolio!",
    url: siteUrl,
    siteName: "Brandon Cartagena | Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Brandon Cartagena | Portfolio",
    description: "Welcome to my portfolio!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SkipLink />
        <LenisProvider>
          <AmbientEffects />
          <div className="relative z-10">{children}</div>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
