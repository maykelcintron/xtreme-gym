import Image from "next/image";
import InputField from "./InputField";
import { AuthFormData } from "@/interfaces";
import LinkNavigation from "./LinkNavigation";
import { authenticate } from "@/actions/actions";
import { useActionState, startTransition } from "react";
import { redirect } from "next/navigation";

const LoginForm = ({register, handleSubmit, errors} : any) => {
    const [state, formAction, isPending] = useActionState(authenticate, undefined)

    if (state === 'Success') return redirect('/dashboard');

    const onSubmit = handleSubmit((data: AuthFormData) => {
        // Crear FormData a partir de los datos validados
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        
        // Llamar al formAction con FormData dentro de startTransition
        startTransition(() => {
            formAction(formData);
        });
    });

    return (
        <form onSubmit={onSubmit} className="bg-black p-4 rounded-md w-117.5 space-y-4">
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
                    required: "* La contraseña es obligatoria"
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