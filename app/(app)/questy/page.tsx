import Link from "next/link";
import { QuestCard } from "@/components/questy/QuestCard";
import { AppShell } from "@/components/layout/AppShell";
import { getQuesty } from "@/lib/queries/questy";

export const dynamic = "force-dynamic";

export default async function QuestyPage() {
  const questy = await getQuesty();
  const aktywne = questy.filter((quest) => quest.status === "aktywny");

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Questy
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-atlas-primary">
                Strategiczne questy
              </h1>
              <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                Maksymalnie 3 aktywne questy. Reszta powinna czekać, być zablokowana
                albo zamknięta.
              </p>
            </div>
            <Link
              href="/questy/nowy"
              className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
            >
              Dodaj quest
            </Link>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Aktywne
            </p>
            <p className="mt-2 text-2xl font-semibold text-atlas-primary">
              {aktywne.length}/3
            </p>
          </div>
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Wszystkie
            </p>
            <p className="mt-2 text-2xl font-semibold text-atlas-primary">
              {questy.length}
            </p>
          </div>
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Limit
            </p>
            <p className="mt-2 text-sm leading-6 text-atlas-secondary">
              {aktywne.length >= 3
                ? "Zamknij jeden quest przed dodaniem kolejnego."
                : "Możesz dodać aktywny quest."}
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {questy.length === 0 ? (
            <div className="rounded-md border border-atlas-border bg-atlas-card p-5">
              <p className="text-sm leading-6 text-atlas-secondary">
                Brak questów. Zacznij od jednego konkretnego celu strategicznego.
              </p>
            </div>
          ) : (
            questy.map((quest) => <QuestCard key={quest.id} quest={quest} />)
          )}
        </section>
      </div>
    </AppShell>
  );
}
