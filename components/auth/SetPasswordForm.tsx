import Image from "next/image"
import InputField from "./InputField"
import { redirect, useSearchParams } from "next/navigation";
import { setPassword } from "@/actions/auth/setPassword";
import { AuthFormData } from "@/interfaces";
import { useState } from "react";
import SendEmailMessage from "./SendEmailMessage";

const SetPasswordForm = ({register, handleSubmit, errors}: any) => {
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const token = useSearchParams().get("token");
    if(!token) return redirect("/");
    
    const onSubmit = async (data: Pick<AuthFormData, "password">) => {
        setError("");
        setSuccess("");

        const { password } = data;

        const {ok, message} = await setPassword(token, password);

        if(!ok) return setError(message);

        setSuccess(message);

        setTimeout(() => {
            window.location.href = '/auth/login';
        }, 1500)
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
            <h1 className="text-white text-center text-xl font-bold">Restablecer Contraseña</h1>
            
            {success && <SendEmailMessage type="success" message={success} />}
            {error && <SendEmailMessage type="error" message={error} />}

            <InputField 
                label="Ingresa tu nueva contraseña" 
                type="password" 
                placeholder="Ingresa tu nueva contraseña"
                error={errors.password?.message}
                {...register("password", {
                    required: "* La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    }
                })} 
            />

            <InputField type="submit" value={"Restablecer Contraseña"} />
        </form>
    )
}

export default SetPasswordForm
