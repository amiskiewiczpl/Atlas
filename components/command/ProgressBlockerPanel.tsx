import { AtlasPanel } from "@/components/ui/AtlasPanel";
import type { CommandDay } from "@/lib/queries/command-center";

type ProgressBlockerPanelProps = {
  day: CommandDay | null;
};

export function ProgressBlockerPanel({ day }: ProgressBlockerPanelProps) {
  return (
    <AtlasPanel eyebrow="Kontekst" title="Progres i bloker">
      <dl className="grid gap-4 text-sm">
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
          <dt className="text-atlas-muted">Największy progres</dt>
          <dd className="mt-2 leading-6 text-atlas-primary">
            {day?.najwiekszy_progres ?? "Brak danych z wieczornego debriefu."}
          </dd>
        </div>
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
          <dt className="text-atlas-muted">Największy bloker</dt>
          <dd className="mt-2 leading-6 text-atlas-primary">
            {day?.najwiekszy_bloker ?? "Brak danych z wieczornego debriefu."}
          </dd>
        </div>
      </dl>
    </AtlasPanel>
  );
}
