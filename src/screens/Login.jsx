import React, { useState } from 'react'
import { login } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      setMsg(`Login OK: ${data.role}`)
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <div style={{maxWidth: 400, margin: '100px auto', fontFamily: 'sans-serif'}}>
      <h1>BI NEXT</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
