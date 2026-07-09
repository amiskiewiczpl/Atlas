import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";

export type DomenaOption = {
  id: string;
  nazwa: string;
};

export type RuchDniaListItem = {
  id: string;
  tytul: string;
  typ: Database["public"]["Enums"]["typ_ruchu"];
  wplyw: Database["public"]["Enums"]["poziom"];
  wysilek: Database["public"]["Enums"]["poziom"];
  status: Database["public"]["Enums"]["status_ruchu"];
  powod_pominiecia: string | null;
  kolejnosc: number;
};

export async function getAktywneDomeny(): Promise<DomenaOption[]> {
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

  const { data, error } = await supabase
    .from("domeny")
    .select("id, nazwa")
    .eq("user_id", user.id)
    .eq("aktywna", true)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getDzisiejszeRuchyDnia(): Promise<RuchDniaListItem[]> {
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

  const dzisiaj = new Date().toISOString().slice(0, 10);
  const { data: dzien, error: dzienError } = await supabase
    .from("dni")
    .select("id")
    .eq("user_id", user.id)
    .eq("data", dzisiaj)
    .maybeSingle();

  if (dzienError) {
    throw new Error(dzienError.message);
  }

  if (!dzien) {
    return [];
  }

  const dzienId = (dzien as { id: string }).id;
  const { data, error } = await supabase
    .from("ruchy_dnia")
    .select("id, tytul, typ, wplyw, wysilek, status, powod_pominiecia, kolejnosc")
    .eq("user_id", user.id)
    .eq("dzien_id", dzienId)
    .order("kolejnosc", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
