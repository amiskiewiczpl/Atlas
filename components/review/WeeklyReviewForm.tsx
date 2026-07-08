import { Button } from "@/components/ui/Button";
import { zaktualizujStrategie } from "@/lib/actions/review";

type WeeklyReviewFormProps = {
  ryzyka: Array<{
    id: string;
    tytul: string;
    powaga: string;
  }>;
};

export function WeeklyReviewForm({ ryzyka }: WeeklyReviewFormProps) {
  return (
    <form action={zaktualizujStrategie} className="grid gap-5 rounded-md border border-atlas-border bg-atlas-card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Największy progres tygodnia</span>
          <textarea
            required
            name="najwiekszy_progres"
            rows={4}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Co naprawdę poszło dobrze?"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Największy problem</span>
          <textarea
            required
            name="najwiekszy_problem"
            rows={4}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Czego warto się teraz uczyć?"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Korekta strategii</span>
        <textarea
          required
          name="korekta_strategii"
          rows={4}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co zmieniasz w tym tygodniu?"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Główne ryzyko na kolejny tydzień</span>
        <select
          required
          name="ryzyko_id"
          defaultValue={ryzyka[0]?.id ?? ""}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
        >
          {ryzyka.length === 0 ? (
            <option value="">Brak aktywnych ryzyk</option>
          ) : (
            ryzyka.map((ryzyko) => (
              <option key={ryzyko.id} value={ryzyko.id}>
                {ryzyko.tytul} ({ryzyko.powaga})
              </option>
            ))
          )}
        </select>
      </label>

      <Button type="submit">Zapisz weekly review</Button>
    </form>
  );
}
