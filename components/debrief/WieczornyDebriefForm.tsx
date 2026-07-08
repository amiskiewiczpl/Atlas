import { Button } from "@/components/ui/Button";
import { zapiszWieczornyDebrief } from "@/lib/actions/wieczorny-debrief";

type WieczornyDebriefFormProps = {
  zamkniety: boolean;
};

export function WieczornyDebriefForm({ zamkniety }: WieczornyDebriefFormProps) {
  return (
    <form action={zapiszWieczornyDebrief} className="grid gap-5">
      {zamkniety ? (
        <div className="rounded-md border border-atlas-border bg-atlas-panel p-4 text-sm leading-6 text-atlas-secondary">
          Dzień jest już zamknięty. Ponowny zapis zaktualizuje wieczorny debrief.
        </div>
      ) : null}

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Energia wieczorem
        </span>
        <input
          required
          name="energia"
          type="number"
          min={1}
          max={10}
          defaultValue={5}
          className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Największy progres
        </span>
        <textarea
          required
          name="najwiekszy_progres"
          minLength={3}
          rows={3}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co realnie przesunęło dzień do przodu?"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Największy problem
        </span>
        <textarea
          required
          name="najwiekszy_problem"
          minLength={3}
          rows={3}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co blokowało wykonanie albo jakość decyzji?"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-atlas-secondary">
          Sygnał na jutro
        </span>
        <textarea
          required
          name="sygnal_na_jutro"
          minLength={3}
          rows={3}
          className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
          placeholder="Co jutro powinno zmienić plan albo uwagę?"
        />
      </label>

      <Button type="submit">Zamknij dzień</Button>
    </form>
  );
}
