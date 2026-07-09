# AGENTS.md — instrukcje dla Codexa: ATLAS HQ

## Rola Codexa

Jesteś senior full-stack engineerem pracującym nad prywatną aplikacją webową `ATLAS HQ`.

Masz budować ostrożnie, etapami i zgodnie z dokumentacją w katalogu `docs/`.

Nie wymyślaj nowej wizji produktu.  
Nie zamieniaj ATLAS HQ w task manager, Notion, CRM ani aplikację do wszystkiego.

## Czym jest ATLAS HQ

ATLAS HQ to osobiste Mission Control.

Cel produktu:

> Pomóc użytkownikowi codziennie podejmować lepsze decyzje o zdrowiu, sporcie, karierze, finansach i budowie firmy, pokazując tylko informacje wymagające działania.

Najważniejsza pętla produktu:

```text
poranny briefing
→ 3 ruchy dnia
→ wykonanie
→ wieczorny debrief
→ aktualizacja Command Center
```

## Język

Całość UI, dokumentacji produktowej, nazw widocznych dla użytkownika i mikrocopy ma być po polsku.

Techniczne identyfikatory mogą być bez polskich znaków:

- route: `/ruchy-dnia`
- tabela: `ruchy_dnia`
- komponent: `RuchDniaCard`
- typ: `RuchDnia`

## Stack

Preferowany stack:

- Next.js
- TypeScript
- Supabase / PostgreSQL
- Tailwind CSS
- shadcn/ui
- Vercel

## Najważniejsze pliki kontekstowe

Przed większym zadaniem przeczytaj:

1. `docs/00-kontekst-produktu.md`
2. `docs/01-ux-blueprint.md`
3. `docs/06-plan-implementacji.md`
4. `docs/07-specyfikacja-techniczna.md`
5. `docs/08-backlog.md`

Przy bazie danych czytaj:

- `docs/03-model-bazy.md`
- `supabase/migrations/0001_atlas_core.sql`

Przy UI czytaj:

- `docs/05-design-system.md`
- `docs/09-plan-sprintow-i-upgrade.md` — aktualny status sprintu i priorytety

Przy flow czytaj:

- `docs/04-flow-uzytkownika.md`

## Zasady produktu

1. ATLAS HQ jest dashboardem decyzji, nie dashboardem informacji.
2. Home screen nazywa się `Command Center`.
3. Maksymalnie 3 ruchy dnia.
4. Maksymalnie 3 aktywne questy.
5. Każdy KPI musi mieć decyzję lub próg działania.
6. Discovery przechowuje problemy rynkowe, nie pomysły na aplikacje.
7. Projekt biznesowy nie może przejść do MVP bez dowodów.
8. Relacje są tylko logistyką kontaktu, bez analizy ludzi.
9. Sport nie może maskować braku progresu w karierze/discovery.
10. Zdrowie/readiness może ograniczać ambicję dnia.

## Zakres pierwszej wersji

Buduj najpierw v0.1.

Musi działać:

- logowanie,
- seed danych startowych,
- `/command`,
- poranny briefing,
- 3 ruchy dnia,
- wieczorny debrief,
- questy,
- ryzyka,
- proste Discovery: problemy + dowody.

Nie koduj na początku:

- pełnych finansów,
- pełnego sport logu,
- relacji,
- learningu,
- AI coacha,
- integracji,
- zaawansowanych wykresów,
- mobile app.

## Styl UI

Kierunek: `ATLAS Command UI`.

- ciemny,
- strategiczny,
- decyzyjny,
- czytelny,
- lekko growy,
- bez infantylnej gamifikacji.

Komunikaty mają być krótkie i operacyjne.

Dobre:
> Discovery stoi. Dzisiaj potrzebny kontakt z rynkiem.

Złe:
> Nie poddawaj się! Jesteś zwycięzcą!

## Zasady kodowania

- Nie rób jednej tabeli `items`.
- Nie rób zbyt ogólnego modelu.
- Preferuj czytelne, małe komponenty.
- Oddzielaj `queries`, `actions`, `scoring`, `components`.
- Zostawiaj proste typy i jasne enumy.
- Nie overengineeringuj.
- Przy zmianach większych niż jeden plik najpierw napisz krótki plan.
- Po zmianach podaj, co zostało zrobione i co jest następnym krokiem.

## Priorytet techniczny

Kolejność budowy:

1. Setup projektu.
2. Auth.
3. Migracja bazy.
4. Seed danych.
5. Layout aplikacji.
6. Command Center.
7. Poranny briefing.
8. Ruchy dnia.
9. Wieczorny debrief.
10. Questy.
11. Ryzyka.
12. Discovery.

## Definicja sukcesu v0.1

Aplikacja działa, jeśli użytkownik może:

1. Zalogować się.
2. Zobaczyć Command Center.
3. Zrobić poranny briefing.
4. Wybrać 3 ruchy dnia.
5. Oznaczyć ruchy jako wykonane/pominięte.
6. Zamknąć dzień debriefem.
7. Widzieć aktywne questy.
8. Widzieć top ryzyko.
9. Dodać problem discovery.
10. Dodać dowód do problemu.

