"use client";
import Image from "next/image";
import Link from "next/link";
import InputField from "./InputField";
import { useForm } from "react-hook-form";

interface AuthFormData {
    email: string;
    password: string;
    username?: string;
}

export default function AuthForm({ isLogin = false }) {  // isLogin can be used to hide/toggle an input if is required

    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();

    const onSubmit = (data: AuthFormData) => {
        console.log("submit", data);
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
            <InputField label="Usuario" type="text" placeholder="Ingresa tu nombre de usuario"
                error={errors.username?.message}
                {...register("username", {
                    required: !isLogin && "El Nombre de usuario es obligatorio",
                    minLength: {
                        value: 3,
                        message: "Mínimo 3 carácteres"
                    }
                })}
            />
            <InputField label="E-Mail" type="email" placeholder="Ingresa tu E-Mail"
                error={errors.email?.message}
                {...register("email", {
                    required: "El E-Mail es obligatorio",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-Mail inválido"
                    }
                })}
            />
            <InputField label="Contraseña" type="password" placeholder="Ingresa tu contraseña"
                error={errors.password?.message}
                {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "Mínimo 6 carácteres"
                    }
                })}
            />
            <InputField type="submit" value={`${isLogin ? "Iniciar Sesión" : "Registrarme"}`} />

            <div className="text-center text-gray-500 text-[12px] space-y-2">
                {isLogin ? (
                    <p>¿No tienes una cuenta? <Link className="text-red-500" href={'/register'}>Crea una</Link></p>
                ) : (
                    <p>¿Ya tienes una cuenta? <Link className="text-red-500" href={'/login'}>Inicia Sesión</Link></p>
                )}
                <p>¿Olvidaste tu Contraseña? <span className="text-red-500">Restablecer Contraseña</span></p>
            </div>
        </form>
    )
}
