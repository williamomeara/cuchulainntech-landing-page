import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export function ProductsSection() {
  const live = PRODUCTS.filter((p) => p.status === "live");
  const comingSoon = PRODUCTS.filter((p) => p.status === "coming-soon");

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
          What we build
        </p>
        <h2
          id="products-heading"
          className="text-balance text-4xl font-bold tracking-[-0.04em] md:text-5xl"
        >
          Products
        </h2>
      </header>

      <div className="mb-12">
        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-pill)]">
          Live
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
          Coming soon
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
