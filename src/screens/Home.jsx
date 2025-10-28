import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-xl p-8">
        <h1 className="text-5xl font-extrabold tracking-wide">BI NEXT</h1>
        <p className="text-slate-600 mt-3">Accesso sicuro a risorse per Scuole e Studenti</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/login" className="px-5 py-3 rounded-xl bg-brand text-white font-semibold shadow hover:opacity-90 transition">Accedi</Link>
          <a href="https://www.britishinstitutes.it" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl border border-brand text-brand font-semibold hover:bg-white">Sito principale</a>
        </div>
        <p className="text-xs text-slate-500 mt-4">Serve aiuto? Contatta il tuo centro British Institutes.</p>
      </div>
    </div>
  )
}
