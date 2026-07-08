import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getProblem } from "@/lib/queries/problemy";

export const dynamic = "force-dynamic";

type ProblemDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function ProblemDetailsPage({ params }: ProblemDetailsPageProps) {
  const problem = await getProblem(params.id);

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow={problem.segment} title={problem.tytul}>
          <div className="space-y-5">
            <p className="text-sm leading-6 text-atlas-secondary">
              {problem.opis ?? "Problem bez opisu."}
            </p>

            <dl className="grid gap-4 text-sm md:grid-cols-2">
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Częstotliwość</dt>
                <dd className="mt-2 text-atlas-primary">{problem.czestotliwosc}</dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Pain score</dt>
                <dd className="mt-2 text-atlas-primary">
                  {problem.pain_score ?? "brak"}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Willingness to pay</dt>
                <dd className="mt-2 text-atlas-primary">
                  {problem.willingness_to_pay}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Confidence</dt>
                <dd className="mt-2 text-atlas-primary">
                  {problem.confidence_score}%
                </dd>
              </div>
            </dl>

            <dl className="grid gap-4 text-sm">
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Obecne obejście</dt>
                <dd className="mt-2 leading-6 text-atlas-primary">
                  {problem.obecne_obejscie ?? "Brak danych."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Konkurencja</dt>
                <dd className="mt-2 leading-6 text-atlas-primary">
                  {problem.konkurencja ?? "Brak danych."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Moja przewaga</dt>
                <dd className="mt-2 leading-6 text-atlas-primary">
                  {problem.moja_przewaga ?? "Brak danych."}
                </dd>
              </div>
              <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                <dt className="text-atlas-muted">Następny krok walidacji</dt>
                <dd className="mt-2 leading-6 text-atlas-primary">
                  {problem.nastepny_krok_walidacji ?? "Brak następnego kroku."}
                </dd>
              </div>
            </dl>
          </div>
        </AtlasPanel>

        <aside className="space-y-4">
          <AtlasPanel eyebrow="Status" title={problem.status}>
            <p className="text-sm leading-6 text-atlas-secondary">
              Dowody, confidence score i akcja `Zabij problem` są zakresem Sprintu
              010.
            </p>
          </AtlasPanel>

          <Link
            href="/discovery"
            className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
          >
            Wróć do Discovery
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
