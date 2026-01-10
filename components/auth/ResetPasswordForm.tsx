import Image from "next/image"
import InputField from "./InputField"
import LinkNavigation from "./LinkNavigation"
import { recoveryPasswordEmail } from "@/actions/auth/recoveryPasswordEmail";
import { AuthFormData } from "@/interfaces";
import { useState } from "react";
import SendEmailMessage from "./SendEmailMessage";

const ResetPasswordForm = ({register, handleSubmit, errors}: any) => {
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onSubmit = async (data: Pick<AuthFormData, "email">) => {
        setSuccess("");
        setError("");

        const { email } = data;
        
        const {errorMessage, successMessage} = await recoveryPasswordEmail(email);

        if(errorMessage) return setError(errorMessage);
        
        setSuccess(successMessage);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-black p-4 rounded-md w-117.5 space-y-4">
            <div className="flex justify-center items-center">
                <Image
                    src="/logo.jpeg"
                    width={250}
                    height={20}
                    alt="Logo"
                />
            </div>
            <h1 className="text-white text-center text-xl font-bold">Recuperacion de la Cuenta</h1>
            
            {success && <SendEmailMessage type="success" message={success} />}
            {error && <SendEmailMessage type="error" message={error} />}
            
            <InputField 
                label="Email" 
                type="email" 
                placeholder="Ingresa tu email para recuperar tu contraseña"
                error={errors.email?.message}
                {...register("email", {
                    required: "* El email es obligatorio",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                    }
                })}
            />

            <InputField type="submit" value={"Restablecer Contraseña"} />

            <div className="text-center text-gray-500 text-[12px] space-y-2">
                <LinkNavigation
                    title="Volver a Iniciar Sesión"
                    href="/auth/login"
                />
            </div>
        </form>
    )
}

export default ResetPasswordForm
