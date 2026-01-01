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
        className={`px-3 py-2.5 rounded-md border
           ${
             currentPage === 1
               ? "text-gray-400 border-gray-200 cursor-not-allowed"
               : "border-blue-500 text-blue-500 hover:bg-blue-50"
           }
         `}
      >
        <ChevronLeftIcon size={15} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md border text-sm font-medium
             ${
               page === currentPage
                 ? "bg-blue-600 text-white border-blue-600"
                 : "border-blue-500 text-blue-500 hover:bg-blue-50"
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
        className={`px-3 py-2.5 rounded-md border
           ${
             currentPage === lastPage
               ? "text-gray-400 border-gray-200 cursor-not-allowed"
               : "border-blue-500 text-blue-500 hover:bg-blue-50"
           }
         `}
      >
        <ChevronRightIcon size={15} />
      </button>
    </div>
  );
}
