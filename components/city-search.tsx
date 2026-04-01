"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { City } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

export function CitySearch({ cities, onSelect }: { cities: City[]; onSelect: (cityName: string) => void }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const { t } = useLanguage();

  const suggestions = useMemo(() => {
    if (!query) return cities.slice(0, 6);
    return cities.filter((city) => `${city.name} ${city.region}`.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  }, [cities, query]);

  return (
    <div className="relative w-full min-w-0">
      <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/80">
        <Search className="h-4 w-4 text-slate-500" />
        <input
          className="w-full min-w-0 bg-transparent text-sm outline-none"
          placeholder={t("searchCity")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
        />
      </div>
      {focused && (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/20 bg-white/95 p-1 shadow-soft dark:border-slate-700 dark:bg-slate-900/95">
          {suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-500">{t("noResults")}</li>
          ) : (
            suggestions.map((city) => (
              <li key={city.id}>
                <button
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => {
                    onSelect(city.name);
                    setQuery(city.name);
                  }}
                >
                  {city.name}, {city.region}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
