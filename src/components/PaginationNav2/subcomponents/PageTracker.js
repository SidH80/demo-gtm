import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the page tracker showing
 * "page X of X" at the top
 */

const PageTracker = ({
    currentPage,
    totalPages,
    isMobile,
    showResultsPerPage,
    showJumpToPage,
    showPageTracker,
    ...props
}) => {
    const pageTrackerLabel =
        props.pageTrackerLabel || `Page ${currentPage} of ${totalPages}`;

    let containerClassname = isMobile
        ? 'page-tracker-container-mobile'
        : 'page-tracker-container';
    if (!isMobile && !showJumpToPage && !showResultsPerPage) {
        containerClassname = 'page-tracker-container-basic';
    }

    if (showPageTracker || isMobile) {
        return (
            <div className={containerClassname}>
                <div className='page-tracker no-select'>
                    <label className='label-text' htmlFor='middle-subsection'>
                        {pageTrackerLabel}
                    </label>
                </div>
            </div>
        );
    }

    return null;
};

PageTracker.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    isMobile: PropTypes.bool,
    showResultsPerPage: PropTypes.bool,
    showJumpToPage: PropTypes.bool,
    showPageTracker: PropTypes.bool,
    pageTrackerLabel: PropTypes.string,
};

PageTracker.defaultProps = {
    currentPage: 1,
    totalPages: PropTypes.number,
    isMobile: null,
    showResultsPerPage: null,
    showJumpToPage: null,
    showPageTracker: null,
    pageTrackerLabel: null,
};

export default PageTracker;
