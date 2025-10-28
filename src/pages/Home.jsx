
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "../components/Particles.jsx";
import nextLogo from "../assets/NEXT2.2BG.png";
import illAdmin from "../assets/illustration-admin.svg";
import illSchool from "../assets/illustration-school.svg";
import illStudent from "../assets/illustration-student.svg";

const card = (d=0)=>({ initial:{opacity:0,y:20,scale:.98}, whileInView:{opacity:1,y:0,scale:1}, transition:{duration:.5, delay:d}, viewport:{once:true, amount:.6} });

export default function Home(){
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <section className="relative overflow-hidden">
        <Particles />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 text-center">
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="flex flex-col items-center gap-6">
            {nextLogo && <img src={nextLogo} alt="NEXT" className="h-16 md:h-20 w-auto animate-hue" />}
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-ink">La piattaforma <span className="text-binavy">scuole & studenti</span> di British Institutes</h1>
            <p className="max-w-2xl text-slate-600">Materiali didattici, area download e gestione test — in un unico spazio semplice e moderno.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup-student" className="px-6 py-3 rounded-2xl bg-binavy text-white shadow-soft hover:opacity-95">Inizia ora</Link>
              <Link to="/signup-school" className="px-6 py-3 rounded-2xl border hover:bg-white">Registra la tua scuola</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 grid md:grid-cols-3 gap-6">
        <motion.div {...card(.05)} className="rounded-3xl border bg-white p-6 shadow-soft">
          <img src={illAdmin} alt="" className="mb-4 rounded-2xl" />
          <h3 className="text-xl font-semibold mb-2">Admin</h3>
          <p className="text-sm opacity-70 mb-4">Gestisci scuole, OTP e materiali</p>
          <Link to="/login?mode=admin" className="text-binavy font-medium">Vai →</Link>
        </motion.div>
        <motion.div {...card(.15)} className="rounded-3xl border bg-white p-6 shadow-soft">
          <img src={illSchool} alt="" className="mb-4 rounded-2xl" />
          <h3 className="text-xl font-semibold mb-2">Scuola</h3>
          <p className="text-sm opacity-70 mb-4">Registrazione con OTP e spazio riservato</p>
          <Link to="/signup-school" className="text-binavy font-medium">Vai →</Link>
        </motion.div>
        <motion.div {...card(.25)} className="rounded-3xl border bg-white p-6 shadow-soft">
          <img src={illStudent} alt="" className="mb-4 rounded-2xl" />
          <h3 className="text-xl font-semibold mb-2">Studente</h3>
          <p className="text-sm opacity-70 mb-4">Registrazione con Codice Scuola e download</p>
          <Link to="/signup-student" className="text-binavy font-medium">Vai →</Link>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl bg-white p-8 shadow-soft border">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-6">Come funziona</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">1. Crea/Importa Scuole</div>
              <p className="opacity-70">Genera OTP dalla sezione Admin e condividile con le sedi.</p>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">2. Registra Studenti</div>
              <p className="opacity-70">Gli studenti si registrano con il Codice Scuola e accedono ai download.</p>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-binavy font-semibold mb-1">3. Condividi Materiali</div>
              <p className="opacity-70">Carica cartelle e file in Airtable; visibilità per ruolo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
