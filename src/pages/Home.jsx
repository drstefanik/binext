import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "../components/Particles.jsx";
import nextLogo from "../assets/NEXT2.2BG.png";
import logoBI from "../assets/BRITISH INSTITUTES INTERNATIONAL SCHOOL.png";
import illStudent from "../assets/illustration-student.svg";

const card = (d = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, delay: d },
  viewport: { once: true, amount: 0.6 },
});

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* === Background Layers === */}
      <div className="absolute inset-0 -z-30 bg-hero-gradient"></div>
      {/* rete statica di sfondo (SVG) */}
      <div className="absolute inset-0 -z-20 bg-network bg-cover bg-center opacity-60"></div>
      {/* particelle animate sopra la rete */}
      <div className="absolute inset-0 -z-10">
        <Particles density={90} />
      </div>

      {/* === HERO === */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-16 text-center min-h-[70vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {nextLogo && (
            <img
              src={nextLogo}
              alt="NEXT"
              className="h-16 md:h-20 w-auto animate-hue"
            />
          )}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            La piattaforma per{" "}
            <span className="text-binavy">scuole e studenti</span> di British
            Institutes
          </h1>
          <p className="max-w-2xl text-slate-600">
            Materiali ufficiali sempre aggiornati, area download dedicata alla
            tua sede e registrazione studenti con Codice Scuola.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/signup-school"
              className="px-6 py-3 rounded-2xl bg-binavy text-white shadow-soft hover:opacity-95"
            >
              Registra la tua scuola
            </Link>
            <Link
              to="/signup-student"
              className="px-6 py-3 rounded-2xl border hover:bg-white"
            >
              Sono uno studente
            </Link>
          </div>
        </motion.div>
      </section>

      {/* === CARD SEZIONI === */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 grid md:grid-cols-2 gap-8 items-stretch">
        <motion.div
          {...card(0.1)}
          className="rounded-3xl border bg-white p-6 shadow-soft flex flex-col"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img
              src={logoBI}
              alt="British Institutes"
              className="w-full h-full object-contain p-6"
            />
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold mb-2">Scuola</h3>
            <p className="text-sm opacity-70 mb-4">
              Spazio riservato alla sede per condividere i materiali con le
              proprie classi.
            </p>
            <Link to="/signup-school" className="text-binavy font-medium">
              Vai →
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...card(0.2)}
          className="rounded-3xl border bg-white p-6 shadow-soft flex flex-col"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img
              src={illStudent}
              alt=""
              className="w-full h-full object-contain p-6"
            />
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold mb-2">Studente</h3>
            <p className="text-sm opacity-70 mb-4">
              Registrati con il Codice Scuola e accedi ai download della tua
              sede.
            </p>
            <Link to="/signup-student" className="text-binavy font-medium">
              Vai →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* === COME FUNZIONA === */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl bg-white p-8 shadow-soft border">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Come funziona (per le scuole)
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">
                1. Attiva la tua sede in 60s
              </div>
              <p className="opacity-70">
                Inserisci l’OTP ricevuto e crea l’account scuola.
              </p>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">
                2. Condividi il Codice Scuola
              </div>
              <p className="opacity-70">
                Gli studenti si registrano in autonomia e si collegano alla tua
                sede.
              </p>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">
                3. Materiali sempre pronti
              </div>
              <p className="opacity-70">
                Accedi all’area download con contenuti ufficiali, aggiornati e
                organizzati.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
