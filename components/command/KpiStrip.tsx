import type { CommandKpi } from "@/lib/queries/command-center";

type KpiStripProps = {
  kpis: CommandKpi[];
};

const statusClass: Record<CommandKpi["status"], string> = {
  zielony: "border-atlas-green text-atlas-green",
  zolty: "border-atlas-yellow text-atlas-yellow",
  pomaranczowy: "border-atlas-orange text-atlas-orange",
  czerwony: "border-atlas-red text-atlas-red",
  krytyczny: "border-atlas-red text-atlas-red",
  szary: "border-atlas-border text-atlas-muted"
};

export function KpiStrip({ kpis }: KpiStripProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.length === 0 ? (
        <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            KPI
          </p>
          <p className="mt-3 text-sm text-atlas-secondary">
            Brak aktywnych KPI. Zainicjalizuj dane startowe.
          </p>
        </div>
      ) : (
        kpis.map((kpi) => (
          <article
            key={kpi.id}
            className="rounded-md border border-atlas-border bg-atlas-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
                  KPI
                </p>
                <h3 className="mt-2 text-sm font-semibold text-atlas-primary">
                  {kpi.nazwa}
                </h3>
              </div>
              <span
                className={`rounded-md border px-2 py-1 text-xs ${statusClass[kpi.status]}`}
              >
                {kpi.status}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-atlas-primary">
              {kpi.wartosc_aktualna ?? "brak"}
              {kpi.wartosc_docelowa !== null ? (
                <span className="text-sm font-normal text-atlas-muted">
                  {" "}
                  / {kpi.wartosc_docelowa} {kpi.jednostka}
                </span>
              ) : null}
            </p>
            <p className="mt-3 text-xs leading-5 text-atlas-muted">
              {kpi.regula_decyzyjna}
            </p>
          </article>
        ))
      )}
    </section>
  );
}
