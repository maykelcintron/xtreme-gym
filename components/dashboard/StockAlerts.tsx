"use client";
import React from "react";
import { AlertTriangle, ArrowRight, Package } from "lucide-react";
import Link from "next/link"; // Importamos Link para que funcione la flecha

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface StockAlertProps {
  products: Product[];
}

const StockAlert = ({ products }: StockAlertProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 px-2">
        <div className="p-1.5 bg-amber-100 rounded-lg">
          <AlertTriangle className="text-amber-600" size={16} />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Próximos a agotar / Menor Stock
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm hover:border-amber-200 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                <Package size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">
                  {p.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                  Producto en inventario
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p
                  className={`text-xl font-black leading-none ${
                    p.stock <= 5 ? "text-red-600" : "text-slate-800"
                  }`}
                >
                  {p.stock}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                  Unidades
                </p>
              </div>

              {/* Mantenemos el div con todas tus clases de animación y colores */}
              {/* Le añadimos el Link adentro para que toda la flecha sea clickable */}
              <Link
                href={`/dashboard/inventario`}
                className="p-2 bg-slate-50 rounded-xl text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAlert;
