import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <section
          id="hero"
          aria-label="Hero"
          className="flex min-h-[85vh] items-center justify-center px-6 pt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="mb-6 inline-block rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]"
            >
              Irish Software Studio
            </p>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.06] tracking-[-0.05em] md:text-7xl">
              Software that stands<br />its ground.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-foreground)]">
              Phase 1 foundation — real hero copy and product showcase land in
              Phase 2.
            </p>
          </div>
        </section>

        <section id="products" aria-label="Products placeholder" className="px-6 py-32" />
        <section id="services" aria-label="Services placeholder" className="px-6 py-32" />
        <section id="about" aria-label="About placeholder" className="px-6 py-32" />
        <section id="contact" aria-label="Contact placeholder" className="px-6 py-32" />
      </main>
      <SiteFooter />
    </>
  );
}
