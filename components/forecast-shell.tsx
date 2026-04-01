"use client";

import { useEffect, useState } from "react";
import { CitySwitcher } from "@/components/city-switcher";
import { CitySearch } from "@/components/city-search";
import { CurrentWeatherCard } from "@/components/current-weather-card";
import { DailyForecast } from "@/components/daily-forecast";
import { ForecastTabs } from "@/components/forecast-tabs";
import { HourlyForecast } from "@/components/hourly-forecast";
import { WeatherDetailsGrid } from "@/components/weather-details-grid";
import { popularCities } from "@/lib/mock-data";
import { ForecastMode, WeatherPayload } from "@/lib/types";

const skeleton = <div className="card h-48 animate-pulse bg-slate-200/70 dark:bg-slate-800" />;

export function ForecastShell() {
  const [city, setCity] = useState("New York");
  const [mode, setMode] = useState<ForecastMode>("hourly");
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!res.ok) throw new Error("Unable to load data.");
        const payload = (await res.json()) as WeatherPayload;
        setWeather(payload);
      } catch {
        setError("Weather data is currently unavailable. Showing fallback soon.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [city]);

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 pb-8 sm:px-6">
      <section className="card space-y-3">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <CitySearch cities={popularCities} onSelect={setCity} />
          <ForecastTabs mode={mode} onModeChange={setMode} />
        </div>
        <CitySwitcher cities={popularCities.slice(0, 4)} selectedCity={city} onSelect={setCity} />
      </section>

      {error && <p className="card border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-300">{error}</p>}

      {loading && (
        <div className="grid gap-4">
          {skeleton}
          {skeleton}
        </div>
      )}

      {!loading && weather && (
        <div className="grid gap-4">
          <CurrentWeatherCard weather={weather} />
          <WeatherDetailsGrid weather={weather} />
          {mode === "hourly" ? <HourlyForecast hourly={weather.hourly} /> : <DailyForecast daily={weather.daily} />}
        </div>
      )}

      {!loading && !weather && !error && <div className="card">No weather results available.</div>}
    </main>
  );
}
