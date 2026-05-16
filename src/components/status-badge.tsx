import type { ProductStatus } from "@/lib/products";
import { cn } from "@/lib/utils";

const VARIANT: Record<ProductStatus, string> = {
  live:
    "bg-[color:var(--color-accent-faint)] text-[color:var(--color-accent-pill)] border-[color:var(--color-accent-rim)]",
  "coming-soon":
    "bg-transparent text-[color:var(--color-muted-foreground)] border-[color:var(--color-border-hi)]",
};

const LABEL: Record<ProductStatus, string> = {
  live: "Live",
  "coming-soon": "Coming Soon",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em]",
        VARIANT[status],
      )}
    >
      {LABEL[status]}
    </span>
  );
}
