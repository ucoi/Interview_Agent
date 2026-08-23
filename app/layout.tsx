import { Mona_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "sonner"

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en"
            suppressHydrationWarning
            className={cn("antialiased", monaSans.variable)}
      >
      <body className={`${monaSans.className} antialiased pattern`}>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster/>
      </body>
      </html>
  )
}