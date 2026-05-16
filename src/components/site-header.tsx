"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-[color:var(--color-background)]/70 backdrop-blur-md border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#hero"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]"
          />
          Cuchulainn Tech
        </a>

        <ul className="hidden items-center gap-8 text-sm text-[color:var(--color-muted-foreground)] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-[color:var(--color-foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={cn(
            "rounded-full border border-[color:var(--color-accent-rim)]",
            "bg-[color:var(--color-accent-faint)] px-4 py-2 text-sm font-medium",
            "text-[color:var(--color-accent-pill)] transition-colors",
            "hover:bg-[color:var(--color-accent)]/15"
          )}
        >
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
