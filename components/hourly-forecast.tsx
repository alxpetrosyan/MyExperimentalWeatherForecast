import { HourlyForecastItem } from "@/lib/types";
import { WeatherIcon } from "@/components/weather-icons";

export function HourlyForecast({ hourly }: { hourly: HourlyForecastItem[] }) {
  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">Hourly forecast</h3>
      <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-2">
        {hourly.map((item) => (
          <article key={item.time} className="min-w-32 rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/70">
            <p className="text-xs text-slate-500">{new Date(item.time).toLocaleTimeString([], { hour: "numeric" })}</p>
            <WeatherIcon code={item.conditionCode} className="my-2 h-6 w-6 text-sky-500" />
            <p className="text-xl font-semibold">{item.temperature}°</p>
            <p className="text-xs text-slate-500">Rain {item.precipitationChance}%</p>
            <p className="text-xs text-slate-500">{item.wind}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
