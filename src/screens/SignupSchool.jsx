import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError, getDashboardPath, persistSession, signupSchool } from '../api'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
const otpRegex = /^\d{6,8}$/

export default function SignupSchool() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [schoolCode, setSchoolCode] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = useMemo(() => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedOtp = otp.trim()
    return (
      trimmedName.length > 1 &&
      emailRegex.test(trimmedEmail) &&
      passwordRegex.test(password) &&
      confirmPassword === password &&
      otpRegex.test(trimmedOtp)
    )
  }, [name, email, password, confirmPassword, otp])

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading || !isValid) return

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        otp_code: otp.trim(),
      }
      const data = await signupSchool(payload)
      persistSession(data)
      setPassword('')
      setConfirmPassword('')
      setOtp('')
      setSchoolCode(data?.schoolCode || '')
      const destination = getDashboardPath(data?.role) || '/school'
      const codeMessage = data?.schoolCode ? ` Il tuo Codice Scuola è ${data.schoolCode}.` : ''
      setSuccess(`Registrazione completata!${codeMessage} Ti reindirizzo…`)
      setTimeout(() => {
        navigate(destination, { replace: true })
      }, 1000)
    } catch (err) {
      setPassword('')
      setConfirmPassword('')
      const message = mapSchoolError(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900/70 dark:border dark:border-white/10">
        <h1 className="text-3xl font-semibold text-center text-slate-900 dark:text-white">Registra la tua scuola</h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-300">
          Inserisci l’OTP ricevuto e crea l’account della sede BI.
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
            {schoolCode && (
              <div className="rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold text-binavy">
                Codice Scuola: {schoolCode}
              </div>
            )}
            <Link to="/school" className="font-medium text-emerald-700 underline">
              Vai alla dashboard scuola
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate aria-busy={loading}
          aria-live="polite">
          <div>
            <label htmlFor="school-name" className="text-sm font-medium text-slate-700">
              Nome Scuola
            </label>
            <input
              id="school-name"
              type="text"
              autoComplete="organization"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="school-email" className="text-sm font-medium text-slate-700">
              Email istituzionale
            </label>
            <input
              id="school-email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nome@istituto.it"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="school-password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="school-password"
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
            <label htmlFor="school-confirm-password" className="text-sm font-medium text-slate-700">
              Conferma password
            </label>
            <input
              id="school-confirm-password"
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
            <label htmlFor="school-otp" className="text-sm font-medium text-slate-700">
              Codice OTP
            </label>
            <input
              id="school-otp"
              type="text"
              inputMode="numeric"
              pattern="\d{6,8}"
              maxLength={8}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-1"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/[^\d]/g, ''))}
              placeholder="000000"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-slate-500">Codice fornito dal supporto BI (6 cifre).</p>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full rounded-xl bg-binavy py-3 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Verifica…' : 'Crea account scuola'}
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

function mapSchoolError(err) {
  if (err instanceof ApiError) {
    const serverMessage = err.payload?.error || err.message
    if (err.status === 400) {
      return serverMessage || 'OTP non valido o già usato.'
    }
    if (err.status === 409) {
      return serverMessage || 'Email scuola già registrata.'
    }
    if (err.status >= 500) {
      return 'Errore server, riprova più tardi.'
    }
    return serverMessage || 'Errore del server. Riprova più tardi.'
  }
  return err?.message || 'Connessione non disponibile.'
}
