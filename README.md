
# BI NEXT — Portal (Admin / Scuola / Studente)

Skeleton React (Vite + React Router + Tailwind) con integrazione Airtable.

## Setup
1) `npm i`
2) Copia `.env.example` in `.env` e imposta le variabili (Vercel o locale).
3) `npm run dev`

## Build
`npm run build` → output in `dist/`

## Env
VITE_AT_API_KEY, VITE_AT_BASE_ID, ... (vedi `.env.example`).

## Rotte
- `/` Home
- `/login?mode=admin|school|student`
- `/signup-school` (OTP)
- `/signup-student` (Codice Scuola)
- `/admin`, `/school`, `/student` (+ sottosezioni)
