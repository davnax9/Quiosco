import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
// import { cn } from "@/lib/utils";

//const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const font = Inter({
  subsets: ['latin'],
  weight: ['400','700','900']
})

export const metadata: Metadata = {
  title: "Quiosco Next.JS Con App Router y Prisma",
  description: "Quiosco Next.JS Con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} bg-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
