import { WeatherPayload } from "@/lib/types";
import { WeatherIcon } from "@/components/weather-icons";

export function CurrentWeatherCard({ weather }: { weather: WeatherPayload }) {
  const { current, city } = weather;
  return (
    <section className="card bg-gradient-to-br from-sky-500/20 to-indigo-500/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{city.name}, {city.region}</p>
          <h2 className="mt-1 text-5xl font-bold tracking-tight">{current.temperature}°</h2>
          <p className="mt-2 text-slate-700 dark:text-slate-200">{current.condition}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            H {current.high}° • L {current.low}° • Feels like {current.feelsLike}°
          </p>
        </div>
        <WeatherIcon code={current.conditionCode} className="h-16 w-16 text-sky-500" />
      </div>
    </section>
  );
}
