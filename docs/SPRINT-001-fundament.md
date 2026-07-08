# SPRINT-001 — fundament techniczny

## Cel

Dowiezienie pierwszego fundamentu ATLAS HQ zgodnie z `CODEX_START_PROMPT.md` i dokumentami w `docs/`.

Sprint nie obejmuje pełnego Discovery, finansów, sportu, relacji ani learningu.

## Zakres

- Projekt Next.js + TypeScript.
- Tailwind CSS i konfiguracja shadcn/ui.
- Struktura folderów zgodna ze specyfikacją:
  - `app/`
  - `components/`
  - `lib/`
  - `types/`
  - `supabase/migrations/`
- Supabase client/server i middleware sesji.
- Logowanie przez Supabase magic link.
- Callback sesji `/callback`.
- Ochrona tras prywatnych w middleware.
- Profil użytkownika widoczny w `TopBar`.
- Layout aplikacji:
  - `AppShell`
  - `Sidebar`
  - `TopBar`
- Pusta strona `/command` jako baza pod Command Center.
- Migracja startowa `0001_atlas_core.sql`.
- Migracja seedująca `0002_seed_startowy.sql`.
- Server action inicjalizacji użytkownika.
- Typy Supabase w `types/supabase.ts`.

## Wykonane taski z backlogu

- ATLAS-001 Utworzyć projekt Next.js.
- ATLAS-002 Skonfigurować TypeScript.
- ATLAS-003 Skonfigurować Tailwind.
- ATLAS-004 Dodać shadcn/ui w trybie konfiguracyjnym.
- ATLAS-005 Skonfigurować Supabase.
- ATLAS-006 Dodać zmienne środowiskowe.
- ATLAS-007 Dodać layout aplikacji.
- ATLAS-008 Dodać sidebar i topbar.
- ATLAS-009 Dodać logowanie.
- ATLAS-010 Dodać profil użytkownika widoczny w UI.
- ATLAS-011 Dodać ochronę tras.
- ATLAS-012 Dodać seed danych startowych.
- ATLAS-013 Dodać migrację `0001_atlas_core.sql`.
- ATLAS-014 Dodać RLS przez migrację startową.
- ATLAS-015 Wygenerować typy Supabase.
- ATLAS-016 Utworzyć `/command`.

## Decyzje techniczne

- UI i mikrocopy są po polsku.
- Route `/command` jest głównym ekranem roboczym.
- Command Center pokazuje tylko fundament, bez implementacji paneli domenowych.
- Seed startowy działa przez RPC `inicjalizuj_atlas_uzytkownika`.
- Auth używa Supabase magic link, żeby nie dodawać własnej obsługi haseł.
- `/login` i `/callback` są publiczne, pozostałe route’y są prywatne.
- Dokumenty z paczki Codexa zostały skopiowane do root `docs/`, a `AGENTS.md` i `CODEX_START_PROMPT.md` do katalogu głównego repo.

## Weryfikacja

```bash
npm install
npm run build
```

Build produkcyjny przechodzi poprawnie.

## Znane sprawy

- `npm install` zgłasza podatności w zależnościach transytywnych. Nie uruchamiano `npm audit fix --force`, bo może wprowadzić breaking changes.
- Typy Supabase są zapisane lokalnie na podstawie migracji startowej. Po podłączeniu prawdziwego projektu Supabase można je zastąpić outputem Supabase CLI.

## Następny sprint

SPRINT-002 powinien objąć:

- `/briefing/poranny`,
- readiness score,
- zapis dnia i check-inu,
- limit maksymalnie 3 ruchów dnia.
