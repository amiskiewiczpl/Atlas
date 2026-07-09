import { notFound, redirect } from "next/navigation";
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
      eq(column: "user_id", value: string): {
        order(
          column: "created_at",
          options: { ascending: false }
        ): Promise<{ data: QuestListItem[] | null; error: { message: string } | null }>;
      };
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
      eq(column: "user_id", value: string): {
        eq(column: "id", value: string): {
          maybeSingle(): Promise<{ data: QuestDetails | null; error: { message: string } | null }>;
        };
      };
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: QuestDetails | null; error: { message: string } | null }>;
      };
    };
  };
};

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

export async function getQuesty(): Promise<QuestListItem[]> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as QuestyDb)
    .from("questy")
    .select(
      "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_cel, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getQuest(id: string): Promise<QuestDetails> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as QuestDetailsDb)
    .from("questy")
    .select(
      "id, tytul, opis, typ, status, postep, metryka_sukcesu, nastepna_akcja, bloker, data_start, data_cel, powod_zabicia, created_at"
    )
    .eq("user_id", user.id)
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
