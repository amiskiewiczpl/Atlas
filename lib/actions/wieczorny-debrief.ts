"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type DzienRow = {
  id: string;
};

type DzienUpdate = {
  user_id: string;
  data: string;
  najwiekszy_progres: string;
  najwiekszy_bloker: string;
  zamkniety: true;
};

type CheckInWieczornyUpsert = {
  user_id: string;
  dzien_id: string;
  typ: "wieczorny";
  energia: number;
  najwiekszy_progres: string;
  najwiekszy_problem: string;
  sygnal_na_jutro: string;
  krotki_debrief: string;
};

type WieczornyDebriefDb = {
  from(table: "dni"): {
    upsert(values: DzienUpdate, options: { onConflict: string }): {
      select(columns: "id"): {
        single(): Promise<{ data: DzienRow | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "check_iny"): {
    upsert(
      values: CheckInWieczornyUpsert,
      options: { onConflict: string }
    ): Promise<{ error: { message: string } | null }>;
  };
};

function parseEnergia(value: FormDataEntryValue | null) {
  const energia = Number(value);

  if (!Number.isFinite(energia) || energia < 1 || energia > 10) {
    throw new Error("Energia wieczorem musi być w zakresie 1-10.");
  }

  return energia;
}

function parseRequiredText(value: FormDataEntryValue | null, fieldName: string) {
  const text = String(value ?? "").trim();

  if (text.length < 3) {
    throw new Error(`${fieldName} musi mieć co najmniej 3 znaki.`);
  }

  return text;
}

export async function zapiszWieczornyDebrief(formData: FormData) {
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

  const energia = parseEnergia(formData.get("energia"));
  const najwiekszyProgres = parseRequiredText(
    formData.get("najwiekszy_progres"),
    "Największy progres"
  );
  const najwiekszyProblem = parseRequiredText(
    formData.get("najwiekszy_problem"),
    "Największy problem"
  );
  const sygnalNaJutro = parseRequiredText(
    formData.get("sygnal_na_jutro"),
    "Sygnał na jutro"
  );
  const dzisiaj = new Date().toISOString().slice(0, 10);

  const db = supabase as unknown as WieczornyDebriefDb;
  const { data: dzien, error: dzienError } = await db
    .from("dni")
    .upsert(
      {
        user_id: user.id,
        data: dzisiaj,
        najwiekszy_progres: najwiekszyProgres,
        najwiekszy_bloker: najwiekszyProblem,
        zamkniety: true
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

  if (!dzien) {
    throw new Error("Nie udało się zamknąć dnia.");
  }

  const { error: checkInError } = await db.from("check_iny").upsert(
    {
      user_id: user.id,
      dzien_id: dzien.id,
      typ: "wieczorny",
      energia,
      najwiekszy_progres: najwiekszyProgres,
      najwiekszy_problem: najwiekszyProblem,
      sygnal_na_jutro: sygnalNaJutro,
      krotki_debrief: `${najwiekszyProgres}\n\n${najwiekszyProblem}\n\n${sygnalNaJutro}`
    },
    {
      onConflict: "user_id,dzien_id,typ"
    }
  );

  if (checkInError) {
    throw new Error(checkInError.message);
  }

  revalidatePath("/command");
  revalidatePath("/debrief/wieczorny");
  redirect("/command");
}
