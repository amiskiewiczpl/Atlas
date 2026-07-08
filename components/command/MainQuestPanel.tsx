import { AtlasPanel } from "@/components/ui/AtlasPanel";
import type { CommandQuest } from "@/lib/queries/command-center";

type MainQuestPanelProps = {
  quest: CommandQuest | null;
};

export function MainQuestPanel({ quest }: MainQuestPanelProps) {
  return (
    <AtlasPanel eyebrow="Main quest" title={quest?.tytul ?? "Brak aktywnego questu"}>
      {quest ? (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-atlas-secondary">
            {quest.opis ?? "Quest bez opisu."}
          </p>
          <div>
            <div className="flex items-center justify-between text-xs text-atlas-muted">
              <span>Postęp</span>
              <span>{quest.postep}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-atlas-panel">
              <div
                className="h-full rounded-full bg-atlas-cyan"
                style={{ width: `${quest.postep}%` }}
              />
            </div>
          </div>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-atlas-muted">Następna akcja</dt>
              <dd className="mt-1 text-atlas-primary">
                {quest.nastepna_akcja ?? "Brak następnej akcji."}
              </dd>
            </div>
            {quest.bloker ? (
              <div>
                <dt className="text-atlas-muted">Bloker</dt>
                <dd className="mt-1 text-atlas-red">{quest.bloker}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : (
        <p className="text-sm leading-6 text-atlas-secondary">
          Main quest będzie aktywny po seedzie danych startowych albo po module questów.
        </p>
      )}
    </AtlasPanel>
  );
}
