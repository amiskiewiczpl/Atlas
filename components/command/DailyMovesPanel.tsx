import Link from "next/link";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import type { RuchDniaListItem } from "@/lib/queries/ruchy-dnia";

type DailyMovesPanelProps = {
  ruchy: RuchDniaListItem[];
};

export function DailyMovesPanel({ ruchy }: DailyMovesPanelProps) {
  return (
    <AtlasPanel eyebrow="Decyzja dnia" title="3 ruchy dnia">
      <div className="space-y-4">
        {ruchy.length === 0 ? (
          <p className="text-sm leading-6 text-atlas-secondary">
            Brak ruchów na dziś. Wybierz maksymalnie 3 konkretne akcje.
          </p>
        ) : (
          <ol className="space-y-3">
            {ruchy.map((ruch) => (
              <li
                key={ruch.id}
                className="rounded-md border border-atlas-border bg-atlas-panel p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-atlas-primary">
                    {ruch.kolejnosc}. {ruch.tytul}
                  </p>
                  <span className="rounded-md border border-atlas-border px-2 py-1 text-xs text-atlas-muted">
                    {ruch.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-atlas-muted">
                  {ruch.typ} · wpływ: {ruch.wplyw} · wysiłek: {ruch.wysilek}
                </p>
              </li>
            ))}
          </ol>
        )}

        <div className="flex flex-wrap gap-2">
          {ruchy.length > 0 ? (
            <Link
              href="/ruchy-dnia"
              className="inline-flex h-10 items-center justify-center rounded-md bg-atlas-blue px-4 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Prowadź dzień
            </Link>
          ) : null}
          <Link
            href="/ruchy-dnia/nowy"
            className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
          >
            Dodaj ruch dnia
          </Link>
        </div>
      </div>
    </AtlasPanel>
  );
}
