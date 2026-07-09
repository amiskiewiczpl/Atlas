import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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

export async function getDzisiejszyDzien() {
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

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data, error } = await (supabase as any)
    .from("dni")
    .select("id, data, tryb_dnia, readiness_score, najwiekszy_progres, najwiekszy_bloker, zamkniety")
    .eq("user_id", user.id)
    .eq("data", dzisiaj)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
