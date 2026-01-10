"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import ActiveLink from "./ActiveLink";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    label: "Inventario",
    path: "/dashboard/inventory",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    label: "Cuentas",
    path: "/dashboard/accounts",
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.permission === 'DENIED') {
      signOut({ callbackUrl: '/auth/login' });
    }
  }, [session]);

  const filteredNavItems = navItems.filter((item) => item.path !== "/dashboard/accounts" || session?.user?.role === "ADMIN");
  
  const userInitial = session?.user?.name?.charAt(0) || "U";

  return (
    <>
      {/* BOTÓN HAMBURGUESA */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-black text-white rounded-lg border border-gray-800 shadow-xl active:scale-95 transition-transform"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-black text-gray-200 flex flex-col justify-between p-6 shrink-0
        transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          {/* LOGO ESCRITORIO */}
          <div className="hidden md:flex mb-2 -mt-4 px-2 flex-col items-center justify-center">
            <img
              src="/logo-removebg-preview.png"
              alt="XTREME GYM"
              className="h-52 w-52 object-contain -my-10"
            />
          </div>

          <div className="h-12 md:hidden" />

          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <div key={item.path} onClick={() => setIsOpen(false)}>
                <ActiveLink path={item.path}>
                  <div className="flex items-center gap-3 w-full">
                    <svg
                      className="w-5 h-5 shrink-0 opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                </ActiveLink>
              </div>
            ))}
          </nav>
        </div>

        {/* FOOTER DEL ASIDE */}
        <div className="space-y-6">
          {/* PERFIL DE USUARIO LOGUEADO */}
          {session?.user && (
            <div className="px-2 py-4 border-t border-gray-800/50">
              <div className="flex items-center gap-3">
                {/* Lógica de imagen: Si tiene imagen de Google la muestra, si no, usa la inicial */}
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-xl object-cover border border-gray-700 shadow-lg"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-gray-700 to-gray-900 border border-gray-700 flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {userInitial}
                  </div>
                )}

                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white truncate leading-tight">
                    {session.user.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        session.user.role === "ADMIN"
                          ? "bg-indigo-500"
                          : "bg-emerald-500"
                      }`}
                    />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                      {session.user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOGO MÓVIL */}
          <div className="flex md:hidden mb-4 justify-start">
            <img
              src="/logo-removebg-preview.png"
              alt="XTREME GYM"
              className="h-32 w-32 object-contain -my-6"
            />
          </div>

          <div className="text-[10px] text-gray-500 px-2 uppercase tracking-widest font-bold">
            <div className="mb-1">Sistema de Control</div>
            <div className="mb-6 text-white text-xs">XTREME v1.0.0</div>

            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors group w-full"
            >
              <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-500/10 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
