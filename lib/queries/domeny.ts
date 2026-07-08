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
      order(
        column: "kolejnosc",
        options: { ascending: true }
      ): Promise<{ data: DomenaViewItem[] | null; error: { message: string } | null }>;
    };
  };
  from(table: "kpi"): {
    select(columns: "id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc"): {
      eq(column: "aktywne", value: true): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: KpiViewItem[] | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getDomenySummary() {
  const supabase = createClient() as unknown as DomenyDb;
  const { data, error } = await supabase
    .from("domeny")
    .select("id, nazwa, opis, waga_strategiczna, aktywny_score, trend, status, kolejnosc, aktywna")
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveKpis() {
  const supabase = createClient() as unknown as DomenyDb;
  const { data, error } = await supabase
    .from("kpi")
    .select("id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc")
    .eq("aktywne", true)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
