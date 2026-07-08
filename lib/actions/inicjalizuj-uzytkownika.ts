"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type InicjalizujAtlasRpc = {
  rpc: (
    fn: "inicjalizuj_atlas_uzytkownika",
    args: {
      p_user_id: string;
      p_email: string | null;
      p_display_name: string | null;
    }
  ) => Promise<{ error: { message: string } | null }>;
};

export async function inicjalizujUzytkownika() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("Zaloguj się przed inicjalizacją danych startowych.");
  }

  const { error } = await (supabase as any).rpc("inicjalizuj_atlas_uzytkownika", {
    p_user_id: user.id,
    p_email: user.email ?? null,
    p_display_name:
      typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/command");
}
