"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function zalogujMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = String(formData.get("next") ?? "/command");

  if (!email) {
    redirect("/login?error=Brakuje%20adresu%20email");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const origin = appUrl || headers().get("origin") || "http://localhost:3000";
  const supabase = createClient();
  const callbackUrl = new URL("/callback", origin);
  callbackUrl.searchParams.set("next", next);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString()
    }
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?sent=1");
}

export async function wyloguj() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
