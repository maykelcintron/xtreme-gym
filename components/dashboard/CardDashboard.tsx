import React from "react";
import { Archive, AlertTriangle, CreditCard, LayoutGrid } from "lucide-react";

interface CardDashboardProps {
  title: string;
  count: number;
  icon: string;
  color: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "<ArchiveIcon size={16} />": <Archive size={20} />,
  "<AlertIcon size={16} />": <AlertTriangle size={20} />,
  "<CreditCardIcon size={16} />": <CreditCard size={20} />,
  "<StackIcon size={16} />": <LayoutGrid size={20} />,
};

const colorMap: Record<
  string,
  { border: string; text: string; bgIcon: string }
> = {
  red: {
    border: "border-red-500",
    text: "text-slate-800",
    bgIcon: "bg-red-50 text-red-500",
  },
  yellow: {
    border: "border-amber-500",
    text: "text-amber-500",
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
        <p className="text-gray-400 font-bold text-xs tracking-wider">
          {title}
        </p>
        <h1 className={`font-extrabold text-3xl ${styles.text}`}>
          {title === "VENTAS HOY" ? `$${count}` : count}
        </h1>
      </div>

      <div className={`p-3 rounded-full ${styles.bgIcon}`}>{iconMap[icon]}</div>
    </div>
  );
};

export default CardDashboard;
