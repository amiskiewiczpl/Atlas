# ATLAS HQ — specyfikacja techniczna

## Route’y

### Publiczne

```text
/login
/callback
```

### Prywatne

```text
/command
/briefing/poranny
/debrief/wieczorny
/ruchy-dnia/nowy
/ruchy-dnia/[id]/edytuj
/questy
/questy/nowy
/questy/[id]
/ryzyka
/ryzyka/[id]
/discovery
/discovery/problemy/nowy
/discovery/problemy/[id]
/discovery/problemy/[id]/dowody/nowy
/ustawienia
```

## Struktura folderów

```text
app/
  (auth)/
  (app)/
components/
  layout/
  command/
  questy/
  discovery/
  ruchy/
  ui/
lib/
  supabase/
  actions/
  queries/
  scoring/
  constants/
types/
supabase/
  migrations/
```

## Kluczowe query

`getCommandCenterData(userId, data)` powinno pobierać:

- aktywną misję,
- aktywny sezon,
- dzisiejszy dzień,
- ruchy dnia,
- aktywne questy,
- aktywne ryzyka,
- KPI.

## Scoring v0.1

### Readiness

```text
readiness =
sen_score * 0.4 +
energia_score * 0.4 +
status_ciala_score * 0.2
```

Sen:

- 7h+ = 100
- 6–6.9h = 75
- 5–5.9h = 50
- <5h = 25

Energia:

- energia 1–10 × 10

Status ciała:

- dobry = 100
- ok = 75
- slaby = 50
- kontuzja = 40
- choroba = 25

### Tryb dnia

- readiness >= 80 → ofensywa
- readiness >= 40 → stabilizacja
- readiness < 40 → recovery

### Confidence score problemu

Prosty model v0.1:

```text
pain 35%
dowody 35%
WTP 30%
```

## Server actions

Startowo potrzebne:

- `zapiszPorannyBriefing`
- `dodajRuchDnia`
- `zmienStatusRuchu`
- `zapiszWieczornyDebrief`
- `dodajQuest`
- `zmienStatusQuestu`
- `dodajRyzyko`
- `dodajRyzykoJakoRuch`
- `dodajProblem`
- `dodajDowod`

## Typy

Nazwy typów po polsku bez polskich znaków:

- `TrybDnia`
- `StatusRuchu`
- `StatusQuestu`
- `StatusProblemu`
- `CommandCenterData`
