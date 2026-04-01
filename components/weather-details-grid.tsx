import { Droplets, Wind, Gauge, Eye, Sun, Cloud, CloudRain, Thermometer } from "lucide-react";
import { WeatherPayload } from "@/lib/types";

const itemClass = "rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/70";

export function WeatherDetailsGrid({ weather }: { weather: WeatherPayload }) {
  const d = weather.current;
  const details = [
    { icon: Droplets, label: "Humidity", value: `${d.humidity}%` },
    { icon: Wind, label: "Wind", value: `${d.windSpeed} mph ${d.windDirection}` },
    { icon: Gauge, label: "Pressure", value: `${d.pressure} hPa` },
    { icon: Eye, label: "Visibility", value: `${d.visibility} mi` },
    { icon: Sun, label: "UV Index", value: `${d.uvIndex}` },
    { icon: CloudRain, label: "Precipitation", value: `${d.precipitationChance}%` },
    { icon: Cloud, label: "Cloud cover", value: `${d.cloudCover}%` },
    { icon: Thermometer, label: "Dew point", value: `${d.dewPoint}°` },
  ];

  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">Air conditions</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {details.map(({ icon: Icon, label, value }) => (
          <article key={label} className={itemClass}>
            <div className="flex items-center gap-2 text-xs text-slate-500"><Icon className="h-4 w-4" /> {label}</div>
            <p className="mt-1 text-lg font-semibold">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className={itemClass}><p className="text-xs text-slate-500">Sunrise</p><p className="font-semibold">{d.sunrise}</p></div>
        <div className={itemClass}><p className="text-xs text-slate-500">Sunset</p><p className="font-semibold">{d.sunset}</p></div>
        <div className={itemClass}><p className="text-xs text-slate-500">Today overview</p><p className="font-semibold">Comfortable temperatures with some passing clouds.</p></div>
      </div>
    </section>
  );
}
