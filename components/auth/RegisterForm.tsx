import Image from "next/image";
import InputField from "./InputField";
import { AuthFormData } from "@/interfaces";
import LinkNavigation from "./LinkNavigation";
import { registerUser } from "@/actions/auth/register";
import { loginUser } from "@/actions/auth/login";
import { useState } from "react";
import SendEmailMessage from "./SendEmailMessage";

const RegisterForm = ({register, handleSubmit, errors} : any) => {
    const [error, setError] = useState<string>("");

    const onSubmit = async (data: AuthFormData) => {
        const { error } = await registerUser(data);

        if(error) return setError(error);

        const { email, password } = data;
        
        await loginUser(email, password);
        window.location.href = '/dashboard';
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

            {error && <SendEmailMessage type="error" message={error} />}

            <InputField 
                label="Usuario" 
                type="text" 
                placeholder="Ingresa tu nombre de usuario"
                error={errors.username?.message}
                {...register("username", {
                    required: "* El Nombre de usuario es obligatorio",
                    minLength: {
                        value: 3,
                        message: "Mínimo 3 carácteres"
                    }
                })}
            />

            <InputField 
                label="Email" 
                type="email" 
                placeholder="Ingresa tu email"
                error={errors.email?.message}
                {...register("email", {
                    required: "* El email es obligatorio",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                    }
                })}
            />

            <InputField 
                label="Contraseña" 
                type="password" 
                placeholder="Ingresa tu contraseña"
                error={errors.password?.message}
                {...register("password", {
                    required: "* La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "Mínimo 6 carácteres"
                    }
                })}
            />

            <InputField type="submit" value={"Registrarse"} />

            <div className="text-center text-gray-500 text-[12px] space-y-2">
                <LinkNavigation
                    description="¿Ya tienes una cuenta?"
                    title="Inicia Sesión"
                    href="/auth/login"
                />
                <LinkNavigation
                    description="¿Olvidaste tu Contraseña?"
                    title="Restablecer Contraseña"
                    href="/auth/reset-password"
                />
            </div>
        </form>
    )
}

export default RegisterForm