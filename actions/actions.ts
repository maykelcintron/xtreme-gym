"use server";

import { signIn } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import bcrypt from "bcryptjs";

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
    console.log(error);
    return "Invalid credentials";
  }
}

// --- ACCIONES DE USUARIOS (CUENTAS) ---

export async function getUsersAction() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permission: true, // AÑADIDO: Ahora recuperamos el permiso de Prisma
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("Error en getUsersAction:", error);
    return { success: false, error: "No se pudieron obtener las cuentas" };
  }
}

export async function createUserAction(formData: any) {
  try {
    if (!formData.password || !formData.email) {
      return { success: false, message: "Email y contraseña son requeridos" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: formData.role || "USER",
        permission: formData.permission || "DENIED", // AÑADIDO: Guardar permiso
      },
    });

    revalidatePath("/dashboard/accounts");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { success: false, message: "Este correo ya está registrado." };
    }
    return { success: false, message: "Error interno del servidor." };
  }
}

// --- ACTUALIZAR USUARIO ---
export async function updateUserAction(id: string, formData: any) {
  try {
    const data: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      permission: formData.permission, // AÑADIDO: Actualizar permiso
    };

    if (formData.password && formData.password.trim() !== "") {
      data.password = await bcrypt.hash(formData.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/accounts");
    return { success: true };
  } catch (error: any) {
    console.error("Error en updateUserAction:", error);
    return {
      success: false,
      message:
        "No se pudo actualizar el usuario. El correo podría estar duplicado.",
    };
  }
}

// --- ELIMINAR USUARIO ---
export async function deleteUserAction(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/dashboard/accounts");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: "Error al eliminar el registro.",
    };
  }
}

// --- ACCIONES DE INVENTARIO ---

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
    return { success: false, error: "No se pudo cargar el inventario" };
  }
}

export async function getCategoriesAction() {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories.map((c) => c.name) };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function createCategoryAction(name: string) {
  try {
    const trimmedName = name.trim();

    const existing = await prisma.category.findFirst({
      where: { name: { equals: trimmedName, mode: "insensitive" } },
    });

    if (existing) {
      return { success: false, error: "La categoría ya existe." };
    }

    const newCategory = await prisma.category.create({
      data: { name: trimmedName },
    });

    revalidatePath("/dashboard/inventory");
    revalidatePath("/dashboard");
    return { success: true, data: newCategory };
  } catch (error) {
    return { success: false, error: "No se pudo crear la categoría" };
  }
}

export async function deleteCategoryAction(name: string) {
  try {
    await prisma.category.delete({
      where: { name: name },
    });
    revalidatePath("/dashboard/inventory");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "No puedes borrar una categoría que tiene productos asociados.",
    };
  }
}

export async function saveProductAction(data: any, id?: string) {
  try {
    const price = parseFloat(data.price);
    const stock = parseInt(data.stock);

    if (price <= 0 || stock <= 0) {
      return {
        success: false,
        message: "El precio y el stock deben ser mayores a cero (mínimo 1).",
      };
    }

    const duplicate = await prisma.product.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
        NOT: id ? { id: id } : undefined,
      },
    });

    if (duplicate) {
      return {
        success: false,
        message: `Ya existe un producto registrado con el nombre "${data.name.trim()}". Por favor, usa uno diferente.`,
      };
    }

    const payload = {
      name: data.name.trim(),
      price: price,
      stock: stock,
      isActive: data.isActive,
      category: {
        connectOrCreate: {
          where: { name: data.category },
          create: { name: data.category },
        },
      },
    };

    if (id) {
      await prisma.product.update({
        where: { id },
        data: payload,
      });
    } else {
      await prisma.product.create({
        data: {
          ...payload,
          id: crypto.randomUUID(),
        },
      });
    }

    revalidatePath("/dashboard/inventory");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al guardar el producto." };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/dashboard/inventory");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

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
    return { success: false };
  }
}