import React from "react";
import { alertasStock } from "@/constants";
import { AlertTriangle, Box } from "lucide-react";

const colorStyles: Record<string, string> = {
  red: "bg-red-50 border-red-100 text-red-600",
  yellow: "bg-amber-50 border-amber-100 text-amber-600",
};

const StockAlerts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="text-amber-500" size={20} />
        <h2 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
          Alertas de Stock Bajo
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {alertasStock.map((alerta) => (
          <div
            key={alerta.id}
            className={`flex items-center justify-between p-4 rounded-xl border ${
              colorStyles[alerta.color]
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Box size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">
                  {alerta.producto}
                </h4>
                <p className="text-xs font-medium opacity-80">
                  {alerta.mensaje}
                </p>
              </div>
            </div>

            <button className="bg-white text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              Reordenar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAlerts;
