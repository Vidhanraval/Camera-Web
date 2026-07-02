"use client"

import { useEffect } from "react"
import { useUIStore } from "@/lib/store/ui-store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "dark" ? "#0a0a1a" : "#ffffff"
      )
    }
  }, [theme])

  // Load persisted theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("dev-enterprise-theme")
    if (stored === "dark" || stored === "light") {
      useUIStore.getState().setTheme(stored)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      useUIStore.getState().setTheme("dark")
    }
  }, [])

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem("dev-enterprise-theme", theme)
  }, [theme])

  return <>{children}</>
}
