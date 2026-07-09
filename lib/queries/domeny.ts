import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type DomenaViewItem = Pick<
  Database["public"]["Tables"]["domeny"]["Row"],
  "id" | "nazwa" | "opis" | "waga_strategiczna" | "aktywny_score" | "trend" | "status" | "kolejnosc" | "aktywna"
>;

export type KpiViewItem = Pick<
  Database["public"]["Tables"]["kpi"]["Row"],
  | "id"
  | "nazwa"
  | "jednostka"
  | "wartosc_aktualna"
  | "wartosc_docelowa"
  | "trend"
  | "status"
  | "regula_decyzyjna"
  | "kolejnosc"
>;

type DomenyDb = {
  from(table: "domeny"): {
    select(columns: "id, nazwa, opis, waga_strategiczna, aktywny_score, trend, status, kolejnosc, aktywna"): {
      eq(column: "user_id", value: string): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: DomenaViewItem[] | null; error: { message: string } | null }>;
      };
      order(
        column: "kolejnosc",
        options: { ascending: true }
      ): Promise<{ data: DomenaViewItem[] | null; error: { message: string } | null }>;
    };
  };
  from(table: "kpi"): {
    select(columns: "id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc"): {
      eq(column: "user_id", value: string): {
        eq(column: "aktywne", value: true): {
          order(
            column: "kolejnosc",
            options: { ascending: true }
          ): Promise<{ data: KpiViewItem[] | null; error: { message: string } | null }>;
        };
      };
      eq(column: "aktywne", value: true): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: KpiViewItem[] | null; error: { message: string } | null }>;
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

export async function getDomenySummary() {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as DomenyDb)
    .from("domeny")
    .select("id, nazwa, opis, waga_strategiczna, aktywny_score, trend, status, kolejnosc, aktywna")
    .eq("user_id", user.id)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveKpis() {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as DomenyDb)
    .from("kpi")
    .select("id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc")
    .eq("user_id", user.id)
    .eq("aktywne", true)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
