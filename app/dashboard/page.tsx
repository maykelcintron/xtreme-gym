import React from "react";
import Navbar from "@/components/navbar/Navbar";
import CardDashboard from "@/components/dashboard/CardDashboard";
import RecentMovements from "@/components/dashboard/RecentMovements";
import StockAlert from "@/components/dashboard/StockAlerts";
import DashboardClientWrapper from "@/components/dashboard/DashboardClientWrapper";
import { getInventoryAction, getCategoriesAction } from "@/actions/actions";

export default async function DashboardPage() {
  const [productsRes, categoriesRes] = await Promise.all([
    getInventoryAction(),
    getCategoriesAction(),
  ]);

  // CORRECCIÓN: Validamos que data exista y sea un array para evitar el error de 'undefined'
  const products: any[] =
    productsRes?.success && productsRes?.data ? productsRes.data : [];
  const categories: any[] =
    categoriesRes?.success && categoriesRes?.data ? categoriesRes.data : [];

  // 1. MOVIMIENTOS RECIENTES (Seguro contra arrays vacíos)
  const movimientosReales = products.slice(0, 3).map((p: any) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    stock: p.stock,
    price: p.price,
    isActive: p.isActive,
  }));

  // 2. ALERTAS DE STOCK
  const topLowStock = [...products]
    .sort((a: any, b: any) => (a.stock ?? 0) - (b.stock ?? 0))
    .slice(0, 2);

  // CÁLCULOS SEGUROS
  const totalProducts = products.length;

  const lowStockCount = products.filter(
    (p: any) => (p.isActive ?? false) && (p.stock ?? 0) <= 5
  ).length;

  const categoriesCount = categories.length;

  // CORRECCIÓN: Cálculo de valor total con validación de nulos
  const totalValue = products.reduce(
    (acc: number, p: any) => acc + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Ajuste de padding-top en móvil para que el contenido no quede bajo el botón hamburguesa */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-1600px mx-auto space-y-6 md:space-y-8">
          {/* HEADER */}
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">
              Dashboard
            </h1>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Resumen Ejecutivo de Inventario
            </p>
          </div>

          {/* CARDS RESPONSIVAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <CardDashboard
              title="Total"
              count={totalProducts}
              icon="archive"
              color="blue"
            />
            <CardDashboard
              title="Stock Bajo"
              count={lowStockCount}
              icon="warning"
              color="red"
            />
            <CardDashboard
              title="Categorías"
              count={categoriesCount}
              icon="categories"
              color="yellow"
            />
          </div>

          {/* CUERPO PRINCIPAL CON ORDEN LÓGICO EN MÓVIL */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* ACCIONES: Suben a la primera posición en móvil (order-1) */}
            <div className="space-y-6 order-1 lg:order-2">
              <DashboardClientWrapper categories={categories} />

              <div className="hidden lg:block p-4 border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="flex items-center justify-center text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] text-center h-20">
                  Métricas de rendimiento <br /> próximamente
                </div>
              </div>
            </div>

            {/* TABLA Y ALERTAS: Bajan a la segunda posición en móvil (order-2) */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="overflow-x-auto rounded-2xl">
                {/* El wrapper de RecentMovements ya debería manejar su propio overflow interno */}
                <RecentMovements movements={movimientosReales} />
              </div>
              <StockAlert products={topLowStock} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
