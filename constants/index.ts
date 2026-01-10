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

import { PlusSquare } from "lucide-react";
export const accionesRapidas = [
  {
    id: 1,
    label: "Nuevo Producto",
    icon: PlusSquare,
    color: "text-red-600",
    bg: "bg-red-50",
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

export const productosInventario = [
  {
    id: "1", // Prisma suele usar Strings (UUID)
    name: "Suero de Leche Gold Standard",
    category: "Suplementos", // Usaremos category en lugar de categoria
    price: 59.99,
    stock: 45,
    isActive: true, // En lugar de "En Stock"
  },
  {
    id: "2",
    name: "Juego de Bandas de Resistencia",
    category: "Equipo",
    price: 24.5,
    stock: 12,
    isActive: true,
  },
  {
    id: "3",
    name: "Explosión Pre-Entrenamiento",
    category: "Suplementos",
    price: 35.0,
    stock: 0,
    isActive: false, // En lugar de "Agotado"
  },
];
