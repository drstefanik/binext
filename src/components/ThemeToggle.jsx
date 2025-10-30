import React, { useEffect, useMemo, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'binext-theme'

export default function ThemeToggle() {
  const prefersDark = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return prefersDark
  })
  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' || stored === 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    if (hasUserPreference && typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    }
  }, [hasUserPreference, isDark])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncWithSystem = (event) => {
      if (!hasUserPreference) {
        setIsDark(event.matches)
      }
    }

    mediaQuery.addEventListener?.('change', syncWithSystem)
    return () => mediaQuery.removeEventListener?.('change', syncWithSystem)
  }, [hasUserPreference])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
    setHasUserPreference(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, !isDark ? 'dark' : 'light')
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-binavy/40 bg-white text-binavy transition hover:border-binavy hover:bg-binavy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-bireg focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-[#152044] dark:text-biwhite dark:hover:bg-[#001c5e] dark:focus-visible:ring-[#6a87ff] dark:focus-visible:ring-offset-[#0a0f1f]"
      aria-label={isDark ? 'Attiva tema chiaro' : 'Attiva tema scuro'}
    >
      <span className="sr-only">{isDark ? 'Tema scuro attivo' : 'Tema chiaro attivo'}</span>
      {isDark ? <Moon className="h-5 w-5" strokeWidth={1.75} /> : <Sun className="h-5 w-5" strokeWidth={1.75} />}
    </button>
  )
}
