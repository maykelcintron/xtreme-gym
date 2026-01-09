"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma"; // Asegúrate que en lib/prisma.ts sea "export default prisma"
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
      return 'Invalid credentials';   
      
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
        role: true, // Asegúrate de que existe en tu schema.prisma
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
    // 1. Verificación de seguridad básica
    if (!formData.password || !formData.email) {
      return { success: false, message: "Email y contraseña son requeridos" };
    }

    // 2. Encriptar la contraseña (Aquí es donde daba el error)
    // Usamos bcryptjs que importamos arriba
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // 3. Crear en la base de datos
    await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: formData.role || "USER",
      },
    });

    revalidatePath("/dashboard/accounts");
    return { success: true };
  } catch (error: any) {
    console.error("Error creando usuario:", error);
    // Manejo de error de email duplicado (P2002 es el código de Prisma para Unique Constraint)
    if (error.code === "P2002") {
      return { success: false, message: "Este correo ya está registrado." };
    }
    return { success: false, message: "Error interno del servidor." };
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
    console.error("Error al obtener inventario:", error);
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
    console.error("Error al obtener categorías:", error);
    return { success: false, data: [] };
  }
}

export async function createCategoryAction(name: string) {
  try {
    const newCategory = await prisma.category.create({
      data: { name: name.trim() },
    });

    revalidatePath("/dashboard/inventario"); // Corregido el path
    revalidatePath("/dashboard");

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return { success: false, error: "No se pudo crear la categoría" };
  }
}

export async function deleteCategoryAction(name: string) {
  try {
    // Esto borrará la categoría por su nombre único
    await prisma.category.delete({
      where: { name: name },
    });
    revalidatePath("/dashboard/inventario");
    return { success: true };
  } catch (error) {
    console.error("Error al borrar categoría:", error);
    return {
      success: false,
      message: "No puedes borrar una categoría que tiene productos asociados.",
    };
  }
}

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

    revalidatePath("/dashboard/inventario");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error al guardar producto:", error);
    return { success: false };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/dashboard/inventario");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
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
    console.error("Error al obtener stats:", error);
    return { success: false };
  }
}

// --- ACTUALIZAR USUARIO ---
export async function updateUserAction(id: string, formData: any) {
  try {
    const data: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
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
    console.error("Error al actualizar usuario:", error);
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
    console.error("Error al eliminar usuario:", error);
    return {
      success: false,
      message: "Error al eliminar el registro.",
    };
  }
}
