import { Button } from "@/components/ui/Button";
import { dodajQuest } from "@/lib/actions/questy";
import type { DomenaOption } from "@/lib/queries/ruchy-dnia";

type QuestFormProps = {
  domeny: DomenaOption[];
  limitOsiagniety: boolean;
};

const typy = [
  { value: "aktywny", label: "Aktywny" },
  { value: "main", label: "Main" },
  { value: "side", label: "Side" }
] as const;

export function QuestForm({ domeny, limitOsiagniety }: QuestFormProps) {
  if (limitOsiagniety) {
    return (
      <section className="rounded-md border border-atlas-border bg-atlas-card p-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
          Limit
        </p>
        <h1 className="mt-2 text-lg font-semibold text-atlas-primary">
          3 aktywne questy już ustawione
        </h1>
        <p className="mt-4 text-sm leading-6 text-atlas-secondary">
          Zamknij, zablokuj albo zarchiwizuj jeden quest, zanim dodasz kolejny aktywny.
        </p>
      </section>
    );
  }

  return (
    <form action={dodajQuest} className="grid gap-5">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Tytuł</span>
        <input
          required
          name="tytul"
          minLength={3}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Uruchomić pierwszy płatny eksperyment"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Domena</span>
          <select
            required
            name="domena_id"
            defaultValue={domeny[0]?.id ?? ""}
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {domeny.length === 0 ? (
              <option value="">Brak domen. Zainicjalizuj dane startowe.</option>
            ) : null}
            {domeny.map((domena) => (
              <option key={domena.id} value={domena.id}>
                {domena.nazwa}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Typ</span>
          <select
            name="typ"
            defaultValue="aktywny"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {typy.map((typ) => (
              <option key={typ.value} value={typ.value}>
                {typ.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Opis</span>
        <textarea
          name="opis"
          rows={3}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Dlaczego ten quest ma znaczenie strategiczne?"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Metryka sukcesu</span>
          <input
            name="metryka_sukcesu"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Np. 3 rozmowy z klientami"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Data celu</span>
          <input
            name="data_cel"
            type="date"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Następna akcja</span>
        <input
          name="nastepna_akcja"
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Najbliższy konkretny ruch"
        />
      </label>

      <Button type="submit" disabled={domeny.length === 0}>
        Dodaj quest
      </Button>
    </form>
  );
}
