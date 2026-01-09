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
  AlertCircle,
  AlertTriangle,
  X,
} from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  // Estados de Modales
  const [isProductPanelOpen, setIsProductPanelOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);

  // NUEVO: Estado para el modal de confirmación de producto
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

  const handleAddCategory = async (name: string) => {
    const res = await createCategoryAction(name);
    if (res.success) await loadData();
  };

  const handleDeleteCategory = async (name: string) => {
    const res = await deleteCategoryAction(name);
    if (res.success) await loadData();
    return res;
  };

  // NUEVO: Función de borrado final sin confirm() del navegador
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full">
        <div className="max-w-1600px mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-y border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Producto
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Categoría
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Precio
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-20 text-center text-slate-400 font-bold uppercase text-xs"
                      >
                        Cargando...
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-black group-hover:text-white transition-all">
                              <Package size={20} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-700">
                                {p.name}
                              </span>
                              <span
                                className={`text-[9px] font-black uppercase ${
                                  p.isActive
                                    ? "text-emerald-500"
                                    : "text-slate-300"
                                }`}
                              >
                                {p.isActive ? "• Disponible" : "• Inactivo"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-md text-slate-500 uppercase">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-600">
                          ${p.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center font-black text-sm">
                          {p.stock}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setProductToEdit(p);
                                setIsProductPanelOpen(true);
                              }}
                              className="p-2 text-slate-400 hover:text-black hover:bg-slate-100 rounded-xl transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => setProductToDelete(p)} // Abre el modal de confirmación
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN DE PRODUCTO */}
      {productToDelete && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          />
          <div className="relative bg-white w-full max-w-[320px] rounded-[2.5rem] p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <h4 className="text-sm font-black uppercase text-slate-800 mb-2">
              Eliminar Producto
            </h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed mb-8 px-2">
              ¿Estás seguro de quitar{" "}
              <span className="text-red-500 font-black">
                "{productToDelete.name}"
              </span>{" "}
              del inventario? Esta acción es permanente.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={confirmDeleteProduct}
                className="w-full py-4 bg-red-500 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
              >
                Sí, eliminar producto
              </button>
              <button
                onClick={() => setProductToDelete(null)}
                className="w-full py-4 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-all"
              >
                No, cancelar
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
        }}
      />
    </div>
  );
}
