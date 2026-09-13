import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiCalendar,
  FiTag,
  FiInfo,
  FiUser,
  FiSettings,
  FiLogOut,
  FiGrid,
  FiShield,
} from "react-icons/fi";
import Logo from "../icons/logo";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  adminOnly?: boolean;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const isAdmin = user?.role === "admin";

  const navItems: NavItem[] = [
    {
      label: "Inicio",
      path: "/home",
      icon: <FiGrid className="w-5 h-5" />,
    },
    {
      label: "Eventos",
      path: "/events",
      icon: <FiCalendar className="w-5 h-5" />,
    },
    {
      label: "Mis tickets",
      path: "/tickets",
      icon: <FiTag className="w-5 h-5" />,
    },
    {
      label: "Mi perfil",
      path: "/profile",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      label: "Acerca de",
      path: "/about",
      icon: <FiInfo className="w-5 h-5" />,
    },
    {
      label: "Admin",
      path: "/admin",
      icon: <FiShield className="w-5 h-5" />,
      adminOnly: true,
    },
    {
      label: "Configuración",
      path: "/settings",
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-64
          bg-neutral-950 border-r border-neutral-800
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
      
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

     
        <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-800">
          <Link to="/home" onClick={() => setSidebarOpen(false)}>
            <Logo size={36} showText={true} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Cerrar menú"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>


        {user && (
          <div className="px-5 py-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm shrink-0">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name || "Usuario"}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {isAdmin ? "Administrador" : "Usuario"}
                </p>
              </div>
            </div>
          </div>
        )}

    
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {visibleItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium
                      transition-all duration-150
                      ${
                        active
                          ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      }
                    `}
                  >
                    <span className={active ? "text-amber-400" : ""}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>


        <div className="border-t border-neutral-800 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ============================================
          MAIN
      ============================================ */}
      <div className="flex-1 flex flex-col min-w-0">
  
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
         
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-900"
              aria-label="Abrir menú"
            >
              <FiMenu className="w-6 h-6" />
            </button>

   
            <div className="flex-1 md:flex-none ml-2 md:ml-0">
              <h2 className="text-lg font-semibold text-white capitalize">
                {visibleItems.find((item) => isActive(item.path))?.label ||
                  "Dashboard"}
              </h2>
            </div>

        
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-neutral-400">En línea</span>
              </div>

              {user && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
        </header>


        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
