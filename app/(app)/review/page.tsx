import { AppShell } from "@/components/layout/AppShell";
import { WeeklyReviewForm } from "@/components/review/WeeklyReviewForm";
import { getActiveRisks } from "@/lib/queries/ryzyka";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const ryzyka = await getActiveRisks();

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Weekly Review
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-atlas-primary">Podsumowanie tygodnia</h1>
              <p className="mt-2 text-sm leading-6 text-atlas-secondary">
                Zatrzymaj się na chwilę, zrób korektę strategii i wybierz główne ryzyko na kolejny tydzień.
              </p>
            </div>
          </div>
        </header>

        <WeeklyReviewForm ryzyka={ryzyka} />
      </div>
    </AppShell>
  );
}
