"use client";
import React from "react";
import { Archive, AlertTriangle, DollarSign, LayoutGrid } from "lucide-react";

interface CardDashboardProps {
  title: string;
  count: string | number; // Cambiado para aceptar strings como "$1,200"
  icon: "archive" | "warning" | "money" | "categories";
  color: "red" | "yellow" | "green" | "blue";
}

const iconMap: Record<string, React.ReactNode> = {
  archive: <Archive size={24} />,
  warning: <AlertTriangle size={24} />,
  money: <DollarSign size={24} />,
  categories: <LayoutGrid size={24} />,
};

const colorMap = {
  red: {
    border: "border-red-500",
    text: "text-slate-800",
    bgIcon: "bg-red-50 text-red-500",
  },
  yellow: {
    border: "border-amber-500",
    text: "text-slate-800",
    bgIcon: "bg-amber-50 text-amber-500",
  },
  green: {
    border: "border-emerald-500",
    text: "text-slate-800",
    bgIcon: "bg-emerald-50 text-emerald-500",
  },
  blue: {
    border: "border-blue-500",
    text: "text-slate-800",
    bgIcon: "bg-blue-50 text-blue-500",
  },
};

const CardDashboard = ({ title, count, icon, color }: CardDashboardProps) => {
  const styles = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border-l-[6px] flex justify-between items-center w-full ${styles.border}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">
          {title}
        </p>
        <h1 className={`font-black text-3xl tracking-tighter ${styles.text}`}>
          {count}
        </h1>
      </div>

      <div className={`p-4 rounded-2xl ${styles.bgIcon}`}>{iconMap[icon]}</div>
    </div>
  );
};

export default CardDashboard;
