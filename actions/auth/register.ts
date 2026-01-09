"use server"

import { AuthFormData } from "@/interfaces";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (data: AuthFormData) => {
    const {username, email, password} = data;

    try {
        if(await prisma.user.findFirst({ where: { email : email} })){
            return {
                error: "Ya existe un usuario con ese email."
            }
        }

        const user = await prisma.user.create({
            data: {
                name: username!,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!user) {
            return {
                error: "Error al registrar usuario"
            } 
        }
        
        return {
            error: null
        }
    } catch (error) {
        console.error("Error al registrar usuario", error);
        return {
            error: "Error al registrar usuario"
        } 
    }
}