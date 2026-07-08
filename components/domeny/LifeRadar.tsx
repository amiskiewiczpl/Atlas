type LifeRadarProps = {
  domeny: Array<{
    nazwa: string;
    aktywny_score: number | null;
    waga_strategiczna: string | null;
  }>;
};

const scoreColor = (score: number | null) => {
  if (score === null) return "text-atlas-muted";
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-rose-400";
};

export function LifeRadar({ domeny }: LifeRadarProps) {
  return (
    <div className="rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            LifeRadar
          </p>
          <h3 className="mt-2 text-lg font-semibold text-atlas-primary">
            Gdzie jest najwięcej energii?
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {domeny.map((domena) => (
          <div key={domena.nazwa} className="rounded-md border border-atlas-border bg-atlas-panel p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-atlas-primary">{domena.nazwa}</p>
              <span className={`text-sm font-semibold ${scoreColor(domena.aktywny_score)}`}>
                {domena.aktywny_score ?? "—"}
              </span>
            </div>
            <p className="mt-2 text-sm text-atlas-secondary">
              Waga: {domena.waga_strategiczna ?? "brak"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
