import { wyloguj } from "@/lib/actions/auth";
import { getWidocznyProfil } from "@/lib/queries/profil";

export async function TopBar() {
  const profil = await getWidocznyProfil();
  const label = profil?.displayName ?? profil?.email ?? "Brak profilu";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-atlas-border bg-atlas-panel/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-muted">
          Centrum dowodzenia
        </p>
        <h1 className="text-sm font-semibold text-atlas-primary">
          Command Center
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs font-medium text-atlas-primary">{label}</p>
          <p className="text-xs text-atlas-muted">Profil użytkownika</p>
        </div>

        <form action={wyloguj}>
          <button
            type="submit"
            className="rounded-md border border-atlas-border px-3 py-1.5 text-xs font-medium text-atlas-secondary transition hover:bg-atlas-hover hover:text-atlas-primary"
          >
            Wyloguj
          </button>
        </form>
      </div>
    </header>
  );
}
