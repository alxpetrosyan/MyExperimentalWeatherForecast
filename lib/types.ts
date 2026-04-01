export type ForecastMode = "hourly" | "daily";

export type City = {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

export type CurrentWeather = {
  temperature: number;
  condition: string;
  conditionCode: string;
  high: number;
  low: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  precipitationChance: number;
  sunrise: string;
  sunset: string;
  cloudCover: number;
  dewPoint: number;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  precipitationChance: number;
  wind: string;
  condition: string;
  conditionCode: string;
};

export type DailyForecastItem = {
  date: string;
  summary: string;
  high: number;
  low: number;
  precipitationChance: number;
  conditionCode: string;
  wind: string;
  humidity: number;
  sunrise: string;
  sunset: string;
};

export type WeatherPayload = {
  city: City;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  updatedAt: string;
  source: "mock" | "open-meteo";
};
