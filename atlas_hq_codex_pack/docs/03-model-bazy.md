# ATLAS HQ — model bazy danych

## Konwencja

- PostgreSQL / Supabase.
- Nazwy techniczne bez polskich znaków.
- Tabele w `snake_case`.
- Identyfikatory jako `uuid`.
- Każda tabela użytkownika ma `user_id`.
- RLS włączone od początku.

## Tabele v0.1

```text
profiles
misje
sezony
domeny
dni
check_iny
questy
ruchy_dnia
kpi
ryzyka
problemy
dowody
```

## Najważniejsze tabele

### `misje`

Misja nadrzędna.

Pola:

- `id`
- `user_id`
- `nazwa`
- `opis`
- `aktywna`
- `created_at`
- `updated_at`
- `archived_at`

### `sezony`

Okres strategiczny, np. Q3 2026.

Pola:

- `id`
- `user_id`
- `misja_id`
- `nazwa`
- `motyw`
- `data_start`
- `data_koniec`
- `status`
- `definicja_sukcesu`
- `main_quest_id`

### `domeny`

Obszary życia.

Startowe domeny:

- Zdrowie
- Sport
- Kariera
- Finanse
- Discovery
- Projekty
- Relacje
- Learning

### `dni`

Kontener dnia.

Pola:

- `data`
- `tryb_dnia`
- `readiness_score`
- `focus_score`
- `momentum_score`
- `top_ryzyko_id`
- `najwiekszy_progres`
- `najwiekszy_bloker`
- `zamkniety`

### `check_iny`

Poranny briefing i wieczorny debrief.

Typy:

- `poranny`
- `wieczorny`

### `ruchy_dnia`

Strategiczne ruchy dnia.

Pola:

- `tytul`
- `typ`
- `wplyw`
- `wysilek`
- `status`
- `domena_id`
- `quest_id`
- `problem_id`

### `questy`

Cele strategiczne.

Statusy:

- backlog
- aktywny
- zablokowany
- zakonczony
- zabity
- zarchiwizowany
- stary

### `ryzyka`

Ryzyka operacyjne.

Statusy:

- nieaktywne
- aktywne
- rozwiazane
- zignorowane

### `problemy`

Problemy rynkowe w Discovery.

Statusy:

- obserwacja
- hipoteza_problemu
- wywiady
- powtarzalny_wzorzec
- mocny_bol
- sygnal_platnosci
- kandydat_mvp
- aktywny_bet
- zabity

### `dowody`

Dowody dotyczące problemu.

Typy:

- cytat
- wywiad
- zachowanie
- platnosc
- konkurencja
- czestotliwosc
- bol
- odrzucenie
- sygnal_rynku
- obejscie

## Startowa migracja

Patrz:

`supabase/migrations/0001_atlas_core.sql`
