import { AppShell } from "@/components/layout/AppShell";
import { RyzykoForm } from "@/components/ryzyka/RyzykoForm";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { getAktywneDomeny } from "@/lib/queries/ruchy-dnia";

export const dynamic = "force-dynamic";

export default async function NoweRyzykoPage() {
  const domeny = await getAktywneDomeny();

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow="Nowe ryzyko" title="Dodaj ryzyko">
          <RyzykoForm domeny={domeny} />
        </AtlasPanel>

        <aside className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Reguła
          </p>
          <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
            Ryzyko musi mieć ruch
          </h2>
          <p className="mt-4 text-sm leading-6 text-atlas-secondary">
            Jeśli nie wiesz, jaka akcja zmniejsza ryzyko, to nie jest jeszcze dobry
            wpis do systemu.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
