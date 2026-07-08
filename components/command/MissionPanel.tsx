import { AtlasPanel } from "@/components/ui/AtlasPanel";
import type { CommandMission, CommandSeason } from "@/lib/queries/command-center";

type MissionPanelProps = {
  mission: CommandMission | null;
  season: CommandSeason | null;
};

export function MissionPanel({ mission, season }: MissionPanelProps) {
  return (
    <AtlasPanel eyebrow="Strategia" title={mission?.nazwa ?? "Misja nieustawiona"}>
      <div className="space-y-4">
        <p className="text-sm leading-6 text-atlas-secondary">
          {mission?.opis ??
            "Zainicjalizuj dane startowe, żeby Command Center miało punkt odniesienia."}
        </p>

        <div className="rounded-md border border-atlas-border bg-atlas-panel p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Sezon
          </p>
          <h3 className="mt-2 text-base font-semibold text-atlas-primary">
            {season?.nazwa ?? "Brak aktywnego sezonu"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-atlas-secondary">
            {season?.motyw ?? "Sezon pojawi się po inicjalizacji danych startowych."}
          </p>
          {season?.definicja_sukcesu ? (
            <p className="mt-3 text-xs leading-5 text-atlas-muted">
              Definicja sukcesu: {season.definicja_sukcesu}
            </p>
          ) : null}
        </div>
      </div>
    </AtlasPanel>
  );
}
