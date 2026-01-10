import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await auth()

    if(session?.user) return redirect("/dashboard");
    
    return (
        <main className="bg-image md:flex md:justify-center md:items-center min-h-screen pl-5 pr-5 py-20">
            {children}
        </main>
    );
}