import { Button } from "@/components/ui/Button";
import { dodajRyzyko } from "@/lib/actions/ryzyka";
import type { DomenaOption } from "@/lib/queries/ruchy-dnia";

type RyzykoFormProps = {
  domeny: DomenaOption[];
};

const typy = [
  "zdrowie",
  "sport",
  "kariera",
  "finanse",
  "discovery",
  "projekt",
  "focus",
  "wypalenie",
  "relacje",
  "learning"
];

const powagi = [
  { value: "niska", label: "Niska" },
  { value: "srednia", label: "Średnia" },
  { value: "wysoka", label: "Wysoka" },
  { value: "krytyczna", label: "Krytyczna" }
];

export function RyzykoForm({ domeny }: RyzykoFormProps) {
  return (
    <form action={dodajRyzyko} className="grid gap-5">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Tytuł</span>
        <input
          required
          name="tytul"
          minLength={3}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Discovery stoi bez rozmów z rynkiem"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
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
            defaultValue="focus"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {typy.map((typ) => (
              <option key={typ} value={typ}>
                {typ}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Powaga</span>
          <select
            name="powaga"
            defaultValue="srednia"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {powagi.map((powaga) => (
              <option key={powaga.value} value={powaga.value}>
                {powaga.label}
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
          placeholder="Co może pójść źle i dlaczego to wymaga reakcji?"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Rekomendowany ruch
        </span>
        <input
          required
          name="rekomendowany_ruch"
          minLength={3}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Napisać do 2 osób z segmentu"
        />
      </label>

      <Button type="submit" disabled={domeny.length === 0}>
        Dodaj ryzyko
      </Button>
    </form>
  );
}
