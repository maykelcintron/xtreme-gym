"use server"
import prisma from "@/lib/prisma";
import { generateJwt } from "@/utils/jwt";
import { Resend } from "resend";

export const recoveryPasswordEmail = async (email: string) => {
    // Check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase(),
        },
    });

    if (!user) {
        return {
            successMessage: "",
            errorMessage: "Usuario no registrado."
        } 
    }

    // Generate JWT token
    const token = await generateJwt({ userId: user.id });

    if(!token) {
        console.error("Error generating JWT token for user ID:", user.id);
        return {
            successMessage: "",
            errorMessage: "No se pudo enviar el correo de recuperacion. Intente mas tarde."
        };
    }

    // Save the token in the database
    await prisma.user.update({
        where: { id: user.id },
        data: { emailToken: token },
    });

    // Send recovery email
    const resetPasswordLink = `http://localhost:3000/auth/set-password?token=${token}`;
    const emailContent = `<p>Hola, has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p><a href="${resetPasswordLink}">Restablecer Contraseña</a>`;

    const resend = new Resend(process.env.RESEND_EMAIL_API_KEY)

    const data = await resend.emails.send({
        from: "Xtreme Gym <onboarding@resend.dev>",
        to: email,
        subject: "Recuperación de Contraseña",
        html: emailContent
    })

    console.log("Email send response:", data);
    return {
        errorMessage: "",
        successMessage: "Se ha enviado el correo de recuperación de contraseña. Por favor, revisa tu bandeja de entrada."
    }
}   