import React, { useState } from 'react'
import { login } from '../api'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true); setMsg('')
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      setMsg(`Accesso effettuato: ${data.role}`)
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{marginTop:0}}>Accedi</h2>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com" />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <button className="btn primary" style={{width:'100%'}} disabled={loading}>
            {loading ? 'Verifica…' : 'Login'}
          </button>
        </form>
        {msg && <p style={{marginTop:12}}>{msg}</p>}
        <p className="muted" style={{marginTop:12}}>
          <Link to="/">← Torna alla Home</Link>
        </p>
      </div>
    </div>
  )
}
