"use client"
import { usePathname } from "next/navigation"
import ActiveLink from "./ActiveLink"
import { logout } from "@/actions/auth/logout"

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "M3 12h18M3 6h18M3 18h18" },
  { label: "Inventario", path: "/dashboard/inventario", icon: "M3 7h18v10H3z" },
  { label: "Agregar Producto", path: "/dashboard/productos", icon: "M12 5v14M5 12h14" },
  { label: "Ventas", path: "/dashboard/ventas", icon: "M3 12h18" },
]

const Navbar = () => {
  const pathname = usePathname() || "/"

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-between p-6">
      <div>
        <div className="mb-8 px-2">
          <div className="text-white font-bold text-2xl">Xtreme<span className="text-red-500">GYM</span></div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            return (
              <ActiveLink key={item.path} path={item.path}>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-sm font-medium">{item.label}</span>
              </ActiveLink>
            )
          })}
        </nav>
      </div>

      <div className="text-xs text-gray-400 px-2">
        <div className="mb-4">Version</div>
        <div className="mb-6 text-white">XTREME 1.0.0</div>
        <button onClick={() => logout()} className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}

export default Navbar