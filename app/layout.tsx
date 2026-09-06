import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Review Game — Video Game Reviews & Metacritic Ratings",
  description:
    "An educational project showcasing video game reviews, ratings, platforms, and Metacritic scores powered by RAWG API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-[#121212] text-neutral-200 flex flex-col font-sans selection:bg-neutral-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
