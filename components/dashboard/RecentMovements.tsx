"use client";
import React from "react";
import { Package, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Estado del Inventario Real
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-600px">
          <thead>
            <tr className="bg-slate-50">
              <th className="w-[35%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Producto
              </th>
              <th className="w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Categoría
              </th>
              <th className="w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Stock
              </th>
              <th className="w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Precio
              </th>
              <th className="w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {movements.map((m) => {
              // LÓGICA DE ESTADO IDÉNTICA AL INVENTARIO
              const isAvailable = m.isActive && m.stock > 0;
              const isLowStock = m.isActive && m.stock <= 5 && m.stock > 0;

              return (
                <tr
                  key={m.id}
                  className="hover:bg-slate-50/50 transition-colors h-64px"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                        <Package size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 truncate">
                        {m.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <span className="text-xs font-medium text-slate-500">
                      {m.category}
                    </span>
                  </td>

                  <td className="px-6 py-3 text-center">
                    <span
                      className={`text-sm font-black ${
                        m.stock === 0 ? "text-red-500" : "text-slate-700"
                      }`}
                    >
                      {m.stock} uds
                    </span>
                  </td>

                  <td className="px-6 py-3 text-center">
                    <span className="text-sm font-bold text-slate-800">
                      ${m.price.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-center">
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentMovements;
