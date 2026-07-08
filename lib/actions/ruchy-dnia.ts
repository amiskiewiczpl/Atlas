"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type TypRuchu = Database["public"]["Enums"]["typ_ruchu"];
type Poziom = Database["public"]["Enums"]["poziom"];
type StatusRuchu = Database["public"]["Enums"]["status_ruchu"];

type DzienRow = {
  id: string;
};

type CountResult = {
  id: string;
  kolejnosc: number;
};

type RuchDniaInsert = {
  user_id: string;
  dzien_id: string;
  domena_id: string;
  tytul: string;
  typ: TypRuchu;
  wplyw: Poziom;
  wysilek: Poziom;
  status: "planowany";
  kolejnosc: number;
  utworzone_z: "recznie";
};

type RuchDniaUpdate = {
  status: StatusRuchu;
  powod_pominiecia: string | null;
};

type RuchyDniaActionDb = {
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
    insert(values: RuchDniaInsert): Promise<{ error: { message: string } | null }>;
    update(values: RuchDniaUpdate): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
  };
};

const typyRuchu: TypRuchu[] = [
  "zdrowie",
  "sport",
  "kariera",
  "finanse",
  "discovery",
  "projekt",
  "relacje",
  "learning",
  "recovery",
  "administracyjne"
];

const poziomy: Poziom[] = ["niski", "sredni", "wysoki"];
const statusyWykonania: StatusRuchu[] = [
  "wykonany",
  "pominiety",
  "przeniesiony",
  "anulowany"
];

function parseEnum<T extends string>(value: FormDataEntryValue | null, allowed: T[], field: string) {
  if (typeof value === "string" && allowed.includes(value as T)) {
    return value as T;
  }

  throw new Error(`Nieprawidłowa wartość pola: ${field}.`);
}

export async function dodajRuchDnia(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    redirect("/login");
  }

  const tytul = String(formData.get("tytul") ?? "").trim();
  const domenaId = String(formData.get("domena_id") ?? "").trim();
  const typ = parseEnum(formData.get("typ"), typyRuchu, "typ");
  const wplyw = parseEnum(formData.get("wplyw"), poziomy, "wpływ");
  const wysilek = parseEnum(formData.get("wysilek"), poziomy, "wysiłek");

  if (tytul.length < 3) {
    throw new Error("Ruch dnia musi mieć konkretny tytuł.");
  }

  if (!domenaId) {
    throw new Error("Wybierz domenę ruchu.");
  }

  const db = supabase as unknown as RuchyDniaActionDb;
  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data: dzien, error: dzienError } = await db
    .from("dni")
    .upsert(
      {
        user_id: user.id,
        data: dzisiaj,
        tryb_dnia: "stabilizacja"
      },
      {
        onConflict: "user_id,data"
      }
    )
    .select("id")
    .single();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  if (!dzien) {
    throw new Error("Nie udało się przygotować dnia.");
  }

  const { data: istniejaceRuchy, count, error: countError } = await db
    .from("ruchy_dnia")
    .select("id, kolejnosc", { count: "exact" })
    .eq("dzien_id", dzien.id)
    .order("kolejnosc", { ascending: false });

  if (countError) {
    throw new Error(countError.message);
  }

  if ((count ?? 0) >= 3) {
    throw new Error("Limit: 3 ruchy dnia. Dodanie kolejnego rozmyje priorytet.");
  }

  const kolejnosc = (istniejaceRuchy?.[0]?.kolejnosc ?? 0) + 1;
  const { error: insertError } = await db.from("ruchy_dnia").insert({
    user_id: user.id,
    dzien_id: dzien.id,
    domena_id: domenaId,
    tytul,
    typ,
    wplyw,
    wysilek,
    status: "planowany",
    kolejnosc,
    utworzone_z: "recznie"
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  redirect("/command");
}

export async function zmienStatusRuchuDnia(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    redirect("/login");
  }

  const ruchId = String(formData.get("ruch_id") ?? "").trim();
  const status = parseEnum(formData.get("status"), statusyWykonania, "status");
  const powodPominiecia = String(formData.get("powod_pominiecia") ?? "").trim();

  if (!ruchId) {
    throw new Error("Brakuje identyfikatora ruchu dnia.");
  }

  if (status === "pominiety" && powodPominiecia.length < 3) {
    throw new Error("Podaj krótki powód pominięcia ruchu.");
  }

  const db = supabase as unknown as RuchyDniaActionDb;
  const { error } = await db
    .from("ruchy_dnia")
    .update({
      status,
      powod_pominiecia: status === "pominiety" ? powodPominiecia : null
    })
    .eq("id", ruchId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/command");
  revalidatePath("/ruchy-dnia");
  revalidatePath("/debrief/wieczorny");
}
