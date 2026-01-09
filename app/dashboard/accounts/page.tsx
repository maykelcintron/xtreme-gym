"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import UserSidePanel from "@/components/accounts/UserSidePanel";
import { getUsersAction, deleteUserAction } from "@/actions/actions";
import { UserPlus, Trash2, Edit2, Shield, AlertTriangle } from "lucide-react";

export default function AccountsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Estados para edición y borrado
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const loadUsers = async () => {
    const res = await getUsersAction();
    if (res?.success && res?.data) setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async () => {
    if (!userToDelete) return;
    const res = await deleteUserAction(userToDelete.id);
    if (res.success) {
      setUserToDelete(null);
      loadUsers();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 w-full overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
                Gestión de Cuentas
              </h1>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Administra los accesos del sistema.
              </p>
            </div>

            <button
              onClick={() => {
                setUserToEdit(null);
                setIsPanelOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shrink-0 active:scale-95"
            >
              <UserPlus size={18} /> NUEVO USUARIO
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
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
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                            {user.name?.charAt(0)}
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
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border w-fit ${
                            user.role === "ADMIN"
                              ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <Shield size={12} />
                          <span className="text-[10px] font-black uppercase tracking-tight">
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => {
                              setUserToEdit(user);
                              setIsPanelOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setUserToDelete(user)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
      {userToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setUserToDelete(null)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                ¿Eliminar Usuario?
              </h3>
              <p className="text-slate-500 text-sm mt-3">
                Estás a punto de borrar a{" "}
                <span className="font-bold">{userToDelete.name}</span>.
              </p>
            </div>
            <div className="flex border-t border-slate-100 p-2 gap-2 bg-slate-50/50">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 px-6 py-4 text-[10px] font-black uppercase text-slate-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-4 text-[10px] font-black uppercase bg-red-500 text-white rounded-2xl"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PANEL LATERAL (CREAR/EDITAR) */}
      <UserSidePanel
        isOpen={isPanelOpen}
        userToEdit={userToEdit} // Pasamos el usuario a editar
        onClose={() => {
          setIsPanelOpen(false);
          setUserToEdit(null);
          loadUsers();
        }}
      />
    </div>
  );
}
