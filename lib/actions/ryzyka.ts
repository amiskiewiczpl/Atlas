"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type TypRyzyka = Database["public"]["Enums"]["typ_ryzyka"];
type PowagaRyzyka = Database["public"]["Enums"]["powaga_ryzyka"];
type StatusRyzyka = Database["public"]["Enums"]["status_ryzyka"];
type TypRuchu = Database["public"]["Enums"]["typ_ruchu"];

type RyzykoInsert = {
  user_id: string;
  domena_id: string;
  tytul: string;
  opis: string | null;
  typ: TypRyzyka;
  powaga: PowagaRyzyka;
  status: "aktywne";
  zrodlo_wyzwolenia: "manualne";
  rekomendowany_ruch: string;
};

type RyzykoStatusUpdate = {
  status: StatusRyzyka;
  rozwiazane_at: string | null;
};

type RyzykoForMove = {
  id: string;
  user_id: string;
  domena_id: string;
  typ: TypRyzyka;
  rekomendowany_ruch: string | null;
  tytul: string;
};

type DzienRow = {
  id: string;
};

type CountResult = {
  id: string;
  kolejnosc: number;
};

type RuchRyzykaInsert = {
  user_id: string;
  dzien_id: string;
  domena_id: string;
  tytul: string;
  typ: TypRuchu;
  wplyw: "wysoki";
  wysilek: "sredni";
  status: "planowany";
  kolejnosc: number;
  utworzone_z: "z_ryzyka";
};

type RyzykaActionDb = {
  from(table: "ryzyka"): {
    insert(values: RyzykoInsert): Promise<{ error: { message: string } | null }>;
    update(values: RyzykoStatusUpdate): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
  };
};

