import { PRODUCTS } from "@/lib/products";

export function Hero() {
  const live = PRODUCTS.filter((p) => p.status === "live").length;
  const soon = PRODUCTS.filter((p) => p.status === "coming-soon").length;

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Ambient Celtic-green orb behind the headline. */}
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-faint), transparent 70%)",
          filter: "blur(40px)",
          animation: "orb-pulse 7s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          className="mb-6 inline-block rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]"
        >
          Irish Software Studio
        </p>

        <h1 className="text-balance text-5xl font-extrabold leading-[1.06] tracking-[-0.05em] md:text-7xl">
          Software that stands<br />its ground.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-foreground)]">
          An Irish studio shipping SaaS products and custom apps for ambitious teams.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a
            href="#contact"
            data-testid="hero-cta"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-accent-rim)] bg-[color:var(--color-accent-faint)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-accent-pill)] transition-colors hover:bg-[color:var(--color-accent)]/15"
          >
            Get in Touch →
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-[color:var(--color-muted-foreground)] transition-colors hover:text-[color:var(--color-foreground)]"
          >
            See what we ship
          </a>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-foreground-faint)]">
          shipped {live} products · building {soon} more
        </p>
      </div>
    </section>
  );
}
