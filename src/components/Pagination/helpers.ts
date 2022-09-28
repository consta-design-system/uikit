type PaginationInfo = {
  isEmpty: boolean;
  prevPage: number | null;
  nextPage: number | null;
  isStartDots: boolean | 0 | null;
  isEndDots: boolean | 0 | null;
  pages: number[];
};

export const getPaginationInfo = (
  currentPage: number,
  totalPages: number,
): PaginationInfo => {
  const maxCount = 10;
  const delta = 3;

  const prevPage = currentPage - 1 || null;
  const nextPage = (currentPage < totalPages && currentPage + 1) || null;

  const isStartDots = maxCount < totalPages && prevPage && prevPage > 1 + delta;
  const isEndDots =
    maxCount < totalPages && nextPage && nextPage < totalPages - delta - 1;

  const paginationStart =
    (isStartDots && isEndDots && prevPage && prevPage - 1) ||
    (isStartDots && totalPages - (maxCount - delta)) ||
    1;

  const paginationEnd =
    (isStartDots && isEndDots && nextPage && nextPage + 2) ||
    (isEndDots && maxCount - delta + 1) ||
    totalPages;

  const pages = Array.from(
    new Array(paginationEnd - paginationStart + 1),
    (val, i) => i + paginationStart,
  );

  return {
    isEmpty: totalPages <= 1,
    prevPage,
    nextPage,
    isStartDots,
    isEndDots,
    pages,
  };
};
