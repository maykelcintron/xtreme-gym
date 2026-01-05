import Image from "next/image";
import InputField from "./InputField";
import { AuthFormData } from "@/interfaces";
import LinkNavigation from "./LinkNavigation";

const LoginForm = ({register, handleSubmit, errors} : any) => {

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

            <InputField 
                label="Email" 
                type="email" 
                placeholder="Ingresa tu email"
                error={errors.email?.message}
                {...register("email", {
                    required: "El email es obligatorio",
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
                    required: "La contraseña es obligatoria"
                })}
            />

            <InputField type="submit" value={"Iniciar Sesión"} />

            <div className="text-center text-gray-500 text-[12px] space-y-2">
                <LinkNavigation
                    description="¿No tienes una cuenta?"
                    title="Regístrate"
                    href="/auth/register"
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

export default LoginForm