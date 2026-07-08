import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { zmienStatusRuchuDnia } from "@/lib/actions/ruchy-dnia";
import type { RuchDniaListItem } from "@/lib/queries/ruchy-dnia";

type RuchyDniaExecutionListProps = {
  ruchy: RuchDniaListItem[];
};

const statusLabels: Record<RuchDniaListItem["status"], string> = {
  planowany: "Planowany",
  wykonany: "Wykonany",
  pominiety: "Pominięty",
  przeniesiony: "Przeniesiony",
  anulowany: "Anulowany"
};

const szybkieStatusy = [
  { value: "wykonany", label: "Wykonany" },
  { value: "przeniesiony", label: "Przenieś" },
  { value: "anulowany", label: "Anuluj" }
] as const;

export function RuchyDniaExecutionList({ ruchy }: RuchyDniaExecutionListProps) {
  if (ruchy.length === 0) {
    return (
      <section className="rounded-md border border-atlas-border bg-atlas-card p-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
          Ruchy dnia
        </p>
        <h1 className="mt-2 text-lg font-semibold text-atlas-primary">
          Brak ruchów na dziś
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-atlas-secondary">
          Ustaw maksymalnie 3 konkretne akcje, zanim zaczniesz prowadzić dzień.
        </p>
        <Link
          href="/ruchy-dnia/nowy"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
        >
          Dodaj ruch dnia
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {ruchy.map((ruch) => (
        <article
          key={ruch.id}
          className="rounded-md border border-atlas-border bg-atlas-card p-5"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
                Ruch {ruch.kolejnosc}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
                {ruch.tytul}
              </h2>
              <p className="mt-2 text-sm text-atlas-muted">
                {ruch.typ} · wpływ: {ruch.wplyw} · wysiłek: {ruch.wysilek}
              </p>
            </div>
            <span className="w-fit rounded-md border border-atlas-border px-3 py-1 text-xs font-medium text-atlas-secondary">
              {statusLabels[ruch.status]}
            </span>
          </div>

          {ruch.powod_pominiecia ? (
            <p className="mt-4 rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm leading-6 text-atlas-secondary">
              Powód pominięcia: {ruch.powod_pominiecia}
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-wrap gap-2">
              {szybkieStatusy.map((status) => (
                <form key={status.value} action={zmienStatusRuchuDnia}>
                  <input type="hidden" name="ruch_id" value={ruch.id} />
                  <input type="hidden" name="status" value={status.value} />
                  <Button
                    type="submit"
                    className="bg-transparent text-atlas-primary ring-1 ring-atlas-border hover:bg-atlas-hover"
                  >
                    {status.label}
                  </Button>
                </form>
              ))}
            </div>

            <form action={zmienStatusRuchuDnia} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input type="hidden" name="ruch_id" value={ruch.id} />
              <input type="hidden" name="status" value="pominiety" />
              <label className="grid gap-2">
                <span className="text-sm font-medium text-atlas-secondary">
                  Powód pominięcia
                </span>
                <input
                  name="powod_pominiecia"
                  minLength={3}
                  className="h-10 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
                  placeholder="Co realnie zablokowało ruch?"
                />
              </label>
              <Button type="submit" className="self-end">
                Pomiń
              </Button>
            </form>
          </div>
        </article>
      ))}
    </section>
  );
}
