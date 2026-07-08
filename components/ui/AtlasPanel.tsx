import { cn } from "@/lib/utils";

type AtlasPanelProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function AtlasPanel({
  eyebrow,
  title,
  children,
  className
}: AtlasPanelProps) {
  return (
    <section
      className={cn(
        "rounded-md border border-atlas-border bg-atlas-card p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        className
      )}
    >
      <div className="mb-5">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
