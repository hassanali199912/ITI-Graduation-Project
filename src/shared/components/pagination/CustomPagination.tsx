import React from "react";

interface IPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const CustomPagination: React.FC<IPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  // مصفوفة الصفحات (١‑٥ أو ١ ٢ ٣ ... آخر)
  const pages: (number | string)[] =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, "…", totalPages];

  return (
    <nav className="flex justify-center items-center gap-2 py-4" aria-label="pagination">
      {/* السابق */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-2 disabled:opacity-40"
        aria-label="السابق"
      >
        ‹
      </button>

      {/* الأرقام */}
      {pages.map((item, i) =>
        item === "…" ? (
          <span key={i} className="px-2 select-none">
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(item as number)}
            className={`px-3 ${
              page === item ? "font-bold underline" : "hover:underline"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* التالى */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-2 disabled:opacity-40"
        aria-label="التالى"
      >
        ›
      </button>
    </nav>
  );
};
