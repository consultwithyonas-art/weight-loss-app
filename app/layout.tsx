import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Weight-Loss System — Honest food tools, by a doctor",
  description:
    "Free, honest tools built around the food you actually eat. Check calories, estimate your resting burn, plan your day, and bust common weight myths. By a medical doctor — no fads, no ads.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "The Weight-Loss System — Honest food tools, by a doctor",
    description:
      "Free, honest tools built around the food you actually eat. No fads, no ads — by a medical doctor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  );
}