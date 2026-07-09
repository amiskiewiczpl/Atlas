# ATLAS HQ — plan kolejnych sprintów po wstępnej implementacji

## Kontekst

W aktualnym kodzie aplikacja ma już działającą pętlę produktową oraz pierwsze warstwy rozszerzeń:
- logowanie i sesja użytkownika
- poranny briefing z zapisem dnia i check-inem
- wybór i wykonanie maksymalnie 3 ruchów dnia
- wieczorny debrief zamykający dzień
- Command Center z kluczowymi panelami
- questy i ryzyka
- discovery, dowody i confidence score
- strony domen i weekly review

Dlatego kolejne sprinty powinny przejść od budowy funkcji do ich stabilizacji, jakości oraz realnego doświadczenia użytkownika.

## Aktualny stan funkcjonalny

- `v0.1` — zrealizowany: briefing → ruchy → wykonanie → debrief → Command Center
- `v0.2` — zrealizowany: questy i ryzyka jako pierwsze rozszerzenia
- `v0.3` — zrealizowany: Discovery MVP z problemami, dowodami i confidence score
- `v0.4` — zrealizowany: Domeny (`LifeRadar`, `LifeHeatmap`) i `weekly review`

Warto odnotować, że w kodzie:
- `/discovery/problemy/[id]` ma wbudowany formularz dodawania dowodu, zamiast osobnej trasy `/dowody/nowy`
- `/domeny` i `/review` są już dostępne jako osobne ekrany
- `/questy/[id]` oraz `/ryzyka/[id]` są obecne fizycznie w repozytorium

## Priorytet następnych sprintów

### Sprint 1 — jakość danych i spójność produktu

Cel: upewnić się, że obecny flow jest stabilny, sensowny i nie miesza danych między użytkownikami.

Zakres:
- weryfikacja i naprawa filtrów `user_id` w `lib/queries/*`
- upewnienie się, że `Command Center` korzysta tylko z danych bieżącego użytkownika
- sprawdzenie widoków `SystemStatusPanel`, `DailyMovesPanel`, `KpiStrip` i poprawa pustych stanów
- wyłapanie miejsc, gdzie kod wyświetla dane domyślne zamiast komunikatów typu "brak danych"
- dodać prosty QA flow:
  - poranny briefing
  - wybór 3 ruchów
  - wykonanie/pominięcie ruchu
  - wieczorny debrief

Wynik:
- stabilna implementacja obecnych funkcji
- brak przecieków danych między kontami
- jasne sygnały stanu w UI

#### Stan Sprintu 1

- [x] naprawa filtrów `user_id` w `lib/queries/questy.ts`, `ryzyka.ts`, `problemy.ts`, `domeny.ts`
- [x] doprecyzowanie typów w `app/(app)/questy/nowy/page.tsx`, `app/(app)/ryzyka/page.tsx`, `app/(app)/domeny/page.tsx`, `app/(app)/discovery/page.tsx`
- [x] naprawa typów Supabase w `lib/actions/questy.ts`
- [x] potwierdzenie kompilacji przez `npm run build`
- [x] przegląd paneli `SystemStatusPanel`, `DailyMovesPanel`, `KpiStrip` w kierunku pustych stanów
- [x] dodanie standardowych komunikatów „brak danych” w krytycznych widokach

> Sprint 1 został zamknięty. Dane są już scentralizowane na użytkowniku, typy i kompilacja są poprawne, a Command Center ma komunikaty pustych stanów tam, gdzie nie ma jeszcze danych.

### Sprint 2 — onboarding i pierwsze użycie

Cel: zmniejszyć tarcie pierwszego użycia i poprowadzić użytkownika przez pętlę.

Zakres:
- onboarding w formie tekstów/tooltipów na kluczowych ekranach
- seed danych startowych dla nowego użytkownika
- proste instrukcje w `Command Center`, `briefing`, `ruchy-dnia`, `debrief`
- nawigacja „następny krok” w głównym flow
- ujednolicenie copy i komunikatów w całej aplikacji

Stan Sprintu 2:
- [x] dodanie onboardingowego panelu w `Command Center`
- [x] dodanie instrukcji następnego kroku w `PorannyBriefing`
- [x] dodanie instrukcji działania w `RuchyDnia`
- [x] dopisanie instrukcji zamknięcia dnia w `WieczornyDebrief`
- [x] seed danych startowych dostępny przez Command Center

Wynik:
- nowy użytkownik wie, co zrobić jako pierwszy
- zmniejszone tarcie między ekranami
- silniejsza narracja „co dalej” w pętli dnia
- dostępny punkt startowy dla nowego użytkownika przez seed danych

> Sprint 2 został ukończony. Onboarding i seed danych startowych są zaimplementowane w głównym flow.

### Sprint 3 — sygnały decyzji i MVP packaging

Cel: wykorzystać istniejące moduły do budowy spójnego MVP, a nie dodawać kolejny nowy ekran.

Zakres:
- połączyć questy / ryzyka / discovery z Command Center jako sygnały
- dodać jasne rekomendacje na ekranie dnia (np. "najważniejsze ryzyko", "dowód do zebrania")
- dopracować `Domeny` i `KPI` jako wsparcie decyzji, nie tylko jako widoki
- przygotować `README` / `docsy` do prezentacji MVP
- zweryfikować spójność tras i route names względem wspólnej narracji produktu

Wynik:
- produkt gotowy do prezentacji jako MVP
- roadmapa na kolejny poziom jasna i oparta na rzeczywistej wartości
- mniej funkcji „na pół gwizdka”, więcej dopracowanych sygnałów

## Propozycja wersjonowania

- `v0.1` — działająca pętla dnia
- `v0.2` — stabilna jakość danych i UI decyzji
- `v0.3` — questy/ryzyka/discovery jako wartość strategiczna
- `v0.4` — domeny i tygodniowy przegląd
- `v1.0` — MVP z klarowną pętlą wartości, onboardingiem i sygnałami do decyzji

## Rekomendacja

Na tym etapie najlepsza ścieżka to:
1. dopracować to, co już działa,
2. upewnić się, że użytkownik trafia do wartościowych sygnałów,
3. potem dodać tylko kolejne moduły, które realnie wzmacniają tę pętlę.

Jeżeli chcesz, mogę teraz zaktualizować też `atlas_hq_codex_pack/README.md` i `MANIFEST.txt`, aby nowy plan był uwzględniony w pakiecie dokumentów.