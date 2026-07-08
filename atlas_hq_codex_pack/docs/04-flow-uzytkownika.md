# ATLAS HQ — flow użytkownika

## Główne rytmy

```text
RANO     → decyzja operacyjna
WIECZÓR  → zamknięcie dnia
TYDZIEŃ  → korekta strategii
```

## Flow 1 — Poranny briefing

Cel:

> Ustawić tryb dnia i 3 ruchy.

Kroki:

1. Użytkownik otwiera `/command`.
2. Klika `Rozpocznij briefing`.
3. Wpisuje:
   - sen,
   - energię,
   - status ciała,
   - status głowy,
   - największe ryzyko.
4. System liczy readiness.
5. System proponuje tryb dnia.
6. Użytkownik wybiera 3 ruchy dnia.
7. System zapisuje dzień i wraca do Command Center.

## Flow 2 — Ruchy dnia

Ruch dnia musi być konkretny.

Maksymalnie 3 ruchy dziennie.

Jeśli użytkownik próbuje dodać 4. ruch:

> Limit: 3 ruchy dnia. Dodanie kolejnego rozmyje priorytet.

## Flow 3 — Wieczorny debrief

Cel:

> Zamknąć dzień i dać systemowi dane na jutro.

Kroki:

1. Użytkownik klika `Zamknij dzień`.
2. Widzi 3 ruchy dnia.
3. Oznacza każdy:
   - wykonany,
   - pominięty,
   - przeniesiony,
   - anulowany.
4. Wpisuje:
   - energię wieczorem,
   - największy progres,
   - największy problem,
   - sygnał na jutro.
5. System zamyka dzień.

## Flow 4 — Reakcja na ryzyko

Ryzyko musi mieć rekomendowany ruch.

Przykład:

Ryzyko:
> Discovery stoi — 7 dni bez rozmowy z rynkiem.

Rekomendacja:
> Napisać do 2 osób z segmentu.

Akcje:

- Dodaj jako ruch dnia.
- Ignoruj.
- Oznacz jako rozwiązane.

## Flow 5 — Dodanie problemu discovery

Nie dodajemy pomysłu.

Dodajemy problem:

- kto go ma,
- co boli,
- jak często,
- jak dziś sobie radzi,
- czy płaci,
- jaka jest konkurencja,
- jaka jest moja przewaga,
- jaki jest następny krok walidacji.

## Flow 6 — Dodanie dowodu

Dowód może być pozytywny albo negatywny.

Typy:

- cytat,
- zachowanie,
- płatność,
- obejście,
- konkurencja,
- odrzucenie.

Po dodaniu dowodu system aktualizuje confidence score.

## Flow 7 — Zabicie problemu / questu

Zabicie nie jest porażką.

To decyzja strategiczna.

Powody:

- brak bólu,
- brak WTP,
- za mały rynek,
- zła przewaga,
- brak sensu strategicznego,
- konkurencja wystarcza.

System powinien zapisać powód zabicia, żeby temat nie wracał jako zombie.
