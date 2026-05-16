export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 border-t border-[color:var(--color-border)] py-8 text-sm text-[color:var(--color-muted-foreground)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 Cú Chulainn Tech Limited · CRO 812722 · Ireland
        </p>
        <p className="text-[color:var(--color-foreground-faint)]">
          {/* Social links land in Phase 3 once handles are known */}
        </p>
      </div>
    </footer>
  );
}
