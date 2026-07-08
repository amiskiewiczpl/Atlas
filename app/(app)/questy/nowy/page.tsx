import { AppShell } from "@/components/layout/AppShell";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { QuestForm } from "@/components/questy/QuestForm";
import { getQuesty } from "@/lib/queries/questy";
import { getAktywneDomeny } from "@/lib/queries/ruchy-dnia";

export const dynamic = "force-dynamic";

export default async function NowyQuestPage() {
  const [questy, domeny] = await Promise.all([getQuesty(), getAktywneDomeny()]);
  const aktywne = questy.filter((quest) => quest.status === "aktywny");

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow="Nowy quest" title="Dodaj quest">
          <QuestForm domeny={domeny} limitOsiagniety={aktywne.length >= 3} />
        </AtlasPanel>

        <aside className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Limit
          </p>
          <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
            {aktywne.length}/3 aktywne questy
          </h2>
          <p className="mt-4 text-sm leading-6 text-atlas-secondary">
            Quest to większy kierunek, nie pojedynczy task. Dzienna praca powinna
            schodzić do ruchów dnia.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
