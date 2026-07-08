import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { RyzykoCard } from "@/components/ryzyka/RyzykoCard";
import { getRyzyka } from "@/lib/queries/ryzyka";

export const dynamic = "force-dynamic";

export default async function RyzykaPage() {
  const ryzyka = await getRyzyka();
  const aktywne = ryzyka.filter((ryzyko) => ryzyko.status === "aktywne");

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Ryzyka
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-atlas-primary">
                Ryzyka operacyjne
              </h1>
              <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                Ryzyko ma mieć rekomendowany ruch. Reakcja jest ważniejsza niż opis.
              </p>
            </div>
            <Link
              href="/ryzyka/nowy"
              className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
            >
              Dodaj ryzyko
            </Link>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Aktywne
            </p>
            <p className="mt-2 text-2xl font-semibold text-atlas-primary">
              {aktywne.length}
            </p>
          </div>
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Wszystkie
            </p>
            <p className="mt-2 text-2xl font-semibold text-atlas-primary">
              {ryzyka.length}
            </p>
          </div>
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Reakcja
            </p>
            <p className="mt-2 text-sm leading-6 text-atlas-secondary">
              Dodaj ryzyko jako ruch dnia, ignoruj albo oznacz jako rozwiązane.
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {ryzyka.length === 0 ? (
            <div className="rounded-md border border-atlas-border bg-atlas-card p-5">
              <p className="text-sm leading-6 text-atlas-secondary">
                Brak ryzyk. Dodaj tylko takie, które wymagają realnej reakcji.
              </p>
            </div>
          ) : (
            ryzyka.map((ryzyko) => <RyzykoCard key={ryzyko.id} ryzyko={ryzyko} />)
          )}
        </section>
      </div>
    </AppShell>
  );
}
