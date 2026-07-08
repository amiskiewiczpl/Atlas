import { AppShell } from "@/components/layout/AppShell";
import { PorannyBriefingForm } from "@/components/briefing/PorannyBriefingForm";

export const dynamic = "force-dynamic";

export default function PorannyBriefingPage() {
  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.7fr]">
        <PorannyBriefingForm />

        <aside className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Reguła dnia
          </p>
          <h2 className="mt-2 text-lg font-semibold text-atlas-primary">
            Readiness steruje ambicją
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-atlas-secondary">
            <p>
              <span className="font-semibold text-atlas-primary">80+</span>:
              ofensywa.
            </p>
            <p>
              <span className="font-semibold text-atlas-primary">40-79</span>:
              stabilizacja.
            </p>
            <p>
              <span className="font-semibold text-atlas-primary">0-39</span>:
              recovery.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
