const currentPlacementIsBeginning = (
    currentPage,
    totalPages,
    minNumOfPagesForEllipsis,
    maxNumOfPagesForBeginning
) => {
    // basic utility function to check if current page is in the beginning of total pages
    return (
        totalPages > minNumOfPagesForEllipsis &&
        currentPage <= maxNumOfPagesForBeginning
    );
};

const currentPlacementIsMiddle = (
    currentPage,
    totalPages,
    minNumOfPagesForEllipsis,
    maxNumOfPagesForBeginning
) => {
    // basic utility function to check if current page is in the middle of total pages
    const DYNAMIC_MIN_NUM_OF_PAGES_FOR_TWO_ELLIPSIS = totalPages - 2;
    return (
        totalPages > minNumOfPagesForEllipsis &&
        currentPage >= maxNumOfPagesForBeginning &&
        currentPage < DYNAMIC_MIN_NUM_OF_PAGES_FOR_TWO_ELLIPSIS
    );
};

const currentPlacementIsEnd = (totalPages, currentPage) => {
    let pageNumToCompare = totalPages - 4;
    if (totalPages - 4 < 4) {
        pageNumToCompare = 5;
    }
    // basic utility function to check if current page is at the end of total pages
    return totalPages > 6 && currentPage >= pageNumToCompare;
};

export {
    currentPlacementIsBeginning,
    currentPlacementIsMiddle,
    currentPlacementIsEnd,
};
