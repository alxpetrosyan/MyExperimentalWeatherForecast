"use client";

import { DailyForecastItem } from "@/lib/types";
import { X } from "lucide-react";

export function DayWeatherModal({ day, onClose }: { day: DailyForecastItem | null; onClose: () => void }) {
  if (!day) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{new Date(day.date).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</h3>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-2 text-sm">
          <p>Condition: {day.summary}</p>
          <p>Day/Night: {day.high}° / {day.low}°</p>
          <p>Rain chance: {day.precipitationChance}%</p>
          <p>Wind: {day.wind}</p>
          <p>Humidity: {day.humidity}%</p>
          <p>Sunrise / Sunset: {day.sunrise} / {day.sunset}</p>
        </div>
      </div>
    </div>
  );
}
