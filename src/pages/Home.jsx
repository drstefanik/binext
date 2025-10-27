
import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
  return (
    <div className="grid md:grid-cols-3 gap-4 pt-6">
      {[
        {to:"/login?mode=admin", title:"Admin", desc:"Gestisci scuole, OTP e materiali"},
        {to:"/signup-school", title:"Scuola", desc:"Registrazione con OTP e spazio riservato"},
        {to:"/signup-student", title:"Studente", desc:"Registrazione con Codice Scuola e download"},
      ].map((c)=> (
        <Link key={c.title} to={c.to} className="rounded-2xl border p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
          <p className="text-sm opacity-70">{c.desc}</p>
        </Link>
      ))}
    </div>
  )
}
