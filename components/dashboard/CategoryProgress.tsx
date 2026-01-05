import React from "react";
import { inventarioCategorias } from "@/constants";

const CategoryProgress = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-6">
        Inventario por Categoría
      </h2>

      <div className="flex flex-col gap-5">
        {inventarioCategorias.map((cat) => (
          <div key={cat.id}>
            <div className="flex justify-between mb-1 text-xs font-bold uppercase">
              <span className="text-slate-500">{cat.nombre}</span>
              <span className="text-slate-400">{cat.porcentaje}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${cat.color}`}
                style={{ width: `${cat.porcentaje}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProgress;
