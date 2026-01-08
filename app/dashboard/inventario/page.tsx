"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryTable from "@/components/inventory/InventoryTable";
import Pagination from "@/components/inventory/Pagination";
import ProductSidePanel from "@/components/inventory/ProductSidePanel";
import {
  getInventoryAction,
  getCategoriesAction,
  saveProductAction,
  deleteProductAction,
  createCategoryAction,
} from "@/actions/actions";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const refreshData = async () => {
    const [prodRes, catRes] = await Promise.all([
      getInventoryAction(),
      getCategoriesAction(),
    ]);

    if (prodRes.success && prodRes.data) {
      setProducts(prodRes.data);
    } else {
      setProducts([]);
    }

    if (catRes.success && catRes.data) {
      setCategories(catRes.data);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddCategory = async (catName: string) => {
    const res = await createCategoryAction(catName);
    if (res.success) await refreshData();
  };

  const handleDeleteCategory = async (catName: string) => {
    await refreshData();
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Todos" ||
      (filterStatus === "Disponible" && product.isActive) ||
      (filterStatus === "No Disponible" && !product.isActive);
    const matchesCategory =
      filterCategory === "Todas" || product.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveProduct = async (data: any) => {
    const res = await saveProductAction(data, editingProduct?.id);
    if (res.success) {
      await refreshData();
      setIsPanelOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    // Añadimos la confirmación nativa del navegador
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
    );

    if (isConfirmed) {
      try {
        const res = await deleteProductAction(id);
        if (res.success) {
          await refreshData(); // Recarga la lista
          // Opcional: podrías añadir un alert de éxito o un toast aquí
        } else {
          alert("Error al eliminar el producto.");
        }
      } catch (error) {
        console.error("Error en la eliminación:", error);
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    // Estructura responsiva: Columna en móvil, Fila en escritorio
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden p-4 sm:p-6 md:p-8">
        <div className="max-w-1600px mx-auto space-y-6">
          {/* TÍTULO */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
              Inventario
            </h1>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Gestión de existencias y categorías
            </p>
          </div>

          {/* HEADER (Buscador y Filtros) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <InventoryHeader
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onSearch={(val) => {
                setSearchTerm(val);
                setCurrentPage(1);
              }}
              onStatusChange={(val) => {
                setFilterStatus(val);
                setCurrentPage(1);
              }}
              onCategoryChange={(val) => {
                setFilterCategory(val);
                setCurrentPage(1);
              }}
              currentStatus={filterStatus}
              currentCategory={filterCategory}
              onOpenModal={() => {
                setEditingProduct(null);
                setIsPanelOpen(true);
              }}
            />
          </div>

          {/* TABLA CON SCROLL HORIZONTAL */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {/* min-w-[800px] asegura que en móviles la tabla no se colapse y sea legible con scroll */}
              <div className="min-w-800px lg:min-w-full">
                <InventoryTable
                  products={currentItems}
                  onEdit={(p) => {
                    setEditingProduct(p);
                    setIsPanelOpen(true);
                  }}
                  onDelete={handleDeleteProduct}
                />
              </div>
            </div>
          </div>

          {/* PAGINACIÓN */}
          <div className="flex justify-center md:justify-end">
            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      {/* PANEL LATERAL */}
      {isPanelOpen && (
        <ProductSidePanel
          categories={categories}
          productToEdit={editingProduct}
          onClose={() => setIsPanelOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
