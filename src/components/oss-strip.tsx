import { OSS_PROJECTS } from "@/lib/oss";

export function OssStrip() {
  return (
    <section
      id="open-source"
      aria-labelledby="oss-heading"
      className="relative z-10 border-y border-[color:var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <header className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
              We also maintain
            </p>
            <h2
              id="oss-heading"
              className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Open source
            </h2>
          </div>
          <p className="text-sm text-[color:var(--color-muted-foreground)] sm:max-w-sm sm:text-right">
            Small dev tools we use ourselves and share with the community.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OSS_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`oss-card-${project.id}`}
              className="group flex flex-col gap-2 rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 transition-colors hover:border-[color:var(--color-border-hi)]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-medium tracking-tight text-[color:var(--color-foreground)]">
                  {project.name}
                </h3>
                <span className="text-xs text-[color:var(--color-muted-foreground)] transition-colors group-hover:text-[color:var(--color-accent-pill)]">
                  GitHub →
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-muted-foreground)]">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
