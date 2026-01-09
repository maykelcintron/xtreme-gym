"use client";
import { useForm } from "react-hook-form";
import { AuthFormData } from "@/interfaces";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { set } from "zod";
import SetPasswordForm from "./SetPasswordForm";

export default function AuthForm({ isLogin = false, reset = false, setPassword = false }) {  // isLogin can be used to hide/toggle an input if is required
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();

    return (
        <div className="flex justify-center items-center">
            {isLogin ? (
                <LoginForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            ) : !reset ? (
                <RegisterForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            ): !setPassword ? (
                <ResetPasswordForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            ): (
                <SetPasswordForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            )}
        </div>
    );
}