import Link from "next/link";
import { QuestStatusForm } from "@/components/questy/QuestStatusForm";
import { AppShell } from "@/components/layout/AppShell";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getQuest } from "@/lib/queries/questy";

export const dynamic = "force-dynamic";

type QuestDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function QuestDetailsPage({ params }: QuestDetailsPageProps) {
  const quest = await getQuest(params.id);

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow={quest.typ} title={quest.tytul}>
          <div className="space-y-5">
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

            <dl className="grid gap-4 text-sm md:grid-cols-2">
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Metryka sukcesu</dt>
                <dd className="mt-2 text-atlas-primary">
                  {quest.metryka_sukcesu ?? "Brak metryki."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Następna akcja</dt>
                <dd className="mt-2 text-atlas-primary">
                  {quest.nastepna_akcja ?? "Brak następnej akcji."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Data startu</dt>
                <dd className="mt-2 text-atlas-primary">
                  {quest.data_start ?? "Brak daty."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Data celu</dt>
                <dd className="mt-2 text-atlas-primary">
                  {quest.data_cel ?? "Brak daty."}
                </dd>
              </div>
            </dl>

            {quest.bloker ? (
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm leading-6 text-atlas-red">
                Bloker: {quest.bloker}
              </div>
            ) : null}
          </div>
        </AtlasPanel>

        <aside className="space-y-4">
          <AtlasPanel eyebrow="Status" title={quest.status}>
            <QuestStatusForm questId={quest.id} currentStatus={quest.status} />
          </AtlasPanel>

          <Link
            href="/questy"
            className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
          >
            Wróć do questów
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
