-- ATLAS HQ v0.1 — migracja startowa
-- PostgreSQL / Supabase

create extension if not exists "pgcrypto";

create type status_koloru as enum (
  'zielony',
  'zolty',
  'pomaranczowy',
  'czerwony',
  'krytyczny',
  'szary'
);

create type waga_strategiczna as enum (
  'niska',
  'srednia',
  'wysoka',
  'krytyczna'
);

create type trend as enum (
  'w_gore',
  'plasko',
  'w_dol',
  'brak_danych'
);

create type status_sezonu as enum (
  'planowany',
  'aktywny',
  'zakonczony',
  'zarchiwizowany'
);

create type tryb_dnia as enum (
  'ofensywa',
  'stabilizacja',
  'recovery'
);

create type typ_check_inu as enum (
  'poranny',
  'wieczorny'
);

create type status_ciala as enum (
  'dobry',
  'ok',
  'slaby',
  'kontuzja',
  'choroba'
);

create type status_glowy as enum (
  'spokojny',
  'skupiony',
  'chaotyczny',
  'niski',
  'zestresowany'
);

create type typ_questu as enum (
  'main',
  'aktywny',
  'side'
);

create type status_questu as enum (
  'backlog',
  'aktywny',
  'zablokowany',
  'zakonczony',
  'zabity',
  'zarchiwizowany',
  'stary'
);

create type typ_ruchu as enum (
  'zdrowie',
  'sport',
  'kariera',
  'finanse',
  'discovery',
  'projekt',
  'relacje',
  'learning',
  'recovery',
  'administracyjne'
);

create type poziom as enum (
  'niski',
  'sredni',
  'wysoki'
);

create type status_ruchu as enum (
  'planowany',
  'wykonany',
  'pominiety',
  'przeniesiony',
  'anulowany'
);

create type zrodlo_ruchu as enum (
  'recznie',
  'z_ryzyka',
  'z_questu',
  'z_przegladu',
  'z_kpi'
);

create type typ_ryzyka as enum (
  'zdrowie',
  'sport',
  'kariera',
  'finanse',
  'discovery',
  'projekt',
  'focus',
  'wypalenie',
  'relacje',
  'learning'
);

create type powaga_ryzyka as enum (
  'niska',
  'srednia',
  'wysoka',
  'krytyczna'
);

create type status_ryzyka as enum (
  'nieaktywne',
  'aktywne',
  'rozwiazane',
  'zignorowane'
);

create type zrodlo_ryzyka as enum (
  'kpi',
  'manualne',
  'review',
  'system'
);

create type okres_kpi as enum (
  'dzienny',
  'tygodniowy',
  'miesieczny',
  'sezonowy'
);

create type typ_zrodla as enum (
  'manualne',
  'wyliczane',
  'importowane'
);

create type czestotliwosc_problemu as enum (
  'codziennie',
  'tygodniowo',
  'miesiecznie',
  'kwartalnie',
  'rzadko',
  'nieznane'
);

create type willingness_to_pay as enum (
  'nieznane',
  'brak',
  'slabe',
  'srednie',
  'mocne',
  'potwierdzone'
);

create type status_problemu as enum (
  'obserwacja',
  'hipoteza_problemu',
  'wywiady',
  'powtarzalny_wzorzec',
  'mocny_bol',
  'sygnal_platnosci',
  'kandydat_mvp',
  'aktywny_bet',
  'zabity'
);

