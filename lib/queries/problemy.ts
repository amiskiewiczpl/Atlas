import { notFound } from "next/navigation";
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
      eq(column: "id", value: string): {
        maybeSingle(): Promise<{ data: ProblemDetails | null; error: { message: string } | null }>;
      };
    };
  };
};

export async function getProblemy() {
  const supabase = createClient() as unknown as ProblemyListDb;
  const { data, error } = await supabase
    .from("problemy")
    .select(
      "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProblem(id: string) {
  const supabase = createClient() as unknown as ProblemDetailsDb;
  const { data, error } = await supabase
    .from("problemy")
    .select(
      "id, tytul, segment, opis, czestotliwosc, pain_score, willingness_to_pay, confidence_score, status, nastepny_krok_walidacji, obecne_obejscie, konkurencja, moja_przewaga, powod_zabicia, created_at"
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
