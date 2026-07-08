import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { DowodForm } from "@/components/discovery/DowodForm";
import { zabijProblem } from "@/lib/actions/problemy";
import { getProblem } from "@/lib/queries/problemy";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ProblemDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function ProblemDetailsPage({ params }: ProblemDetailsPageProps) {
  const problem = await getProblem(params.id);
  const supabase = createClient();
  const { data: dowody, error } = await supabase
    .from("dowody")
    .select("id, typ, zrodlo, tresc, sila, data_dowodu, created_at")
    .eq("problem_id", params.id)
    .order("created_at", { ascending: false });

  const dowodyList = (dowody ?? []) as Array<{
    id: string;
    typ: string;
    zrodlo: string | null;
    tresc: string;
    sila: number;
    data_dowodu: string;
    created_at: string;
  }>;

  if (error) {
    throw new Error(error.message);
  }

  const brakiDoMvp = [
    !problem.pain_score || problem.pain_score < 7 ? "Pain score poniżej 7" : null,
    problem.confidence_score < 70 ? "Confidence score poniżej 70%" : null,
    dowodyList.length < 3 ? "Brak co najmniej 3 dowodów" : null,
    !problem.nastepny_krok_walidacji ? "Brak następnego kroku walidacji" : null
  ].filter(Boolean) as string[];

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
            <div className="space-y-3 text-sm leading-6 text-atlas-secondary">
              <p>Confidence: {problem.confidence_score}%</p>
              <p>Dowody: {dowodyList.length}</p>
              {brakiDoMvp.length > 0 ? (
                <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
                  <p className="font-medium text-atlas-primary">Braki do Kandydat MVP</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {brakiDoMvp.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </AtlasPanel>

          <AtlasPanel eyebrow="Dodaj dowód" title="Nowy dowód">
            <DowodForm problemId={params.id} />
          </AtlasPanel>

          <AtlasPanel eyebrow="Dowody" title="Historia">
            {dowodyList.length === 0 ? (
              <p className="text-sm leading-6 text-atlas-secondary">
                Brak dowodów. Dodaj pierwszy, żeby podnieść confidence.
              </p>
            ) : (
              <ul className="space-y-3">
                {dowodyList.map((dowod) => (
                  <li key={dowod.id} className="rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-atlas-primary">{dowod.typ}</p>
                      <span className="text-xs text-atlas-muted">siła {dowod.sila}</span>
                    </div>
                    <p className="mt-2 leading-6 text-atlas-secondary">{dowod.tresc}</p>
                    {dowod.zrodlo ? (
                      <p className="mt-2 text-xs text-atlas-muted">Źródło: {dowod.zrodlo}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </AtlasPanel>

          <AtlasPanel eyebrow="Akcja" title="Zabij problem">
            <form action={zabijProblem} className="grid gap-3">
              <input type="hidden" name="problem_id" value={params.id} />
              <label className="grid gap-2">
                <span className="text-sm font-medium text-atlas-secondary">Powód</span>
                <textarea
                  required
                  name="powod_zabicia"
                  rows={3}
                  className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
                  placeholder="Dlaczego ten problem nie ma sensu dalej rozwijać?"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md border border-red-500/40 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                Zabij problem
              </button>
            </form>
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
