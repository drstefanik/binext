import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Area Studente</h1>
        <p className="mt-3 text-slate-600">
          Qui troverai i materiali condivisi dalla tua scuola. Se non hai ancora collegato una sede potrai farlo a breve.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-binavy">
          <span>Vuoi uscire?</span>
          <Link to="/logout" className="font-semibold underline">Logout</Link>
        </div>
      </div>
    </div>
  )
}
