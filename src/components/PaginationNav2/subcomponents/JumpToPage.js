import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the input box and button to
 * navigate to a specific page number
 */

const JumpToPage = ({
    ariaLabelJumpToBtn,
    ariaLabelJumpToInput,
    defaultJumpToBtnAriaLabel,
    errorMessage,
    goButtonLabel,
    jumpToInputLabel,
    isMobile,
    showJumpToPage,
    showJumpToPageMobile,
    errorInputStyle,
    handleJumpToInputChange,
    handleClickGo,
    jumpToValue,
    totalPages,
}) => {
    const btnAriaLabelMsg = ariaLabelJumpToBtn || defaultJumpToBtnAriaLabel;
    const btnAriaLabel =
        errorMessage.length > 0
            ? errorMessage + `, ${btnAriaLabelMsg}`
            : defaultJumpToBtnAriaLabel;

    const inputAriaLabel =
        ariaLabelJumpToInput ||
        `Enter a page number from 1 through ${totalPages} to jump to`;
    const btnLabel = goButtonLabel || 'Go';

    const label = jumpToInputLabel || 'Jump to';

    const containerClassName = isMobile
        ? 'jump-to-page-container-mobile'
        : 'jump-to-page-container';

    if (showJumpToPage || (isMobile && showJumpToPageMobile)) {
        return (
            <div className={containerClassName}>
                <div className='label-container'>
                    <label
                        className='label-text no-select'
                        htmlFor='jump-to-input'>
                        {label}
                    </label>
                </div>

                <div>
                    <div className='input-button-container'>
                        <input
                            className='jump-to-input'
                            style={errorInputStyle}
                            id='jump-to-input'
                            onChange={handleJumpToInputChange}
                            value={jumpToValue}
                            aria-label={inputAriaLabel}
                        />

                        <button
                            className='jump-to-button'
                            onClick={handleClickGo}
                            aria-label={btnAriaLabel}>
                            {btnLabel}
                        </button>
                    </div>

                    {errorMessage.length > 0 && (
                        <div className='jump-to-error-outer-container'>
                            <div className='jump-to-error-inner-container'>
                                <span className='jump-to-error-text'>
                                    {errorMessage}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

JumpToPage.propTypes = {
    jumpToInputLabel: PropTypes.string,
    goButtonLabel: PropTypes.string,
    errorMessage: PropTypes.string,
    ariaLabelJumpToBtn: PropTypes.string,
    ariaLabelJumpToInput: PropTypes.string,
    defaultJumpToBtnAriaLabel: PropTypes.string,
    isMobile: PropTypes.bool,
    showJumpToPage: PropTypes.bool,
    showJumpToPageMobile: PropTypes.bool,
    errorInputStyle: PropTypes.object,
    handleJumpToInputChange: PropTypes.func,
    handleClickGo: PropTypes.func,
    jumpToValue: PropTypes.string,
    totalPages: PropTypes.number,
};

JumpToPage.defaultProps = {
    ariaLabelJumpToBtn: null,
    ariaLabelJumpToInput: null,
    defaultJumpToBtnAriaLabel: null,
    errorMessage: null,
    goButtonLabel: null,
    jumpToInputLabel: null,
    isMobile: null,
    showJumpToPage: null,
    showJumpToPageMobile: null,
    errorInputStyle: {},
    handleJumpToInputChange: () => null,
    handleClickGo: () => null,
    jumpToValue: null,
    totalPages: null,
};

export default JumpToPage;
