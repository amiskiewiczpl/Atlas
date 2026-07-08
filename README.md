# ATLAS HQ

Prywatna aplikacja webowa typu osobiste Mission Control.

ATLAS HQ nie jest task managerem ani Notion. To dashboard decyzji: rano otwierasz Command Center i widzisz, jak grać dzień.

## Dokumentacja

- `AGENTS.md` — instrukcje dla Codexa.
- `CODEX_START_PROMPT.md` — prompt startowy.
- `docs/` — kontekst produktu, UX, flow, model bazy, backlog i sprinty.
- `supabase/migrations/` — migracje bazy danych.

## Development

```bash
npm install
npm run dev
```

## Deployment

Aplikacja jest przygotowana pod Vercel. Po pushu do GitHub:

1. Zaloguj się na Vercel.
2. Kliknij „Add New Project”.
3. Wybierz repozytorium Atlas.
4. W Settings > Environment Variables dodaj:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (adres Twojej aplikacji na Vercel, np. `https://atlas-hq.vercel.app`)
5. Włącz deployment.

Dla lokalnego testu utwórz plik `.env.local` na podstawie `.env.example`.

Główna strona aplikacji:

```text
/command
```
