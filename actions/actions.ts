"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

// --- ACCIONES DE AUTENTICACIÓN ---

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// --- ACCIONES DE INVENTARIO ---

/**
 * Obtiene todos los productos incluyendo el nombre de su categoría
 */
export async function getInventoryAction() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: products.map((p) => ({
        ...p,
        category: p.category.name,
      })),
    };
  } catch (error) {
    console.error("Error al obtener inventario:", error);
    return { success: false, error: "No se pudo cargar el inventario" };
  }
}

/**
 * Obtiene la lista de nombres de todas las categorías (LA QUE FALTABA)
 */
export async function getCategoriesAction() {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories.map((c) => c.name) };
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return { success: false, data: [] };
  }
}

/**
 * Crea una nueva categoría de forma persistente
 */
export async function createCategoryAction(name: string) {
  try {
    const newCategory = await prisma.category.create({
      data: { name: name.trim() },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return { success: false, error: "No se pudo crear la categoría" };
  }
}

/**
 * Guarda (crea) o Actualiza un producto asegurando la relación con la categoría
 */
export async function saveProductAction(data: any, id?: string) {
  try {
    const payload = {
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      isActive: data.isActive,
      category: {
        connectOrCreate: {
          where: { name: data.category },
          create: { name: data.category },
        },
      },
    };

    if (id) {
      // MODO EDICIÓN
      await prisma.product.update({
        where: { id },
        data: payload,
      });
    } else {
      // MODO CREACIÓN
      await prisma.product.create({
        data: {
          ...payload,
          id: crypto.randomUUID(),
        },
      });
    }

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error al guardar producto:", error);
    return { success: false };
  }
}

/**
 * Elimina un producto por su ID
 */
export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return { success: false };
  }
}

/**
 * Obtiene estadísticas generales para el Dashboard
 */
export async function getDashboardStatsAction() {
  try {
    const [totalProducts, lowStock, categoriesCount, inventory] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { stock: { lte: 5 }, isActive: true } }),
        prisma.category.count(),
        prisma.product.findMany({ select: { price: true, stock: true } }),
      ]);

    const totalValue = inventory.reduce((acc, p) => acc + p.price * p.stock, 0);

    return {
      success: true,
      stats: {
        totalProducts,
        lowStock,
        categoriesCount,
        totalValue: totalValue.toFixed(2),
      },
    };
  } catch (error) {
    console.error("Error al obtener stats:", error);
    return { success: false };
  }
}

export async function getUsersAction() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // Si tienes roles en tu schema, inclúyelos aquí
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: "No se pudieron obtener las cuentas" };
  }
}
