import React, { useState } from 'react'
import { login } from '../api'
import { Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true); setMsg('')
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      setMsg(`Accesso effettuato: ${data.role}`)
      // TODO: redirect in base al ruolo
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-1">Accedi</h2>
        <p className="text-sm text-slate-500 mb-6">Inserisci le tue credenziali</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">Email</label>
            <input className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                   placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input type="password" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                   placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button disabled={loading} className="w-full py-2 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition">
            {loading ? 'Verifica…' : 'Login'}
          </button>
        </form>
        {msg && <p className="mt-4 text-sm">{msg}</p>}
        <p className="text-xs text-slate-500 mt-6"><Link to="/">← Torna alla Home</Link></p>
      </div>
    </div>
  )
}
