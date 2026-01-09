"use client";
import React from "react";
import { Plus } from "lucide-react";

interface QuickActionsProps {
  onOpenPanel: () => void;
}

const QuickActions = ({ onOpenPanel }: QuickActionsProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
        Acciones Rápidas
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {/* BOTÓN NUEVO PRODUCTO */}
        <button
          onClick={onOpenPanel}
          className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-red-50 hover:border-red-200 transition-all duration-300 active:scale-95 overflow-hidden"
        >
          {/* Círculo decorativo de fondo al hacer hover */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-600/5 rounded-full group-hover:scale-[2] transition-transform duration-500" />

          <div className="relative z-10 p-4 bg-white rounded-xl shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
            <Plus size={24} strokeWidth={3} />
          </div>

          <div className="relative z-10 mt-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 group-hover:text-red-700">
              Nuevo Producto
            </p>
            <p className="text-[9px] font-medium text-slate-400 mt-1 uppercase tracking-tighter">
              Registrar item en inventario
            </p>
          </div>
        </button>

        {/* Puedes agregar más botones rápidos aquí en el futuro (ej. Registrar Venta) */}
      </div>
    </div>
  );
};

export default QuickActions;
