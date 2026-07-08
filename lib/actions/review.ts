"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type ReviewActionDb = {
  from(table: "dni"): {
    select(columns: "id"): {
      eq(column: "data", value: string): {
        maybeSingle(): Promise<{ data: { id: string } | null; error: { message: string } | null }>;
      };
    };
    update(values: { najwiekszy_progres: string; najwiekszy_bloker: string; focus_score: number; momentum_score: number; top_ryzyko_id: string | null }): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
  };
};

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

export async function zaktualizujStrategie(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as ReviewActionDb;

  const progres = parseText(formData.get("najwiekszy_progres"));
  const problem = parseText(formData.get("najwiekszy_problem"));
  const korekta = parseText(formData.get("korekta_strategii"));
  const ryzykoId = String(formData.get("ryzyko_id") ?? "").trim();

  if (!progres || !problem || !korekta) {
    throw new Error("Wszystkie pola są wymagane.");
  }

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data: dzien, error: dzienError } = await db
    .from("dni")
    .select("id")
    .eq("data", dzisiaj)
    .maybeSingle();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  if (!dzien) {
    throw new Error("Brak dnia do aktualizacji.");
  }

  const { error } = await db.from("dni").update({
    najwiekszy_progres: progres,
    najwiekszy_bloker: problem,
    focus_score: 70,
    momentum_score: 70,
    top_ryzyko_id: ryzykoId || null
  }).eq("id", dzien.id).eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/review");
  revalidatePath("/command");
  redirect("/review");
}
