# ATLAS HQ — plan implementacji

## Cel v0.1

Nie budujemy całego ATLAS HQ.

Budujemy pierwszą działającą pętlę:

```text
briefing → 3 ruchy → wykonanie → debrief → aktualizacja Command Center
```

## Stack

- Next.js
- TypeScript
- Supabase / PostgreSQL
- Tailwind CSS
- shadcn/ui
- Vercel

## Fazy

### Faza 1 — fundament

- projekt Next.js,
- TypeScript,
- Tailwind,
- shadcn/ui,
- Supabase,
- auth,
- layout,
- sidebar,
- topbar,
- seed danych.

### Faza 2 — model danych MVP

Tabele:

- profiles,
- misje,
- sezony,
- domeny,
- dni,
- check_iny,
- ruchy_dnia,
- questy,
- kpi,
- ryzyka,
- problemy,
- dowody.

### Faza 3 — Command Center

Komponenty:

- MissionPanel,
- MainQuestPanel,
- SystemStatusPanel,
- DailyMovesPanel,
- RiskPanel,
- KpiStrip,
- LifeRadar,
- LifeHeatmap.

### Faza 4 — poranny briefing

- formularz check-inu,
- readiness score,
- tryb dnia,
- zapis dnia.

### Faza 5 — ruchy dnia

- dodaj ruch,
- edytuj ruch,
- zmień status,
- limit 3 ruchów.

### Faza 6 — wieczorny debrief

- oznacz ruchy,
- zapisz progres,
- zapisz problem,
- sygnał na jutro,
- zamknij dzień.

### Faza 7 — questy

- lista,
- szczegóły,
- tworzenie,
- statusy,
- limit 3 aktywnych.

### Faza 8 — ryzyka

- lista,
- szczegóły,
- dodanie jako ruch dnia,
- rozwiązanie/ignorowanie.

### Faza 9 — Discovery MVP

- problemy,
- dowody,
- confidence score,
- braki do Kandydat MVP,
- zabij problem.

## Nie kodować teraz

- relacje,
- learning,
- pełne finanse,
- pełny sport log,
- AI,
- integracje,
- mobile app,
- zaawansowane wykresy.
