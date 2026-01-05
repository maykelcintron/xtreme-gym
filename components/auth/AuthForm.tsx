"use client";
import { useForm } from "react-hook-form";
import { AuthFormData } from "@/interfaces";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function AuthForm({ isLogin = false }) {  // isLogin can be used to hide/toggle an input if is required
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();

    return (
        <div className="flex justify-center items-center">
            {isLogin ? (
                <LoginForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            ) : (
                <RegisterForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            )}
        </div>
    );
}