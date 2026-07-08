import { Button } from "@/components/ui/Button";
import { dodajRyzykoJakoRuchDnia, zmienStatusRyzyka } from "@/lib/actions/ryzyka";
import type { RyzykoListItem } from "@/lib/queries/ryzyka";

type RyzykoActionsProps = {
  ryzyko: Pick<RyzykoListItem, "id" | "status" | "rekomendowany_ruch">;
};

export function RyzykoActions({ ryzyko }: RyzykoActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ryzyko.rekomendowany_ruch && ryzyko.status === "aktywne" ? (
        <form action={dodajRyzykoJakoRuchDnia}>
          <input type="hidden" name="ryzyko_id" value={ryzyko.id} />
          <Button type="submit">Dodaj jako ruch dnia</Button>
        </form>
      ) : null}

      <form action={zmienStatusRyzyka}>
        <input type="hidden" name="ryzyko_id" value={ryzyko.id} />
        <input type="hidden" name="status" value="zignorowane" />
        <Button
          type="submit"
          className="bg-transparent text-atlas-primary ring-1 ring-atlas-border hover:bg-atlas-hover"
        >
          Ignoruj
        </Button>
      </form>

      <form action={zmienStatusRyzyka}>
        <input type="hidden" name="ryzyko_id" value={ryzyko.id} />
        <input type="hidden" name="status" value="rozwiazane" />
        <Button
          type="submit"
          className="bg-transparent text-atlas-primary ring-1 ring-atlas-border hover:bg-atlas-hover"
        >
          Oznacz jako rozwiązane
        </Button>
      </form>
    </div>
  );
}
