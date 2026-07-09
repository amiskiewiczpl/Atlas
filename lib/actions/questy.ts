"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type TypQuestu = Database["public"]["Enums"]["typ_questu"];
type StatusQuestu = Database["public"]["Enums"]["status_questu"];

type ActiveQuestRow = {
  id: string;
};

type SeasonRow = {
  id: string;
};

type QuestInsert = {
  user_id: string;
  sezon_id: string | null;
  domena_id: string;
  tytul: string;
  opis: string | null;
  typ: TypQuestu;
  status: "aktywny";
  postep: number;
  data_start: string;
  data_cel: string | null;
  metryka_sukcesu: string | null;
  nastepna_akcja: string | null;
};

type QuestStatusUpdate = {
  status: StatusQuestu;
};

type QuestyActionDb = {
  from(table: "sezony"): {
    select(columns: "id"): {
      eq(column: "user_id", value: string): {
        eq(column: "status", value: "aktywny"): {
          order(column: "created_at", options: { ascending: true }): {
            maybeSingle(): Promise<{ data: SeasonRow | null; error: { message: string } | null }>;
          };
        };
      };
      eq(column: "status", value: "aktywny"): {
        order(column: "created_at", options: { ascending: true }): {
          maybeSingle(): Promise<{ data: SeasonRow | null; error: { message: string } | null }>;
        };
      };
    };
  };
  from(table: "questy"): {
    select(columns: "id"): {
      eq(column: "user_id", value: string): {
        eq(column: "status", value: "aktywny"): Promise<{
          data: ActiveQuestRow[] | null;
          error: { message: string } | null;
        }>;
      };
      eq(column: "status", value: "aktywny"): {
        eq(column: "user_id", value: string): Promise<{
          data: ActiveQuestRow[] | null;
          error: { message: string } | null;
        }>;
      };
    };
    insert(values: QuestInsert): Promise<{ error: { message: string } | null }>;
    update(values: QuestStatusUpdate): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
  };
};

const typyQuestu: TypQuestu[] = ["main", "aktywny", "side"];
const statusyQuestu: StatusQuestu[] = [
  "backlog",
  "aktywny",
  "zablokowany",
  "zakonczony",
  "zabity",
  "zarchiwizowany",
  "stary"
];

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

async function policzAktywneQuesty(db: QuestyActionDb, userId: string, exceptQuestId?: string) {
  const { data, error } = await db
    .from("questy")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "aktywny");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).filter((quest) => quest.id !== exceptQuestId).length;
}

export async function dodajQuest(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as QuestyActionDb;

  const aktywneQuesty = await policzAktywneQuesty(db, user.id);

  if (aktywneQuesty >= 3) {
    throw new Error("Limit: maksymalnie 3 aktywne questy.");
  }

  const tytul = String(formData.get("tytul") ?? "").trim();
  const domenaId = String(formData.get("domena_id") ?? "").trim();
  const typ = parseEnum(formData.get("typ"), typyQuestu, "typ");
  const opis = parseText(formData.get("opis"));
  const metrykaSukcesu = parseText(formData.get("metryka_sukcesu"));
  const nastepnaAkcja = parseText(formData.get("nastepna_akcja"));
  const dataCel = parseText(formData.get("data_cel"));

  if (tytul.length < 3) {
    throw new Error("Quest musi mieć konkretny tytuł.");
  }

  if (!domenaId) {
    throw new Error("Wybierz domenę questu.");
  }

  const { data: sezon, error: sezonError } = await db
    .from("sezony")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "aktywny")
    .order("created_at", { ascending: true })
    .maybeSingle();

  if (sezonError) {
    throw new Error(sezonError.message);
  }

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { error: insertError } = await db.from("questy").insert({
    user_id: user.id,
    sezon_id: sezon?.id ?? null,
    domena_id: domenaId,
    tytul,
    opis,
    typ,
    status: "aktywny",
    postep: 0,
    data_start: dzisiaj,
    data_cel: dataCel,
    metryka_sukcesu: metrykaSukcesu,
    nastepna_akcja: nastepnaAkcja
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  revalidatePath("/command");
  revalidatePath("/questy");
  redirect("/questy");
}

export async function zmienStatusQuestu(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as QuestyActionDb;

  const questId = String(formData.get("quest_id") ?? "").trim();
  const status = parseEnum(formData.get("status"), statusyQuestu, "status");

  if (!questId) {
    throw new Error("Brakuje identyfikatora questu.");
  }

  if (status === "aktywny") {
    const aktywneQuesty = await policzAktywneQuesty(db, questId);

    if (aktywneQuesty >= 3) {
      throw new Error("Limit: maksymalnie 3 aktywne questy.");
    }
  }

  const { error } = await db
    .from("questy")
    .update({ status })
    .eq("id", questId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/command");
  revalidatePath("/questy");
  revalidatePath(`/questy/${questId}`);
}
