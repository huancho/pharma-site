import type { Metadata, Viewport } from "next"
import { Public_Sans, Source_Serif_4 } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const fontHeading = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-heading",
})

const fontSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Halden Pharma Supply | Licensed pharmaceutical wholesale, Louisville, KY",
  description:
    "Licensed drug wholesaler shipping brand, generic and OTC products to pharmacies, clinics and long-term care facilities in 14 states. One named rep on every account.",
}

// themeColor is --background in light; ThemeColorSync follows the toggle from there.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "oklch(0.975 0.007 165)",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", fontHeading.variable, fontSans.variable)}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            mobileOffset={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
