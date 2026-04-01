import { City } from "@/lib/types";

export function CitySwitcher({
  cities,
  selectedCity,
  onSelect,
}: {
  cities: City[];
  selectedCity: string;
  onSelect: (cityName: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((city) => {
        const active = city.name === selectedCity;
        return (
          <button
            key={city.id}
            onClick={() => onSelect(city.name)}
            className={`rounded-full px-3 py-2 text-xs font-medium transition sm:py-1.5 ${
              active
                ? "bg-sky-600 text-white shadow"
                : "bg-white/70 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-200"
            }`}
          >
            {city.name}
          </button>
        );
      })}
    </div>
  );
}