create type typ_dowodu as enum (
  'cytat',
  'wywiad',
  'zachowanie',
  'platnosc',
  'konkurencja',
  'czestotliwosc',
  'bol',
  'odrzucenie',
  'sygnal_rynku',
  'obejscie'
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table misje (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  nazwa text not null,
  opis text,
  aktywna boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table sezony (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  misja_id uuid references misje(id) on delete set null,
  nazwa text not null,
  motyw text not null,
  data_start date not null,
  data_koniec date not null,
  status status_sezonu not null default 'planowany',
  definicja_sukcesu text,
  main_quest_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table domeny (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  nazwa text not null,
  opis text,
  waga_strategiczna waga_strategiczna not null default 'srednia',
  aktywny_score integer check (aktywny_score between 0 and 100),
  trend trend not null default 'brak_danych',
  status status_koloru not null default 'szary',
  kolejnosc integer not null default 0,
  aktywna boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table dni (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  data date not null,
  tryb_dnia tryb_dnia not null default 'stabilizacja',
  readiness_score integer check (readiness_score between 0 and 100),
  focus_score integer check (focus_score between 0 and 100),
  momentum_score integer check (momentum_score between 0 and 100),
  top_ryzyko_id uuid,
  najwiekszy_progres text,
  najwiekszy_bloker text,
  zamkniety boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, data)
);

create table check_iny (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  dzien_id uuid not null references dni(id) on delete cascade,
  typ typ_check_inu not null,
  energia integer check (energia between 1 and 10),
  sen_godziny numeric check (sen_godziny >= 0 and sen_godziny <= 24),
  status_ciala status_ciala,
  status_glowy status_glowy,
  tryb_dnia tryb_dnia,
  najwieksze_ryzyko text,
  najwiekszy_progres text,
  najwiekszy_problem text,
  sygnal_na_jutro text,
  krotki_debrief text,
  created_at timestamptz not null default now()
);

create table questy (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  sezon_id uuid references sezony(id) on delete set null,
  domena_id uuid not null references domeny(id) on delete restrict,
  tytul text not null,
  opis text,
  typ typ_questu not null default 'aktywny',
  status status_questu not null default 'backlog',
  postep integer not null default 0 check (postep between 0 and 100),
  data_start date,
  data_cel date,
  metryka_sukcesu text,
  nastepna_akcja text,
  bloker text,
  powod_zabicia text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table kpi (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  domena_id uuid not null references domeny(id) on delete cascade,
  nazwa text not null,
  opis text,
  jednostka text not null,
  okres okres_kpi not null,
  wartosc_aktualna numeric,
  wartosc_docelowa numeric,
  trend trend not null default 'brak_danych',
  status status_koloru not null default 'szary',
  regula_decyzyjna text not null,
  typ_zrodla typ_zrodla not null default 'manualne',
  aktywne boolean not null default true,
  kolejnosc integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ryzyka (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  domena_id uuid not null references domeny(id) on delete restrict,
  kpi_id uuid references kpi(id) on delete set null,
  tytul text not null,
  opis text,
  typ typ_ryzyka not null,
  powaga powaga_ryzyka not null default 'srednia',
  status status_ryzyka not null default 'aktywne',
  zrodlo_wyzwolenia zrodlo_ryzyka not null default 'manualne',
  regula_wyzwolenia text,
  rekomendowany_ruch text,
  aktywne_od timestamptz default now(),
  rozwiazane_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table problemy (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  tytul text not null,
  segment text not null,
  opis text,
  czestotliwosc czestotliwosc_problemu not null default 'nieznane',
  pain_score integer check (pain_score between 1 and 10),
  willingness_to_pay willingness_to_pay not null default 'nieznane',
  obecne_obejscie text,
  konkurencja text,
  moja_przewaga text,
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  status status_problemu not null default 'hipoteza_problemu',
  nastepny_krok_walidacji text,
  powod_zabicia text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table ruchy_dnia (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  dzien_id uuid not null references dni(id) on delete cascade,
  domena_id uuid not null references domeny(id) on delete restrict,
  quest_id uuid references questy(id) on delete set null,
  problem_id uuid references problemy(id) on delete set null,
  tytul text not null,
  typ typ_ruchu not null,
  wplyw poziom not null default 'sredni',
  wysilek poziom not null default 'sredni',
  status status_ruchu not null default 'planowany',
  powod_pominiecia text,
  utworzone_z zrodlo_ruchu not null default 'recznie',
  kolejnosc integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table dowody (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  problem_id uuid not null references problemy(id) on delete cascade,
  typ typ_dowodu not null,
  zrodlo text,
  tresc text not null,
  sila integer not null default 1 check (sila between 1 and 5),
  data_dowodu date not null default current_date,
  created_at timestamptz not null default now()
);

create index idx_dni_user_data on dni(user_id, data);
create index idx_ruchy_dnia_dzien on ruchy_dnia(dzien_id);
create index idx_ruchy_dnia_user_status on ruchy_dnia(user_id, status);
create index idx_questy_user_status on questy(user_id, status);
create index idx_ryzyka_user_status on ryzyka(user_id, status);
create index idx_problemy_user_status on problemy(user_id, status);
create index idx_dowody_problem on dowody(problem_id);
create index idx_kpi_user_domena on kpi(user_id, domena_id);

-- RLS
alter table profiles enable row level security;
alter table misje enable row level security;
alter table sezony enable row level security;
alter table domeny enable row level security;
alter table dni enable row level security;
alter table check_iny enable row level security;
alter table questy enable row level security;
alter table kpi enable row level security;
alter table ryzyka enable row level security;
alter table problemy enable row level security;
alter table ruchy_dnia enable row level security;
alter table dowody enable row level security;

create policy "Uzytkownik widzi swoj profil"
on profiles for select using (auth.uid() = id);

create policy "Uzytkownik edytuje swoj profil"
on profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Polityki ogólne dla tabel z user_id.
-- W Supabase można je doprecyzować per tabela, ale ten wzorzec jest startowo OK.

create policy "Wlasne misje select" on misje for select using (auth.uid() = user_id);
create policy "Wlasne misje insert" on misje for insert with check (auth.uid() = user_id);
create policy "Wlasne misje update" on misje for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne misje delete" on misje for delete using (auth.uid() = user_id);

create policy "Wlasne sezony select" on sezony for select using (auth.uid() = user_id);
create policy "Wlasne sezony insert" on sezony for insert with check (auth.uid() = user_id);
create policy "Wlasne sezony update" on sezony for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne sezony delete" on sezony for delete using (auth.uid() = user_id);

create policy "Wlasne domeny select" on domeny for select using (auth.uid() = user_id);
create policy "Wlasne domeny insert" on domeny for insert with check (auth.uid() = user_id);
create policy "Wlasne domeny update" on domeny for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne domeny delete" on domeny for delete using (auth.uid() = user_id);

create policy "Wlasne dni select" on dni for select using (auth.uid() = user_id);
create policy "Wlasne dni insert" on dni for insert with check (auth.uid() = user_id);
create policy "Wlasne dni update" on dni for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne dni delete" on dni for delete using (auth.uid() = user_id);

create policy "Wlasne check_iny select" on check_iny for select using (auth.uid() = user_id);
create policy "Wlasne check_iny insert" on check_iny for insert with check (auth.uid() = user_id);
create policy "Wlasne check_iny update" on check_iny for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne check_iny delete" on check_iny for delete using (auth.uid() = user_id);

create policy "Wlasne questy select" on questy for select using (auth.uid() = user_id);
create policy "Wlasne questy insert" on questy for insert with check (auth.uid() = user_id);
create policy "Wlasne questy update" on questy for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne questy delete" on questy for delete using (auth.uid() = user_id);

create policy "Wlasne kpi select" on kpi for select using (auth.uid() = user_id);
create policy "Wlasne kpi insert" on kpi for insert with check (auth.uid() = user_id);
create policy "Wlasne kpi update" on kpi for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne kpi delete" on kpi for delete using (auth.uid() = user_id);

create policy "Wlasne ryzyka select" on ryzyka for select using (auth.uid() = user_id);
create policy "Wlasne ryzyka insert" on ryzyka for insert with check (auth.uid() = user_id);
create policy "Wlasne ryzyka update" on ryzyka for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne ryzyka delete" on ryzyka for delete using (auth.uid() = user_id);

create policy "Wlasne problemy select" on problemy for select using (auth.uid() = user_id);
create policy "Wlasne problemy insert" on problemy for insert with check (auth.uid() = user_id);
create policy "Wlasne problemy update" on problemy for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne problemy delete" on problemy for delete using (auth.uid() = user_id);

create policy "Wlasne ruchy_dnia select" on ruchy_dnia for select using (auth.uid() = user_id);
create policy "Wlasne ruchy_dnia insert" on ruchy_dnia for insert with check (auth.uid() = user_id);
create policy "Wlasne ruchy_dnia update" on ruchy_dnia for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne ruchy_dnia delete" on ruchy_dnia for delete using (auth.uid() = user_id);

create policy "Wlasne dowody select" on dowody for select using (auth.uid() = user_id);
create policy "Wlasne dowody insert" on dowody for insert with check (auth.uid() = user_id);
create policy "Wlasne dowody update" on dowody for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Wlasne dowody delete" on dowody for delete using (auth.uid() = user_id);
