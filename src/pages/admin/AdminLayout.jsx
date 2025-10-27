
import { Outlet, Link } from "react-router-dom";
export default function AdminLayout(){
  return (
    <div className="grid md:grid-cols-5 gap-4 mt-6">
      <aside className="md:col-span-1">
        <div className="sticky top-20 space-y-1">
          <Link to="/admin/folders" className="block px-3 py-2 rounded-lg hover:bg-slate-100">Cartelle</Link>
          <Link to="/admin/files" className="block px-3 py-2 rounded-lg hover:bg-slate-100">File</Link>
          <Link to="/admin/schools" className="block px-3 py-2 rounded-lg hover:bg-slate-100">Scuole & OTP</Link>
        </div>
      </aside>
      <main className="md:col-span-4">
        <Outlet />
      </main>
    </div>
  );
}
