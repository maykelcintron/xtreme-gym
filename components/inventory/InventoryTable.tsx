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
  X,
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
      setProductToDelete(null); // Cierra el modal
    }
  };

  const rowHeightClass = "h-[72px]";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-900px">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="w-[30%] px-6 py-4 text-[10px] font-black uppercase tracking-widest">
                Producto
              </th>
              <th className="w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">
                Categoría
              </th>
              <th className="w-[12%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">
                Precio
              </th>
              <th className="w-[12%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">
                Stock
              </th>
              <th className="w-[16%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">
                Estado
              </th>
              <th className="w-[10%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`${rowHeightClass} hover:bg-slate-50/80 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0">
                          <Package size={20} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm truncate">
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
                        className={`text-sm font-bold ${
                          product.stock <= 5 ? "text-red-600" : "text-slate-600"
                        }`}
                      >
                        {product.stock} uds.
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border min-w-100px justify-center ${
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
                          className={`p-2 rounded-lg transition-all ${
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
                ))}
              </>
            ) : (
              <tr className="h-360px">
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

      {/* --- MODAL DE CONFIRMACIÓN (XTREME STYLE) --- */}
      {productToDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          />

          {/* Contenido del Modal */}
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                ¿Confirmar eliminación?
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Estás a punto de borrar{" "}
                <span className="font-bold text-slate-700">
                  {productToDelete.name}
                </span>
                . Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex border-t border-slate-100">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-6 py-4 text-xs font-bold uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
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
