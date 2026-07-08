import { Button } from "@/components/ui/Button";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { dodajRuchDnia } from "@/lib/actions/ruchy-dnia";
import type { DomenaOption } from "@/lib/queries/ruchy-dnia";

const typyRuchu = [
  { value: "zdrowie", label: "Zdrowie" },
  { value: "sport", label: "Sport" },
  { value: "kariera", label: "Kariera" },
  { value: "finanse", label: "Finanse" },
  { value: "discovery", label: "Discovery" },
  { value: "projekt", label: "Projekt" },
  { value: "recovery", label: "Recovery" },
  { value: "administracyjne", label: "Administracyjne" }
];

const poziomy = [
  { value: "niski", label: "Niski" },
  { value: "sredni", label: "Średni" },
  { value: "wysoki", label: "Wysoki" }
];

type RuchDniaFormProps = {
  domeny: DomenaOption[];
};

export function RuchDniaForm({ domeny }: RuchDniaFormProps) {
  return (
    <AtlasPanel eyebrow="Ruch dnia" title="Dodaj strategiczny ruch">
      <form action={dodajRuchDnia} className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Tytuł</span>
          <input
            required
            name="tytul"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Wysłać 1 aplikację high-fit"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">Domena</span>
            <select
              required
              name="domena_id"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
              defaultValue={domeny[0]?.id ?? ""}
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
              required
              name="typ"
              defaultValue="kariera"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
            >
              {typyRuchu.map((typ) => (
                <option key={typ.value} value={typ.value}>
                  {typ.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">Wpływ</span>
            <select
              required
              name="wplyw"
              defaultValue="sredni"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
            >
              {poziomy.map((poziom) => (
                <option key={poziom.value} value={poziom.value}>
                  {poziom.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">Wysiłek</span>
            <select
              required
              name="wysilek"
              defaultValue="sredni"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
            >
              {poziomy.map((poziom) => (
                <option key={poziom.value} value={poziom.value}>
                  {poziom.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-md border border-atlas-border bg-atlas-panel p-4 text-sm leading-6 text-atlas-secondary">
          Maksymalnie 3 ruchy dziennie. Ruch musi być konkretną akcją, nie
          ogólnym zamiarem.
        </div>

        <div>
          <Button type="submit" disabled={domeny.length === 0}>
            Dodaj ruch dnia
          </Button>
        </div>
      </form>
    </AtlasPanel>
  );
}
