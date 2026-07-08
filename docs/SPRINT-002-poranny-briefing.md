# SPRINT-002 — poranny briefing

## Cel

Pierwszy krok dziennej pętli ATLAS HQ: użytkownik zapisuje poranny check-in, a system wylicza readiness i tryb dnia.

## Zakres

- Route `/briefing/poranny`.
- Formularz check-inu:
  - sen,
  - energia,
  - status ciała,
  - status głowy,
  - największe ryzyko.
- Scoring readiness zgodny z `docs/07-specyfikacja-techniczna.md`.
- Wyznaczenie trybu dnia:
  - `ofensywa`,
  - `stabilizacja`,
  - `recovery`.
- Zapis lub aktualizacja rekordu w `dni`.
- Zapis lub aktualizacja porannego rekordu w `check_iny`.
- Wejście `Rozpocznij briefing` z `/command`.

## Migracje

Dodano:

```text
supabase/migrations/0003_poranny_briefing_constraints.sql
```

Migracja dodaje unikalność:

```text
check_iny(user_id, dzien_id, typ)
```

Dzięki temu ponowny poranny briefing tego samego dnia aktualizuje wpis zamiast tworzyć duplikaty.

## Poza zakresem

- Tworzenie 3 ruchów dnia.
- Edycja ruchów dnia.
- Wieczorny debrief.
- Panele Command Center.

## Weryfikacja

```bash
npm run build
```
