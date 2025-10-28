
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import logo from "../assets/BRITISH INSTITUTES INTERNATIONAL SCHOOL.png"; // Inserisci il file in assets
export default function Navbar(){
  const { user, role, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl p-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          {logo && <img src={logo} className="h-8 w-auto" alt="BI NEXT" />}
          <span className="font-semibold text-lg text-binavy">BI NEXT</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          {!user && (
            <>
              <Link to="/login" className="px-3 py-1 rounded-lg hover:bg-slate-100">Login</Link>
              <Link to="/signup-school" className="px-3 py-1 rounded-lg border">Registra Scuola</Link>
              <Link to="/signup-student" className="px-3 py-1 rounded-lg bg-binavy text-white shadow-soft">Registrati Studente</Link>
            </>
          )}
          {user && (
            <>
              {role === "admin" && <Link to="/admin">Admin</Link>}
              {role === "school" && <Link to="/school">Scuola</Link>}
              {role === "student" && <Link to="/student">Studente</Link>}
              <button onClick={()=>{logout(); nav("/");}} className="px-3 py-1 rounded-lg border">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
