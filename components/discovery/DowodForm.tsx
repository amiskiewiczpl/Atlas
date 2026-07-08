import { Button } from "@/components/ui/Button";
import { dodajDowod } from "@/lib/actions/problemy";

type DowodFormProps = {
  problemId: string;
};

const typyDowodow = [
  { value: "cytat", label: "Cytat" },
  { value: "wywiad", label: "Wywiad" },
  { value: "zachowanie", label: "Zachowanie" },
  { value: "platnosc", label: "Płatność" },
  { value: "konkurencja", label: "Konkurencja" },
  { value: "czestotliwosc", label: "Częstotliwość" },
  { value: "bol", label: "Ból" },
  { value: "odrzucenie", label: "Odrzucenie" },
  { value: "sygnal_rynku", label: "Sygnał rynku" },
  { value: "obejscie", label: "Obejście" }
];

const sily = [
  { value: "1", label: "1 — słaby" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5 — mocny" }
];

export function DowodForm({ problemId }: DowodFormProps) {
  return (
    <form action={dodajDowod} className="grid gap-5">
      <input type="hidden" name="problem_id" value={problemId} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Typ dowodu</span>
          <select
            required
            name="typ"
            defaultValue="wywiad"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {typyDowodow.map((typ) => (
              <option key={typ.value} value={typ.value}>
                {typ.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Siła</span>
          <select
            required
            name="sila"
            defaultValue="3"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {sily.map((sila) => (
              <option key={sila.value} value={sila.value}>
                {sila.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Źródło</span>
        <input
          name="zrodlo"
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Rozmowa z 3 klientami"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Treść dowodu</span>
        <textarea
          required
          name="tresc"
          rows={4}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co dokładnie pokazało, że problem jest realny?"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Data dowodu</span>
        <input
          name="data_dowodu"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
        />
      </label>

      <Button type="submit">Dodaj dowód</Button>
    </form>
  );
}
