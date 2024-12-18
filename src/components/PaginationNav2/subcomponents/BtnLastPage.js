import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the numbered page button next
 * to the 'next' button on the right side
 */

const BtnLastPage = ({
    currentPage,
    totalPages,
    handlePageBtnClick,
    navWithChevrons,
    ariaLabelLastPage,
}) => {
    const _handlePageBtnClick = pageNum => {
        if (handlePageBtnClick) {
            handlePageBtnClick(pageNum);
        }
    };

    if (totalPages > 6 && currentPage <= totalPages - 3) {
        const isActive = currentPage === totalPages;

        let ariaLabel = isActive
            ? `Page ${totalPages}, current page`
            : `Page ${totalPages}`;
        if (ariaLabelLastPage) {
            ariaLabel = ariaLabelLastPage;
        }

        let className = isActive
            ? 'numbered-page-btn numbered-page-btn__last-page numbered-page-btn__active no-select'
            : 'numbered-page-btn numbered-page-btn__last-page no-select';

        if (totalPages === 6) {
            className += ' numbered-page-btn__six-pages';
        }

        const newMarkup = (
            <button
                autoFocus={!navWithChevrons && isActive}
                key='last-page'
                data-testid='page-btn'
                className={className}
                onClick={() => _handlePageBtnClick(totalPages)}
                disabled={isActive}
                aria-label={ariaLabel}>
                {totalPages}
            </button>
        );
        return newMarkup;
    }

    return null;
};

BtnLastPage.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    handlePageBtnClick: PropTypes.func,
    navWithChevrons: PropTypes.bool,
    ariaLabelLastPage: PropTypes.string,
};

BtnLastPage.defaultProps = {
    currentPage: 1,
    totalPages: null,
    handlePageBtnClick: () => null,
    navWithChevrons: null,
    ariaLabelLastPage: null,
};

export default BtnLastPage;