type RyzykoMoveDb = {
  from(table: "ryzyka"): {
    select(columns: "id, user_id, domena_id, typ, rekomendowany_ruch, tytul"): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): {
          maybeSingle(): Promise<{ data: RyzykoForMove | null; error: { message: string } | null }>;
        };
      };
    };
  };
  from(table: "dni"): {
    upsert(
      values: {
        user_id: string;
        data: string;
        tryb_dnia: "stabilizacja";
      },
      options: { onConflict: string }
    ): {
      select(columns: "id"): {
        single(): Promise<{ data: DzienRow | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "ruchy_dnia"): {
    select(columns: "id, kolejnosc", options: { count: "exact" }): {
      eq(column: "dzien_id", value: string): {
        order(
          column: "kolejnosc",
          options: { ascending: false }
        ): Promise<{
          data: CountResult[] | null;
          count: number | null;
          error: { message: string } | null;
        }>;
      };
    };
    insert(values: RuchRyzykaInsert): Promise<{ error: { message: string } | null }>;
  };
};

const typyRyzyka: TypRyzyka[] = [
  "zdrowie",
  "sport",
  "kariera",
  "finanse",
  "discovery",
  "projekt",
  "focus",
  "wypalenie",
  "relacje",
  "learning"
];
const powagiRyzyka: PowagaRyzyka[] = ["niska", "srednia", "wysoka", "krytyczna"];
const statusyRyzyka: StatusRyzyka[] = ["nieaktywne", "aktywne", "rozwiazane", "zignorowane"];

const typRyzykaNaTypRuchu: Record<TypRyzyka, TypRuchu> = {
  zdrowie: "zdrowie",
  sport: "sport",
  kariera: "kariera",
  finanse: "finanse",
  discovery: "discovery",
  projekt: "projekt",
  focus: "administracyjne",
  wypalenie: "recovery",
  relacje: "relacje",
  learning: "learning"
};

function parseEnum<T extends string>(value: FormDataEntryValue | null, allowed: T[], field: string) {
  if (typeof value === "string" && allowed.includes(value as T)) {
    return value as T;
  }

  throw new Error(`Nieprawidłowa wartość pola: ${field}.`);
}

function parseText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}

async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function dodajRyzyko(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as RyzykaActionDb;

  const tytul = String(formData.get("tytul") ?? "").trim();
  const domenaId = String(formData.get("domena_id") ?? "").trim();
  const typ = parseEnum(formData.get("typ"), typyRyzyka, "typ");
  const powaga = parseEnum(formData.get("powaga"), powagiRyzyka, "powaga");
  const opis = parseText(formData.get("opis"));
  const rekomendowanyRuch = String(formData.get("rekomendowany_ruch") ?? "").trim();

  if (tytul.length < 3) {
    throw new Error("Ryzyko musi mieć konkretny tytuł.");
  }

  if (!domenaId) {
    throw new Error("Wybierz domenę ryzyka.");
  }

  if (rekomendowanyRuch.length < 3) {
    throw new Error("Ryzyko musi mieć rekomendowany ruch.");
  }

  const { error } = await db.from("ryzyka").insert({
    user_id: user.id,
    domena_id: domenaId,
    tytul,
    opis,
    typ,
    powaga,
    status: "aktywne",
    zrodlo_wyzwolenia: "manualne",
    rekomendowany_ruch: rekomendowanyRuch
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/command");
  revalidatePath("/ryzyka");
  redirect("/ryzyka");
}

export async function zmienStatusRyzyka(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as RyzykaActionDb;

  const ryzykoId = String(formData.get("ryzyko_id") ?? "").trim();
  const status = parseEnum(formData.get("status"), statusyRyzyka, "status");

  if (!ryzykoId) {
    throw new Error("Brakuje identyfikatora ryzyka.");
  }

  const { error } = await db
    .from("ryzyka")
    .update({
      status,
      rozwiazane_at: status === "rozwiazane" ? new Date().toISOString() : null
    })
    .eq("id", ryzykoId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/command");
  revalidatePath("/ryzyka");
  revalidatePath(`/ryzyka/${ryzykoId}`);
}

export async function dodajRyzykoJakoRuchDnia(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as RyzykoMoveDb;

  const ryzykoId = String(formData.get("ryzyko_id") ?? "").trim();

  if (!ryzykoId) {
    throw new Error("Brakuje identyfikatora ryzyka.");
  }

  const { data: ryzyko, error: ryzykoError } = await db
    .from("ryzyka")
    .select("id, user_id, domena_id, typ, rekomendowany_ruch, tytul")
    .eq("id", ryzykoId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (ryzykoError) {
    throw new Error(ryzykoError.message);
  }

  if (!ryzyko) {
    throw new Error("Nie znaleziono ryzyka.");
  }

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data: dzien, error: dzienError } = await db
    .from("dni")
    .upsert(
      {
        user_id: user.id,
        data: dzisiaj,
        tryb_dnia: "stabilizacja"
      },
      { onConflict: "user_id,data" }
    )
    .select("id")
    .single();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  if (!dzien) {
    throw new Error("Nie udało się przygotować dnia.");
  }

  const { data: ruchy, count, error: countError } = await db
    .from("ruchy_dnia")
    .select("id, kolejnosc", { count: "exact" })
    .eq("dzien_id", dzien.id)
    .order("kolejnosc", { ascending: false });

  if (countError) {
    throw new Error(countError.message);
  }

  if ((count ?? 0) >= 3) {
    throw new Error("Limit: 3 ruchy dnia. Najpierw usuń albo przełóż inny ruch.");
  }

  const kolejnosc = (ruchy?.[0]?.kolejnosc ?? 0) + 1;
  const { error: insertError } = await db.from("ruchy_dnia").insert({
    user_id: user.id,
    dzien_id: dzien.id,
    domena_id: ryzyko.domena_id,
    tytul: ryzyko.rekomendowany_ruch ?? ryzyko.tytul,
    typ: typRyzykaNaTypRuchu[ryzyko.typ],
    wplyw: "wysoki",
    wysilek: "sredni",
    status: "planowany",
    kolejnosc,
    utworzone_z: "z_ryzyka"
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  revalidatePath("/command");
  revalidatePath("/ruchy-dnia");
  revalidatePath("/ryzyka");
  revalidatePath(`/ryzyka/${ryzykoId}`);
  redirect("/ruchy-dnia");
}
