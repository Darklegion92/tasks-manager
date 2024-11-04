import { useState, useCallback } from 'react';

interface UsePaginationProps {
    totalPages: number;
    initialPage?: number;
    onChange?: (page: number) => void;
}

export const usePagination = ({ totalPages, initialPage = 1, onChange }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const goToPage = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            onChange?.(page);
        }
    }, [totalPages, onChange]);

    const nextPage = useCallback(() => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }, [currentPage, totalPages, goToPage]);

    const previousPage = useCallback(() => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }, [currentPage, goToPage]);

    return {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        previousPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
};
