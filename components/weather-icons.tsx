import { Cloud, CloudDrizzle, CloudRain, Sun, CloudSun } from "lucide-react";

export function WeatherIcon({ code, className = "h-5 w-5" }: { code: string; className?: string }) {
  if (code.includes("rain")) return <CloudRain className={className} />;
  if (code.includes("drizzle")) return <CloudDrizzle className={className} />;
  if (code.includes("sun")) return <Sun className={className} />;
  if (code.includes("partly")) return <CloudSun className={className} />;
  return <Cloud className={className} />;
}
