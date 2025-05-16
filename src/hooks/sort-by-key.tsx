import { useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSortByKey<T extends Record<string, any>>(array: T[], key: keyof T) {

    const [sortOrder, setSortOrder] = useState("default");
    const [sortCriteria, setSortCriteria] = useState<keyof typeof array[0]>(key);

    const handleSortChange = (key: keyof typeof array[0]) => {
        if (sortCriteria === key) {
            setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
        } else {
            setSortCriteria(key);
            setSortOrder("default");
        }
    }

    const sortedData = ([...array] as typeof array).sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];
        if (sortOrder === "ascending") {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else if (sortOrder === "descending") {
            return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
        // if (typeof aValue === "number" && typeof bValue === "number") {
        //     return sortOrder === "ascending" ? aValue - bValue : bValue - aValue;
        // }
        return 0; // Default return value to ensure a number is always returned
    });

    return {
        sortOrder,
        sortCriteria,
        handleSortChange,
        sortedData
    }
}