# SPRINT-004 — wykonanie ruchów

## Cel

Użytkownik może prowadzić dzień przez statusy zaplanowanych ruchów i utrzymać Command Center w aktualnym stanie.

## Zakres

- Route `/ruchy-dnia`.
- Lista dzisiejszych ruchów.
- Zmiana statusu ruchu:
  - `wykonany`,
  - `pominiety`,
  - `przeniesiony`,
  - `anulowany`.
- Powód pominięcia dla statusu `pominiety`.
- Aktualizacja danych na `/command` po zmianie statusu.
- Wejście `Ruchy dnia` w sidebarze prowadzi do widoku wykonania.

## Decyzje

- Sprint korzysta z istniejącej tabeli `ruchy_dnia` i kolumny `powod_pominiecia`.
- Nie dodano nowej migracji Supabase.
- Status `planowany` zostaje statusem startowym, ale nie jest przywracany w widoku wykonania.
- Powód pominięcia jest wymagany tylko przy statusie `pominiety`; przy innych statusach jest czyszczony.

## Poza zakresem

- Edycja treści ruchu dnia.
- Przekładanie ruchu na konkretny kolejny dzień.
- Wieczorny debrief.
- Zaawansowane statystyki wykonania.

## Weryfikacja

```bash
npm run build
```
