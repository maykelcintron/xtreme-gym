export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-image h-screen pt-20 pl-5 pr-5">
            {children}
        </main>
    );
}
