import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type DomenaOption = {
  id: string;
  nazwa: string;
};

export type RuchDniaListItem = {
  id: string;
  tytul: string;
  typ: Database["public"]["Enums"]["typ_ruchu"];
  wplyw: Database["public"]["Enums"]["poziom"];
  wysilek: Database["public"]["Enums"]["poziom"];
  status: Database["public"]["Enums"]["status_ruchu"];
  powod_pominiecia: string | null;
  kolejnosc: number;
};

type RuchyDniaDb = {
  from(table: "domeny"): {
    select(columns: "id, nazwa"): {
      eq(column: "aktywna", value: true): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: DomenaOption[] | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "dni"): {
    select(columns: "id"): {
      eq(column: "data", value: string): {
        maybeSingle(): Promise<{ data: { id: string } | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "ruchy_dnia"): {
    select(columns: "id, tytul, typ, wplyw, wysilek, status, powod_pominiecia, kolejnosc"): {
      eq(column: "dzien_id", value: string): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: RuchDniaListItem[] | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getAktywneDomeny() {
  const supabase = createClient() as unknown as RuchyDniaDb;
  const { data, error } = await supabase
    .from("domeny")
    .select("id, nazwa")
    .eq("aktywna", true)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getDzisiejszeRuchyDnia() {
  const supabase = createClient() as unknown as RuchyDniaDb;
  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data: dzien, error: dzienError } = await supabase
    .from("dni")
    .select("id")
    .eq("data", dzisiaj)
    .maybeSingle();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  if (!dzien) {
    return [];
  }

  const { data, error } = await supabase
    .from("ruchy_dnia")
    .select("id, tytul, typ, wplyw, wysilek, status, powod_pominiecia, kolejnosc")
    .eq("dzien_id", dzien.id)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
