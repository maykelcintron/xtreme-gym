export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}

export interface Users {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}

export interface Category {
  id?: string;
  name: string;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryId: string;
}