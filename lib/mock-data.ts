import { City, WeatherPayload } from "@/lib/types";

export const popularCities: City[] = [
  { id: "tbs", name: "Tbilisi", region: "Tbilisi", country: "Georgia", lat: 41.7151, lon: 44.8271 },
  { id: "bus", name: "Batumi", region: "Adjara", country: "Georgia", lat: 41.6168, lon: 41.6367 },
  { id: "kut", name: "Kutaisi", region: "Imereti", country: "Georgia", lat: 42.2662, lon: 42.718 },
  { id: "rus", name: "Rustavi", region: "Kvemo Kartli", country: "Georgia", lat: 41.5495, lon: 44.9932 },
  { id: "tel", name: "Telavi", region: "Kakheti", country: "Georgia", lat: 41.9198, lon: 45.4732 },
  { id: "zug", name: "Zugdidi", region: "Samegrelo", country: "Georgia", lat: 42.51, lon: 41.87 },
  { id: "gor", name: "Gori", region: "Shida Kartli", country: "Georgia", lat: 41.9854, lon: 44.1089 },
  { id: "pot", name: "Poti", region: "Samegrelo", country: "Georgia", lat: 42.1462, lon: 41.6718 },
  { id: "akh", name: "Akhaltsikhe", region: "Samtskhe-Javakheti", country: "Georgia", lat: 41.6399, lon: 42.9826 },
  { id: "mts", name: "Mtskheta", region: "Mtskheta-Mtianeti", country: "Georgia", lat: 41.8451, lon: 44.7188 },
];

const nextDates = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

const nextHours = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() + i);
    return date.toISOString();
  });

export const getMockWeather = (city: City): WeatherPayload => ({
  city,
  source: "mock",
  updatedAt: new Date().toISOString(),
  current: {
    temperature: 21,
    condition: "Partly Cloudy",
    conditionCode: "partly-cloudy",
    high: 24,
    low: 16,
    feelsLike: 22,
    humidity: 57,
    windSpeed: 12,
    windDirection: "SW",
    pressure: 1014,
    visibility: 9.7,
    uvIndex: 5,
    precipitationChance: 26,
    sunrise: "06:24",
    sunset: "19:18",
    cloudCover: 41,
    dewPoint: 13,
  },
  hourly: nextHours(24).map((time, idx) => ({
    time,
    temperature: 18 + Math.round(Math.sin(idx / 3) * 6),
    precipitationChance: Math.max(5, Math.round(40 * Math.abs(Math.sin(idx / 5)))),
    wind: `${8 + (idx % 7)} mph`,
    condition: idx % 4 === 0 ? "Light Rain" : "Partly Cloudy",
    conditionCode: idx % 4 === 0 ? "rain" : "partly-cloudy",
  })),
  daily: nextDates(35).map((date, idx) => ({
    date,
    summary: idx % 3 === 0 ? "Breezy with passing showers" : "Comfortable with mixed clouds",
    high: 22 + (idx % 8),
    low: 12 + (idx % 6),
    precipitationChance: 15 + ((idx * 7) % 60),
    conditionCode: idx % 3 === 0 ? "rain" : idx % 2 === 0 ? "sun" : "cloud",
    wind: `${10 + (idx % 9)} mph NW`,
    humidity: 45 + (idx % 30),
    sunrise: "06:20",
    sunset: "19:20",
  })),
});
