import { City, WeatherPayload } from "@/lib/types";

export const popularCities: City[] = [
  { id: "nyc", name: "New York", region: "NY", country: "USA", lat: 40.7128, lon: -74.006 },
  { id: "la", name: "Los Angeles", region: "CA", country: "USA", lat: 34.0522, lon: -118.2437 },
  { id: "chi", name: "Chicago", region: "IL", country: "USA", lat: 41.8781, lon: -87.6298 },
  { id: "lon", name: "London", region: "England", country: "UK", lat: 51.5072, lon: -0.1276 },
  { id: "tok", name: "Tokyo", region: "Kanto", country: "Japan", lat: 35.6762, lon: 139.6503 },
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
    temperature: 72,
    condition: "Partly Cloudy",
    conditionCode: "partly-cloudy",
    high: 77,
    low: 65,
    feelsLike: 74,
    humidity: 57,
    windSpeed: 12,
    windDirection: "SW",
    pressure: 1014,
    visibility: 9.7,
    uvIndex: 5,
    precipitationChance: 26,
    sunrise: "6:24 AM",
    sunset: "7:18 PM",
    cloudCover: 41,
    dewPoint: 56,
  },
  hourly: nextHours(24).map((time, idx) => ({
    time,
    temperature: 67 + Math.round(Math.sin(idx / 3) * 8),
    precipitationChance: Math.max(5, Math.round(40 * Math.abs(Math.sin(idx / 5)))),
    wind: `${8 + (idx % 7)} mph`,
    condition: idx % 4 === 0 ? "Light Rain" : "Partly Cloudy",
    conditionCode: idx % 4 === 0 ? "rain" : "partly-cloudy",
  })),
  daily: nextDates(35).map((date, idx) => ({
    date,
    summary: idx % 3 === 0 ? "Breezy with passing showers" : "Comfortable with mixed clouds",
    high: 68 + (idx % 8),
    low: 54 + (idx % 6),
    precipitationChance: 15 + ((idx * 7) % 60),
    conditionCode: idx % 3 === 0 ? "rain" : idx % 2 === 0 ? "sun" : "cloud",
    wind: `${10 + (idx % 9)} mph NW`,
    humidity: 45 + (idx % 30),
    sunrise: "6:20 AM",
    sunset: "7:20 PM",
  })),
});
