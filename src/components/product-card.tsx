import Image from "next/image";
import { StatusBadge } from "@/components/status-badge";
import { ComingSoonPlaceholder } from "@/components/coming-soon-placeholder";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

function CardShell({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const isLive = product.status === "live";
  const wrapperClasses = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]",
    "border border-[color:var(--color-border)] bg-[color:var(--color-card)]",
    "transition-transform duration-200 ease-out",
    isLive
      ? "hover:-translate-y-0.5 hover:border-[color:var(--color-border-hi)]"
      : "opacity-95",
  );

  return isLive && product.href ? (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`product-card-${product.id}`}
      className={wrapperClasses}
    >
      {children}
    </a>
  ) : (
    <article
      data-testid={`product-card-${product.id}`}
      className={wrapperClasses}
    >
      {children}
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <CardShell product={product}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-background-up)]">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ComingSoonPlaceholder name={product.name} tone={product.accentTone ?? "default"} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="text-sm text-[color:var(--color-muted-foreground)]">
          {product.description}
        </p>
        {product.status === "live" && product.href ? (
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-accent-pill)] opacity-80 transition-opacity group-hover:opacity-100">
            Visit →
          </span>
        ) : null}
      </div>
    </CardShell>
  );
}
