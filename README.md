
# BI NEXT — UI v2 (Full)  
React + Vite + Tailwind + Framer Motion + integrazione Airtable (Admin/Scuola/Studente).

## Setup
1) `npm i`
2) Copia `.env.example` → `.env` e inserisci PAT/BaseID e nomi tabelle.
3) `npm run dev`

## Env richieste
- VITE_AT_API_KEY
- VITE_AT_BASE_ID
- VITE_AT_TABLE_ADMINS
- VITE_AT_TABLE_SCHOOLS
- VITE_AT_TABLE_SCHOOL_OTPS
- VITE_AT_TABLE_STUDENTS
- VITE_AT_TABLE_FOLDERS
- VITE_AT_TABLE_FILES

## Percorsi principali
- `/` Home (UI premium)
- `/login?mode=admin|school|student`
- `/signup-school` (OTP)
- `/signup-student` (Codice Scuola)
- Aree: `/admin`, `/school`, `/student`
