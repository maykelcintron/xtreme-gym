"use client";
import { useState } from "react";
import { X, User, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { createUserAction, updateUserAction } from "@/actions/actions";

interface UserSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit?: any;
}

// Definimos la estructura de lo que devuelven nuestras acciones de servidor
interface ActionResponse {
  success: boolean;
  message?: string;
}

export default function UserSidePanel({
  isOpen,
  onClose,
  userToEdit,
}: UserSidePanelProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Tipamos la respuesta para que TS reconozca "message"
    let res: ActionResponse;

    if (userToEdit) {
      res = await updateUserAction(userToEdit.id, data);
    } else {
      res = await createUserAction(data);
    }

    if (res.success) {
      onClose();
      (e.target as HTMLFormElement).reset();
    } else {
      // Ahora TS sabe que message puede existir
      alert(res.message || "Ocurrió un error inesperado");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
                {userToEdit ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Gestión de accesos Xtreme
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            <div className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Nombre Completo
                </label>
                <div className="relative mt-1">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    name="name"
                    required
                    type="text"
                    defaultValue={userToEdit?.name || ""}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all"
                    placeholder="Ej. Alexander Xtreme"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Correo Electrónico
                </label>
                <div className="relative mt-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    defaultValue={userToEdit?.email || ""}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all"
                    placeholder="correo@xtreme.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-end ml-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Contraseña
                  </label>
                  {userToEdit && (
                    <span className="text-[9px] font-bold text-amber-500 uppercase">
                      Opcional
                    </span>
                  )}
                </div>
                <div className="relative mt-1">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    name="password"
                    required={!userToEdit}
                    type="password"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all"
                    placeholder={
                      userToEdit ? "•••••••• (Sin cambios)" : "••••••••"
                    }
                  />
                </div>
              </div>

              {/* Rol */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Rol del Sistema
                </label>
                <div className="relative mt-1">
                  <ShieldCheck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <select
                    name="role"
                    defaultValue={userToEdit?.role || "USER"}
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-700 outline-none appearance-none focus:ring-4 focus:ring-black/5 transition-all"
                  >
                    <option value="USER">Usuario (Vendedor)</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : userToEdit ? (
                  "Guardar Cambios"
                ) : (
                  "Crear Usuario"
                )}
              </button>
            </div>
          </form>

          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-center gap-2 grayscale opacity-20">
            <span className="text-[10px] font-black uppercase tracking-tighter">
              Xtreme Control v1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
