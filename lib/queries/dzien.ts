import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type DzisiejszyDzien = {
  id: string;
  data: string;
  tryb_dnia: Database["public"]["Enums"]["tryb_dnia"];
  readiness_score: number | null;
  najwiekszy_progres: string | null;
  najwiekszy_bloker: string | null;
  zamkniety: boolean;
};

type DzienDb = {
  from(table: "dni"): {
    select(
      columns: "id, data, tryb_dnia, readiness_score, najwiekszy_progres, najwiekszy_bloker, zamkniety"
    ): {
      eq(column: "data", value: string): {
        maybeSingle(): Promise<{ data: DzisiejszyDzien | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getDzisiejszyDzien() {
  const supabase = createClient() as unknown as DzienDb;
  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("dni")
    .select("id, data, tryb_dnia, readiness_score, najwiekszy_progres, najwiekszy_bloker, zamkniety")
    .eq("data", dzisiaj)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
