import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroCast | Modern Forecasts",
  description: "Modern weather forecast and calendar app built for Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
