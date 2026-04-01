import Link from "next/link";
import { CloudSun } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 mb-4 border-b border-white/10 bg-slate-100/80 backdrop-blur-md dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CloudSun className="h-6 w-6 text-sky-500" />
          AeroCast
        </div>
        <nav className="flex items-center gap-2 text-sm">
          <Link className="rounded-full px-3 py-1.5 hover:bg-white/40 dark:hover:bg-slate-800" href="/">
            Forecast
          </Link>
          <Link className="rounded-full px-3 py-1.5 hover:bg-white/40 dark:hover:bg-slate-800" href="/calendar">
            Calendar
          </Link>
        </nav>
      </div>
    </header>
  );
}
