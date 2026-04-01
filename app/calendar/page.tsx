import { Header } from "@/components/header";
import { WeatherCalendar } from "@/components/weather-calendar";
import { getMockWeather, popularCities } from "@/lib/mock-data";

export default function CalendarPage() {
  const weather = getMockWeather(popularCities[0]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-4 px-4 pb-8 sm:px-6">
        <section className="card">
          <h1 className="text-2xl font-semibold">Monthly weather calendar</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Tap any day to view a detailed weather card.</p>
        </section>
        <WeatherCalendar daily={weather.daily} />
      </main>
    </>
  );
}
