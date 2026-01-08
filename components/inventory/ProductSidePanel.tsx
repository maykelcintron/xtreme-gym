"use client";
import React, { useEffect, useState } from "react";
import {
  X,
  Package,
  DollarSign,
  Tag,
  Archive,
  CheckCircle2,
  AlertCircle,
  Info,
  Save,
  Layers,
  ShoppingBag,
} from "lucide-react";

interface ProductSidePanelProps {
  categories: string[];
  productToEdit?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ProductSidePanel = ({
  categories,
  productToEdit,
  onClose,
  onSave,
}: ProductSidePanelProps) => {
  const isEditing = !!productToEdit;
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isEditing) setIsActive(productToEdit.isActive);
  }, [productToEdit, isEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      isActive: isActive,
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Overlay con desenfoque suave */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out"
      >
        {/* HEADER DINÁMICO */}
        <div
          className={`p-8 text-white ${
            isEditing ? "bg-amber-600" : "bg-slate-900"
          } relative overflow-hidden`}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                {isEditing ? <Layers size={24} /> : <ShoppingBag size={24} />}
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  {isEditing ? "Editar Producto" : "Nuevo Ingreso"}
                </h2>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  Gestión de Base de Datos
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          {/* Decoración de fondo */}
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white transform rotate-12">
            <Package size={120} />
          </div>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* SECCIÓN 1: ESTADO DEL PRODUCTO (UI MEJORADA) */}
          <section className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Info size={12} /> Visibilidad del Producto
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  isActive
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-100 bg-slate-50 text-slate-400 opacity-60 hover:opacity-100"
                }`}
              >
                <CheckCircle2
                  size={24}
                  className={isActive ? "animate-bounce" : ""}
                />
                <span className="text-[10px] font-black uppercase">
                  Disponible
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsActive(false)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  !isActive
                    ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                    : "border-slate-100 bg-slate-50 text-slate-400 opacity-60 hover:opacity-100"
                }`}
              >
                <AlertCircle size={24} />
                <span className="text-[10px] font-black uppercase">
                  Inactivo
                </span>
              </button>
            </div>
          </section>

          {/* SECCIÓN 2: INFORMACIÓN GENERAL */}
          <section className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Nombre del Item
              </label>
              <div className="relative group">
                <Package
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors"
                  size={18}
                />
                <input
                  required
                  name="name"
                  type="text"
                  defaultValue={productToEdit?.name || ""}
                  placeholder="Ej. Proteína Isolatada 2kg"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-red-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Categoría
              </label>
              <div className="relative group">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  required
                  name="category"
                  defaultValue={productToEdit?.category || ""}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none appearance-none focus:border-red-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="">Seleccionar categoría...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: VALORES COMERCIALES */}
          <section className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Precio
              </label>
              <div className="relative group">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={18}
                />
                <input
                  required
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={productToEdit?.price || ""}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-emerald-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Stock Actual
              </label>
              <div className="relative group">
                <Archive
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors"
                  size={18}
                />
                <input
                  required
                  name="stock"
                  type="number"
                  defaultValue={productToEdit?.stock || ""}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-amber-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER ACCIONES */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors"
          >
            Descartar
          </button>
          <button
            type="submit"
            className={`flex-2 flex items-center justify-center gap-3 px-4 py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${
              isEditing
                ? "bg-amber-600 shadow-amber-200 hover:bg-amber-700"
                : "bg-slate-900 shadow-slate-200 hover:bg-slate-800"
            }`}
          >
            <Save size={16} />
            {isEditing ? "Actualizar Item" : "Registrar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSidePanel;
