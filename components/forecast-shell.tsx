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
import { useLanguage } from "@/components/language-provider";
import { PageContainer } from "@/components/page-container";

const skeleton = <div className="card h-48 animate-pulse bg-slate-200/70 dark:bg-slate-800" />;

export function ForecastShell() {
  const { t } = useLanguage();
  const [city, setCity] = useState("Tbilisi");
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
        if (!res.ok) throw new Error(t("unableLoad"));
        const payload = (await res.json()) as WeatherPayload;
        setWeather(payload);
      } catch {
        setError(t("errorUnavailable"));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [city, t]);

  return (
    <PageContainer>
      <section className="card space-y-3">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <CitySearch cities={popularCities} onSelect={setCity} />
          <ForecastTabs mode={mode} onModeChange={setMode} />
        </div>
        <CitySwitcher cities={popularCities.slice(0, 6)} selectedCity={city} onSelect={setCity} />
      </section>

      {error && <p className="card border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-300">{error}</p>}

      {loading && (
        <div className="grid gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">{t("loading")}</div>
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

      {!loading && !weather && !error && <div className="card">{t("noWeatherResults")}</div>}
    </PageContainer>
  );
}
