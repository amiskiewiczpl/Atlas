import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type QuestListItem = Pick<
  Database["public"]["Tables"]["questy"]["Row"],
  | "id"
  | "tytul"
  | "opis"
  | "typ"
  | "status"
  | "postep"
  | "metryka_sukcesu"
  | "nastepna_akcja"
  | "bloker"
  | "data_cel"
  | "created_at"
>;

export type QuestDetails = QuestListItem &
  Pick<Database["public"]["Tables"]["questy"]["Row"], "data_start" | "powod_zabicia">;

type QuestyDb = {
  from(table: "questy"): {
    select(
      columns: "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_cel, created_at"
    ): {
      order(
        column: "created_at",
        options: { ascending: false }
      ): Promise<{ data: QuestListItem[] | null; error: { message: string } | null }>;
    };
  };
  from(table: "questy_details"): never;
};

type QuestDetailsDb = {
  from(table: "questy"): {
    select(
      columns: "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_start, data_cel, powod_zabicia, created_at"
    ): {
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: QuestDetails | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getQuesty() {
  const supabase = createClient() as unknown as QuestyDb;
  const { data, error } = await supabase
    .from("questy")
    .select(
      "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_cel, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getQuest(id: string) {
  const supabase = createClient() as unknown as QuestDetailsDb;
  const { data, error } = await supabase
    .from("questy")
    .select(
      "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_start, data_cel, powod_zabicia, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    notFound();
  }

  return data;
}
