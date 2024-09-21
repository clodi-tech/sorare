import type { Metadata } from "next";
import { Rajdhani as FontSans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sorare",
  description: "Build your dream team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
