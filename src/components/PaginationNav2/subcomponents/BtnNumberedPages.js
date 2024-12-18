import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the numbered page buttons in the
 * center of the component between 'previous' and 'next' buttons. This does
 * not include the first or last of the numbered page buttons, which require
 * a little more attention in their own components
 */

const BtnNumberedPages = ({
    currentPage,
    totalPages,
    handlePageBtnClick,
    navWithChevrons,
    ariaLabelPageBtn,
    ariaLabelPageBtnLeft,
    ariaLabelPageBtnMiddle,
    ariaLabelPageBtnRight,
    defaultPageBtnPrefixAriaLabel,
    defaultPageBtnSuffixAriaLabel,
    currentPlacementIsMiddle,
    currentPlacementIsEnd,
    firstPageRef,
    lastPageRef,
    middleBtnRef,
    btnRefs,
    loaded,
}) => {
    // dynamically create the group of buttons in the center
    const sequentialPagesCount = totalPages <= 6 ? totalPages : 5;
    const arrayOfDigits = [...Array(sequentialPagesCount)];

    const _ariaLabelPageBtnLeft =
        ariaLabelPageBtnLeft ||
        `${defaultPageBtnPrefixAriaLabel} ${currentPage - 1}`;
    const _ariaLabelPageBtnMiddle =
        ariaLabelPageBtnMiddle ||
        `${defaultPageBtnPrefixAriaLabel} ${currentPage}${defaultPageBtnSuffixAriaLabel}`;
    const _ariaLabelPageBtnRight =
        ariaLabelPageBtnRight ||
        `${defaultPageBtnPrefixAriaLabel} ${currentPage + 1}`;

    const _handlePageBtnClick = pageNum => {
        if (handlePageBtnClick) {
            handlePageBtnClick(pageNum);
        }
    };

    if (currentPlacementIsMiddle) {
        // current page is greater than 3 and less than totalPages - 3
        return (
            <div
                key='middle-pages'
                className='middle-pages-container no-select'>
                <button
                    data-testid='page-btn'
                    className='numbered-page-btn page-btn-on-middle-left no-select'
                    onClick={() =>
                        _handlePageBtnClick(currentPage - 1, middleBtnRef)
                    }
                    aria-label={_ariaLabelPageBtnLeft}>
                    {currentPage - 1}
                </button>

                <button
                    ref={middleBtnRef}
                    autoFocus={!navWithChevrons}
                    data-testid='page-btn'
                    className='numbered-page-btn numbered-page-btn__active no-select'
                    onClick={() =>
                        _handlePageBtnClick(currentPage, middleBtnRef)
                    }
                    aria-label={_ariaLabelPageBtnMiddle}>
                    {currentPage}
                </button>

                <button
                    data-testid='page-btn'
                    className='numbered-page-btn no-select'
                    onClick={() =>
                        _handlePageBtnClick(currentPage + 1, middleBtnRef)
                    }
                    aria-label={_ariaLabelPageBtnRight}>
                    {currentPage + 1}
                </button>
            </div>
        );
    } else if (currentPlacementIsEnd) {
        // current page is greater than totalPages - 3
        const pagesArr = [
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];

        const btnsMarkup = pagesArr.map((el, index) => {
            const isActive = el === currentPage;

            let className = isActive
                ? 'numbered-page-btn numbered-page-btn__active no-select'
                : 'numbered-page-btn no-select';

            if (index === 0) {
                className += ' page-btn-on-middle-left';
            } else if (index === 4) {
                className += ' page-btn-on-middle-right';
            }

            const ref =
                currentPage === totalPages && index + 1 === 5
                    ? lastPageRef
                    : btnRefs[index];

            let ariaLabel = isActive
                ? `${defaultPageBtnPrefixAriaLabel} ${el}${defaultPageBtnSuffixAriaLabel}`
                : `${defaultPageBtnPrefixAriaLabel} ${el}`;
            if (ariaLabelPageBtn) {
                ariaLabel = ariaLabelPageBtn;
            }

            return (
                <div
                    key={'end-page-' + el}
                    className='middle-pages-container no-select'>
                    <button
                        ref={ref}
                        autoFocus={!navWithChevrons && isActive}
                        key={'page-' + el}
                        data-testid='page-btn'
                        className={className}
                        onClick={() => _handlePageBtnClick(el, ref)}
                        aria-label={ariaLabel}>
                        {el}
                    </button>
                </div>
            );
        });

        return btnsMarkup;
    } else {
        // current page is less than 4 or total pages is less than 7
        const btnsMarkup = arrayOfDigits.map((el, index) => {
            const isActive = index + 1 === currentPage;
            let className = isActive
                ? 'numbered-page-btn numbered-page-btn__active no-select'
                : 'numbered-page-btn no-select';

            if (totalPages <= 6 && index + 1 === totalPages) {
                className += ' less-than-six-pages';
            }

            let ref = btnRefs[index];
            if (currentPage === 1 && index + 1 === 1 && loaded) {
                ref = firstPageRef;
            } else if (totalPages <= 5 && currentPage === totalPages) {
                ref = lastPageRef;
            }

            let ariaLabel = isActive
                ? `${defaultPageBtnPrefixAriaLabel} ${
                      index + 1
                  }${defaultPageBtnSuffixAriaLabel}`
                : `${defaultPageBtnPrefixAriaLabel} ${index + 1}`;
            if (ariaLabelPageBtn) {
                ariaLabel = ariaLabelPageBtn;
            }

            // if you don't set page number to a variable it will render differently
            // in storybook vs ola app, resulting in a bug
            const pageNum = index + 1;

            const newMarkup = (
                <button
                    ref={ref}
                    autoFocus={loaded && !navWithChevrons && isActive}
                    key={'page-' + index + 1}
                    data-testid='page-btn'
                    className={className}
                    onClick={() => _handlePageBtnClick(pageNum, ref)}
                    aria-label={ariaLabel}>
                    {pageNum}
                </button>
            );

            return newMarkup;
        });

        return btnsMarkup;
    }
};

BtnNumberedPages.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    handlePageBtnClick: PropTypes.func,
    navWithChevrons: PropTypes.bool,
    ariaLabelPageBtn: PropTypes.string,
    ariaLabelPageBtnLeft: PropTypes.string,
    ariaLabelPageBtnMiddle: PropTypes.string,
    ariaLabelPageBtnRight: PropTypes.string,
    defaultPageBtnPrefixAriaLabel: PropTypes.string,
    defaultPageBtnSuffixAriaLabel: PropTypes.string,
    currentPlacementIsMiddle: PropTypes.bool,
    currentPlacementIsEnd: PropTypes.bool,
    firstPageRef: PropTypes.object,
    lastPageRef: PropTypes.object,
    middleBtnRef: PropTypes.object,
    btnRefs: PropTypes.array,
    loaded: PropTypes.bool,
};

BtnNumberedPages.defaultProps = {
    currentPage: 1,
    totalPages: null,
    handlePageBtnClick: () => null,
    navWithChevrons: false,
    ariaLabelPageBtn: null,
    ariaLabelPageBtnLeft: null,
    ariaLabelPageBtnMiddle: null,
    ariaLabelPageBtnRight: null,
    defaultPageBtnPrefixAriaLabel: null,
    defaultPageBtnSuffixAriaLabel: null,
    currentPlacementIsMiddle: null,
    currentPlacementIsEnd: null,
    firstPageRef: null,
    lastPageRef: null,
    middleBtnRef: null,
    btnRefs: [],
    loaded: false,
};

export default BtnNumberedPages;
