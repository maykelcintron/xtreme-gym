import { movimientosRecientes } from "@/const/const";

const RecentMovements = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* encabezado de la seccion */}
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">
          Movimientos Recientes
        </h2>
        <button className="text-red-500 text-sm font-bold hover:underline">
          Ver Todo
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#D92D20] text-white">
            <th className="p-3 font-semibold text-xs uppercase pl-6">
              Producto
            </th>
            <th className="p-3 font-semibold text-xs uppercase">Categoría</th>
            <th className="p-3 font-semibold text-xs uppercase">Cantidad</th>
            <th className="p-3 font-semibold text-xs uppercase">Precio</th>
            <th className="p-3 font-semibold text-xs uppercase pr-6">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {movimientosRecientes.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 pl-6 text-sm font-medium text-slate-700">
                {item.producto}
              </td>
              <td className="p-4 text-sm text-slate-500">{item.categoria}</td>
              <td
                className={`p-4 text-sm font-bold ${
                  item.cantidad > 0 ? "text-blue-600" : "text-slate-700"
                }`}
              >
                {item.cantidad > 0 ? `+${item.cantidad}` : item.cantidad}
              </td>
              <td className="p-4 text-sm font-bold text-slate-700">
                {item.precio ? `$${item.precio.toFixed(2)}` : "-"}
              </td>
              <td className="p-4 pr-6 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.estado === "Vendido"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentMovements;
