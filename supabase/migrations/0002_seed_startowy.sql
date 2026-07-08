-- ATLAS HQ v0.1 — seed danych startowych

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
before update on profiles
for each row execute function public.set_updated_at();

drop trigger if exists misje_set_updated_at on misje;
create trigger misje_set_updated_at
before update on misje
for each row execute function public.set_updated_at();

drop trigger if exists sezony_set_updated_at on sezony;
create trigger sezony_set_updated_at
before update on sezony
for each row execute function public.set_updated_at();

drop trigger if exists domeny_set_updated_at on domeny;
create trigger domeny_set_updated_at
before update on domeny
for each row execute function public.set_updated_at();

drop trigger if exists dni_set_updated_at on dni;
create trigger dni_set_updated_at
before update on dni
for each row execute function public.set_updated_at();

drop trigger if exists questy_set_updated_at on questy;
create trigger questy_set_updated_at
before update on questy
for each row execute function public.set_updated_at();

drop trigger if exists kpi_set_updated_at on kpi;
create trigger kpi_set_updated_at
before update on kpi
for each row execute function public.set_updated_at();

drop trigger if exists ryzyka_set_updated_at on ryzyka;
create trigger ryzyka_set_updated_at
before update on ryzyka
for each row execute function public.set_updated_at();

drop trigger if exists problemy_set_updated_at on problemy;
create trigger problemy_set_updated_at
before update on problemy
for each row execute function public.set_updated_at();

drop trigger if exists ruchy_dnia_set_updated_at on ruchy_dnia;
create trigger ruchy_dnia_set_updated_at
before update on ruchy_dnia
for each row execute function public.set_updated_at();

