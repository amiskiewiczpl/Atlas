import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { WieczornyDebriefForm } from "@/components/debrief/WieczornyDebriefForm";
import { RuchyDniaExecutionList } from "@/components/ruchy/RuchyDniaExecutionList";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getDzisiejszyDzien } from "@/lib/queries/dzien";
import { getDzisiejszeRuchyDnia } from "@/lib/queries/ruchy-dnia";

export const dynamic = "force-dynamic";

export default async function WieczornyDebriefPage() {
  const [dzien, ruchy] = await Promise.all([
    getDzisiejszyDzien(),
    getDzisiejszeRuchyDnia()
  ]);
  const zakonczone = ruchy.filter((ruch) =>
    ["wykonany", "pominiety", "przeniesiony", "anulowany"].includes(ruch.status)
  ).length;
  const wykonane = ruchy.filter((ruch) => ruch.status === "wykonany").length;

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.55fr]">
        <div className="space-y-4">
          <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
              Wieczorny debrief
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-atlas-primary">
                  Zamknij dzień
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-atlas-secondary">
                  Najpierw ustaw statusy ruchów, potem zapisz progres, problem i
                  sygnał na jutro.
                </p>
              </div>
              <Link
                href="/ruchy-dnia"
                className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
              >
                Prowadź ruchy
              </Link>
            </div>
          </header>

          <RuchyDniaExecutionList ruchy={ruchy} />
        </div>

        <div className="space-y-4">
          <AtlasPanel eyebrow="Zamknięcie" title="Debrief">
            <WieczornyDebriefForm zamkniety={dzien?.zamkniety ?? false} />
          </AtlasPanel>

          <AtlasPanel eyebrow="Status" title="Ruchy dnia">
            <dl className="grid gap-4 text-sm">
              <div className="flex items-center justify-between border-b border-atlas-border pb-3">
                <dt className="text-atlas-muted">Ustawione</dt>
                <dd className="font-medium text-atlas-primary">{ruchy.length}/3</dd>
              </div>
              <div className="flex items-center justify-between border-b border-atlas-border pb-3">
                <dt className="text-atlas-muted">Oznaczone</dt>
                <dd className="font-medium text-atlas-primary">
                  {zakonczone}/{ruchy.length}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-atlas-border pb-3">
                <dt className="text-atlas-muted">Wykonane</dt>
                <dd className="font-medium text-atlas-primary">{wykonane}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-atlas-muted">Dzień</dt>
                <dd className="font-medium text-atlas-primary">
                  {dzien?.zamkniety ? "zamknięty" : "otwarty"}
                </dd>
              </div>
            </dl>
          </AtlasPanel>
        </div>
      </div>
    </AppShell>
  );
}
