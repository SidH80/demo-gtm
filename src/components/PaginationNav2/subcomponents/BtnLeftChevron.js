import React from 'react';
import PropTypes from 'prop-types';

import ChevronLeftIcon from '../../ChevronLeftIcon';
import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the 'previous' button on the left
 * side with a chevron icon pointing left
 */

const BtnLeftChevron = ({
    currentPage,
    handlePrevClick,
    ariaLabelPrevBtn,
    prevButtonLabel,
}) => {
    const isDisabled = currentPage <= 1;
    let textClassName = 'chevron-text no-select';
    let containerClassName = 'chevron-container chevron-container__left';

    if (isDisabled) {
        textClassName += ' chevron-text-disabled';
        containerClassName += ' chevron-container-disabled';
    }

    const ariaLabel = ariaLabelPrevBtn || 'Previous page';

    return (
        <div key='left-chevron' className='chevron-outer-container'>
            <button
                data-testid='left-chevron'
                disabled={isDisabled}
                className={containerClassName}
                onClick={handlePrevClick}
                aria-label={ariaLabel}>
                <div className='chevron-icon-left-container' aria-hidden='true'>
                    <ChevronLeftIcon isMute={isDisabled} />
                </div>

                <span aria-hidden='true' className={textClassName}>
                    {prevButtonLabel}
                </span>
            </button>
        </div>
    );
};

BtnLeftChevron.propTypes = {
    currentPage: PropTypes.number,
    handlePrevClick: PropTypes.func,
    ariaLabelPrevBtn: PropTypes.string,
    prevButtonLabel: PropTypes.string,
};

BtnLeftChevron.defaultProps = {
    currentPage: 1,
    handlePrevClick: () => null,
    ariaLabelPrevBtn: null,
    prevButtonLabel: null,
};

export default BtnLeftChevron;
