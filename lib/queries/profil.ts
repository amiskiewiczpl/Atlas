import { createClient } from "@/lib/supabase/server";

export type WidocznyProfil = {
  email: string | null;
  displayName: string | null;
};

type ProfilRow = {
  email: string | null;
  display_name: string | null;
};

export async function getWidocznyProfil(): Promise<WidocznyProfil | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = (await supabase
    .from("profiles")
    .select("email, display_name")
    .eq("id", user.id)
    .maybeSingle()) as { data: ProfilRow | null };

  return {
    email: data?.email ?? user.email ?? null,
    displayName: data?.display_name ?? user.user_metadata?.full_name ?? null
  };
}
