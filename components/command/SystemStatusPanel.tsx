import { Button } from "@/components/ui/Button";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { inicjalizujUzytkownika } from "@/lib/actions/inicjalizuj-uzytkownika";
import type { CommandDay } from "@/lib/queries/command-center";

type SystemStatusPanelProps = {
  day: CommandDay | null;
};

export function SystemStatusPanel({ day }: SystemStatusPanelProps) {
  return (
    <AtlasPanel eyebrow="Status systemu" title="Dzień">
      <div className="space-y-4">
        <dl className="grid gap-4 text-sm">
          <div className="flex items-center justify-between border-b border-atlas-border pb-3">
            <dt className="text-atlas-muted">Tryb</dt>
            <dd className="font-medium text-atlas-primary">{day?.tryb_dnia ?? "brak"}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-atlas-border pb-3">
            <dt className="text-atlas-muted">Readiness</dt>
            <dd className="font-medium text-atlas-primary">
              {day?.readiness_score ?? "brak"}
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-atlas-border pb-3">
            <dt className="text-atlas-muted">Focus</dt>
            <dd className="font-medium text-atlas-primary">
              {day?.focus_score ?? "brak"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-atlas-muted">Zamknięcie</dt>
            <dd className="font-medium text-atlas-primary">
              {day?.zamkniety ? "zamknięty" : "otwarty"}
            </dd>
          </div>
        </dl>

        {!day ? (
          <form action={inicjalizujUzytkownika}>
            <Button type="submit">Zainicjalizuj dane startowe</Button>
          </form>
        ) : null}
      </div>
    </AtlasPanel>
  );
}
