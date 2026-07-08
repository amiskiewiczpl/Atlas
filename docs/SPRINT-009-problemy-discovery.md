# SPRINT-009 — problemy Discovery

## Cel

Discovery przechowuje problemy rynkowe i segmenty, nie pomysły na produkt.

## Zakres

- Route `/discovery`.
- Route `/discovery/problemy/nowy`.
- Route `/discovery/problemy/[id]`.
- Lista problemów.
- Formularz problemu.
- Szczegóły problemu.
- Zapis problemu w tabeli `problemy`.

## Decyzje

- Nowy problem startuje ze statusem `hipoteza_problemu`.
- `confidence_score` zostaje na `0`; wyliczanie confidence jest zakresem Sprintu 010.
- Sprint nie dodaje dowodów.
- Sprint nie dodaje akcji `Zabij problem`.
- Sprint korzysta z istniejącej tabeli `problemy`; nie dodano nowej migracji.

## Poza zakresem

- Dodawanie dowodów.
- Wyliczanie confidence score.
- Braki do `kandydat_mvp`.
- Akcja `Zabij problem`.
- Powiązanie problemu z ruchem dnia.

## Weryfikacja

```bash
npm run build
```
