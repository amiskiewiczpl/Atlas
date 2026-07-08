# SPRINT-003 — ruchy dnia

## Cel

Użytkownik wybiera maksymalnie 3 konkretne ruchy dnia po porannym briefingu.

## Zakres

- Route `/ruchy-dnia/nowy`.
- Formularz ruchu dnia:
  - tytuł,
  - domena,
  - typ,
  - wpływ,
  - wysiłek.
- Powiązanie ruchu z dzisiejszym dniem.
- Powiązanie ruchu z domeną.
- Limit 3 ruchów dnia.
- Panel `DailyMovesPanel` na `/command`.
- Przekierowanie po porannym briefingu do `/ruchy-dnia/nowy`.

## Decyzje

- Limit 3 ruchów jest egzekwowany w server action i w UI.
- Status nowego ruchu to `planowany`.
- Źródło nowego ruchu to `recznie`.
- Sprint nie obejmuje jeszcze zmiany statusu ruchu; to zakres SPRINT-004.

## Weryfikacja

```bash
npm run build
```
