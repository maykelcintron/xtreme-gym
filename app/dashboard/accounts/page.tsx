"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getUsersAction } from "@/actions/actions";
import { UserPlus, Trash2, Edit2, Shield } from "lucide-react";

export default function AccountsPage() {
  // Inicializamos siempre como array vacío para evitar errores de renderizado
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await getUsersAction();
      // CORRECCIÓN: Validamos que res.success sea true y que data exista
      if (res?.success && res?.data) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navbar />

      {/* pt-20 para dar espacio al botón hamburguesa en móvil */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 w-full overflow-x-hidden">
        <div className="max-w-1600px mx-auto space-y-6 md:space-y-8">
          {/* HEADER RESPONSIVO */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
                Gestión de Cuentas
              </h1>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Administra los accesos y roles de los usuarios del sistema.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shrink-0">
              <UserPlus size={18} />
              NUEVO USUARIO
            </button>
          </div>

          {/* TABLA DE USUARIOS CON SCROLL RESPONSIVO */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-700px">
                <thead className="bg-slate-50/50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Email
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Rol
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-slate-200">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 italic font-medium">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 w-fit">
                            <Shield size={12} />
                            <span className="text-[10px] font-black uppercase tracking-tight">
                              {user.role || "Admin"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
                          No hay usuarios registrados
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
