import { getMockWeather, popularCities } from "@/lib/mock-data";
import { City, WeatherPayload } from "@/lib/types";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const toCity = (query: string): City => {
  const found = popularCities.find((c) =>
    `${c.name} ${c.region} ${c.country}`.toLowerCase().includes(query.toLowerCase()),
  );
  return found ?? popularCities[0];
};

export async function getWeatherByCity(query: string): Promise<WeatherPayload> {
  const city = toCity(query || "New York");

  if (!process.env.OPEN_METEO_ENABLED) {
    return getMockWeather(city);
  }

  try {
    const params = new URLSearchParams({
      latitude: String(city.lat),
      longitude: String(city.lon),
      timezone: "auto",
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,wind_direction_10m",
      hourly: "temperature_2m,precipitation_probability,wind_speed_10m,weather_code",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
      forecast_days: "16",
    });

    const response = await fetch(`${WEATHER_URL}?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Weather provider unavailable");
    }
    const data = await response.json();

    return {
      city,
      source: "open-meteo",
      updatedAt: new Date().toISOString(),
      current: {
        temperature: Math.round(data.current.temperature_2m),
        condition: "Live Forecast",
        conditionCode: "cloud",
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: `${Math.round(data.current.wind_direction_10m)}°`,
        pressure: Math.round(data.current.pressure_msl),
        visibility: 10,
        uvIndex: 5,
        precipitationChance: data.daily.precipitation_probability_max[0] ?? 20,
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        sunset: new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        cloudCover: data.current.cloud_cover,
        dewPoint: Math.round(data.current.temperature_2m - 8),
      },
      hourly: data.hourly.time.slice(0, 24).map((time: string, idx: number) => ({
        time,
        temperature: Math.round(data.hourly.temperature_2m[idx]),
        precipitationChance: data.hourly.precipitation_probability[idx] ?? 0,
        wind: `${Math.round(data.hourly.wind_speed_10m[idx])} mph`,
        condition: "Hourly",
        conditionCode: "cloud",
      })),
      daily: data.daily.time.map((date: string, idx: number) => ({
        date,
        summary: "Comfortable with variable clouds",
        high: Math.round(data.daily.temperature_2m_max[idx]),
        low: Math.round(data.daily.temperature_2m_min[idx]),
        precipitationChance: data.daily.precipitation_probability_max[idx] ?? 10,
        conditionCode: "cloud",
        wind: `${Math.round(data.current.wind_speed_10m)} mph`,
        humidity: data.current.relative_humidity_2m,
        sunrise: new Date(data.daily.sunrise[idx]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        sunset: new Date(data.daily.sunset[idx]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      })),
    };
  } catch {
    return getMockWeather(city);
  }
}
