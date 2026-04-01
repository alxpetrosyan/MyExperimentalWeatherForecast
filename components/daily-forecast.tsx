"use client";

import { DailyForecastItem } from "@/lib/types";
import { WeatherIcon } from "@/components/weather-icons";
import { useLanguage } from "@/components/language-provider";
import { languageLocale, translateCondition } from "@/lib/i18n";

export function DailyForecast({ daily }: { daily: DailyForecastItem[] }) {
  const { t, language } = useLanguage();

  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">{t("dailyForecast")}</h3>
      <div className="space-y-2">
        {daily.slice(0, 10).map((item) => (
          <article key={item.date} className="grid grid-cols-4 items-center rounded-xl bg-slate-100/80 p-3 text-sm dark:bg-slate-800/70 md:grid-cols-6">
            <p className="col-span-2 md:col-span-1">{new Date(item.date).toLocaleDateString(languageLocale[language], { weekday: "short", month: "short", day: "numeric" })}</p>
            <div className="flex items-center gap-2"><WeatherIcon code={item.conditionCode} className="h-4 w-4 text-sky-500" /> {translateCondition(item.summary, t)}</div>
            <p className="text-right md:text-left">{item.low}° / {item.high}°</p>
            <p className="text-right">{t("rain")} {item.precipitationChance}%</p>
          </article>
        ))}
      </div>
    </section>
  );
}
