import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide">BI NEXT</Link>
        <nav className="flex items-center gap-2">
          <Link to="/login" className="px-3 py-1.5 rounded-xl border hover:bg-white">Login</Link>
          <Link to="/signup-student" className="px-3 py-1.5 rounded-xl border">Signup Studente</Link>
          <Link to="/signup-school" className="px-3 py-1.5 rounded-xl bg-binavy text-white">Signup Scuola</Link>
        </nav>
      </div>
    </header>
  )
}
