# ATLAS HQ — taski techniczne

## Roadmapa

Pełny podział na wersje i sprinty jest w:

```text
docs/ROADMAP.md
```

## SPRINT-001 — fundament techniczny

- [x] ATLAS-001 Utworzyć projekt Next.js.
- [x] ATLAS-002 Skonfigurować TypeScript.
- [x] ATLAS-003 Skonfigurować Tailwind.
- [x] ATLAS-004 Dodać shadcn/ui w trybie konfiguracyjnym.
- [x] ATLAS-005 Skonfigurować Supabase.
- [x] ATLAS-006 Dodać zmienne środowiskowe.
- [x] ATLAS-007 Dodać layout aplikacji.
- [x] ATLAS-008 Dodać sidebar i topbar.
- [x] ATLAS-009 Dodać logowanie.
- [x] ATLAS-010 Dodać profil użytkownika widoczny w UI.
- [x] ATLAS-011 Dodać ochronę tras.
- [x] ATLAS-012 Dodać seed danych startowych.
- [x] ATLAS-013 Dodać migrację `0001_atlas_core.sql`.
- [x] ATLAS-014 Dodać RLS.
- [x] ATLAS-015 Wygenerować typy Supabase.
- [x] ATLAS-016 Utworzyć `/command`.

## SPRINT-002 — poranny briefing

- [x] Skonfigurować projekt Supabase dla lokalnego developmentu.
- [x] Uruchomić migracje `0001_atlas_core.sql` i `0002_seed_startowy.sql`.
- [x] Przetestować logowanie magic linkiem i seed danych startowych.
- [x] Utworzyć `/briefing/poranny`.
- [x] Dodać formularz check-inu.
- [x] Dodać readiness score.
- [x] Dodać tryb dnia.
- [x] Zapisać dzień i check-in.
- [x] Uruchomić migrację `0003_poranny_briefing_constraints.sql` w Supabase.

## SPRINT-003 — ruchy dnia

- [x] Utworzyć `/ruchy-dnia/nowy`.
- [x] Dodać formularz ruchu.
- [x] Zablokować więcej niż 3 ruchy dnia.
- [x] Podłączyć wybór 3 ruchów do porannego flow.
- [x] Pokazać dzisiejsze ruchy na `/command`.

## SPRINT-004 — wykonanie ruchów

- [x] Dodać widok wykonania dzisiejszych ruchów.
- [x] Dodać zmianę statusu ruchu.
- [x] Obsłużyć statusy: wykonany, pominiety, przeniesiony, anulowany.
- [x] Dodać powód pominięcia.
- [x] Odświeżać Command Center po zmianie statusu.

## SPRINT-005 — wieczorny debrief

- [x] Utworzyć `/debrief/wieczorny`.
- [x] Pokazać ruchy dnia.
- [x] Oznaczyć statusy ruchów.
- [x] Zapisać progres/problem/sygnał na jutro.
- [x] Zamknąć dzień.

## SPRINT-006 — Command Center v0.1

- [x] Dodać MissionPanel.
- [x] Dodać MainQuestPanel.
- [x] Dodać DailyMovesPanel.
- [x] Dodać SystemStatusPanel.
- [x] Dodać RiskPanel.
- [x] Dodać KpiStrip.

## v0.2 — strategia

### SPRINT-007 — questy

- [x] Utworzyć `/questy`.
- [x] Utworzyć `/questy/nowy`.
- [x] Utworzyć `/questy/[id]`.
- [x] Dodać tworzenie questu.
- [x] Dodać zmianę statusu.
- [x] Zablokować więcej niż 3 aktywne questy.

### SPRINT-008 — ryzyka

- [x] Utworzyć `/ryzyka`.
- [x] Utworzyć `/ryzyka/[id]`.
- [x] Dodać tworzenie ryzyka.
- [x] Dodać ryzyko jako ruch dnia.
- [x] Dodać ignorowanie i rozwiązanie ryzyka.

## v0.3 — Discovery MVP

### SPRINT-009 — problemy Discovery

- [x] Utworzyć `/discovery`.
- [x] Utworzyć `/discovery/problemy/nowy`.
- [x] Utworzyć `/discovery/problemy/[id]`.
- [x] Dodać listę problemów.
- [x] Dodać formularz problemu.

### SPRINT-010 — dowody i confidence

- [x] Utworzyć `/discovery/problemy/[id]/dowody/nowy`.
- [x] Dodać dowód.
- [x] Dodać confidence score.
- [x] Pokazać braki do Kandydat MVP.
- [x] Dodać akcję `Zabij problem`.

## v0.4 — domeny i weekly review

### SPRINT-011 — domeny i KPI

- [x] Dodać LifeRadar.
- [x] Dodać LifeHeatmap.
- [x] Dodać KPI z regułami decyzyjnymi.

### SPRINT-012 — weekly review

- [x] Dodać podsumowanie tygodnia.
- [x] Dodać korektę strategii.
- [x] Dodać wybór głównego ryzyka na kolejny tydzień.

## Reguły zakresu

- Nie kodować pełnych finansów.
- Nie kodować pełnego sport logu.
- Nie kodować relacji.
- Nie kodować learningu.
- Nie kodować AI coacha.
- Nie kodować integracji.
- Nie kodować zaawansowanych wykresów.
