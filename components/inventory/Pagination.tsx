"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // No mostrar si solo hay una página

  return (
    <div className="mt-6 flex items-center justify-between bg-white px-6  rounded-xl border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Mostrando{" "}
        <span className="text-slate-900">
          {itemsPerPage > totalItems ? totalItems : itemsPerPage}
        </span>{" "}
        de <span className="text-slate-900">{totalItems}</span> productos
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Indicador de página */}
        <div className="flex items-center px-4 bg-slate-900 rounded-lg">
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">
            Pág. {currentPage} de {totalPages}
          </span>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
