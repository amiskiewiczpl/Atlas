import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProblemCard } from "@/components/discovery/ProblemCard";
import { getProblemy } from "@/lib/queries/problemy";

export const dynamic = "force-dynamic";

export default async function DiscoveryPage() {
  const problemy = await getProblemy();
  const aktywne = problemy.filter((problem) => problem.status !== "zabity");

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Discovery
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-atlas-primary">
                Problemy rynkowe
              </h1>
              <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                Discovery przechowuje problemy, nie pomysły. Dowody, confidence i
                akcja zabicia problemu są już dostępne w tym sprincie.
              </p>
            </div>
            <Link
              href="/discovery/problemy/nowy"
              className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
            >
              Dodaj problem
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
              {problemy.length}
            </p>
          </div>
          <div className="rounded-md border border-atlas-border bg-atlas-card p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Zasada
            </p>
            <p className="mt-2 text-sm leading-6 text-atlas-secondary">
              Najpierw problem i segment. Dopiero potem dowody i produkt.
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {problemy.length === 0 ? (
            <div className="rounded-md border border-atlas-border bg-atlas-card p-5">
              <p className="text-sm leading-6 text-atlas-secondary">
                Brak problemów. Dodaj pierwszą hipotezę problemu z konkretnym segmentem.
              </p>
            </div>
          ) : (
            problemy.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          )}
        </section>
      </div>
    </AppShell>
  );
}
