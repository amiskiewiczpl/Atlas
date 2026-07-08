import { AtlasPanel } from "@/components/ui/AtlasPanel";
import type { CommandRisk } from "@/lib/queries/command-center";

type RiskPanelProps = {
  risks: CommandRisk[];
};

const severityClass: Record<CommandRisk["powaga"], string> = {
  niska: "text-atlas-green",
  srednia: "text-atlas-yellow",
  wysoka: "text-atlas-orange",
  krytyczna: "text-atlas-red"
};

export function RiskPanel({ risks }: RiskPanelProps) {
  const topRisk = risks[0] ?? null;

  return (
    <AtlasPanel eyebrow="Top risk" title={topRisk?.tytul ?? "Brak aktywnego ryzyka"}>
      {topRisk ? (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-atlas-secondary">
            {topRisk.opis ?? "Ryzyko bez opisu."}
          </p>
          <div className="flex items-center justify-between rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm">
            <span className="text-atlas-muted">Powaga</span>
            <span className={severityClass[topRisk.powaga]}>{topRisk.powaga}</span>
          </div>
          {topRisk.rekomendowany_ruch ? (
            <p className="text-sm leading-6 text-atlas-secondary">
              Rekomendowany ruch: {topRisk.rekomendowany_ruch}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm leading-6 text-atlas-secondary">
          Aktywne ryzyka pojawią się tutaj po module ryzyk albo po seedzie.
        </p>
      )}
    </AtlasPanel>
  );
}
