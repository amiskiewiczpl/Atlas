# SPRINT-005 — wieczorny debrief

## Cel

Użytkownik zamyka dzień, zapisuje najważniejsze wnioski i daje systemowi sygnał na jutro.

## Zakres

- Route `/debrief/wieczorny`.
- Widok dzisiejszych ruchów dnia.
- Oznaczanie statusów ruchów z poziomu debriefu.
- Formularz wieczornego debriefu:
  - energia wieczorem,
  - największy progres,
  - największy problem,
  - sygnał na jutro.
- Zapis wieczornego check-inu w `check_iny`.
- Aktualizacja rekordu `dni`.
- Zamknięcie dnia przez `dni.zamkniety = true`.
- Wejście `Zamknij dzień` z `/command`.

## Decyzje

- Sprint korzysta z istniejących pól `check_iny` i `dni`; nie dodano nowej migracji.
- `najwiekszy_problem` z debriefu zapisuje się też jako `dni.najwiekszy_bloker`.
- Ponowny zapis debriefu aktualizuje wieczorny check-in tego samego dnia.
- Zamknięcie dnia nie nadpisuje porannego `tryb_dnia`.

## Poza zakresem

- Automatyczna walidacja, że każdy ruch ma status końcowy przed zamknięciem.
- Zaawansowane podsumowania dnia.
- Weekly review.
- Command Center v0.1.

## Weryfikacja

```bash
npm run build
```
