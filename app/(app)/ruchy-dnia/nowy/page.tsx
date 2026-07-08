import { AppShell } from "@/components/layout/AppShell";
import { RuchDniaForm } from "@/components/ruchy/RuchDniaForm";
import { getAktywneDomeny, getDzisiejszeRuchyDnia } from "@/lib/queries/ruchy-dnia";

export const dynamic = "force-dynamic";

export default async function NowyRuchDniaPage() {
  const [domeny, ruchy] = await Promise.all([
    getAktywneDomeny(),
    getDzisiejszeRuchyDnia()
  ]);
  const limitOsiagniety = ruchy.length >= 3;

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.7fr]">
        {limitOsiagniety ? (
          <section className="rounded-md border border-atlas-border bg-atlas-card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Limit
            </p>
            <h1 className="mt-2 text-lg font-semibold text-atlas-primary">
              3 ruchy dnia już ustawione
            </h1>
            <p className="mt-4 text-sm leading-6 text-atlas-secondary">
              Dodanie kolejnego rozmyje priorytet. Przejdź do Command Center i
              wykonuj wybrane ruchy.
            </p>
          </section>
        ) : (
          <RuchDniaForm domeny={domeny} />
        )}

        <aside className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Dziś
          </p>
          <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
            {ruchy.length}/3 ruchy ustawione
          </h2>
          <div className="mt-5 space-y-3">
            {ruchy.length === 0 ? (
              <p className="text-sm leading-6 text-atlas-secondary">
                Pierwszy ruch powinien zaczynać się czasownikiem.
              </p>
            ) : (
              ruchy.map((ruch) => (
                <div
                  key={ruch.id}
                  className="rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm text-atlas-secondary"
                >
                  {ruch.kolejnosc}. {ruch.tytul}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
