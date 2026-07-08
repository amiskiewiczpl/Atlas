import { AppShell } from "@/components/layout/AppShell";
import { LifeHeatmap } from "@/components/domeny/LifeHeatmap";
import { LifeRadar } from "@/components/domeny/LifeRadar";
import { getActiveKpis, getDomenySummary } from "@/lib/queries/domeny";

export const dynamic = "force-dynamic";

export default async function DomenyPage() {
  const [domeny, kpi] = await Promise.all([getDomenySummary(), getActiveKpis()]);

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Domeny i KPI
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-atlas-primary">LifeRadar</h1>
              <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                Prosty przegląd domen, aktywności i reguł decyzyjnych bez pełnego dashboardu.
              </p>
            </div>
          </div>
        </header>

        <LifeRadar domeny={domeny} />
        <LifeHeatmap domeny={domeny} />

        <section className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            KPI
          </p>
          <div className="mt-4 grid gap-3">
            {kpi.length === 0 ? (
              <p className="text-sm leading-6 text-atlas-secondary">
                Brak aktywnych KPI. Seed danych startowych doda prosty zestaw dla Readiness i Discovery.
              </p>
            ) : (
              kpi.map((item) => (
                <div key={item.id} className="rounded-md border border-atlas-border bg-atlas-panel p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-atlas-primary">{item.nazwa}</p>
                      <p className="mt-1 text-sm text-atlas-secondary">{item.regula_decyzyjna}</p>
                    </div>
                    <div className="text-sm text-atlas-secondary">
                      {item.wartosc_aktualna ?? "—"} / {item.wartosc_docelowa ?? "—"} {item.jednostka}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
