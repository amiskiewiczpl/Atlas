import { Button } from "@/components/ui/Button";
import { dodajProblem } from "@/lib/actions/problemy";

const czestotliwosci = [
  { value: "nieznane", label: "Nieznane" },
  { value: "codziennie", label: "Codziennie" },
  { value: "tygodniowo", label: "Tygodniowo" },
  { value: "miesiecznie", label: "Miesięcznie" },
  { value: "kwartalnie", label: "Kwartalnie" },
  { value: "rzadko", label: "Rzadko" }
];

const willingnessOptions = [
  { value: "nieznane", label: "Nieznane" },
  { value: "brak", label: "Brak" },
  { value: "slabe", label: "Słabe" },
  { value: "srednie", label: "Średnie" },
  { value: "mocne", label: "Mocne" },
  { value: "potwierdzone", label: "Potwierdzone" }
];

export function ProblemForm() {
  return (
    <form action={dodajProblem} className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Problem</span>
          <input
            required
            name="tytul"
            minLength={3}
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Founderzy nie wiedzą, co walidować w tym tygodniu"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Segment</span>
          <input
            required
            name="segment"
            minLength={3}
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Solo founderzy B2B SaaS"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">Opis bólu</span>
        <textarea
          name="opis"
          rows={3}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co dokładnie boli, kiedy się pojawia i dlaczego obecne rozwiązania nie wystarczają?"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Częstotliwość</span>
          <select
            name="czestotliwosc"
            defaultValue="nieznane"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {czestotliwosci.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Pain score</span>
          <input
            name="pain_score"
            type="number"
            min={1}
            max={10}
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="1-10"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Willingness to pay</span>
          <select
            name="willingness_to_pay"
            defaultValue="nieznane"
            className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
          >
            {willingnessOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Obecne obejście</span>
          <textarea
            name="obecne_obejscie"
            rows={3}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Jak dziś rozwiązują to bez nas?"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Konkurencja</span>
          <textarea
            name="konkurencja"
            rows={3}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Kogo lub czego używają?"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">Moja przewaga</span>
          <textarea
            name="moja_przewaga"
            rows={3}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Dlaczego możemy wygrać?"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Następny krok walidacji
        </span>
        <input
          name="nastepny_krok_walidacji"
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Np. przeprowadzić 3 rozmowy z segmentem"
        />
      </label>

      <Button type="submit">Dodaj problem</Button>
    </form>
  );
}
