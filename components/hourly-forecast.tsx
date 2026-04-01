"use client";

import { HourlyForecastItem } from "@/lib/types";
import { WeatherIcon } from "@/components/weather-icons";
import { useLanguage } from "@/components/language-provider";
import { languageLocale, translateCondition } from "@/lib/i18n";

export function HourlyForecast({ hourly }: { hourly: HourlyForecastItem[] }) {
  const { t, language } = useLanguage();

  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">{t("hourlyForecast")}</h3>
      <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-2">
        {hourly.map((item) => (
          <article key={item.time} className="w-28 min-w-28 shrink-0 rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/70 sm:w-32 sm:min-w-32">
            <p className="text-xs text-slate-500">{new Date(item.time).toLocaleTimeString(languageLocale[language], { hour: "numeric" })}</p>
            <WeatherIcon code={item.conditionCode} className="my-2 h-6 w-6 text-sky-500" />
            <p className="text-lg font-semibold sm:text-xl">{item.temperature}°</p>
            <p className="text-xs text-slate-500">{t("rain")} {item.precipitationChance}%</p>
            <p className="text-xs text-slate-500">{item.wind}</p>
            <p className="truncate text-xs text-slate-500">{translateCondition(item.condition, t)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
