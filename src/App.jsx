
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl p-4">
        <Outlet />
      </div>
    </div>
  );
}
