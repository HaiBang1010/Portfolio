import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Tran Phan Hai Bang",
  description: "A modern, minimalist showcase of frontend engineering skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth dark", "font-sans", inter.variable)}>
      <body
        className={`${inter.className} min-h-screen antialiased selection:bg-green-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
