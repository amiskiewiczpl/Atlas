import Link from "next/link";
import { RyzykoActions } from "@/components/ryzyka/RyzykoActions";
import type { RyzykoListItem } from "@/lib/queries/ryzyka";

type RyzykoCardProps = {
  ryzyko: RyzykoListItem;
};

const powagaClass: Record<RyzykoListItem["powaga"], string> = {
  niska: "text-atlas-green",
  srednia: "text-atlas-yellow",
  wysoka: "text-atlas-orange",
  krytyczna: "text-atlas-red"
};

export function RyzykoCard({ ryzyko }: RyzykoCardProps) {
  return (
    <article className="rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            {ryzyko.typ}
          </p>
          <Link
            href={`/ryzyka/${ryzyko.id}`}
            className="mt-2 block text-lg font-semibold text-atlas-primary transition hover:text-atlas-cyan"
          >
            {ryzyko.tytul}
          </Link>
          <p className="mt-2 text-sm leading-6 text-atlas-secondary">
            {ryzyko.opis ?? "Ryzyko bez opisu."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="w-fit rounded-md border border-atlas-border px-3 py-1 text-xs font-medium text-atlas-secondary">
            {ryzyko.status}
          </span>
          <span
            className={`w-fit rounded-md border border-atlas-border px-3 py-1 text-xs font-medium ${powagaClass[ryzyko.powaga]}`}
          >
            {ryzyko.powaga}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-atlas-border bg-atlas-panel p-3 text-sm leading-6 text-atlas-secondary">
        Rekomendowany ruch: {ryzyko.rekomendowany_ruch ?? "Brak rekomendacji."}
      </div>

      <div className="mt-5">
        <RyzykoActions ryzyko={ryzyko} />
      </div>
    </article>
  );
}
