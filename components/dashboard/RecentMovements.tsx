"use client";
import React from "react";
import { Package, CheckCircle2, XCircle } from "lucide-react";

interface ProductMovement {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  isActive: boolean;
}

interface RecentMovementsProps {
  movements: ProductMovement[];
}

const RecentMovements = ({ movements }: RecentMovementsProps) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Estado del Inventario Real
        </h3>
      </div>

      {/* Contenedor con scroll horizontal para evitar que se rompa en móvil */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-700px">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Producto
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Categoría
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Stock
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Precio
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {movements.length > 0 ? (
              movements.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Package size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        {m.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-tight">
                      {m.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-sm font-black ${
                        m.stock <= 5 ? "text-red-500" : "text-slate-700"
                      }`}
                    >
                      {m.stock}{" "}
                      <span className="text-[10px] font-medium opacity-50 uppercase">
                        uds
                      </span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-slate-900 italic">
                      ${m.price.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                          m.isActive
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        {m.isActive ? (
                          <>
                            <CheckCircle2 size={10} />
                            Disponible
                          </>
                        ) : (
                          <>
                            <XCircle size={10} />
                            Inactivo
                          </>
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-300 text-[10px] font-black uppercase tracking-widest"
                >
                  Sin movimientos recientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentMovements;
