type Tone = "default" | "warm" | "cool";

const GRADIENT: Record<Tone, string> = {
  default:
    "from-[color:var(--color-card)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
  warm:
    "from-[oklch(0.28_0.08_45)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
  cool:
    "from-[oklch(0.28_0.08_240)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
};

export function ComingSoonPlaceholder({
  name,
  tone = "default",
}: {
  name: string;
  tone?: Tone;
}) {
  // Use the first letter (or two for multi-word names) as a tasteful mark.
  const initial = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${GRADIENT[tone]}`}
    >
      <span
        className="font-mono text-[clamp(40px,6vw,68px)] font-medium tracking-[-0.04em] text-[color:var(--color-foreground)]/22"
      >
        {initial}
      </span>
    </div>
  );
}
