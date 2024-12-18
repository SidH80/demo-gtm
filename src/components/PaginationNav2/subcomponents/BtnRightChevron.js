import React from 'react';
import PropTypes from 'prop-types';

import ChevronRightIcon from '../../ChevronRightIcon';
import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the 'next' button on the right
 * side with a chevron icon pointing right
 */

const BtnRightChevron = ({
    currentPage,
    totalPages,
    handleNextClick,
    ariaLabelNextBtn,
    nextButtonLabel,
}) => {
    const isDisabled = currentPage === totalPages;
    let textClassName = 'chevron-text no-select';
    let containerClassName = 'chevron-container chevron-container__right';

    if (isDisabled) {
        textClassName += ' chevron-text-disabled';
        containerClassName += ' chevron-container-disabled';
    }

    const ariaLabel = ariaLabelNextBtn || 'Next page';

    return (
        <div key='right-chevron' className='chevron-outer-container'>
            <button
                data-testid='right-chevron'
                disabled={isDisabled}
                className={containerClassName}
                onClick={handleNextClick}
                aria-label={ariaLabel}>
                <span aria-hidden='true' className={textClassName}>
                    {nextButtonLabel}
                </span>

                <div
                    className='chevron-icon-right-container'
                    aria-hidden='true'>
                    <ChevronRightIcon isMute={isDisabled} />
                </div>
            </button>
        </div>
    );
};

BtnRightChevron.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    handleNextClick: PropTypes.func,
    ariaLabelNextBtn: PropTypes.string,
    nextButtonLabel: PropTypes.string,
};

BtnRightChevron.defaultProps = {
    currentPage: 1,
    totalPages: null,
    handleNextClick: () => null,
    ariaLabelNextBtn: null,
    nextButtonLabel: null,
};

export default BtnRightChevron;
