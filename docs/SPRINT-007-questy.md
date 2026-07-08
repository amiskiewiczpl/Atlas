# SPRINT-007 — questy

## Cel

Użytkownik może zarządzać strategicznymi questami i utrzymać limit maksymalnie 3 aktywnych kierunków.

## Zakres

- Route `/questy`.
- Route `/questy/nowy`.
- Route `/questy/[id]`.
- Lista questów.
- Szczegóły questu.
- Tworzenie questu.
- Zmiana statusu questu.
- Limit 3 aktywnych questów.
- Wejście `Questy` w sidebarze.

## Decyzje

- Nowy quest startuje ze statusem `aktywny`.
- Limit 3 dotyczy questów ze statusem `aktywny`.
- Quest jest przypisywany do aktywnego sezonu, jeżeli taki istnieje.
- Sprint korzysta z istniejącej tabeli `questy`; nie dodano nowej migracji.

## Poza zakresem

- Edycja wszystkich pól questu po utworzeniu.
- Aktualizacja postępu questu.
- Automatyczne ustawianie main questu sezonu.
- Dodawanie questu jako ruch dnia.

## Weryfikacja

```bash
npm run build
```
