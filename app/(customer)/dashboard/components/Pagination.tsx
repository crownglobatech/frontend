type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-3 rounded-sm border cursor-pointer
          ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "border-blue-500 text-blue-500 hover:bg-blue-50"
          }
        `}
      >
        <ChevronLeftIcon size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-sm border text-sm font-medium cursor-pointer
            ${
              page === currentPage
                ? "border-[var(--primary-color)] text-[var(--primary-color)]"
                : " text-[#64748B] border-[#64748B]"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-3 rounded-sm border cursor-pointer
          ${
            currentPage === lastPage
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90"
          }
        `}
      >
        <ChevronRightIcon size={14} />
      </button>
    </div>
  );
}
