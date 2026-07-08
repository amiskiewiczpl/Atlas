# ATLAS HQ — Supabase setup

## Kiedy

Supabase trzeba skonfigurować teraz, przed dalszym rozwojem `SPRINT-002`.

Bez tego nie da się realnie przetestować:

- logowania `/login`,
- callbacku `/callback`,
- ochrony tras,
- inicjalizacji użytkownika,
- seed danych startowych,
- przyszłego porannego briefingu.

## Co zrobić w panelu Supabase

1. Utwórz nowy projekt Supabase.
2. Wejdź w `Project Settings` → `API`.
3. Skopiuj:
   - `Project URL`,
   - `anon public key`.
4. Utwórz lokalny plik `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Wejdź w `Authentication` → `URL Configuration`.
6. Ustaw:

```text
Site URL: http://localhost:3000
Redirect URLs:
http://localhost:3000/callback
```

7. W `Authentication` → `Providers` włącz Google.

8. W Google Cloud Console do konfiguracji klienta OAuth dodaj autoryzowany URI przekierowania:

```text
https://<your-supabase-project>.supabase.co/auth/v1/callback
```

   Zwykle to jest adres twojego projektu Supabase, np. `https://fisaovbpgchthqoasvet.supabase.co/auth/v1/callback`.

Po deployu trzeba będzie dodać też adres produkcyjny Vercel i zapisać go w Supabase oraz Google Cloud.

## Migracje

Migracje do uruchomienia:

```text
supabase/migrations/0001_atlas_core.sql
supabase/migrations/0002_seed_startowy.sql
supabase/migrations/0003_poranny_briefing_constraints.sql
```

Na start możesz wkleić je ręcznie w Supabase SQL Editor i uruchomić po kolei.

Docelowo lepiej użyć Supabase CLI:

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push
```

## Test po konfiguracji

1. Uruchom aplikację:

```bash
npm run dev
```

2. Otwórz:

```text
http://localhost:3000/login
```

3. Zaloguj się kontem Google.
4. Po powrocie powinieneś trafić na:

```text
/command
```

5. Kliknij:

```text
Zainicjalizuj dane startowe
```

Po tym w Supabase powinny istnieć dane w tabelach:

- `profiles`
- `misje`
- `sezony`
- `domeny`
- `dni`
- `questy`
- `kpi`
- `ryzyka`

## Ważne

Nie używaj `service_role` w aplikacji frontendowej ani w `.env.local` dla Next.js.

Do aplikacji trafiają tylko:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
