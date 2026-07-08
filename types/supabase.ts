export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      check_iny: {
        Row: {
          id: string;
          user_id: string;
          dzien_id: string;
          typ: Database["public"]["Enums"]["typ_check_inu"];
          energia: number | null;
          sen_godziny: number | null;
          status_ciala: Database["public"]["Enums"]["status_ciala"] | null;
          status_glowy: Database["public"]["Enums"]["status_glowy"] | null;
          tryb_dnia: Database["public"]["Enums"]["tryb_dnia"] | null;
          najwieksze_ryzyko: string | null;
          najwiekszy_progres: string | null;
          najwiekszy_problem: string | null;
          sygnal_na_jutro: string | null;
          krotki_debrief: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["check_iny"]["Row"]> & {
          user_id: string;
          dzien_id: string;
          typ: Database["public"]["Enums"]["typ_check_inu"];
        };
        Update: Partial<Database["public"]["Tables"]["check_iny"]["Row"]>;
        Relationships: [];
      };
      dni: {
        Row: {
          id: string;
          user_id: string;
          data: string;
          tryb_dnia: Database["public"]["Enums"]["tryb_dnia"];
          readiness_score: number | null;
          focus_score: number | null;
          momentum_score: number | null;
          top_ryzyko_id: string | null;
          najwiekszy_progres: string | null;
          najwiekszy_bloker: string | null;
          zamkniety: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["dni"]["Row"]> & {
          user_id: string;
          data: string;
        };
        Update: Partial<Database["public"]["Tables"]["dni"]["Row"]>;
        Relationships: [];
      };
      domeny: {
        Row: {
          id: string;
          user_id: string;
          nazwa: string;
          opis: string | null;
          waga_strategiczna: Database["public"]["Enums"]["waga_strategiczna"];
          aktywny_score: number | null;
          trend: Database["public"]["Enums"]["trend"];
          status: Database["public"]["Enums"]["status_koloru"];
          kolejnosc: number;
          aktywna: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["domeny"]["Row"]> & {
          user_id: string;
          nazwa: string;
        };
        Update: Partial<Database["public"]["Tables"]["domeny"]["Row"]>;
        Relationships: [];
      };
      dowody: {
        Row: {
          id: string;
          user_id: string;
          problem_id: string;
          typ: Database["public"]["Enums"]["typ_dowodu"];
          zrodlo: string | null;
          tresc: string;
          sila: number;
          data_dowodu: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["dowody"]["Row"]> & {
          user_id: string;
          problem_id: string;
          typ: Database["public"]["Enums"]["typ_dowodu"];
          tresc: string;
        };
        Update: Partial<Database["public"]["Tables"]["dowody"]["Row"]>;
        Relationships: [];
      };
      kpi: {
        Row: {
          id: string;
          user_id: string;
          domena_id: string;
          nazwa: string;
          opis: string | null;
          jednostka: string;
          okres: Database["public"]["Enums"]["okres_kpi"];
          wartosc_aktualna: number | null;
          wartosc_docelowa: number | null;
          trend: Database["public"]["Enums"]["trend"];
          status: Database["public"]["Enums"]["status_koloru"];
          regula_decyzyjna: string;
          typ_zrodla: Database["public"]["Enums"]["typ_zrodla"];
          aktywne: boolean;
          kolejnosc: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["kpi"]["Row"]> & {
          user_id: string;
          domena_id: string;
          nazwa: string;
          jednostka: string;
          okres: Database["public"]["Enums"]["okres_kpi"];
          regula_decyzyjna: string;
        };
        Update: Partial<Database["public"]["Tables"]["kpi"]["Row"]>;
        Relationships: [];
      };
      misje: {
        Row: {
          id: string;
          user_id: string;
          nazwa: string;
          opis: string | null;
          aktywna: boolean;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["misje"]["Row"]> & {
          user_id: string;
          nazwa: string;
        };
        Update: Partial<Database["public"]["Tables"]["misje"]["Row"]>;
        Relationships: [];
      };
      problemy: {
        Row: {
          id: string;
          user_id: string;
          tytul: string;
          segment: string;
          opis: string | null;
          czestotliwosc: Database["public"]["Enums"]["czestotliwosc_problemu"];
          pain_score: number | null;
          willingness_to_pay: Database["public"]["Enums"]["willingness_to_pay"];
          obecne_obejscie: string | null;
          konkurencja: string | null;
          moja_przewaga: string | null;
          confidence_score: number;
          status: Database["public"]["Enums"]["status_problemu"];
          nastepny_krok_walidacji: string | null;
          powod_zabicia: string | null;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["problemy"]["Row"]> & {
          user_id: string;
          tytul: string;
          segment: string;
        };
        Update: Partial<Database["public"]["Tables"]["problemy"]["Row"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      questy: {
        Row: {
          id: string;
          user_id: string;
          sezon_id: string | null;
          domena_id: string;
          tytul: string;
          opis: string | null;
          typ: Database["public"]["Enums"]["typ_questu"];
          status: Database["public"]["Enums"]["status_questu"];
          postep: number;
          data_start: string | null;
          data_cel: string | null;
          metryka_sukcesu: string | null;
          nastepna_akcja: string | null;
          bloker: string | null;
          powod_zabicia: string | null;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["questy"]["Row"]> & {
          user_id: string;
          domena_id: string;
          tytul: string;
        };
        Update: Partial<Database["public"]["Tables"]["questy"]["Row"]>;
        Relationships: [];
      };
      ruchy_dnia: {
        Row: {
          id: string;
          user_id: string;
          dzien_id: string;
          domena_id: string;
          quest_id: string | null;
          problem_id: string | null;
          tytul: string;
          typ: Database["public"]["Enums"]["typ_ruchu"];
          wplyw: Database["public"]["Enums"]["poziom"];
          wysilek: Database["public"]["Enums"]["poziom"];
          status: Database["public"]["Enums"]["status_ruchu"];
          powod_pominiecia: string | null;
          utworzone_z: Database["public"]["Enums"]["zrodlo_ruchu"];
          kolejnosc: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["ruchy_dnia"]["Row"]> & {
          user_id: string;
          dzien_id: string;
          domena_id: string;
          tytul: string;
          typ: Database["public"]["Enums"]["typ_ruchu"];
        };
        Update: Partial<Database["public"]["Tables"]["ruchy_dnia"]["Row"]>;
        Relationships: [];
      };
      ryzyka: {
        Row: {
          id: string;
          user_id: string;
          domena_id: string;
          kpi_id: string | null;
          tytul: string;
          opis: string | null;
          typ: Database["public"]["Enums"]["typ_ryzyka"];
          powaga: Database["public"]["Enums"]["powaga_ryzyka"];
          status: Database["public"]["Enums"]["status_ryzyka"];
          zrodlo_wyzwolenia: Database["public"]["Enums"]["zrodlo_ryzyka"];
          regula_wyzwolenia: string | null;
          rekomendowany_ruch: string | null;
          aktywne_od: string | null;
          rozwiazane_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["ryzyka"]["Row"]> & {
          user_id: string;
          domena_id: string;
          tytul: string;
          typ: Database["public"]["Enums"]["typ_ryzyka"];
        };
        Update: Partial<Database["public"]["Tables"]["ryzyka"]["Row"]>;
        Relationships: [];
      };
      sezony: {
        Row: {
          id: string;
          user_id: string;
          misja_id: string | null;
          nazwa: string;
          motyw: string;
          data_start: string;
          data_koniec: string;
          status: Database["public"]["Enums"]["status_sezonu"];
          definicja_sukcesu: string | null;
          main_quest_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["sezony"]["Row"]> & {
          user_id: string;
          nazwa: string;
          motyw: string;
          data_start: string;
          data_koniec: string;
        };
        Update: Partial<Database["public"]["Tables"]["sezony"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      inicjalizuj_atlas_uzytkownika: {
        Args: {
          p_user_id: string;
          p_email: string | null;
          p_display_name: string | null;
        };
        Returns: void;
      };
    };
    Enums: {
      czestotliwosc_problemu:
        | "codziennie"
        | "tygodniowo"
        | "miesiecznie"
        | "kwartalnie"
        | "rzadko"
        | "nieznane";
      okres_kpi: "dzienny" | "tygodniowy" | "miesieczny" | "sezonowy";
      poziom: "niski" | "sredni" | "wysoki";
      powaga_ryzyka: "niska" | "srednia" | "wysoka" | "krytyczna";
      status_ciala: "dobry" | "ok" | "slaby" | "kontuzja" | "choroba";
      status_glowy:
        | "spokojny"
        | "skupiony"
        | "chaotyczny"
        | "niski"
        | "zestresowany";
      status_koloru:
        | "zielony"
        | "zolty"
        | "pomaranczowy"
        | "czerwony"
        | "krytyczny"
        | "szary";
      status_problemu:
        | "obserwacja"
        | "hipoteza_problemu"
        | "wywiady"
        | "powtarzalny_wzorzec"
        | "mocny_bol"
        | "sygnal_platnosci"
        | "kandydat_mvp"
        | "aktywny_bet"
        | "zabity";
      status_questu:
        | "backlog"
        | "aktywny"
        | "zablokowany"
        | "zakonczony"
        | "zabity"
        | "zarchiwizowany"
        | "stary";
      status_ruchu:
        | "planowany"
        | "wykonany"
        | "pominiety"
        | "przeniesiony"
        | "anulowany";
      status_ryzyka: "nieaktywne" | "aktywne" | "rozwiazane" | "zignorowane";
      status_sezonu: "planowany" | "aktywny" | "zakonczony" | "zarchiwizowany";
      trend: "w_gore" | "plasko" | "w_dol" | "brak_danych";
      tryb_dnia: "ofensywa" | "stabilizacja" | "recovery";
      typ_check_inu: "poranny" | "wieczorny";
      typ_dowodu:
        | "cytat"
        | "wywiad"
        | "zachowanie"
        | "platnosc"
        | "konkurencja"
        | "czestotliwosc"
        | "bol"
        | "odrzucenie"
        | "sygnal_rynku"
        | "obejscie";
      typ_questu: "main" | "aktywny" | "side";
      typ_ruchu:
        | "zdrowie"
        | "sport"
        | "kariera"
        | "finanse"
        | "discovery"
        | "projekt"
        | "relacje"
        | "learning"
        | "recovery"
        | "administracyjne";
      typ_ryzyka:
        | "zdrowie"
        | "sport"
        | "kariera"
        | "finanse"
        | "discovery"
        | "projekt"
        | "focus"
        | "wypalenie"
        | "relacje"
        | "learning";
      typ_zrodla: "manualne" | "wyliczane" | "importowane";
      waga_strategiczna: "niska" | "srednia" | "wysoka" | "krytyczna";
      willingness_to_pay:
        | "nieznane"
        | "brak"
        | "slabe"
        | "srednie"
        | "mocne"
        | "potwierdzone";
      zrodlo_ruchu: "recznie" | "z_ryzyka" | "z_questu" | "z_przegladu" | "z_kpi";
      zrodlo_ryzyka: "kpi" | "manualne" | "review" | "system";
    };
    CompositeTypes: Record<string, never>;
  };
};
