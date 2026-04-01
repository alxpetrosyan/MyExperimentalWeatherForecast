import { NextRequest, NextResponse } from "next/server";
import { getWeatherByCity } from "@/lib/weather-service";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") ?? "Tbilisi";

  try {
    const payload = await getWeatherByCity(city);
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ message: "Unable to fetch weather right now." }, { status: 500 });
  }
}
