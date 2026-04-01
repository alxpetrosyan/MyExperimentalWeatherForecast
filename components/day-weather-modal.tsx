"use client";

import { DailyForecastItem } from "@/lib/types";
import { X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { languageLocale, translateCondition } from "@/lib/i18n";

export function DayWeatherModal({ day, onClose }: { day: DailyForecastItem | null; onClose: () => void }) {
  const { t, language } = useLanguage();
  if (!day) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{new Date(day.date).toLocaleDateString(languageLocale[language], { weekday: "long", month: "long", day: "numeric" })}</h3>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-2 text-sm">
          <p>{t("condition")}: {translateCondition(day.summary, t)}</p>
          <p>{t("dayNight")}: {day.high}° / {day.low}°</p>
          <p>{t("rainChance")}: {day.precipitationChance}%</p>
          <p>{t("wind")}: {day.wind}</p>
          <p>{t("humidity")}: {day.humidity}%</p>
          <p>{t("sunrise")} / {t("sunset")}: {day.sunrise} / {day.sunset}</p>
        </div>
      </div>
    </div>
  );
}
