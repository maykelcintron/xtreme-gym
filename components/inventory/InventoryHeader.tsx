"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Tag,
  FolderPlus,
  X,
  Trash2,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

interface Props {
  categories: string[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (
    name: string
  ) => Promise<{ success: boolean; message?: string }>; // Ajustado para recibir la respuesta
  onSearch: (val: string) => void;
  onStatusChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  currentStatus: string;
  currentCategory: string;
  onOpenModal: () => void;
}

const InventoryHeader = ({
  categories,
  onAddCategory,
  onDeleteCategory,
  onSearch,
  onStatusChange,
  onCategoryChange,
  currentStatus,
  currentCategory,
  onOpenModal,
}: Props) => {
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState<string | null>(null);
  const [errorDelete, setErrorDelete] = useState<string | null>(null); // Nuevo estado para errores
  const [newCatName, setNewCatName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName("");
    }
  };

  const handleFinalDelete = async () => {
    if (catToDelete) {
      const res = await onDeleteCategory(catToDelete);

      if (res.success) {
        setCatToDelete(null);
        setErrorDelete(null);
      } else {
        // Si el servidor dice que tiene productos, activamos el estado de error
        setErrorDelete(res.message || "No se puede eliminar esta categoría.");
      }
    }
  };

  const closeModals = () => {
    setCatToDelete(null);
    setErrorDelete(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* ... FILA 1 y 2 se mantienen igual ... */}
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
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
          />
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-black/10 uppercase"
        >
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <Filter size={14} className="ml-1 text-slate-400 shrink-0" />
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-600 outline-none w-full cursor-pointer uppercase"
          >
            <option value="Todos">Estados</option>
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disp.</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <Tag size={14} className="ml-1 text-slate-400 shrink-0" />
          <select
            value={currentCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-600 outline-none w-full cursor-pointer uppercase"
          >
            <option value="Todas">Categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsCatModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-xl font-bold text-[10px] hover:bg-slate-200 transition-all uppercase"
        >
          <FolderPlus size={14} /> Gestionar Cat.
        </button>
      </div>

      {/* MODAL GESTIÓN DE CATEGORÍAS */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsCatModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xs font-black uppercase tracking-widest">
                Categorías
              </h3>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <form onSubmit={handleAdd} className="flex gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Nueva..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-3 rounded-xl hover:bg-slate-800 transition-all"
                >
                  <Plus size={18} />
                </button>
              </form>
              <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-xl"
                  >
                    <span className="text-[10px] font-black uppercase text-slate-600">
                      {cat}
                    </span>
                    <button
                      onClick={() => setCatToDelete(cat)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN O ADVERTENCIA DE PRODUCTOS */}
      {catToDelete && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeModals}
          />
          <div className="relative bg-white w-full max-w-[320px] rounded-[2.5rem] p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            {errorDelete ? (
              // VISTA CUANDO TIENE PRODUCTOS (DENIEGA)
              <>
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <ShieldAlert size={32} />
                </div>
                <h4 className="text-sm font-black uppercase text-slate-800 mb-2">
                  Acción Denegada
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed mb-8 px-2">
                  No puedes eliminar{" "}
                  <span className="text-slate-800">"{catToDelete}"</span> porque
                  tiene productos asociados en el inventario.
                </p>
                <button
                  onClick={closeModals}
                  className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all"
                >
                  Entendido
                </button>
              </>
            ) : (
              // VISTA DE CONFIRMACIÓN NORMAL
              <>
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle size={32} />
                </div>
                <h4 className="text-sm font-black uppercase text-slate-800 mb-2">
                  ¿Confirmar Borrado?
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed mb-8">
                  Vas a eliminar{" "}
                  <span className="text-red-500 font-black">
                    "{catToDelete}"
                  </span>
                  . Esta acción no se puede deshacer.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleFinalDelete}
                    className="w-full py-4 bg-red-500 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                  >
                    Sí, eliminar ahora
                  </button>
                  <button
                    onClick={closeModals}
                    className="w-full py-4 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600"
                  >
                    No, cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryHeader;
