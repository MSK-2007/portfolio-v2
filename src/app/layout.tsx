import type { Metadata } from "next";
import { Inter, Anton, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Manish — Graphic Designer",
  description: "Passionate Visual Designer specializing in Canva. I transform concepts into eye-catching social media assets, marketing materials, and ad creatives.",
  icons: {
    icon: "/msk-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${anton.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
