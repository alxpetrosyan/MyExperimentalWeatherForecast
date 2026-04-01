"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DailyForecastItem } from "@/lib/types";
import { WeatherIcon } from "@/components/weather-icons";
import { DayWeatherModal } from "@/components/day-weather-modal";

export function WeatherCalendar({ daily }: { daily: DailyForecastItem[] }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<DailyForecastItem | null>(null);

  const baseDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + monthOffset, 1);
    return d;
  }, [monthOffset]);

  const daysInMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
  const startWeekday = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1).getDay();

  const monthForecast = daily.filter((item) => {
    const d = new Date(item.date);
    return d.getMonth() === baseDate.getMonth() && d.getFullYear() === baseDate.getFullYear();
  });

  const dayMap = new Map(monthForecast.map((f) => [new Date(f.date).getDate(), f]));

  return (
    <section className="card">
      <div className="mb-4 flex items-center justify-between">
        <button className="rounded-lg p-2 hover:bg-slate-200/80 dark:hover:bg-slate-800" onClick={() => setMonthOffset((v) => v - 1)}><ChevronLeft /></button>
        <h2 className="text-xl font-semibold">{baseDate.toLocaleDateString([], { month: "long", year: "numeric" })}</h2>
        <button className="rounded-lg p-2 hover:bg-slate-200/80 dark:hover:bg-slate-800" onClick={() => setMonthOffset((v) => v + 1)}><ChevronRight /></button>
      </div>

      <div className="hidden grid-cols-7 gap-2 text-xs text-slate-500 md:grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="mt-2 hidden grid-cols-7 gap-2 md:grid">
        {Array.from({ length: startWeekday }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const day = dayMap.get(dayNum);
          const isToday = (() => {
            const t = new Date();
            return t.getDate() === dayNum && t.getMonth() === baseDate.getMonth() && t.getFullYear() === baseDate.getFullYear();
          })();
          return (
            <button
              key={dayNum}
              onClick={() => day && setSelectedDay(day)}
              className={`min-h-28 rounded-xl border p-2 text-left transition ${
                isToday ? "border-sky-500 bg-sky-500/10" : "border-transparent bg-slate-100/80 dark:bg-slate-800/70"
              } ${day ? "hover:border-sky-400" : "opacity-50"}`}
            >
              <p className="text-xs font-semibold">{dayNum}</p>
              {day && (
                <>
                  <WeatherIcon code={day.conditionCode} className="mt-1 h-4 w-4 text-sky-500" />
                  <p className="mt-1 text-xs">{day.high}° / {day.low}°</p>
                  <p className="truncate text-[11px] text-slate-500">Rain {day.precipitationChance}%</p>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 md:hidden">
        {monthForecast.map((day) => (
          <button key={day.date} className="w-full rounded-xl bg-slate-100/80 p-3 text-left dark:bg-slate-800/70" onClick={() => setSelectedDay(day)}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{new Date(day.date).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</p>
              <span className="text-sm">{day.high}° / {day.low}°</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{day.summary} • Rain {day.precipitationChance}%</p>
          </button>
        ))}
      </div>

      <DayWeatherModal day={selectedDay} onClose={() => setSelectedDay(null)} />
    </section>
  );
}
