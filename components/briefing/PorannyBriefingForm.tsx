import { Button } from "@/components/ui/Button";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { zapiszPorannyBriefing } from "@/lib/actions/poranny-briefing";

const statusyCiala = [
  { value: "dobry", label: "Dobry" },
  { value: "ok", label: "OK" },
  { value: "slaby", label: "Słaby" },
  { value: "kontuzja", label: "Kontuzja" },
  { value: "choroba", label: "Choroba" }
];

const statusyGlowy = [
  { value: "spokojny", label: "Spokojny" },
  { value: "skupiony", label: "Skupiony" },
  { value: "chaotyczny", label: "Chaotyczny" },
  { value: "niski", label: "Niski" },
  { value: "zestresowany", label: "Zestresowany" }
];

export function PorannyBriefingForm() {
  return (
    <AtlasPanel eyebrow="Poranny briefing" title="Ustaw tryb dnia">
      <form action={zapiszPorannyBriefing} className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">
              Sen w godzinach
            </span>
            <input
              required
              name="sen_godziny"
              type="number"
              min="0"
              max="24"
              step="0.25"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
              placeholder="7.5"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">
              Energia 1-10
            </span>
            <input
              required
              name="energia"
              type="number"
              min="1"
              max="10"
              step="1"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
              placeholder="7"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">
              Status ciała
            </span>
            <select
              required
              name="status_ciala"
              defaultValue="ok"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
            >
              {statusyCiala.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-atlas-secondary">
              Status głowy
            </span>
            <select
              required
              name="status_glowy"
              defaultValue="skupiony"
              className="h-11 rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition focus:border-atlas-cyan"
            >
              {statusyGlowy.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-atlas-secondary">
            Największe ryzyko dzisiaj
          </span>
          <textarea
            name="najwieksze_ryzyko"
            rows={4}
            className="resize-none rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm leading-6 text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
            placeholder="Co może dziś rozbić plan?"
          />
        </label>

        <div className="rounded-md border border-atlas-border bg-atlas-panel p-4 text-sm leading-6 text-atlas-secondary">
          System policzy readiness i zapisze tryb dnia. Kolejny krok sprintu to
          wybór maksymalnie 3 ruchów dnia.
        </div>

        <div>
          <Button type="submit">Zapisz briefing</Button>
        </div>
      </form>
    </AtlasPanel>
  );
}
