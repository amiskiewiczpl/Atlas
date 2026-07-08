# ATLAS HQ — paczka dla Codexa

ATLAS HQ to prywatna aplikacja webowa typu osobiste Mission Control.

Nie jest to task manager, Notion, Trello ani lista zadań.  
To ma być dashboard decyzji: rano otwieram jeden ekran i wiem, jak grać dzień.

## Jak używać tej paczki w VS Code / Codex

1. Utwórz nowe repo/projekt, np. `atlas-hq`.
2. Skopiuj do katalogu głównego pliki z tej paczki:
   - `AGENTS.md`
   - `CODEX_START_PROMPT.md`
   - katalog `docs/`
   - katalog `supabase/`
3. Otwórz repo w VS Code.
4. Uruchom Codexa w tym repo.
5. Zacznij od promptu z pliku `CODEX_START_PROMPT.md`.
6. Każ Codexowi najpierw przeczytać `AGENTS.md`, a potem dokumenty w `docs/`.

## Najważniejsza zasada

Nie kodować wszystkiego naraz.

Pierwszy build ma dowieźć pętlę:

**poranny briefing → 3 ruchy dnia → wykonanie → wieczorny debrief → aktualizacja Command Center**

Dopiero potem rozbudowa Discovery, kariery, finansów, zdrowia i sportu.

## Stack rekomendowany

- Next.js
- TypeScript
- Supabase / PostgreSQL
- Tailwind CSS
- shadcn/ui
- Vercel

## Dokumenty

- `AGENTS.md` — główna instrukcja dla Codexa
- `CODEX_START_PROMPT.md` — pierwszy prompt do wklejenia Codexowi
- `docs/00-kontekst-produktu.md` — czym jest ATLAS HQ
- `docs/01-ux-blueprint.md` — UX i główny ekran
- `docs/02-architektura-informacji.md` — obiekty i relacje
- `docs/03-model-bazy.md` — tabele i model danych
- `docs/04-flow-uzytkownika.md` — flow aplikacji
- `docs/05-design-system.md` — styl, komponenty, język UI
- `docs/06-plan-implementacji.md` — backlog i kolejność budowy
- `docs/07-specyfikacja-techniczna.md` — route’y, foldery, komponenty
- `docs/08-backlog.md` — backlog z priorytetami
- `supabase/migrations/0001_atlas_core.sql` — startowa migracja bazy

