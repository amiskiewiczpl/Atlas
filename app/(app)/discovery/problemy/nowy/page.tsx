import { AppShell } from "@/components/layout/AppShell";
import { ProblemForm } from "@/components/discovery/ProblemForm";
import { AtlasPanel } from "@/components/ui/AtlasPanel";

export const dynamic = "force-dynamic";

export default function NowyProblemPage() {
  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.45fr]">
        <AtlasPanel eyebrow="Nowy problem" title="Dodaj problem rynkowy">
          <ProblemForm />
        </AtlasPanel>

        <aside className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Discovery
          </p>
          <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
            Nie dodawaj pomysłu
          </h2>
          <p className="mt-4 text-sm leading-6 text-atlas-secondary">
            Dobry wpis mówi, kto ma problem, co boli, jak często i co dzisiaj robi
            zamiast naszego produktu.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
