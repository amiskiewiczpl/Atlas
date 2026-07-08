import type { Database } from "@/types/supabase";

export type StatusCiala = Database["public"]["Enums"]["status_ciala"];
export type TrybDnia = Database["public"]["Enums"]["tryb_dnia"];

export type ReadinessInput = {
  senGodziny: number;
  energia: number;
  statusCiala: StatusCiala;
};

export function policzSenScore(senGodziny: number) {
  if (senGodziny >= 7) {
    return 100;
  }

  if (senGodziny >= 6) {
    return 75;
  }

  if (senGodziny >= 5) {
    return 50;
  }

  return 25;
}

export function policzStatusCialaScore(statusCiala: StatusCiala) {
  const mapa: Record<StatusCiala, number> = {
    dobry: 100,
    ok: 75,
    slaby: 50,
    kontuzja: 40,
    choroba: 25
  };

  return mapa[statusCiala];
}

export function policzReadiness({
  senGodziny,
  energia,
  statusCiala
}: ReadinessInput) {
  const senScore = policzSenScore(senGodziny);
  const energiaScore = energia * 10;
  const statusCialaScore = policzStatusCialaScore(statusCiala);

  return Math.round(senScore * 0.4 + energiaScore * 0.4 + statusCialaScore * 0.2);
}

export function wyznaczTrybDnia(readiness: number): TrybDnia {
  if (readiness >= 80) {
    return "ofensywa";
  }

  if (readiness >= 40) {
    return "stabilizacja";
  }

  return "recovery";
}
