"use client";
import { Edit2, Trash2, X } from "lucide-react";

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ActionsMenu = ({ onEdit, onDelete, onClose }: ActionsMenuProps) => {
  return (
    <>
      {/* 1. Fondo invisible para cerrar al hacer click fuera */}
      <div
        className="fixed inset-0 z-80 bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      {/* 2. Menú con posicionamiento FIXED */}
      {/* Usamos 'fixed' para que se posicione respecto a la ventana del navegador 
          y no respecto a la tabla. El 'transform' lo mueve un poco para 
          alinearlo con el botón de los tres puntos.
      */}
      <div
        className="fixed z-90 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150 origin-top-right"
        style={{
          // Estos valores lo posicionan justo debajo del cursor/botón
          // Si ves que queda muy lejos, ajusta el 'right' y el 'top'
          right: "2rem",
          marginTop: "0.5rem",
        }}
      >
        <div className="flex items-center justify-between p-3 border-b border-slate-50 bg-slate-50/50">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Opciones
          </span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 rounded-lg transition-all group"
          >
            <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-amber-100 transition-colors">
              <Edit2 size={14} />
            </div>
            Editar Datos
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all group"
          >
            <div className="p-1.5 bg-red-100/50 rounded-md group-hover:bg-red-100 transition-colors">
              <Trash2 size={14} />
            </div>
            Eliminar Item
          </button>
        </div>
      </div>
    </>
  );
};

export default ActionsMenu;
