import type { Metadata } from "next";

import { SkipLink } from "@/components/skip-link";
import { AmbientEffects } from "@/components/providers/ambient-effects";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandon Cartagena | Portfolio",
  description: "Welcome to my portfolio!",
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
      </body>
    </html>
  );
}
