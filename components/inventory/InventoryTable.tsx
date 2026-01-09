"use client";
import React, { useState } from "react";
import {
  MoreVertical,
  Package,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Tag,
  AlertTriangle,
} from "lucide-react";
import ActionsMenu from "./ActionsMenu";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  isActive: boolean;
}

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const InventoryTable = ({
  products,
  onEdit,
  onDelete,
}: InventoryTableProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
      {/* CONTENEDOR CON SCROLL HORIZONTAL CORREGIDO */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-900px">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest w-[30%]">
                Producto
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center w-[20%]">
                Categoría
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center w-[12%]">
                Precio
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center w-[12%]">
                Stock
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center w-[16%]">
                Estado
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right w-[10%]">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="h-72px hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-600 shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Package size={20} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Tag size={12} className="text-slate-400" />
                      <span className="text-[11px] font-black uppercase text-slate-500 tracking-tight">
                        {product.category || "Sin Categoría"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-slate-800 italic">
                      ${(product.price || 0).toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-sm font-black ${
                        product.stock <= 5 ? "text-red-600" : "text-slate-600"
                      }`}
                    >
                      {product.stock}{" "}
                      <span className="text-[10px] font-medium opacity-50 uppercase">
                        uds.
                      </span>
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border min-w-110px justify-center ${
                          product.isActive
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {product.isActive ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <AlertCircle size={12} />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-tight">
                          {product.isActive ? "Disponible" : "Inactivo"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-block relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(
                            activeMenu === product.id ? null : product.id
                          );
                        }}
                        className={`p-2 rounded-xl transition-all ${
                          activeMenu === product.id
                            ? "bg-slate-900 text-white shadow-lg"
                            : "hover:bg-slate-200 text-slate-400"
                        }`}
                      >
                        <MoreVertical size={18} />
                      </button>
                      {activeMenu === product.id && (
                        <ActionsMenu
                          onClose={() => setActiveMenu(null)}
                          onEdit={() => {
                            onEdit(product);
                            setActiveMenu(null);
                          }}
                          onDelete={() => {
                            setProductToDelete(product);
                            setActiveMenu(null);
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-300px">
                <td colSpan={6} className="px-10 py-20 text-center">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    No se encontraron resultados
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL DE CONFIRMACIÓN (CORREGIDO Z-INDEX) --- */}
      {productToDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          />

          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                ¿Borrar Producto?
              </h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Estás a punto de eliminar permanentemente <br />
                <span className="font-bold text-slate-800 underline decoration-red-200">
                  {productToDelete.name}
                </span>
                .
              </p>
            </div>

            <div className="flex border-t border-slate-100 p-2 gap-2 bg-slate-50/50">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-all rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
