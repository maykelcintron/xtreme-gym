import { Users } from "@/interfaces";
import bcrypt from "bcryptjs";
import { Category, Product } from "@/interfaces";

const users: Users[] = [
  {
    name: "Maykel Cintron",
    email: "tecnopcell211000@gmail.com",
    password: bcrypt.hashSync("123456"),
    role: "ADMIN",
  },
  {
    name: "Jhon Molina",
    email: "jhonmolina@gmail.com",
    password: bcrypt.hashSync("123456"),
    role: "USER",
  },
];

const category: Category[] = [
  { id: "1", name: "Suplementos" },
  { id: "2", name: "Bebidas" },
  { id: "3", name: "Ropa Deportiva" },
  { id: "4", name: "Accesorios" },
];

const products: Product[] = [
  {
    name: "Proteína Whey",
    price: 12000,
    stock: 50,
    isActive: true,
    categoryId: "1",
  },
  {
    name: "Creatina Monohidrato",
    price: 8000,
    stock: 30,
    isActive: true,
    categoryId: "1",
  },
  {
    name: "BCAA",
    price: 15000,
    stock: 25,
    isActive: true,
    categoryId: "1",
  },
];

export { users, products, category };