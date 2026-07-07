"use client"

import { Toaster as Sonner } from "sonner"
import { useUIStore } from "@/lib/store/ui-store"

export function Toaster() {
  const theme = useUIStore((s) => s.theme)

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-gray-900 group-[.toaster]:text-gray-900 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-200/60 dark:group-[.toaster]:border-gray-800/60 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:backdrop-blur-xl",
          description:
            "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-amber-600 group-[.toast]:text-white group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-gray-800 group-[.toast]:text-gray-700 dark:group-[.toast]:text-gray-300 group-[.toast]:rounded-lg",
        },
      }}
    />
  )
}
