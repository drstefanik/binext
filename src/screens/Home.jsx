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
    <main className="relative overflow-hidden text-center">
      {/* === SFONDO === */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#00247D] via-white to-[#CF142B] dark:from-[#0b1a4a] dark:via-[#0a0f1f] dark:to-[#7a0b18] animate-gradient-x"></div>
      {/* Vignettatura per contrasto */}
      <div className="absolute inset-0 -z-25 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_60%)]"></div>
      <div className="absolute inset-0 -z-20 bg-network bg-cover bg-center opacity-40 dark:opacity-30"></div>
      <div className="absolute inset-0 -z-10">
        <Particles density={100} />
      </div>

      {/* === HERO === */}
      <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          {nextLogo && (
            <motion.img
              src={nextLogo}
              alt="NEXT"
              className="h-20 w-auto drop-shadow-lg transition-transform duration-500 hover:scale-105 md:h-24"
              whileHover={{ scale: 1.05 }}
            />
          )}

          {/* payoff */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-[#00247D] shadow dark:bg-white/80 dark:text-[#dbe7ff] md:text-base"
          >
            Native English eXperience Test
          </motion.div>

          <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white [text-shadow:_0_4px_14px_rgba(0,0,0,.35)] md:text-5xl">
            Il programma di certificazione orizzontale per tutti gli studenti
            della scuola pubblica italiana
          </h1>

          <p className="mt-4 max-w-2xl text-white/95 [text-shadow:_0_2px_8px_rgba(0,0,0,.25)] dark:text-white/90">
            Materiali ufficiali sempre aggiornati, area download dedicata alla
            tua sede e registrazione studenti con Codice Scuola.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup-school"
              className="rounded-2xl bg-[#00247D] px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-[#001c5e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:focus-visible:ring-white/60"
            >
              Registra la tua scuola
            </Link>
            <Link
              to="/signup-student"
              className="rounded-2xl bg-white px-6 py-3 font-medium text-[#00247D] shadow-md transition-all hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 dark:bg-slate-100 dark:text-[#001c5e] dark:hover:bg-slate-200"
            >
              Sono uno studente
            </Link>
          </div>
        </motion.div>
      </section>

      {/* === CARD SEZIONI === */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-20 md:grid-cols-2">
        <motion.div
          {...card(0.1)}
          className="rounded-3xl border border-[#00247D]/15 bg-white/95 p-6 shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img src={logoBI} alt="British Institutes" className="h-full w-full object-contain p-6" />
          </div>
          <div className="mt-5">
            <h3 className="mb-2 text-xl font-semibold text-[#00247D] dark:text-white">Scuola</h3>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Spazio riservato alla sede per condividere i materiali con le proprie classi.
            </p>
            <Link
              to="/signup-school"
              className="rounded text-[#CF142B] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF142B]/30 dark:text-[#ff7a88] dark:focus-visible:ring-white/20"
            >
              Vai →
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...card(0.2)}
          className="rounded-3xl border border-[#00247D]/15 bg-white/95 p-6 shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img src={illStudent} alt="Studente" className="h-full w-full object-contain p-6" />
          </div>
          <div className="mt-5">
            <h3 className="mb-2 text-xl font-semibold text-[#00247D] dark:text-white">Studente</h3>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Registrati con il Codice Scuola e accedi ai download della tua sede.
            </p>
            <Link
              to="/signup-student"
              className="rounded text-[#CF142B] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF142B]/30 dark:text-[#ff7a88] dark:focus-visible:ring-white/20"
            >
              Vai →
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
