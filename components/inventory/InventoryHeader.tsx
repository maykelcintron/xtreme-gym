"use client";
import { Search, Plus, Filter, Tag } from "lucide-react";

interface Props {
  categories: string[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (name: string) => void;
  onSearch: (val: string) => void;
  onStatusChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  currentStatus: string;
  currentCategory: string;
  onOpenModal: () => void;
}

const InventoryHeader = ({
  categories,
  onSearch,
  onStatusChange,
  onCategoryChange,
  currentStatus,
  currentCategory,
  onOpenModal,
}: Props) => {
  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* FILA 1: Buscador y Botón */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar producto..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <button
          onClick={onOpenModal}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shrink-0"
        >
          <Plus size={18} />
          <span className="uppercase tracking-tight">Nuevo Producto</span>
        </button>
      </div>

      {/* FILA 2: Selectores de Filtrado */}
      {/* Usamos grid-cols-2 en móvil para que queden 50/50 y no se desborden */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:items-center gap-3">
        {/* Selector de Estado */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <Filter size={14} className="ml-1 text-slate-400 shrink-0" />
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-600 outline-none w-full cursor-pointer appearance-none uppercase tracking-tighter"
          >
            <option value="Todos">Estados</option>
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disp.</option>
          </select>
        </div>

        {/* Selector de Categoría */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <Tag size={14} className="ml-1 text-slate-400 shrink-0" />
          <select
            value={currentCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-600 outline-none w-full cursor-pointer appearance-none uppercase tracking-tighter"
          >
            <option value="Todas">Categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Texto informativo oculto en móvil para ahorrar espacio */}
        <div className="hidden md:block ml-auto text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">
          Filtros de búsqueda
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;
