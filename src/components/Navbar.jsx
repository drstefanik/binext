import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 border-b border-binavy/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-[#0a0f1f]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold tracking-wide text-binavy transition hover:text-bireg dark:text-white">
          BI NEXT
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-binavy/30 bg-white/90 px-4 py-2 text-sm font-medium text-binavy shadow-sm transition hover:border-binavy hover:bg-biwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-bireg focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-[#152044] dark:text-slate-100 dark:hover:bg-[#001c5e] dark:focus-visible:ring-[#6a87ff] dark:focus-visible:ring-offset-[#0a0f1f]"
          >
            Login
          </Link>
          <Link
            to="/signup-student"
            className="rounded-full border border-binavy/30 bg-white/90 px-4 py-2 text-sm font-medium text-binavy shadow-sm transition hover:border-binavy hover:bg-biwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-bireg focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-[#152044] dark:text-slate-100 dark:hover:bg-[#001c5e] dark:focus-visible:ring-[#6a87ff] dark:focus-visible:ring-offset-[#0a0f1f]"
          >
            Signup Studente
          </Link>
          <Link
            to="/signup-school"
            className="rounded-full bg-binavy px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[#001c5e] focus:outline-none focus-visible:ring-2 focus-visible:ring-bireg focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-[#16348f] dark:focus-visible:ring-[#6a87ff] dark:focus-visible:ring-offset-[#0a0f1f]"
          >
            Signup Scuola
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
