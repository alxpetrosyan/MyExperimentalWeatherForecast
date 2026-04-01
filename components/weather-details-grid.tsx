"use client";

import { Droplets, Wind, Gauge, Eye, Sun, Cloud, CloudRain, Thermometer } from "lucide-react";
import { WeatherPayload } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

const itemClass = "rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/70";

export function WeatherDetailsGrid({ weather }: { weather: WeatherPayload }) {
  const d = weather.current;
  const { t } = useLanguage();

  const details = [
    { icon: Droplets, label: t("humidity"), value: `${d.humidity}%` },
    { icon: Wind, label: t("wind"), value: `${d.windSpeed} ${t("mph")} ${d.windDirection}` },
    { icon: Gauge, label: t("pressure"), value: `${d.pressure} hPa` },
    { icon: Eye, label: t("visibility"), value: `${d.visibility} ${t("mi")}` },
    { icon: Sun, label: t("uvIndex"), value: `${d.uvIndex}` },
    { icon: CloudRain, label: t("precipitation"), value: `${d.precipitationChance}%` },
    { icon: Cloud, label: t("cloudCover"), value: `${d.cloudCover}%` },
    { icon: Thermometer, label: t("dewPoint"), value: `${d.dewPoint}°` },
  ];

  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">{t("airConditions")}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {details.map(({ icon: Icon, label, value }) => (
          <article key={label} className={itemClass}>
            <div className="flex items-center gap-2 text-xs text-slate-500"><Icon className="h-4 w-4" /> {label}</div>
            <p className="mt-1 text-lg font-semibold">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className={itemClass}><p className="text-xs text-slate-500">{t("sunrise")}</p><p className="font-semibold">{d.sunrise}</p></div>
        <div className={itemClass}><p className="text-xs text-slate-500">{t("sunset")}</p><p className="font-semibold">{d.sunset}</p></div>
        <div className={itemClass}><p className="text-xs text-slate-500">{t("todayOverview")}</p><p className="font-semibold">{t("todayOverviewValue")}</p></div>
      </div>
    </section>
  );
}
