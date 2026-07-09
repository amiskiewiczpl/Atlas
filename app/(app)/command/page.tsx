import Link from "next/link";
import { DailyMovesPanel } from "@/components/command/DailyMovesPanel";
import { KpiStrip } from "@/components/command/KpiStrip";
import { MainQuestPanel } from "@/components/command/MainQuestPanel";
import { MissionPanel } from "@/components/command/MissionPanel";
import { ProgressBlockerPanel } from "@/components/command/ProgressBlockerPanel";
import { RiskPanel } from "@/components/command/RiskPanel";
import { SystemStatusPanel } from "@/components/command/SystemStatusPanel";
import { AtlasPanel } from "@/components/ui/AtlasPanel";
import { AppShell } from "@/components/layout/AppShell";
import { getCommandCenterData } from "@/lib/queries/command-center";

export const dynamic = "force-dynamic";

export default async function CommandPage() {
  const command = await getCommandCenterData();

  return (
    <AppShell>
      <div className="space-y-4">
        <header className="rounded-md border border-atlas-border bg-atlas-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
            Command Center
          </p>
          <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-atlas-primary">ATLAS HQ</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-atlas-secondary">
                Decyzje dnia, status systemu i najważniejsze sygnały. Bez pełnych
                modułów domenowych.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/briefing/poranny"
                className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
              >
                Rozpocznij briefing
              </Link>
              <Link
                href="/debrief/wieczorny"
                className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
              >
                Zamknij dzień
              </Link>
            </div>
          </div>
        </header>

        <AtlasPanel eyebrow="Jak zacząć" title="Kolejne kroki">
          <div className="space-y-2 text-sm text-atlas-secondary">
            <p>1. Zacznij od porannego briefingu.</p>
            <p>2. Ustaw maksymalnie 3 konkretne ruchy dnia.</p>
            <p>3. Oznacz wykonanie lub pominięcie ruchu w trakcie dnia.</p>
            <p>4. Zamknij dzień wieczornym debriefem.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/briefing/poranny"
              className="inline-flex h-10 items-center justify-center rounded-md bg-atlas-cyan px-4 text-sm font-semibold text-black transition hover:bg-atlas-cyan/90"
            >
              Następny krok
            </Link>
            <Link
              href="/ruchy-dnia"
              className="inline-flex h-10 items-center justify-center rounded-md border border-atlas-border px-4 text-sm font-semibold text-atlas-primary transition hover:bg-atlas-hover"
            >
              Prowadź ruchy
            </Link>
          </div>
        </AtlasPanel>

        <KpiStrip kpis={command.kpis} />

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <MissionPanel mission={command.mission} season={command.season} />
          <MainQuestPanel quest={command.mainQuest} />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_0.7fr_0.7fr]">
          <DailyMovesPanel ruchy={command.dailyMoves} />
          <RiskPanel risks={command.activeRisks} />
          <SystemStatusPanel day={command.day} />
        </div>

        <ProgressBlockerPanel day={command.day} />
      </div>
    </AppShell>
  );
}
