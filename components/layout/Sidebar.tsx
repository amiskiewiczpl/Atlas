import { Activity, Compass, Crosshair, Flag, Moon, ShieldAlert, Target } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Command", href: "/command", icon: Crosshair },
  { label: "Briefing", href: "/briefing/poranny", icon: Activity },
  { label: "Ruchy dnia", href: "/ruchy-dnia", icon: Target },
  { label: "Debrief", href: "/debrief/wieczorny", icon: Moon },
  { label: "Questy", href: "/questy", icon: Flag },
  { label: "Ryzyka", href: "/ryzyka", icon: ShieldAlert },
  { label: "Discovery", href: "/discovery", icon: Compass }
];

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-atlas-border lg:bg-atlas-panel">
      <div className="flex h-16 items-center border-b border-atlas-border px-5">
        <Link href="/command" className="leading-tight">
          <span className="block text-sm font-semibold tracking-[0.24em] text-atlas-cyan">
            ATLAS
          </span>
          <span className="block text-xs text-atlas-muted">Command UI</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-atlas-secondary transition hover:bg-atlas-hover hover:text-atlas-primary"
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
