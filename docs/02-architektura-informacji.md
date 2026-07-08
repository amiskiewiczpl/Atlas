# ATLAS HQ — Architektura informacji

## Hierarchia systemu

```text
Mission
  ↓
Season
  ↓
Main Quest
  ↓
Active Quests
  ↓
Daily Moves
  ↓
Check-ins / Logs / Evidence
  ↓
KPI / Radar / Heatmap / Risks
  ↓
Decision Briefing
```

## Główne obiekty

### Strategia

- Mission
- Season
- Quest

### Wykonanie

- Day
- Daily Move
- Check-in
- Review

### Zdrowie systemu

- Domain
- KPI
- Threshold
- Risk

### Budowa firmy

- Problem
- Evidence
- Interview
- Project

### Wsparcie

- Career Opportunity
- Finance Snapshot
- Health Snapshot
- Sport Log
- Relation Touchpoint
- Learning Item

## Najważniejsze obiekty v0.1

Pierwsza wersja potrzebuje:

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

## Relacje

```text
misje 1 → wiele sezonow
sezony 1 → wiele questow
domeny 1 → wiele kpi
domeny 1 → wiele questow
domeny 1 → wiele ryzyk
dni 1 → wiele check_inow
dni 1 → wiele ruchow_dnia
questy 1 → wiele ruchow_dnia
problemy 1 → wiele dowodow
problemy 1 → wiele ruchow_dnia
```

## Twarde reguły

1. Maksymalnie 3 aktywne questy.
2. Maksymalnie 3 ruchy dnia.
3. Jeden aktywny sezon.
4. Jeden main quest na sezon.
5. KPI bez reguły decyzyjnej nie wchodzi na Home.
6. Problem bez dowodów nie przechodzi do MVP.
7. Projekt biznesowy musi być powiązany z problemem.
