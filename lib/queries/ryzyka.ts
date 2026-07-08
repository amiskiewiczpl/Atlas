import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type RyzykoListItem = Pick<
  Database["public"]["Tables"]["ryzyka"]["Row"],
  | "id"
  | "domena_id"
  | "tytul"
  | "opis"
  | "typ"
  | "powaga"
  | "status"
  | "zrodlo_wyzwolenia"
  | "rekomendowany_ruch"
  | "created_at"
>;

export type RyzykoDetails = RyzykoListItem &
  Pick<
    Database["public"]["Tables"]["ryzyka"]["Row"],
    "regula_wyzwolenia" | "aktywne_od" | "rozwiazane_at"
  >;

type RyzykaListDb = {
  from(table: "ryzyka"): {
    select(
      columns: "id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, created_at"
    ): {
      order(
        column: "created_at",
        options: { ascending: false }
      ): Promise<{ data: RyzykoListItem[] | null; error: { message: string } | null }>;
    };
  };
};

type RyzykoDetailsDb = {
  from(table: "ryzyka"): {
    select(
      columns: "id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, regula_wyzwolenia, aktywne_od, rozwiazane_at, created_at"
    ): {
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: RyzykoDetails | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getRyzyka() {
  const supabase = createClient() as unknown as RyzykaListDb;
  const { data, error } = await supabase
    .from("ryzyka")
    .select("id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getRyzyko(id: string) {
  const supabase = createClient() as unknown as RyzykoDetailsDb;
  const { data, error } = await supabase
    .from("ryzyka")
    .select(
      "id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, regula_wyzwolenia, aktywne_od, rozwiazane_at, created_at"
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
