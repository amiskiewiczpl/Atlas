import Link from "next/link";
import type { ProblemListItem } from "@/lib/queries/problemy";

type ProblemCardProps = {
  problem: ProblemListItem;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            {problem.segment}
          </p>
          <Link
            href={`/discovery/problemy/${problem.id}`}
            className="mt-2 block text-lg font-semibold text-atlas-primary transition hover:text-atlas-cyan"
          >
            {problem.tytul}
          </Link>
          <p className="mt-2 text-sm leading-6 text-atlas-secondary">
            {problem.opis ?? "Problem bez opisu."}
          </p>
        </div>
        <span className="w-fit rounded-md border border-atlas-border px-3 py-1 text-xs font-medium text-atlas-secondary">
          {problem.status}
        </span>
      </div>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-3">
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
          <dt className="text-atlas-muted">Częstotliwość</dt>
          <dd className="mt-1 text-atlas-primary">{problem.czestotliwosc}</dd>
        </div>
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
          <dt className="text-atlas-muted">Pain</dt>
          <dd className="mt-1 text-atlas-primary">{problem.pain_score ?? "brak"}</dd>
        </div>
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-3">
          <dt className="text-atlas-muted">Confidence</dt>
          <dd className="mt-1 text-atlas-primary">{problem.confidence_score}%</dd>
        </div>
      </dl>

      {problem.nastepny_krok_walidacji ? (
        <p className="mt-4 rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm leading-6 text-atlas-secondary">
          Następny krok: {problem.nastepny_krok_walidacji}
        </p>
      ) : null}
    </article>
  );
}
