# BI NEXT Auth API

Mini backend per login/signup (Admin, School, Student) con Airtable, bcrypt e JWT.

## Setup
```bash
npm install
cp .env.example .env
# poi inserisci le chiavi
npm run start
```

## Endpoints
- `POST /auth/login` → { email, password }
- `POST /auth/signup-student` → { full_name, email, password, schoolId? }
- `POST /auth/signup-school` → { name, email, password, otp_code }

## Note
- Campi richiesti in Airtable: vedere commenti nei file sorgente.
- Non committare `.env`.
