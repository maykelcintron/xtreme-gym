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
  Loader2,
} from "lucide-react";

interface ProductSidePanelProps {
  isOpen: boolean;
  categories: string[];
  productToEdit?: any;
  onClose: () => void;
  onSave: (data: any) => Promise<void>; // Cambiado a Promise para manejar el loading
}

const ProductSidePanel = ({
  isOpen,
  categories,
  productToEdit,
  onClose,
  onSave,
}: ProductSidePanelProps) => {
  const isEditing = !!productToEdit;
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setIsActive(productToEdit.isActive);
    } else {
      setIsActive(true);
    }
  }, [productToEdit, isEditing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      isActive: isActive,
    };

    try {
      await onSave(data);
      // El cierre lo maneja el padre tras el éxito, pero reseteamos aquí por si acaso
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-150 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isSubmitting ? onClose : undefined}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out"
      >
        {/* HEADER */}
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
                  Base de Datos Xtreme
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* VISIBILIDAD */}
          <section className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={12} /> Estado en Inventario
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  isActive
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-100 bg-slate-50 text-slate-400 opacity-60"
                }`}
              >
                <CheckCircle2 size={24} />
                <span className="text-[10px] font-black uppercase">
                  Disponible
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  !isActive
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-100 bg-slate-50 text-slate-400 opacity-60"
                }`}
              >
                <AlertCircle size={24} />
                <span className="text-[10px] font-black uppercase">
                  Inactivo
                </span>
              </button>
            </div>
          </section>

          {/* INPUTS */}
          <section className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Nombre
              </label>
              <div className="relative">
                <Package
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  required
                  name="name"
                  type="text"
                  key={productToEdit?.id || "new"}
                  defaultValue={productToEdit?.name || ""}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Categoría
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  required
                  name="category"
                  defaultValue={productToEdit?.category || ""}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none appearance-none focus:border-slate-900 transition-all cursor-pointer"
                >
                  <option value="">Seleccionar...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Precio
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    required
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={productToEdit?.price || ""}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Stock
                </label>
                <div className="relative">
                  <Archive
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    required
                    name="stock"
                    type="number"
                    defaultValue={productToEdit?.stock || ""}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-4 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-2 flex items-center justify-center gap-3 px-4 py-4 text-white rounded-2xl text-[10px] font-black uppercase shadow-2xl transition-all active:scale-95 ${
              isEditing ? "bg-amber-600" : "bg-slate-900"
            } disabled:opacity-50`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            {isSubmitting
              ? "Guardando..."
              : isEditing
              ? "Actualizar"
              : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSidePanel;
