import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the numbered page button next
 * to the 'previous' button on the left side
 */

const BtnFirstPage = ({
    currentPage,
    totalPages,
    handlePageBtnClick,
    navWithChevrons,
    ariaLabelFirstPage,
}) => {
    const _handlePageBtnClick = pageNum => {
        if (handlePageBtnClick) {
            handlePageBtnClick(pageNum);
        }
    };

    if (currentPage > 3 && totalPages > 6) {
        const isActive = currentPage === 1;

        let ariaLabel = isActive ? 'Page 1, current page' : 'Page 1';
        if (ariaLabelFirstPage) {
            ariaLabel = ariaLabelFirstPage;
        }

        let className = isActive
            ? 'numbered-page-btn numbered-page-btn__first-page numbered-page-btn__active no-select'
            : 'numbered-page-btn numbered-page-btn__first-page no-select';

        const newMarkup = (
            <button
                autoFocus={!navWithChevrons && isActive}
                key='first-page'
                data-testid='page-btn'
                className={className}
                onClick={() => _handlePageBtnClick(1)}
                disabled={isActive}
                aria-label={ariaLabel}>
                1
            </button>
        );
        return newMarkup;
    }

    return <div />;
};

BtnFirstPage.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    handlePageBtnClick: PropTypes.func,
    navWithChevrons: PropTypes.bool,
    ariaLabelFirstPage: PropTypes.string,
};

BtnFirstPage.defaultProps = {
    currentPage: 1,
    totalPages: null,
    handlePageBtnClick: () => ßnull,
    navWithChevrons: null,
    ariaLabelFirstPage: null,
};

export default BtnFirstPage;
