import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSchoolCode, getStoredSession } from '../api'

export default function SchoolDashboard() {
  const session = useMemo(() => getStoredSession(), [])
  const initialCode = session?.schoolCode || ''
  const initialName = session?.name || session?.schoolName || ''
  const token = session?.token
  const [schoolName, setSchoolName] = useState(initialName)
  const [code, setCode] = useState(initialCode)
  const [loadingCode, setLoadingCode] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadCode() {
      setLoadingCode(true)
      setCodeError('')
      try {
        const data = await fetchSchoolCode()
        if (!active) return
        if (data?.schoolCode) {
          setCode(data.schoolCode)
        }
        if (data?.schoolName) {
          setSchoolName(data.schoolName)
        }
      } catch (error) {
        if (!active) return
        console.error('Unable to fetch school code', error)
        const message = error?.message || 'Impossibile recuperare il Codice Scuola.'
        setCodeError(message)
      } finally {
        if (active) {
          setLoadingCode(false)
        }
      }
    }

    if (token) {
      loadCode()
    }

    return () => {
      active = false
    }
  }, [token])

  async function handleCopy() {
    if (!code) return
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
        setCopyMessage('Codice copiato negli appunti!')
      } else {
        throw new Error('Clipboard API non disponibile')
      }
    } catch (error) {
      console.error('Copy school code failed', error)
      setCopyMessage('Copia manuale: seleziona il codice e premi Ctrl+C.')
    }

    setTimeout(() => {
      setCopyMessage('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-biwhite via-biwhite to-binavy/10 px-4 py-12 dark:from-[#0a0f1f] dark:via-[#0a0f1f] dark:to-[#001c5e]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          <h1 className="text-3xl font-semibold text-binavy dark:text-white">Area Scuola</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
          {schoolName
            ? `Benvenuto ${schoolName}! Qui puoi gestire il Codice Scuola da condividere con gli studenti.`
            : 'Benvenuto nella dashboard della tua scuola. Qui troverai materiali e potrai gestire il tuo Codice Scuola.'}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-binavy dark:text-slate-200">
            <span>Vuoi uscire?</span>
            <Link to="/logout" className="font-semibold text-binavy underline-offset-4 hover:text-bireg dark:text-white dark:hover:text-bireg">
              Logout
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-binavy dark:text-white">Codice Scuola</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Condividi questo codice con gli studenti per permettere la registrazione ai corsi BI Next.
          </p>

          {codeError && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-bireg/20 bg-bireg/10 px-4 py-3 text-sm text-bireg"
            >
              {codeError}
            </div>
          )}

          <div className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-binavy/30 bg-binavy/5 px-5 py-6 dark:border-white/10 dark:bg-[#111a33]/60 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Codice attivo</p>
              <p className="mt-2 text-3xl font-semibold tracking-[0.2em] text-binavy dark:text-white">
                {loadingCode ? '••••••••' : code || '— — — — — — — —'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!code || loadingCode}
              className="inline-flex items-center gap-2 rounded-full bg-binavy px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#001c5e] focus:outline-none focus-visible:ring-2 focus-visible:ring-bireg focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#16348f] dark:focus-visible:ring-[#6a87ff] dark:focus-visible:ring-offset-[#0a0f1f]"
            >
              Copia Codice
            </button>
          </div>

          {copyMessage && (
            <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-300" aria-live="polite">
              {copyMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
