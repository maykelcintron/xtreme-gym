"use server"

import prisma from "@/lib/prisma";
import { verifyJwt } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

export const setPassword = async (token: string, newPassword: string) => {
    // Verificar el JWT
    const verifiedToken = await verifyJwt(token);

    if (!verifiedToken) {
        return {
            ok: false,
            message: "Token inválido o expirado"
        };
    }

    // Obtener el userId del payload del token
    const { userId } = verifiedToken as JwtPayload;

    // Buscar al usuario por ID
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return {
            ok: false,
            message: "Token inválido o expirado"
        };
    }

    // Verificar que el token en la base de datos coincida con el proporcionado
    if (user.emailToken !== token) {
        return {
            ok: false,
            message: "Token inválido o expirado"
        };
    }

    // Actualizar la contraseña y limpiar el token
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: bcrypt.hashSync(newPassword), // Hash the password with 10 rounds
            emailToken: null
        }
    });

    return {
        ok: true,
        message: "Contraseña actualizada correctamente"
    };
}