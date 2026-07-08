import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { RyzykoActions } from "@/components/ryzyka/RyzykoActions";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getRyzyko } from "@/lib/queries/ryzyka";

export const dynamic = "force-dynamic";

type RyzykoDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function RyzykoDetailsPage({ params }: RyzykoDetailsPageProps) {
  const ryzyko = await getRyzyko(params.id);

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow={ryzyko.typ} title={ryzyko.tytul}>
          <div className="space-y-5">
            <p className="text-sm leading-6 text-atlas-secondary">
              {ryzyko.opis ?? "Ryzyko bez opisu."}
            </p>

            <div className="rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm leading-6 text-atlas-secondary">
              Rekomendowany ruch: {ryzyko.rekomendowany_ruch ?? "Brak rekomendacji."}
            </div>

            <dl className="grid gap-4 text-sm md:grid-cols-2">
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Powaga</dt>
                <dd className="mt-2 text-atlas-primary">{ryzyko.powaga}</dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Status</dt>
                <dd className="mt-2 text-atlas-primary">{ryzyko.status}</dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Źródło</dt>
                <dd className="mt-2 text-atlas-primary">{ryzyko.zrodlo_wyzwolenia}</dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Aktywne od</dt>
                <dd className="mt-2 text-atlas-primary">
                  {ryzyko.aktywne_od ?? "Brak daty."}
                </dd>
              </div>
            </dl>
          </div>
        </AtlasPanel>

        <aside className="space-y-4">
          <AtlasPanel eyebrow="Reakcja" title="Akcje">
            <RyzykoActions ryzyko={ryzyko} />
          </AtlasPanel>

          <Link
            href="/ryzyka"
            className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
          >
            Wróć do ryzyk
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
