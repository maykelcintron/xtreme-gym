import CardDashboard from "../../components/dashboard/CardDashboard";
import RecentMovements from "../../components/dashboard/RecentMovements";
import QuickActions from "../../components/dashboard/QuickActions";
import StockAlerts from "../../components/dashboard/StockAlerts";
import CategoryProgress from "../../components/dashboard/CategoryProgress";
import { cardDashboard } from "@/constants";
import Navbar from "@/components/navbar/Navbar";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  
  if (!session?.user) return redirect("/auth/login");

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Navbar />
      <main className="flex-1 p-8">
      {/* cabecera */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Panel de Control
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Resumen general del rendimiento de tu inventario y gimnasio
        </p>
      </div>

      {/* metricas osea fila superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cardDashboard.map((card) => (
          <CardDashboard
            key={card.id}
            title={card.title}
            count={card.count}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* columna izquielda */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* tabla de movimientos */}
          <RecentMovements />

          {/* seccion de alertas */}
          <StockAlerts />
        </div>

        {/* columa derecha */}
        <div className="flex flex-col gap-8">
          {/* botones de accion rapida */}
          <QuickActions />

          {/* barra de progreso de categoria */}
          <CategoryProgress />
        </div>
      </div>
      </main>
    </div>
  );
};

export default Dashboard;
