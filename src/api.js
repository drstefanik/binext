const API = import.meta.env.VITE_AUTH_API
export async function login(email, password) {
  const r = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error || 'Login error')
  return data
}
