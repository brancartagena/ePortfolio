import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  brand?: string;
  links?: FooterLink[];
  className?: string;
};

const defaultLinks: FooterLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function Footer({
  brand = "Brandon Cartagena",
  links = defaultLinks,
  className,
}: FooterProps) {
  return (
    <footer className={cn("border-t border-white/10 py-10 sm:py-12", className)}>
      <Container className="flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-foreground/80">{brand}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition duration-300 ease-out hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
