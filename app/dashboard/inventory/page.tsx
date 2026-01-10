"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventorySidePanel from "@/components/inventory/ProductSidePanel";
import {
  getInventoryAction,
  getCategoriesAction,
  createCategoryAction,
  deleteCategoryAction,
  saveProductAction,
  deleteProductAction,
} from "@/actions/actions";
import {
  Package,
  Edit2,
  Trash2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // --- PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  const [isProductPanelOpen, setIsProductPanelOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        getInventoryAction(),
        getCategoriesAction(),
      ]);
      if (prodRes.success) setProducts(prodRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

  // CORRECCIÓN DE TIPOS: Estas funciones ahora retornan la respuesta del servidor
  const handleAddCategory = async (name: string) => {
    const res = await createCategoryAction(name);
    if (res.success) await loadData();
    return res;
  };

  const handleDeleteCategory = async (name: string) => {
    const res = await deleteCategoryAction(name);
    if (res.success) await loadData();
    return res;
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      const res = await deleteProductAction(productToDelete.id);
      if (res.success) {
        setProductToDelete(null);
        await loadData();
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos"
        ? true
        : statusFilter === "Disponible"
        ? p.isActive
        : !p.isActive;
    const matchesCategory =
      categoryFilter === "Todas" ? true : p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <InventoryHeader
              categories={categories}
              currentCategory={categoryFilter}
              currentStatus={statusFilter}
              onSearch={setSearch}
              onCategoryChange={setCategoryFilter}
              onStatusChange={setStatusFilter}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onOpenModal={() => {
                setProductToEdit(null);
                setIsProductPanelOpen(true);
              }}
            />

            {/* Contenedor con scroll horizontal estilo Dashboard - Ajustado min-w */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
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
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-300 text-[10px] font-black uppercase tracking-widest"
                      >
                        Cargando...
                      </td>
                    </tr>
                  ) : currentItems.length > 0 ? (
                    currentItems.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                              <Package size={16} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                              {p.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-[11px] font-black uppercase text-slate-400 tracking-tight">
                            {p.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`text-sm font-black ${
                              p.stock <= 5 ? "text-red-500" : "text-slate-700"
                            }`}
                          >
                            {p.stock}{" "}
                            <span className="text-[10px] font-medium opacity-50 uppercase tracking-tighter">
                              uds
                            </span>
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-black text-slate-900 italic">
                            ${p.price.toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                                p.isActive
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : "bg-red-50 text-red-600 border-red-100"
                              }`}
                            >
                              {p.isActive ? (
                                <>
                                  <CheckCircle2 size={10} /> Disponible
                                </>
                              ) : (
                                <>
                                  <XCircle size={10} /> Inactivo
                                </>
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => {
                                setProductToEdit(p);
                                setIsProductPanelOpen(true);
                              }}
                              className="p-2 text-slate-300 hover:text-black hover:bg-white hover:shadow-sm rounded-xl transition-all"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => setProductToDelete(p)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-300 text-[10px] font-black uppercase tracking-widest"
                      >
                        No se encontraron productos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación estilo Dashboard */}
            <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Pag {currentPage} de {totalPages || 1}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-20 hover:shadow-sm transition-all"
                >
                  <ChevronLeft size={16} className="text-slate-600" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-20 hover:shadow-sm transition-all"
                >
                  <ChevronRight size={16} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE ELIMINACIÓN */}
      {productToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          />
          <div className="relative bg-white w-full max-w-[320px] rounded-[2.5rem] p-8 shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={32} />
            </div>
            <h4 className="text-sm font-black uppercase text-slate-800 mb-2">
              Eliminar Producto
            </h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed mb-8 px-4">
              ¿Eliminar{" "}
              <span className="text-red-500 underline">
                {productToDelete.name}
              </span>
              ?
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={confirmDeleteProduct}
                className="w-full py-4 bg-red-500 text-white text-[10px] font-black uppercase rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95"
              >
                Confirmar
              </button>
              <button
                onClick={() => setProductToDelete(null)}
                className="w-full py-4 text-[10px] font-black uppercase text-slate-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <InventorySidePanel
        isOpen={isProductPanelOpen}
        categories={categories}
        productToEdit={productToEdit}
        onClose={() => {
          setIsProductPanelOpen(false);
          setProductToEdit(null);
        }}
        onSave={async (data) => {
          const res = await saveProductAction(data, productToEdit?.id);
          if (res.success) {
            setIsProductPanelOpen(false);
            setProductToEdit(null);
            await loadData();
          }
          return res;
        }}
      />
    </div>
  );
}
