import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth()
    
    if(!session?.user) return redirect('/auth/login')
    
    return (
        <>
            {children}
        </>
    );
}