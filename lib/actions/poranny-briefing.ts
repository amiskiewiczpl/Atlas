"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { policzReadiness, wyznaczTrybDnia } from "@/lib/scoring/readiness";
import type { Database } from "@/types/supabase";

type StatusCiala = Database["public"]["Enums"]["status_ciala"];
type StatusGlowy = Database["public"]["Enums"]["status_glowy"];

type InicjalizujAtlasRpc = (
  fn: "inicjalizuj_atlas_uzytkownika",
  args: {
    p_user_id: string;
    p_email: string | null;
    p_display_name: string | null;
  }
) => Promise<{ error: { message: string } | null }>;

type DzienUpsert = {
  user_id: string;
  data: string;
  tryb_dnia: Database["public"]["Enums"]["tryb_dnia"];
  readiness_score: number;
};

type CheckInUpsert = {
  user_id: string;
  dzien_id: string;
  typ: "poranny";
  energia: number;
  sen_godziny: number;
  status_ciala: StatusCiala;
  status_glowy: StatusGlowy;
  tryb_dnia: Database["public"]["Enums"]["tryb_dnia"];
  najwieksze_ryzyko: string | null;
};

type PorannyBriefingDb = {
  from(table: "dni"): {
    upsert(
      values: DzienUpsert,
      options: { onConflict: string }
    ): {
      select(columns: "id"): {
        single(): Promise<{ data: { id: string }; error: { message: string } | null }>;
      };
    };
  };
  from(table: "check_iny"): {
    upsert(
      values: CheckInUpsert,
      options: { onConflict: string }
    ): Promise<{ error: { message: string } | null }>;
  };
};

const statusyCiala: StatusCiala[] = ["dobry", "ok", "slaby", "kontuzja", "choroba"];
const statusyGlowy: StatusGlowy[] = [
  "spokojny",
  "skupiony",
  "chaotyczny",
  "niski",
  "zestresowany"
];

function parseNumber(value: FormDataEntryValue | null, fieldName: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Nieprawidłowa wartość pola: ${fieldName}.`);
  }

  return parsed;
}

function parseStatusCiala(value: FormDataEntryValue | null): StatusCiala {
  if (typeof value === "string" && statusyCiala.includes(value as StatusCiala)) {
    return value as StatusCiala;
  }

  throw new Error("Nieprawidłowy status ciała.");
}

function parseStatusGlowy(value: FormDataEntryValue | null): StatusGlowy {
  if (typeof value === "string" && statusyGlowy.includes(value as StatusGlowy)) {
    return value as StatusGlowy;
  }

  throw new Error("Nieprawidłowy status głowy.");
}

export async function zapiszPorannyBriefing(formData: FormData) {
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

  const senGodziny = parseNumber(formData.get("sen_godziny"), "sen");
  const energia = parseNumber(formData.get("energia"), "energia");
  const statusCiala = parseStatusCiala(formData.get("status_ciala"));
  const statusGlowy = parseStatusGlowy(formData.get("status_glowy"));
  const najwiekszeRyzyko = String(formData.get("najwieksze_ryzyko") ?? "").trim();

  if (senGodziny < 0 || senGodziny > 24) {
    throw new Error("Sen musi być w zakresie 0-24h.");
  }

  if (energia < 1 || energia > 10) {
    throw new Error("Energia musi być w zakresie 1-10.");
  }

  const readiness = policzReadiness({
    senGodziny,
    energia,
    statusCiala
  });
  const trybDnia = wyznaczTrybDnia(readiness);
  const dzisiaj = new Date().toISOString().slice(0, 10);

  const inicjalizujAtlas = supabase.rpc as unknown as InicjalizujAtlasRpc;
  const { error: initError } = await inicjalizujAtlas("inicjalizuj_atlas_uzytkownika", {
    p_user_id: user.id,
    p_email: user.email ?? null,
    p_display_name:
      typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null
  });

  if (initError) {
    throw new Error(initError.message);
  }

  const db = supabase as unknown as PorannyBriefingDb;
  const { data: dzien, error: dzienError } = await db
    .from("dni")
    .upsert(
      {
        user_id: user.id,
        data: dzisiaj,
        tryb_dnia: trybDnia,
        readiness_score: readiness
      },
      {
        onConflict: "user_id,data"
      }
    )
    .select("id")
    .single();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  const { error: checkInError } = await db.from("check_iny").upsert(
    {
      user_id: user.id,
      dzien_id: dzien.id,
      typ: "poranny",
      energia,
      sen_godziny: senGodziny,
      status_ciala: statusCiala,
      status_glowy: statusGlowy,
      tryb_dnia: trybDnia,
      najwieksze_ryzyko: najwiekszeRyzyko || null
    },
    {
      onConflict: "user_id,dzien_id,typ"
    }
  );

  if (checkInError) {
    throw new Error(checkInError.message);
  }

  redirect("/ruchy-dnia/nowy");
}
