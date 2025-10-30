import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError, getDashboardPath, persistSession, signupStudent } from '../api'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
const schoolCodeRegex = /^[A-HJ-NP-Z2-9]{8}$/

export default function SignupStudent() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [schoolCode, setSchoolCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = useMemo(() => {
    const normalizedCode = schoolCode.trim().toUpperCase()
    return (
      fullName.trim().length > 1 &&
      emailRegex.test(email.trim()) &&
      passwordRegex.test(password) &&
      confirmPassword === password &&
      schoolCodeRegex.test(normalizedCode)
    )
  }, [fullName, email, password, confirmPassword, schoolCode])

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading || !isValid) return

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const normalizedCode = schoolCode.trim().toUpperCase()
      if (!schoolCodeRegex.test(normalizedCode)) {
        setError('Codice Scuola non valido')
        setLoading(false)
        return
      }

      const payload = {
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        school_code: normalizedCode,
      }

      const data = await signupStudent(payload)
      persistSession(data)
      setPassword('')
      setConfirmPassword('')
      setSchoolCode('')
      const destination = getDashboardPath(data?.role) || '/student'
      const schoolName = data?.schoolName ? ` ${data.schoolName}` : ''
      setSuccess(`Registrazione completata per la scuola${schoolName}. Ti reindirizzo…`)
      setTimeout(() => {
        navigate(destination, { replace: true })
      }, 600)
    } catch (err) {
      setPassword('')
      setConfirmPassword('')
      const message = mapStudentError(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900/70 dark:border dark:border-white/10">
        <h1 className="text-3xl font-semibold text-center text-slate-900 dark:text-white">Crea il tuo account studente</h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-300">
          Registrati con la tua email. Inserisci il Codice Scuola se lo hai già.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mt-6 flex flex-col gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            aria-live="polite"
          >
            <span>{success}</span>
            <Link to="/student" className="font-medium text-emerald-700 underline">
              Vai all’area studente
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate aria-busy={loading} aria-live="polite">
          <div>
            <label htmlFor="student-name" className="text-sm font-medium text-slate-700">
              Nome e Cognome
            </label>
            <input
              id="student-name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="student-email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="student-email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nome@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="student-password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="student-password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-slate-500">Minimo 8 caratteri, almeno una lettera e un numero.</p>
          </div>

          <div>
            <label htmlFor="student-confirm-password" className="text-sm font-medium text-slate-700">
              Conferma password
            </label>
            <input
              id="student-confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="student-school" className="text-sm font-medium text-slate-700">
              Codice Scuola
            </label>
            <input
              id="student-school"
              type="text"
              autoComplete="off"
              inputMode="text"
              pattern="[A-HJ-NP-Z2-9]{8}"
              maxLength={8}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={schoolCode}
              onChange={(event) =>
                setSchoolCode(event.target.value.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, ''))
              }
              placeholder="ES. ABCD2345"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-slate-500">
              Inserisci il codice fornito dalla tua scuola (8 caratteri, lettere maiuscole e numeri).
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full rounded-xl bg-binavy py-3 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Verifica…' : 'Crea account studente'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Hai già un account?{' '}
          <Link to="/login" className="font-medium text-binavy hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  )
}

function mapStudentError(err) {
  if (err instanceof ApiError) {
    const serverMessage = err.payload?.error || err.message
    if (err.status === 409) {
      return serverMessage || 'Email già registrata.'
    }
    if (err.status === 400) {
      return serverMessage || 'Codice Scuola non valido.'
    }
    if (err.status >= 500) {
      return 'Errore server, riprova più tardi.'
    }
    return serverMessage || 'Errore del server. Riprova più tardi.'
  }
  return err?.message || 'Connessione non disponibile.'
}
