
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Login(){
  const { login } = useAuth();
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode")||"student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl border mt-6 bg-white">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <label className="block text-sm mb-1">Ruolo</label>
      <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full mb-3 border rounded-lg p-2">
        <option value="admin">Admin</option>
        <option value="school">Scuola</option>
        <option value="student">Studente</option>
      </select>
      <input placeholder="Email" className="w-full mb-2 border rounded-lg p-2" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full mb-4 border rounded-lg p-2" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={async()=>{ await login({ email, password, mode }); if(mode==="admin") nav("/admin"); if(mode==="school") nav("/school"); if(mode==="student") nav("/student"); }} className="w-full rounded-lg bg-binavy text-white py-2">Entra</button>
    </div>
  )
}
