import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SkipLink } from "@/components/skip-link";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

const siteUrl = "https://brandon-cartagena.vercel.app";
const siteDescription =
  "Portfolio of Brandon Cartagena, a University of Maryland Information Science graduate with a Data Science minor, interested in data analytics, UX/UI, and cybersecurity/IT.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brandon Cartagena | Information Science Graduate",
  description: siteDescription,
  openGraph: {
    title: "Brandon Cartagena | Portfolio",
    description: siteDescription,
    url: siteUrl,
    siteName: "Brandon Cartagena | Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Brandon Cartagena | Portfolio",
    description: siteDescription,
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
          <div className="relative z-10">{children}</div>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
