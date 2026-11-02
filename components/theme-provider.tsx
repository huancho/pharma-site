"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {process.env.NODE_ENV === "development" && <ThemeHotkey />}
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}

// The theme is a class, not the OS setting, so a media query on theme-color can't
// follow the toggle. next-themes applies the class in its own effect, which runs
// after this child's, hence reading the token a frame later.
function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          getComputedStyle(document.documentElement).getPropertyValue(
            "--background"
          )
        )
    })

    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])

  return null
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