create or replace function public.inicjalizuj_atlas_uzytkownika(
  p_user_id uuid,
  p_email text default null,
  p_display_name text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_misja_id uuid;
  v_sezon_id uuid;
  v_domena_zdrowie_id uuid;
  v_domena_kariera_id uuid;
  v_domena_discovery_id uuid;
  v_today date := current_date;
begin
  if auth.uid() is null or auth.uid() <> p_user_id then
    raise exception 'Brak uprawnień do inicjalizacji tego użytkownika.';
  end if;

  insert into profiles (id, email, display_name)
  values (p_user_id, p_email, p_display_name)
  on conflict (id) do update
  set
    email = excluded.email,
    display_name = coalesce(excluded.display_name, profiles.display_name);

  select id into v_misja_id
  from misje
  where user_id = p_user_id and aktywna = true
  order by created_at asc
  limit 1;

  if v_misja_id is null then
    insert into misje (user_id, nazwa, opis, aktywna)
    values (
      p_user_id,
      'Misja główna',
      'Codziennie podejmować lepsze decyzje o zdrowiu, karierze, finansach i budowie firmy.',
      true
    )
    returning id into v_misja_id;
  end if;

  select id into v_sezon_id
  from sezony
  where user_id = p_user_id and status = 'aktywny'
  order by created_at asc
  limit 1;

  if v_sezon_id is null then
    insert into sezony (
      user_id,
      misja_id,
      nazwa,
      motyw,
      data_start,
      data_koniec,
      status,
      definicja_sukcesu
    )
    values (
      p_user_id,
      v_misja_id,
      'Sezon startowy',
      'Ustabilizować pętlę dnia',
      v_today,
      v_today + 90,
      'aktywny',
      'Każdy dzień zaczyna się briefingiem i kończy debriefem.'
    )
    returning id into v_sezon_id;
  end if;

  insert into domeny (user_id, nazwa, opis, waga_strategiczna, kolejnosc)
  select p_user_id, seed.nazwa, seed.opis, seed.waga_strategiczna, seed.kolejnosc
  from (
    values
      ('Zdrowie', 'Readiness i ograniczenia dnia.', 'wysoka'::waga_strategiczna, 10),
      ('Sport', 'Trening bez maskowania innych braków.', 'srednia'::waga_strategiczna, 20),
      ('Kariera', 'Najważniejsze ruchy zawodowe.', 'wysoka'::waga_strategiczna, 30),
      ('Finanse', 'Decyzje i progi działania.', 'srednia'::waga_strategiczna, 40),
      ('Discovery', 'Problemy rynkowe i dowody.', 'krytyczna'::waga_strategiczna, 50),
      ('Projekty', 'Budowa produktów i firmy.', 'wysoka'::waga_strategiczna, 60),
      ('Relacje', 'Logistyka kontaktu.', 'niska'::waga_strategiczna, 70),
      ('Learning', 'Nauka wspierająca decyzje.', 'niska'::waga_strategiczna, 80)
  ) as seed(nazwa, opis, waga_strategiczna, kolejnosc)
  where not exists (
    select 1
    from domeny
    where user_id = p_user_id and nazwa = seed.nazwa
  );

  select id into v_domena_zdrowie_id
  from domeny
  where user_id = p_user_id and nazwa = 'Zdrowie'
  limit 1;

  select id into v_domena_kariera_id
  from domeny
  where user_id = p_user_id and nazwa = 'Kariera'
  limit 1;

  select id into v_domena_discovery_id
  from domeny
  where user_id = p_user_id and nazwa = 'Discovery'
  limit 1;

  insert into dni (user_id, data, tryb_dnia, readiness_score, focus_score, momentum_score)
  values (p_user_id, v_today, 'stabilizacja', null, null, null)
  on conflict (user_id, data) do nothing;

  insert into questy (
    user_id,
    sezon_id,
    domena_id,
    tytul,
    opis,
    typ,
    status,
    postep,
    metryka_sukcesu,
    nastepna_akcja
  )
  select
    p_user_id,
    v_sezon_id,
    v_domena_discovery_id,
    'Uruchom pętlę ATLAS HQ',
    'Pierwszy aktywny quest: codzienny briefing, 3 ruchy dnia i debrief.',
    'main',
    'aktywny',
    0,
    '7 zamkniętych dni z briefingiem i debriefem.',
    'Zrób pierwszy poranny briefing.'
  where v_domena_discovery_id is not null
    and v_sezon_id is not null
    and not exists (
      select 1
      from questy
      where user_id = p_user_id
        and typ = 'main'
        and status = 'aktywny'
    );

  insert into kpi (
    user_id,
    domena_id,
    nazwa,
    jednostka,
    okres,
    wartosc_aktualna,
    wartosc_docelowa,
    status,
    regula_decyzyjna,
    kolejnosc
  )
  select
    p_user_id,
    seed.domena_id,
    seed.nazwa,
    seed.jednostka,
    seed.okres,
    seed.wartosc_aktualna,
    seed.wartosc_docelowa,
    seed.status,
    seed.regula_decyzyjna,
    seed.kolejnosc
  from (
    values
      (
        v_domena_zdrowie_id,
        'Readiness',
        'pkt',
        'dzienny'::okres_kpi,
        null::numeric,
        80::numeric,
        'szary'::status_koloru,
        'Jeżeli readiness < 40, dzień przechodzi w recovery.',
        10
      ),
      (
        v_domena_discovery_id,
        'Kontakt z rynkiem',
        'dowody',
        'tygodniowy'::okres_kpi,
        0::numeric,
        3::numeric,
        'zolty'::status_koloru,
        'Jeżeli brak nowych dowodów w tygodniu, dodaj ruch dnia Discovery.',
        20
      )
  ) as seed(
    domena_id,
    nazwa,
    jednostka,
    okres,
    wartosc_aktualna,
    wartosc_docelowa,
    status,
    regula_decyzyjna,
    kolejnosc
  )
  where seed.domena_id is not null
    and not exists (
      select 1
      from kpi
      where user_id = p_user_id and nazwa = seed.nazwa
    );

  insert into ryzyka (
    user_id,
    domena_id,
    tytul,
    opis,
    typ,
    powaga,
    status,
    zrodlo_wyzwolenia,
    rekomendowany_ruch
  )
  select
    p_user_id,
    v_domena_kariera_id,
    'Brak decyzji dnia',
    'Command Center nie ma jeszcze danych z briefingu.',
    'focus',
    'srednia',
    'aktywne',
    'system',
    'Zrób poranny briefing i wybierz maksymalnie 3 ruchy dnia.'
  where v_domena_kariera_id is not null
    and not exists (
      select 1
      from ryzyka
      where user_id = p_user_id
        and tytul = 'Brak decyzji dnia'
        and status = 'aktywne'
    );
end;
$$;

grant execute on function public.inicjalizuj_atlas_uzytkownika(uuid, text, text) to authenticated;
