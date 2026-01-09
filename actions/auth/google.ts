"use server"
import { signIn } from "@/auth.config"

export const google = async () => {
    await signIn("google")
}