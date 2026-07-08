import Link from "next/link";
import { QuestStatusForm } from "@/components/questy/QuestStatusForm";
import type { QuestListItem } from "@/lib/queries/questy";

type QuestCardProps = {
  quest: QuestListItem;
};

export function QuestCard({ quest }: QuestCardProps) {
  return (
    <article className="rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            {quest.typ}
          </p>
          <Link
            href={`/questy/${quest.id}`}
            className="mt-2 block text-lg font-semibold text-atlas-primary transition hover:text-atlas-cyan"
          >
            {quest.tytul}
          </Link>
          <p className="mt-2 text-sm leading-6 text-atlas-secondary">
            {quest.opis ?? "Quest bez opisu."}
          </p>
        </div>
        <span className="w-fit rounded-md border border-atlas-border px-3 py-1 text-xs font-medium text-atlas-secondary">
          {quest.status}
        </span>
      </div>

      <div className="mt-5">
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

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <div>
          <dt className="text-atlas-muted">Metryka sukcesu</dt>
          <dd className="mt-1 text-atlas-primary">
            {quest.metryka_sukcesu ?? "Brak metryki."}
          </dd>
        </div>
        <div>
          <dt className="text-atlas-muted">Następna akcja</dt>
          <dd className="mt-1 text-atlas-primary">
            {quest.nastepna_akcja ?? "Brak następnej akcji."}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <QuestStatusForm questId={quest.id} currentStatus={quest.status} />
      </div>
    </article>
  );
}
