"use server"

import { signIn } from "@/auth.config";

export const loginUser = async (email: string, password: string) => {
    try {
        await signIn("credentials", {email, password, redirect: false});
        return true;
    }catch (error) {
        console.error("Error logging in user:", error);
    }
}