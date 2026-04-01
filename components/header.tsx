"use client";

import Link from "next/link";
import { CloudSun } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LanguageSelector } from "@/components/language-selector";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 mb-4 border-b border-white/10 bg-slate-100/80 backdrop-blur-md dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CloudSun className="h-6 w-6 text-sky-500" />
          AeroCast
        </div>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link className="rounded-full px-3 py-1.5 hover:bg-white/40 dark:hover:bg-slate-800" href="/">
              {t("forecast")}
            </Link>
            <Link className="rounded-full px-3 py-1.5 hover:bg-white/40 dark:hover:bg-slate-800" href="/calendar">
              {t("calendar")}
            </Link>
          </nav>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
