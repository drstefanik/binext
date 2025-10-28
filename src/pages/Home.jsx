
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import nextLogo from "../assets/NEXT2.2BG.png"; // Inserisci il file in assets
const cards = [
  {to:"/login?mode=admin", title:"Admin", desc:"Gestisci scuole, OTP e materiali"},
  {to:"/signup-school", title:"Scuola", desc:"Registrazione con OTP e spazio riservato"},
  {to:"/signup-student", title:"Studente", desc:"Registrazione con Codice Scuola e download"},
];
export default function Home(){
  return (
    <div className="pt-10">
      <section className="text-center mb-10">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="flex flex-col items-center gap-4">
          {nextLogo && <img src={nextLogo} alt="BI NEXT" className="h-14 md:h-16 w-auto" />}
          <h1 className="text-3xl md:text-4xl font-semibold text-binavy">La piattaforma scuole & studenti di British Institutes</h1>
          <p className="max-w-2xl text-slate-600">Materiali didattici, area download e gestione test — in un unico spazio semplice e moderno.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/signup-student" className="px-5 py-2 rounded-xl bg-binavy text-white shadow-soft">Inizia ora</Link>
            <Link to="/signup-school" className="px-5 py-2 rounded-xl border">Registra la tua scuola</Link>
          </div>
        </motion.div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i)=> (
          <motion.div key={c.title} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1*i}} className="rounded-2xl border bg-white p-6 hover:shadow-soft transition">
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm opacity-70 mb-3">{c.desc}</p>
            <Link to={c.to} className="text-binavy font-medium">Vai →</Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
