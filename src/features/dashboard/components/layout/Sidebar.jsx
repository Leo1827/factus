import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { clearAuth } from "../../../../shared/storage/tokenStorage";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const itemClass = (path) =>
    `block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      pathname === path
        ? "bg-gray-900 text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return (
    <>
      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold tracking-tight">Factus</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          <Link
            to="/dashboard"
            className={`${itemClass("/dashboard")} flex items-center gap-3 w-full`}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/dashboard"
            className={`${itemClass("/dashboard")} flex items-center gap-3 w-full`}
            onClick={() => setOpen(false)}
          >
            <Users size={18} />
            Usuarios
          </Link>

          {/* 🔹 puedes agregar más items aquí */}
        </nav>

        {/* 🔹 User section */}
        <div className="p-4 border-t">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-800">Usuario</p>
            <p className="text-xs text-gray-500">admin@factus.com</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}