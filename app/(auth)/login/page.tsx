import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { zalogujMagicLink } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams?: {
    sent?: string;
    error?: string;
    next?: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/command");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-atlas-bg px-4 text-atlas-primary">
      <section className="w-full max-w-md rounded-md border border-atlas-border bg-atlas-card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-atlas-cyan">
          ATLAS HQ
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Logowanie</h1>
        <p className="mt-3 text-sm leading-6 text-atlas-secondary">
          Wpisz email. Dostaniesz link, który otworzy Command Center.
        </p>

        <form action={zalogujMagicLink} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={searchParams?.next ?? "/command"} />

          <label className="block">
            <span className="text-sm font-medium text-atlas-secondary">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 h-11 w-full rounded-md border border-atlas-border bg-atlas-panel px-3 text-sm text-atlas-primary outline-none transition placeholder:text-atlas-muted focus:border-atlas-cyan"
              placeholder="ty@atlas.local"
            />
          </label>

          <Button type="submit" className="w-full">
            Wyślij link logowania
          </Button>
        </form>

        {searchParams?.sent ? (
          <p className="mt-4 rounded-md border border-atlas-border bg-atlas-panel px-3 py-2 text-sm text-atlas-secondary">
            Link wysłany. Sprawdź skrzynkę i wróć do Command Center.
          </p>
        ) : null}

        {searchParams?.error ? (
          <p className="mt-4 rounded-md border border-atlas-red/40 bg-atlas-red/10 px-3 py-2 text-sm text-atlas-primary">
            {searchParams.error}
          </p>
        ) : null}
      </section>
    </main>
  );
}
