"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function zalogujGoogle(formData: FormData) {
  const next = String(formData.get("next") ?? "/command");

  const originHeader = headers().get("origin");
  const forwardedProto = headers().get("x-forwarded-proto") || "https";
  const forwardedHost = headers().get("x-forwarded-host") || headers().get("host");
  const origin = originHeader || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
  const supabase = createClient();
  const callbackUrl = new URL("/callback", origin);
  callbackUrl.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString()
    }
  });

  if (error || !data?.url) {
    redirect(`/login?error=${encodeURIComponent(error?.message ?? "Błąd%20logowania")}`);
  }

  redirect(data.url);
}

export async function wyloguj() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
