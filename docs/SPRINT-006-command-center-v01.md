# SPRINT-006 — Command Center v0.1

## Cel

`/command` pokazuje najważniejsze decyzje i sygnały systemu, a nie pełny dashboard informacji.

## Zakres

- `MissionPanel`.
- `MainQuestPanel`.
- `DailyMovesPanel`.
- `SystemStatusPanel`.
- `RiskPanel`.
- `KpiStrip`.
- Panel największego progresu i największego blokera.
- Jedno query `getCommandCenterData`.
- Utrzymanie wejść do porannego briefingu i wieczornego debriefu.

## Decyzje

- Sprint korzysta z istniejących tabel: `misje`, `sezony`, `questy`, `dni`, `ruchy_dnia`, `ryzyka`, `kpi`.
- Nie dodano nowej migracji Supabase.
- Panele są tylko odczytowe, poza istniejącą akcją inicjalizacji danych startowych.
- Brakujące dane są pokazywane jako stany puste, bez implementowania modułów z kolejnych sprintów.

## Poza zakresem

- CRUD questów.
- CRUD ryzyk.
- Edycja KPI.
- Radar życia i heatmapa.
- Zaawansowane wykresy.

## Weryfikacja

```bash
npm run build
```
