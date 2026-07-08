# ATLAS HQ — Design System

## Nazwa stylu

`ATLAS Command UI`

Hasło:

> Ciemny kokpit. Jasne decyzje.

## Charakter

- ciemny,
- strategiczny,
- decyzyjny,
- sportowo-operacyjny,
- lekko growy,
- profesjonalny.

Bliżej:

- Linear,
- Raycast,
- Arc,
- Mission Control,
- profesjonalny dashboard.

Nie:

- Notion dark mode,
- Excel z neonem,
- infantylne RPG,
- motywacyjna aplikacja z odznakami.

## Paleta

### Tła

```css
--bg-base: #070A0F;
--bg-panel: #0D111A;
--bg-card: #121826;
--bg-card-hover: #172033;
```

### Obramowania

```css
--border-subtle: #263247;
--border-strong: #3A4A66;
```

### Tekst

```css
--text-primary: #F4F7FB;
--text-secondary: #AAB4C5;
--text-muted: #6F7D94;
```

### Akcenty

```css
--accent-primary: #3B82F6;
--accent-cyan: #22D3EE;
--accent-violet: #8B5CF6;
--accent-gold: #FBBF24;
```

### Statusy

```css
--status-green: #22C55E;
--status-yellow: #FACC15;
--status-orange: #FB923C;
--status-red: #EF4444;
--status-critical: #DC2626;
--status-gray: #64748B;
```

## Komponenty v0.1

- AppShell
- Sidebar
- TopBar
- AtlasPanel
- StatusBadge
- MissionPanel
- MainQuestPanel
- SystemStatusPanel
- DailyMovesPanel
- RiskPanel
- KpiStrip
- QuestCard
- RuchDniaCard
- ProblemCard
- LifeRadar
- LifeHeatmap

## Język UI

Krótki, konkretny, operacyjny.

Dobre:

> Discovery stoi. Dzisiaj potrzebny kontakt z rynkiem.

> Readiness niskie. Zmniejsz plan dnia.

> Ten problem nie ma jeszcze dowodów. Nie buduj MVP.

Złe:

> Nie poddawaj się! Dasz radę!

> Jesteś zwycięzcą swojego życia!

## Reguły

1. Jeden główny przycisk na ekran.
2. Czerwony tylko dla rzeczy wymagających reakcji.
3. KPI musi mieć decyzję.
4. RiskCard zawsze ma akcję.
5. RuchDniaCard musi zaczynać się czasownikiem.
6. Puste ekrany mają mówić, co zrobić dalej.
