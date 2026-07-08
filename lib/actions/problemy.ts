"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type CzestotliwoscProblemu = Database["public"]["Enums"]["czestotliwosc_problemu"];
type WillingnessToPay = Database["public"]["Enums"]["willingness_to_pay"];

type ProblemInsert = {
  user_id: string;
  tytul: string;
  segment: string;
  opis: string | null;
  czestotliwosc: CzestotliwoscProblemu;
  pain_score: number | null;
  willingness_to_pay: WillingnessToPay;
  obecne_obejscie: string | null;
  konkurencja: string | null;
  moja_przewaga: string | null;
  nastepny_krok_walidacji: string | null;
  status: "hipoteza_problemu";
  confidence_score: 0;
};

type ProblemyActionDb = {
  from(table: "problemy"): {
    insert(values: ProblemInsert): Promise<{ error: { message: string } | null }>;
  };
};

const czestotliwosci: CzestotliwoscProblemu[] = [
  "codziennie",
  "tygodniowo",
  "miesiecznie",
  "kwartalnie",
  "rzadko",
  "nieznane"
];
const willingnessOptions: WillingnessToPay[] = [
  "nieznane",
  "brak",
  "slabe",
  "srednie",
  "mocne",
  "potwierdzone"
];

function parseEnum<T extends string>(value: FormDataEntryValue | null, allowed: T[], field: string) {
  if (typeof value === "string" && allowed.includes(value as T)) {
    return value as T;
  }

  throw new Error(`Nieprawidłowa wartość pola: ${field}.`);
}

function parseText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}

function parsePainScore(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return null;
  }

  const score = Number(raw);

  if (!Number.isInteger(score) || score < 1 || score > 10) {
    throw new Error("Pain score musi być liczbą 1-10.");
  }

  return score;
}

export async function dodajProblem(formData: FormData) {
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

  const tytul = String(formData.get("tytul") ?? "").trim();
  const segment = String(formData.get("segment") ?? "").trim();
  const opis = parseText(formData.get("opis"));
  const czestotliwosc = parseEnum(
    formData.get("czestotliwosc"),
    czestotliwosci,
    "częstotliwość"
  );
  const painScore = parsePainScore(formData.get("pain_score"));
  const willingnessToPay = parseEnum(
    formData.get("willingness_to_pay"),
    willingnessOptions,
    "willingness to pay"
  );
  const obecneObejscie = parseText(formData.get("obecne_obejscie"));
  const konkurencja = parseText(formData.get("konkurencja"));
  const mojaPrzewaga = parseText(formData.get("moja_przewaga"));
  const nastepnyKrokWalidacji = parseText(formData.get("nastepny_krok_walidacji"));

  if (tytul.length < 3) {
    throw new Error("Problem musi mieć konkretny tytuł.");
  }

  if (segment.length < 3) {
    throw new Error("Segment musi być konkretny.");
  }

  const db = supabase as unknown as ProblemyActionDb;
  const { error } = await db.from("problemy").insert({
    user_id: user.id,
    tytul,
    segment,
    opis,
    czestotliwosc,
    pain_score: painScore,
    willingness_to_pay: willingnessToPay,
    obecne_obejscie: obecneObejscie,
    konkurencja,
    moja_przewaga: mojaPrzewaga,
    nastepny_krok_walidacji: nastepnyKrokWalidacji,
    status: "hipoteza_problemu",
    confidence_score: 0
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/discovery");
  redirect("/discovery");
}
