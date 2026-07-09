import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { RuchyDniaExecutionList } from "@/components/ruchy/RuchyDniaExecutionList";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getDzisiejszeRuchyDnia } from "@/lib/queries/ruchy-dnia";

export const dynamic = "force-dynamic";

export default async function RuchyDniaPage() {
  const ruchy = await getDzisiejszeRuchyDnia();
  const wykonane = ruchy.filter((ruch) => ruch.status === "wykonany").length;

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.35fr]">
        <div className="space-y-4">
          <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Prowadzenie dnia
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-atlas-primary">
                  Dzisiejsze ruchy
                </h1>
                <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                  Zmieniaj statusy tylko dla realnego przebiegu dnia. Command
                  Center odświeży się po każdej zmianie.
                </p>
              </div>
              <Link
                href="/ruchy-dnia/nowy"
                className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
              >
                Dodaj ruch
              </Link>
            </div>
          </header>

          <AtlasPanel eyebrow="Onboarding" title="Co zrobić teraz">
            <div className="space-y-3 text-sm text-atlas-secondary">
              <p>1. Wybierz maksymalnie 3 ruchy, które chcesz realnie wykonać dziś.</p>
              <p>2. Zmieniaj status tylko wtedy, gdy ruch rozpoczął się lub został odwołany.</p>
              <p>3. Po aktualizacji wróć do Command Center, aby zobaczyć wpływ na dzień.</p>
            </div>
          </AtlasPanel>

          <RuchyDniaExecutionList ruchy={ruchy} />
        </div>

        <AtlasPanel eyebrow="Status" title="Dzień">
          <dl className="grid gap-4 text-sm">
            <div className="flex items-center justify-between border-b border-atlas-border pb-3">
              <dt className="text-atlas-muted">Ruchy</dt>
              <dd className="font-medium text-atlas-primary">{ruchy.length}/3</dd>
            </div>
            <div className="flex items-center justify-between border-b border-atlas-border pb-3">
              <dt className="text-atlas-muted">Wykonane</dt>
              <dd className="font-medium text-atlas-primary">{wykonane}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-atlas-muted">Pozostałe</dt>
              <dd className="font-medium text-atlas-primary">
                {Math.max(ruchy.length - wykonane, 0)}
              </dd>
            </div>
          </dl>
        </AtlasPanel>
      </div>
    </AppShell>
  );
}
