import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export type ProblemListItem = Pick<
  Database["public"]["Tables"]["problemy"]["Row"],
  | "id"
  | "tytul"
  | "segment"
  | "opis"
  | "czestotliwosc"
  | "pain_score"
  | "willingness_to_pay"
  | "confidence_score"
  | "status"
  | "nastepny_krok_walidacji"
  | "created_at"
>;

export type ProblemDetails = ProblemListItem &
  Pick<
    Database["public"]["Tables"]["problemy"]["Row"],
    "obecne_obejscie" | "konkurencja" | "moja_przewaga" | "powod_zabicia"
  >;

type ProblemyListDb = {
  from(table: "problemy"): {
    select(
      columns: "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, created_at"
    ): {
      eq(column: "user_id", value: string): {
        order(
          column: "created_at",
          options: { ascending: false }
        ): Promise<{ data: ProblemListItem[] | null; error: { message: string } | null }>;
      };
      order(
        column: "created_at",
        options: { ascending: false }
      ): Promise<{ data: ProblemListItem[] | null; error: { message: string } | null }>;
    };
  };
};

type ProblemDetailsDb = {
  from(table: "problemy"): {
    select(
      columns: "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, obecne_obejscie, konkurencja, moja_przewaga, powod_zabicia, created_at"
    ): {
      eq(column: "user_id", value: string): {
        eq(column: "id", value: string): {
          maybeSingle(): Promise<{ data: ProblemDetails | null; error: { message: string } | null }>;
        };
      };
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: ProblemDetails | null; error: { message: string } | null }>;
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

export async function getProblemy(): Promise<ProblemListItem[]> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as ProblemyListDb)
    .from("problemy")
    .select(
      "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProblem(id: string): Promise<ProblemDetails> {
  const { supabase, user } = await getCurrentUser();
  const { data, error } = await (supabase as unknown as ProblemDetailsDb)
    .from("problemy")
    .select(
      "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, obecne_obejscie, konkurencja, moja_przewaga, powod_zabicia, created_at"
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
