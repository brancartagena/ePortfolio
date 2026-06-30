import type { Metadata } from "next";

import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandon Cartagena | Portfolio",
  description: "A premium personal portfolio experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
