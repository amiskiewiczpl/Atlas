# ATLAS HQ — roadmapa wersji i sprintów

## Zasada prowadząca

Nie budujemy wszystkiego naraz.

Najpierw domykamy działającą pętlę v0.1:

```text
briefing → 3 ruchy → wykonanie → debrief → aktualizacja Command Center
```

## v0.1 — core loop

Cel: użytkownik rano wie, jak grać dzień, a wieczorem zamyka dzień danymi dla systemu.

### SPRINT-001 — fundament techniczny

Status: zakończony.

- Next.js + TypeScript.
- Tailwind CSS.
- shadcn/ui config.
- Supabase client/server.
- Auth magic link.
- Ochrona tras.
- Layout aplikacji.
- `/command`.
- Migracja bazy.
- Seed danych startowych.

### SPRINT-002 — poranny briefing

Status: zakończony.

- `/briefing/poranny`.
- Formularz check-inu.
- Readiness score.
- Tryb dnia.
- Zapis dnia i check-inu.
- Migracja `0003_poranny_briefing_constraints.sql`.

### SPRINT-003 — ruchy dnia

Status: zakończony.

Cel: użytkownik wybiera maksymalnie 3 strategiczne ruchy.

- `/ruchy-dnia/nowy`.
- Formularz ruchu.
- Powiązanie z dniem.
- Powiązanie z domeną.
- Opcjonalne powiązanie z questem/problemem.
- Limit 3 ruchów dnia.
- Widok ruchów na `/command`.

### SPRINT-004 — wykonanie ruchów

Status: zakończony.

Cel: użytkownik może prowadzić dzień przez statusy ruchów.

- Lista ruchów dnia.
- Zmiana statusu:
  - wykonany,
  - pominiety,
  - przeniesiony,
  - anulowany.
- Powód pominięcia.
- Aktualizacja Command Center po zmianie statusu.

### SPRINT-005 — wieczorny debrief

Status: zakończony.

Cel: użytkownik zamyka dzień.

- `/debrief/wieczorny`.
- Widok ruchów dnia.
- Oznaczanie statusów.
- Energia wieczorem.
- Największy progres.
- Największy problem.
- Sygnał na jutro.
- Zamknięcie dnia.

### SPRINT-006 — Command Center v0.1

Status: zakończony.

Cel: `/command` pokazuje najważniejsze decyzje, nie pełny dashboard informacji.

- MissionPanel.
- MainQuestPanel.
- DailyMovesPanel.
- SystemStatusPanel.
- RiskPanel.
- KpiStrip.
- Największy progres.
- Największy bloker.

## v0.2 — strategia

Cel: użytkownik ma aktywne questy, ryzyka i prostą reakcję systemu.

### SPRINT-007 — questy

Status: zakończony.

- `/questy`.
- `/questy/nowy`.
- `/questy/[id]`.
- Tworzenie questu.
- Szczegóły questu.
- Zmiana statusu.
- Limit 3 aktywnych questów.

### SPRINT-008 — ryzyka

Status: zakończony.

- `/ryzyka`.
- `/ryzyka/[id]`.
- Dodawanie ryzyka.
- Szczegóły ryzyka.
- Dodanie ryzyka jako ruch dnia.
- Ignorowanie ryzyka.
- Oznaczenie jako rozwiązane.

## v0.3 — Discovery MVP

Cel: Discovery przechowuje problemy rynkowe i dowody, nie pomysły.

### SPRINT-009 — problemy Discovery

Status: zakończony.

- `/discovery`.
- `/discovery/problemy/nowy`.
- `/discovery/problemy/[id]`.
- Lista problemów.
- Formularz problemu.
- Szczegóły problemu.

### SPRINT-010 — dowody i confidence

- `/discovery/problemy/[id]/dowody/nowy`.
- Dodawanie dowodu.
- Confidence score.
- Braki do `kandydat_mvp`.
- Akcja `Zabij problem`.

## v0.4 — domeny i weekly review

Cel: system zaczyna pokazywać wzorce, ale nadal bez przeładowania.

### SPRINT-011 — domeny i KPI

- LifeRadar.
- LifeHeatmap.
- Proste KPI z regułami decyzyjnymi.
- Domeny: zdrowie, sport, kariera, finanse, discovery, projekty.

### SPRINT-012 — weekly review

- Podsumowanie tygodnia.
- Korekta strategii.
- Wybór głównego ryzyka na kolejny tydzień.
- Aktualizacja sezonu/questów.

## Później

Nie planować szczegółowo przed stabilnym v0.1:

- pełne finanse,
- pełny sport log,
- relacje,
- learning,
- AI coach,
- integracje,
- mobile app,
- zaawansowane wykresy.
