"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type CzestotliwoscProblemu = Database["public"]["Enums"]["czestotliwosc_problemu"];
type WillingnessToPay = Database["public"]["Enums"]["willingness_to_pay"];
type TypDowodu = Database["public"]["Enums"]["typ_dowodu"];
type StatusProblemu = Database["public"]["Enums"]["status_problemu"];

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

type ProblemUpdate = {
  confidence_score: number;
  status: StatusProblemu;
  powod_zabicia: string | null;
};

type DowodInsert = {
  user_id: string;
  problem_id: string;
  typ: TypDowodu;
  zrodlo: string | null;
  tresc: string;
  sila: number;
  data_dowodu: string;
};

type ProblemyActionDb = {
  from(table: "problemy"): {
    insert(values: ProblemInsert): Promise<{ error: { message: string } | null }>;
    update(values: ProblemUpdate): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
    select(columns: "id, confidence_score, status"): {
      eq(column: "id", value: string): {
        eq(column: "user_id", value: string): {
          maybeSingle(): Promise<{ data: { id: string; confidence_score: number; status: StatusProblemu } | null; error: { message: string } | null }>;
        };
      };
    };
  };
  from(table: "dowody"): {
    insert(values: DowodInsert): Promise<{ error: { message: string } | null }>;
    select(columns: "sila"): {
      eq(column: "problem_id", value: string): Promise<{ data: { sila: number }[] | null; error: { message: string } | null }>;
    };
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

function parseNumber(value: FormDataEntryValue | null, field: string, min: number, max: number) {
  const raw = String(value ?? "").trim();
  const parsed = Number(raw);

  if (!raw || !Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${field} musi być liczbą ${min}-${max}.`);
  }

  return parsed;
}

async function getCurrentUser() {
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

  return { supabase, user };
}

export async function dodajProblem(formData: FormData) {
  const { supabase, user } = await getCurrentUser();

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

export async function dodajDowod(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as ProblemyActionDb;

  const problemId = String(formData.get("problem_id") ?? "").trim();
  const typ = parseEnum(formData.get("typ"), [
    "cytat",
    "wywiad",
    "zachowanie",
    "platnosc",
    "konkurencja",
    "czestotliwosc",
    "bol",
    "odrzucenie",
    "sygnal_rynku",
    "obejscie"
  ] as TypDowodu[], "typ dowodu");
  const zrodlo = parseText(formData.get("zrodlo"));
  const tresc = String(formData.get("tresc") ?? "").trim();
  const sila = parseNumber(formData.get("sila"), "Siła", 1, 5);
  const dataDowodu = String(formData.get("data_dowodu") ?? "").trim() || new Date().toISOString().slice(0, 10);

  if (!problemId) {
    throw new Error("Brakuje identyfikatora problemu.");
  }

  if (tresc.length < 3) {
    throw new Error("Dowód musi zawierać konkretną treść.");
  }

  const { data: problem, error: problemError } = await db
    .from("problemy")
    .select("id, confidence_score, status")
    .eq("id", problemId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (problemError) {
    throw new Error(problemError.message);
  }

  if (!problem) {
    throw new Error("Problem nie istnieje.");
  }

  const { error: dowodError } = await db.from("dowody").insert({
    user_id: user.id,
    problem_id: problemId,
    typ,
    zrodlo,
    tresc,
    sila,
    data_dowodu: dataDowodu
  });

  if (dowodError) {
    throw new Error(dowodError.message);
  }

  const { data: dowody, error: dowodyError } = await db
    .from("dowody")
    .select("sila")
    .eq("problem_id", problemId);

  if (dowodyError) {
    throw new Error(dowodyError.message);
  }

  const sumaSily = (dowody ?? []).reduce((sum, item) => sum + item.sila, 0);
  const liczbaDowodow = (dowody ?? []).length;
  const confidenceScore = Math.min(100, Math.round((sumaSily / Math.max(1, liczbaDowodow * 5)) * 100));

  const { error: updateError } = await db
    .from("problemy")
    .update({
      confidence_score: confidenceScore,
      status: problem.status === "zabity" ? "zabity" : "wywiady",
      powod_zabicia: null
    })
    .eq("id", problemId)
    .eq("user_id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath(`/discovery/problemy/${problemId}`);
  revalidatePath("/discovery");
  redirect(`/discovery/problemy/${problemId}`);
}

export async function zabijProblem(formData: FormData) {
  const { supabase, user } = await getCurrentUser();
  const db = supabase as unknown as ProblemyActionDb;

  const problemId = String(formData.get("problem_id") ?? "").trim();
  const powodZabicia = String(formData.get("powod_zabicia") ?? "").trim();

  if (!problemId) {
    throw new Error("Brakuje identyfikatora problemu.");
  }

  if (powodZabicia.length < 3) {
    throw new Error("Podaj powód zabicia problemu.");
  }

  const { error } = await db
    .from("problemy")
    .update({
      confidence_score: 0,
      status: "zabity",
      powod_zabicia: powodZabicia
    })
    .eq("id", problemId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/discovery/problemy/${problemId}`);
  revalidatePath("/discovery");
  redirect(`/discovery/problemy/${problemId}`);
}
