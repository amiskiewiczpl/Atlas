import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";
import type { RuchDniaListItem } from "@/lib/queries/ruchy-dnia";

export type CommandMission = Pick<
  Database["public"]["Tables"]["misje"]["Row"],
  "id" | "nazwa" | "opis"
>;

export type CommandSeason = Pick<
  Database["public"]["Tables"]["sezony"]["Row"],
  "id" | "nazwa" | "motyw" | "data_start" | "data_koniec" | "definicja_sukcesu"
>;

export type CommandQuest = Pick<
  Database["public"]["Tables"]["questy"]["Row"],
  "id" | "tytul" | "opis" | "postep" | "metryka_sukcesu" | "nastepna_akcja" | "bloker"
>;

export type CommandRisk = Pick<
  Database["public"]["Tables"]["ryzyka"]["Row"],
  "id" | "tytul" | "opis" | "powaga" | "rekomendowany_ruch"
>;

export type CommandKpi = Pick<
  Database["public"]["Tables"]["kpi"]["Row"],
  | "id"
  | "nazwa"
  | "jednostka"
  | "wartosc_aktualna"
  | "wartosc_docelowa"
  | "trend"
  | "status"
  | "regula_decyzyjna"
  | "kolejnosc"
>;

export type CommandDay = Pick<
  Database["public"]["Tables"]["dni"]["Row"],
  | "id"
  | "data"
  | "tryb_dnia"
  | "readiness_score"
  | "focus_score"
  | "momentum_score"
  | "najwiekszy_progres"
  | "najwiekszy_bloker"
  | "zamkniety"
>;

export type CommandCenterData = {
  mission: CommandMission | null;
  season: CommandSeason | null;
  mainQuest: CommandQuest | null;
  day: CommandDay | null;
  dailyMoves: RuchDniaListItem[];
  activeRisks: CommandRisk[];
  kpis: CommandKpi[];
};

type CommandCenterDb = {
  from(table: "misje"): {
    select(columns: "id, nazwa, opis"): {
      eq(column: "aktywna", value: true): {
        order(column: "created_at", options: { ascending: true }): {
          maybeSingle(): Promise<{ data: CommandMission | null; error: { message: string } | null }>;
        };
      };
    };
  };
  from(table: "sezony"): {
    select(columns: "id, nazwa, motyw, data_start, data_koniec, definicja_sukcesu"): {
      eq(column: "status", value: "aktywny"): {
        order(column: "created_at", options: { ascending: true }): {
          maybeSingle(): Promise<{ data: CommandSeason | null; error: { message: string } | null }>;
        };
      };
    };
  };
  from(table: "questy"): {
    select(columns: "id, tytul, opis, postep, metryka_sukcesu, nastepna_akcja, bloker"): {
      eq(column: "typ", value: "main"): {
        eq(column: "status", value: "aktywny"): {
          order(column: "created_at", options: { ascending: true }): {
            maybeSingle(): Promise<{ data: CommandQuest | null; error: { message: string } | null }>;
          };
        };
      };
    };
  };
  from(table: "dni"): {
    select(
      columns: "id, data, tryb_dnia, readiness_score, focus_score, momentum_score, najwiekszy_progres, najwiekszy_bloker, zamkniety"
    ): {
      eq(column: "data", value: string): {
        maybeSingle(): Promise<{ data: CommandDay | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "ruchy_dnia"): {
    select(columns: "id, tytul, typ, wplyw, wysilek, status, powod_pominiecia, kolejnosc"): {
      eq(column: "dzien_id", value: string): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: RuchDniaListItem[] | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "ryzyka"): {
    select(columns: "id, tytul, opis, powaga, rekomendowany_ruch"): {
      eq(column: "status", value: "aktywne"): {
        order(
          column: "created_at",
          options: { ascending: true }
        ): Promise<{ data: CommandRisk[] | null; error: { message: string } | null }>;
      };
    };
  };
  from(table: "kpi"): {
    select(
      columns: "id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc"
    ): {
      eq(column: "aktywne", value: true): {
        order(
          column: "kolejnosc",
          options: { ascending: true }
        ): Promise<{ data: CommandKpi[] | null; error: { message: string } | null }>;
      };
    };
  };
};

function throwIfError(error: { message: string } | null) {
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCommandCenterData(): Promise<CommandCenterData> {
  const supabase = createClient() as unknown as CommandCenterDb;
  const dzisiaj = new Date().toISOString().slice(0, 10);

  const [
    missionResult,
    seasonResult,
    mainQuestResult,
    dayResult,
    risksResult,
    kpiResult
  ] = await Promise.all([
    supabase
      .from("misje")
      .select("id, nazwa, opis")
      .eq("aktywna", true)
      .order("created_at", { ascending: true })
      .maybeSingle(),
    supabase
      .from("sezony")
      .select("id, nazwa, motyw, data_start, data_koniec, definicja_sukcesu")
      .eq("status", "aktywny")
      .order("created_at", { ascending: true })
      .maybeSingle(),
    supabase
      .from("questy")
      .select("id, tytul, opis, postep, metryka_sukcesu, nastepna_akcja, bloker")
      .eq("typ", "main")
      .eq("status", "aktywny")
      .order("created_at", { ascending: true })
      .maybeSingle(),
    supabase
      .from("dni")
      .select(
        "id, data, tryb_dnia, readiness_score, focus_score, momentum_score, najwiekszy_progres, najwiekszy_bloker, zamkniety"
      )
      .eq("data", dzisiaj)
      .maybeSingle(),
    supabase
      .from("ryzyka")
      .select("id, tytul, opis, powaga, rekomendowany_ruch")
      .eq("status", "aktywne")
      .order("created_at", { ascending: true }),
    supabase
      .from("kpi")
      .select(
        "id, nazwa, jednostka, wartosc_aktualna, wartosc_docelowa, trend, status, regula_decyzyjna, kolejnosc"
      )
      .eq("aktywne", true)
      .order("kolejnosc", { ascending: true })
  ]);

  throwIfError(missionResult.error);
  throwIfError(seasonResult.error);
  throwIfError(mainQuestResult.error);
  throwIfError(dayResult.error);
  throwIfError(risksResult.error);
  throwIfError(kpiResult.error);

  let dailyMoves: RuchDniaListItem[] = [];

  if (dayResult.data) {
    const movesResult = await supabase
      .from("ruchy_dnia")
      .select("id, tytul, typ, wplyw, wysilek, status, powod_pominiecia, kolejnosc")
      .eq("dzien_id", dayResult.data.id)
      .order("kolejnosc", { ascending: true });

    throwIfError(movesResult.error);
    dailyMoves = movesResult.data ?? [];
  }

  return {
    mission: missionResult.data,
    season: seasonResult.data,
    mainQuest: mainQuestResult.data,
    day: dayResult.data,
    dailyMoves,
    activeRisks: risksResult.data ?? [],
    kpis: kpiResult.data ?? []
  };
}
