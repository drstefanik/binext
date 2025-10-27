
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
export default function Navbar(){
  const { user, role, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
      <div className="mx-auto max-w-6xl p-3 flex items-center gap-4">
        <Link to="/" className="font-semibold text-xl">BI NEXT</Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup-school" className="px-3 py-1 rounded-lg border">Registra Scuola</Link>
              <Link to="/signup-student" className="px-3 py-1 rounded-lg bg-slate-900 text-white">Registrati Studente</Link>
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
