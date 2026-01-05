export const cardDashboard = [
  {
    id: 1,
    title: "TOTAL PRODUCTOS",
    count: 325,
    icon: "<ArchiveIcon size={16} />",
    color: "red",
  },
  {
    id: 2,
    title: "STOCK BAJO",
    count: 12,
    icon: "<AlertIcon size={16} />",
    color: "yellow",
  },
  {
    id: 3,
    title: "VENTAS HOY",
    count: 82.5,
    icon: "<CreditCardIcon size={16} />",
    color: "green",
  },
  {
    id: 4,
    title: "CATEGORIAS",
    count: 6,
    icon: "<StackIcon size={16} />",
    color: "blue",
  },
];

export const movimientosRecientes = [
  {
    id: 1,
    producto: "Proteína Whey Gold",
    categoria: "Suplementos",
    cantidad: 1,
    precio: 45.0,
    estado: "Vendido",
  },
  {
    id: 2,
    producto: "Bebida Energética",
    categoria: "Bebidas",
    cantidad: 2,
    precio: 7.0,
    estado: "Vendido",
  },
  {
    id: 3,
    producto: "Toalla Microfibra",
    categoria: "Accesorios",
    cantidad: 20,
    precio: null,
    estado: "Reabastecido",
  },
  {
    id: 4,
    producto: "Galletas de Avena",
    categoria: "Snacks",
    cantidad: 5,
    precio: 7.5,
    estado: "Vendido",
  },
];

import { PlusSquare, ShoppingCart, ScanLine, FileText } from "lucide-react";
export const accionesRapidas = [
  {
    id: 1,
    label: "Nuevo Producto",
    icon: PlusSquare,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: 2,
    label: "Registrar Venta",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 3,
    label: "Escanear",
    icon: ScanLine,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    label: "Reportes",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export const alertasStock = [
  {
    id: 1,
    producto: "Guantes de Boxeo (12oz)",
    mensaje: "Quedan solo 2 unidades",
    color: "red",
  },
  {
    id: 2,
    producto: "Agua Mineral 500ml",
    mensaje: "Quedan solo 8 unidades",
    color: "yellow",
  },
];

export const inventarioCategorias = [
  { id: 1, nombre: "Suplementos", porcentaje: 45, color: "bg-red-500" },
  { id: 2, nombre: "Bebidas", porcentaje: 25, color: "bg-blue-400" },
  { id: 3, nombre: "Ropa Deportiva", porcentaje: 20, color: "bg-purple-500" },
  { id: 4, nombre: "Accesorios", porcentaje: 10, color: "bg-amber-500" },
];
