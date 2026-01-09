"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text?: string;
  children?: React.ReactNode;
}

export const ActiveLink = ({ path, text, children }: Props) => {
  const pathName = usePathname();

  // Definimos las clases base y las clases para el estado activo
  const baseClass =
    "flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-300 no-underline transition-colors hover:bg-white/5 hover:text-slate-50";
  const activeClass = "bg-red-500 text-white";

  return (
    <Link
      href={path}
      className={`${baseClass} ${pathName === path ? activeClass : ""}`}
    >
      {children ?? text}
    </Link>
  );
};

export default ActiveLink;
