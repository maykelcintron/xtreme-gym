import React from "react";
import { accionesRapidas } from "@/constants";

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <h2 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-6">
        Acciones Rápidas
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {accionesRapidas.map((accion) => {
          const Icon = accion.icon;
          return (
            <button
              key={accion.id}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${accion.bg}`}
            >
              <div className={`${accion.color} mb-2`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase text-center leading-tight">
                {accion.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
