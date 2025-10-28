
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import crest from "../assets/BRITISH INSTITUTES INTERNATIONAL SCHOOL.png";
export default function Navbar(){
  const { user, role, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl">
        <div className="m-3 rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-glass px-4 py-2">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              {crest && <img src={crest} className="h-7 w-auto" alt="BI" />}
              <span className="font-semibold text-lg tracking-tight">BI <span className="text-binavy">NEXT</span></span>
            </Link>
            <nav className="ml-auto flex items-center gap-2 text-sm">
              {!user && (<>
                <Link to="/login" className="px-3 py-1 rounded-xl hover:bg-white">Login</Link>
                <Link to="/signup-school" className="px-3 py-1 rounded-xl border">Registra Scuola</Link>
                <Link to="/signup-student" className="px-3 py-1 rounded-xl bg-binavy text-white shadow-soft">Registrati Studente</Link>
              </>)}
              {user && (<>
                {role === "admin" && <Link to="/admin" className="px-3 py-1 rounded-xl hover:bg-white">Admin</Link>}
                {role === "school" && <Link to="/school" className="px-3 py-1 rounded-xl hover:bg-white">Scuola</Link>}
                {role === "student" && <Link to="/student" className="px-3 py-1 rounded-xl hover:bg-white">Studente</Link>}
                <button onClick={()=>{logout();nav("/");}} className="px-3 py-1 rounded-xl border">Logout</button>
              </>)}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
