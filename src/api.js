const API = import.meta.env.VITE_AUTH_API

export async function login(email, password) {
  const r = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!r.ok) throw new Error('Login error')
  return r.json()
}
