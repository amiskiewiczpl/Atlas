type LifeHeatmapProps = {
  domeny: Array<{
    nazwa: string;
    aktywny_score: number | null;
    status: string | null;
  }>;
};

const statusTone: Record<string, string> = {
  zielony: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  zolty: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  pomaranczowy: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  czerwony: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  szary: "border-atlas-border bg-atlas-panel text-atlas-secondary",
  krytyczny: "border-rose-500/40 bg-rose-500/10 text-rose-300"
};

export function LifeHeatmap({ domeny }: LifeHeatmapProps) {
  return (
    <div className="rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            LifeHeatmap
          </p>
          <h3 className="mt-2 text-lg font-semibold text-atlas-primary">
            Co wymaga reakcji?
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {domeny.map((domena) => (
          <div
            key={domena.nazwa}
            className={`rounded-md border p-3 ${statusTone[domena.status ?? "szary"]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{domena.nazwa}</p>
              <span className="text-xs uppercase tracking-[0.2em]">{domena.status ?? "szary"}</span>
            </div>
            <p className="mt-2 text-sm">
              Aktywny score: {domena.aktywny_score ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
