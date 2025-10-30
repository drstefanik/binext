import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-slate-900/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-wide text-[#0C3C4A] dark:text-white">
          BI NEXT
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-xl border text-slate-700 hover:bg-white dark:border-white/10 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/signup-student"
            className="px-3 py-1.5 rounded-xl border text-slate-700 hover:bg-white dark:border-white/10 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Signup Studente
          </Link>
          <Link
            to="/signup-school"
            className="px-3 py-1.5 rounded-xl bg-[#00247D] text-white shadow hover:bg-[#001c5e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Signup Scuola
          </Link>
        </nav>
      </div>
    </header>
  )
}
