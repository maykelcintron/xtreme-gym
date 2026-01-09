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

  // Validamos que data exista y sea un array
  const products: any[] =
    productsRes?.success && productsRes?.data ? productsRes.data : [];
  const categories: any[] =
    categoriesRes?.success && categoriesRes?.data ? categoriesRes.data : [];

  // 1. MOVIMIENTOS RECIENTES (3 últimos productos)
  const movimientosReales = products.slice(0, 3).map((p: any) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    stock: p.stock,
    price: p.price,
    isActive: p.isActive,
  }));

  // 2. ALERTAS DE STOCK (Los 2 con menos stock para la lista visual)
  const topLowStock = [...products]
    .sort((a: any, b: any) => (a.stock ?? 0) - (b.stock ?? 0))
    .slice(0, 2);

  // --- CÁLCULOS PARA LAS CARDS ---

  // Total de productos en base de datos
  const totalProducts = products.length;

  // Encontrar el valor numérico de stock más bajo en todo el inventario
  const valorStockMasBajo =
    products.length > 0 ? Math.min(...products.map((p) => p.stock ?? 0)) : 0;

  // Cantidad de categorías creadas
  const totalCategorias = categories.length;

  // Valor monetario total (Precio * Stock)
  const totalValue = products.reduce(
    (acc: number, p: any) => acc + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-1600px mx-auto space-y-6 md:space-y-8">
          {/* HEADER RESUMEN */}
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">
              Dashboard
            </h1>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Resumen Ejecutivo de Inventario
            </p>
          </div>

          {/* FILA DE CARDS ESTADÍSTICAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CardDashboard
              title="Productos Totales"
              count={totalProducts}
              icon="archive"
              color="blue"
            />

            {/* CARD CONECTADA AL STOCK MÁS BAJO */}
            <CardDashboard
              title="Stock Más Bajo"
              count={valorStockMasBajo}
              icon="warning"
              // Cambia a rojo si el mínimo es crítico (5 o menos)
              color={
                valorStockMasBajo <= 5 && totalProducts > 0 ? "red" : "yellow"
              }
            />

            <CardDashboard
              title="Categorías"
              count={totalCategorias}
              icon="categories"
              color="green"
            />
          </div>

          {/* CUERPO PRINCIPAL: MOVIMIENTOS Y ACCIONES RÁPIDAS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* COLUMNA DERECHA: Botones de acción rápida (Registrar/Categorías) */}
            <div className="space-y-6 order-1 lg:order-2">
              <DashboardClientWrapper categories={categories} />
            </div>

            {/* COLUMNA IZQUIERDA: Tablas y Alertas detalladas */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
