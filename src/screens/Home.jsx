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
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#00247D] via-white to-[#CF142B] animate-gradient-x"></div>
      {/* Vignettatura per contrasto */}
      <div className="absolute inset-0 -z-25 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_60%)]"></div>
      <div className="absolute inset-0 -z-20 bg-network bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 -z-10">
        <Particles density={100} />
      </div>

      {/* === HERO === */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-16 min-h-[80vh] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          {/* LOGO NEXT */}
          {nextLogo && (
            <motion.img
              src={nextLogo}
              alt="NEXT"
              className="h-20 md:h-24 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
          )}

          {/* SOTTOTITOLO - SIGNIFICATO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-white/90 px-4 py-1 text-sm md:text-base font-semibold text-[#00247D] shadow"
          >
            Native English eXperience Test
          </motion.div>

          {/* TITOLO PRINCIPALE */}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-white text-shadow-lg max-w-4xl">
            Il programma di certificazione orizzontale per tutti gli studenti
            della scuola pubblica italiana
          </h1>

          {/* DESCRIZIONE */}
          <p className="max-w-2xl text-white/95 mt-4 text-shadow">
            Materiali ufficiali sempre aggiornati, area download dedicata alla
            tua sede e registrazione studenti con Codice Scuola.
          </p>

          {/* BOTTONI */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link
              to="/signup-school"
              className="px-6 py-3 rounded-2xl bg-[#00247D] text-white font-medium shadow-md hover:bg-[#001c5e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all"
            >
              Registra la tua scuola
            </Link>
            <Link
              to="/signup-student"
              className="px-6 py-3 rounded-2xl bg-white text-[#00247D] font-medium shadow-md hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition-all"
            >
              Sono uno studente
            </Link>
          </div>
        </motion.div>
      </section>

      {/* === CARD SEZIONI === */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 grid md:grid-cols-2 gap-8">
        <motion.div
          {...card(0.1)}
          className="rounded-3xl bg-white/95 backdrop-blur border border-[#00247D]/15 p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img
              src={logoBI}
              alt="British Institutes"
              className="w-full h-full object-contain p-6"
            />
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold text-[#00247D] mb-2">
              Scuola
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Spazio riservato alla sede per condividere i materiali con le
              proprie classi.
            </p>
            <Link
              to="/signup-school"
              className="text-[#CF142B] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF142B]/30 rounded"
            >
              Vai →
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...card(0.2)}
          className="rounded-3xl bg-white/95 backdrop-blur border border-[#00247D]/15 p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-50">
            <img
              src={illStudent}
              alt="Studente"
              className="w-full h-full object-contain p-6"
            />
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold text-[#00247D] mb-2">
              Studente
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Registrati con il Codice Scuola e accedi ai download della tua
              sede.
            </p>
            <Link
              to="/signup-student"
              className="text-[#CF142B] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF142B]/30 rounded"
            >
              Vai →
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
