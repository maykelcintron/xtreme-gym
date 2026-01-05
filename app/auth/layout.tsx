import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="bg-image min-h-screen pl-5 pr-5 py-20">
            {children}
        </main>
    );
}
