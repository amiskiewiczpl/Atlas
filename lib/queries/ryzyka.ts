import { notFound, redirect } from "next/navigation";
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
      eq(column: "user_id", value: string): {
        order(
          column: "created_at",
          options: { ascending: false }
        ): Promise<{ data: RyzykoListItem[] | null; error: { message: string } | null }>;
      };
      order(
        column: "created_at",
        options: { ascending: false }
      ): Promise<{ data: RyzykoListItem[] | null; error: { message: string } | null }>;
    };
    select(columns: "id, tytul, powaga"): {
      eq(column: "user_id", value: string): {
        eq(column: "status", value: "aktywne"): {
          order(
            column: "created_at",
            options: { ascending: false }
          ): Promise<{ data: Array<{ id: string; tytul: string; powaga: string }> | null; error: { message: string } | null }>;
        };
      };
      eq(column: "status", value: "aktywne"): {
        order(
          column: "created_at",
          options: { ascending: false }
        ): Promise<{ data: Array<{ id: string; tytul: string; powaga: string }> | null; error: { message: string } | null }>;
      };
    };
  };
};

type RyzykoDetailsDb = {
  from(table: "ryzyka"): {
    select(
      columns: "id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, regula_wyzwolenia, aktywne_od, rozwiazane_at, created_at"
    ): {
      eq(column: "user_id", value: string): {
        eq(column: "id", value: string): {
          maybeSingle(): Promise<{ data: RyzykoDetails | null; error: { message: string } | null }>;
        };
      };
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: RyzykoDetails | null; error: { message: string } | null }>;
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

export async function getRyzyka(): Promise<RyzykoListItem[]> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as RyzykaListDb)
    .from("ryzyka")
    .select("id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveRisks(): Promise<Array<{ id: string; tytul: string; powaga: string }>> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as RyzykaListDb)
    .from("ryzyka")
    .select("id, tytul, powaga")
    .eq("user_id", user.id)
    .eq("status", "aktywne")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getRyzyko(id: string): Promise<RyzykoDetails> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as RyzykoDetailsDb)
    .from("ryzyka")
    .select(
      "id, domena_id, tytul, opis, typ, powaga, status, zrodlo_wyzwolenia, rekomendowany_ruch, regula_wyzwolenia, aktywne_od, rozwiazane_at, created_at"
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
