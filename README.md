# AeroCast (Next.js + Vercel)

A polished, responsive weather forecast site with:
- City search + quick city switching
- Hourly/Daily forecast mode switch
- Rich weather details cards
- Separate calendar weather page with day modal details
- Mock-first architecture with optional Open-Meteo live data

## Tech stack
- Next.js App Router + TypeScript
- React
- Tailwind CSS
- lucide-react icons
- Vercel-ready serverless route handler (`app/api/weather/route.ts`)

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## API configuration
By default, the app uses realistic mock data.

To enable live weather from Open-Meteo, set:
```bash
OPEN_METEO_ENABLED=1
```
in `.env.local`.

No API key is required for Open-Meteo public endpoint.

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import project in Vercel.
3. (Optional) Add `OPEN_METEO_ENABLED=1` environment variable.
4. Deploy.

Vercel will run `npm run build` and serve with Next.js serverless runtime.
