# SPRINT-008 — ryzyka

## Cel

Użytkownik może zapisać aktywne ryzyko, zobaczyć jego szczegóły i szybko zamienić rekomendowaną reakcję w ruch dnia.

## Zakres

- Route `/ryzyka`.
- Route `/ryzyka/nowy`.
- Route `/ryzyka/[id]`.
- Lista ryzyk.
- Szczegóły ryzyka.
- Tworzenie ryzyka.
- Dodanie ryzyka jako ruch dnia.
- Ignorowanie ryzyka.
- Oznaczenie ryzyka jako rozwiązane.

## Decyzje

- Ryzyko musi mieć `rekomendowany_ruch`.
- Nowe ryzyko startuje ze statusem `aktywne`.
- `Dodaj jako ruch dnia` tworzy planowany ruch z `utworzone_z = z_ryzyka`.
- Dodanie ryzyka jako ruch dnia respektuje limit 3 ruchów dnia.
- Sprint korzysta z istniejących tabel `ryzyka`, `dni` i `ruchy_dnia`; nie dodano nowej migracji.
- Route `/ryzyka/nowy` dodano jako ekran pomocniczy do tworzenia ryzyka, mimo że roadmapa wymienia tylko listę i szczegóły.

## Poza zakresem

- Powiązanie ryzyka z KPI.
- Automatyczne wyzwalanie ryzyk z reguł.
- Historia zmian statusu ryzyka.
- Zaawansowana priorytetyzacja ryzyk.

## Weryfikacja

```bash
npm run build
```
