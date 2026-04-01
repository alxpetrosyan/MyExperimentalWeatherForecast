"use client";

import { ForecastMode } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

export function ForecastTabs({ mode, onModeChange }: { mode: ForecastMode; onModeChange: (mode: ForecastMode) => void }) {
  const { t } = useLanguage();

  return (
    <div className="inline-flex w-fit rounded-xl bg-slate-200/70 p-1 dark:bg-slate-800/80">
      {(["hourly", "daily"] as ForecastMode[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onModeChange(tab)}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            mode === tab ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white" : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {t(tab)}
        </button>
      ))}
    </div>
  );
}
