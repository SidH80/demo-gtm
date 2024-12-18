import React from 'react';
import ChevronLeftIcon from '../ChevronLeftIcon';
import ChevronRightIcon from '../ChevronRightIcon';
import IrsLink from '../IrsLink';
import PropTypes from 'prop-types';
import './PaginationNav.css';

/**
 *  @description This component is a navigation handler for pagination.  Click handlers
 * for previous and next links are passed down as props.  A muted link and icon
 * will render on the first page for the previous button and last page for the next button.
 */

const PaginationNav = ({
    paginationLabel,
    currentPage,
    handlePrevClick,
    prevAriaLabel,
    totalPages,
    nextAriaLabel,
    nextLinkLabel,
    prevLinkLabel,
    handleNextClick,
}) => {
    return (
        /* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */
        <ul role='list' className='pagination-nav'>
            {paginationLabel !== null && (
                <li>
                    <span
                        className='pagination-nav__label'
                        role='pagination-nav__label'>
                        {paginationLabel}
                    </span>
                </li>
            )}
            <li>
                {currentPage !== 1 && currentPage !== null ? (
                    <>
                        <ChevronLeftIcon />
                        <IrsLink
                            blue
                            clickEvent={handlePrevClick}
                            linkDescription={prevAriaLabel}
                            linkDisplayText={prevLinkLabel}
                            noPadding
                        />
                    </>
                ) : (
                    <>
                        <ChevronLeftIcon isMute />
                        <span
                            aria-hidden='true'
                            data-testid='pagination-nav__mute'
                            className='pagination-nav__mute'>
                            {prevLinkLabel}
                        </span>
                    </>
                )}
            </li>
            <li>
                {currentPage !== totalPages ? (
                    <>
                        <IrsLink
                            blue
                            clickEvent={handleNextClick}
                            linkDescription={nextAriaLabel}
                            linkDisplayText={nextLinkLabel}
                            noPadding
                        />
                        <ChevronRightIcon />
                    </>
                ) : (
                    <>
                        <span
                            aria-hidden='true'
                            data-testid='pagination-nav__mute'
                            className='pagination-nav__mute'>
                            {nextLinkLabel}
                        </span>
                        <ChevronRightIcon isMute />
                    </>
                )}
            </li>
        </ul>
    );
};

export default PaginationNav;

PaginationNav.propTypes = {
    // Text for pagination label
    paginationLabel: PropTypes.string,
    // Current page
    currentPage: PropTypes.number,
    // Total pages
    totalPages: PropTypes.number,
    // Event handler for Next link click
    handleNextClick: PropTypes.func,
    // Event handler for Previous link click
    handlePrevClick: PropTypes.func,
    // Aria label for Previous link
    prevAriaLabel: PropTypes.string,
    // Aria label for Next link
    nextAriaLabel: PropTypes.string,
    // Aria label for Previous link
    prevLinkLabel: PropTypes.string,
    // Aria label for Next link
    nextLinkLabel: PropTypes.string,
};

PaginationNav.defaultProps = {
    paginationLabel: null,
    currentPage: null,
    totalPages: null,
    handleNextClick: null,
    handlePrevClick: null,
    prevLinkLabel: 'Previous',
    nextLinkLabel: 'Next',
};
