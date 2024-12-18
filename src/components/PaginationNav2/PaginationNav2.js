import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import PaginationNav2Properties from './constants';
import './PaginationNav2.css';

import {
    BtnFirstPage,
    BtnLastPage,
    BtnNumberedPages,
    BtnRightChevron,
    BtnLeftChevron,
    ResultsPerPage,
    JumpToPage,
    PageTracker,
} from './subcomponents';
import {
    currentPlacementIsBeginning,
    currentPlacementIsMiddle,
    currentPlacementIsEnd,
} from './utils';

/**
 *  @description This component is a navigation handler for pagination.  Click handlers
 * for previous and next links are passed down as props.  A muted link and icon
 * will render on the first page for the previous button and last page for the next button.
 * Current page logic is dynamic to show and select beginning/middle/end pages out of toal
 * pages.
 */

export default function PaginationNav2({
    // functionality
    totalPages,
    // verbiage
    labels,
    ariaLabels,
    // conditional displays
    showResultsPerPage,
    showJumpToPage,
    showJumpToPageMobile,
    showPageTracker,
    ...props
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpToValue, setJumpToValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorInputStyle, setErrorInputStyle] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [navWithChevrons, setNavWithChevrons] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const outercontainerRef = useRef(null);
    const lastPageRef = useRef(null);
    const firstPageRef = useRef(null);
    const middleBtnRef = useRef(null);

    const btnOneRef = useRef(null);
    const btnTwoRef = useRef(null);
    const btnThreeRef = useRef(null);
    const btnFourRef = useRef(null);
    const btnFiveRef = useRef(null);
    const btnRefs = [btnOneRef, btnTwoRef, btnThreeRef, btnFourRef, btnFiveRef];

    // pull in constants and create a dynamic variable to reference screen width changes
    const {
        breakpointFullWidth,
        breakpointNoResultsAndJumpTo,
        breakpointNoJumpTo,
        breakpointNoResults,
        minNumOfPagesForEllipsis,
        maxNumOfPagesForBeginning,
        defaultJumpToBtnAriaLabel,
        defaultPageBtnPrefixAriaLabel,
        defaultPageBtnSuffixAriaLabel,
    } = PaginationNav2Properties;

    const {
        ariaLabelFirstPage,
        ariaLabelLastPage,
        ariaLabelJumpToBtn,
        ariaLabelJumpToInput,
        ariaLabelPageBtnLeft,
        ariaLabelPageBtnMiddle,
        ariaLabelPageBtnRight,
        ariaLabelPageBtn,
        ariaLabelPrevBtn,
        ariaLabelNextBtn,
    } = ariaLabels;

    const {
        prevButtonLabel,
        nextButtonLabel,
        goButtonLabel,
        pageTrackerLabel,
        resultsPerPageLabel,
        resultsPerPageAllLabel,
        jumpToInputLabel,
        errorMsgJumpToPage,
    } = labels;

    useEffect(() => {
        setLoaded(true);

        if (outercontainerRef?.current) {
            const resizeObserver = new ResizeObserver(() => {
                const width = outercontainerRef.current.offsetWidth;

                let breakpoint = breakpointFullWidth;

                if (!showJumpToPage && !showResultsPerPage) {
                    breakpoint = breakpointNoResultsAndJumpTo;
                } else if (!showJumpToPage) {
                    breakpoint = breakpointNoJumpTo;
                } else if (!showResultsPerPage) {
                    breakpoint = breakpointNoResults;
                }

                const lesserThanBreakpoint = width < breakpoint;
                setIsMobile(lesserThanBreakpoint);
            });
            resizeObserver.observe(outercontainerRef.current);
            return () => resizeObserver.disconnect(); // clean up
        }
    }, []);

    useEffect(() => {
        errorCheck();
    }, [labels]);

    useEffect(() => {
        if (currentPage === 1) {
            firstPageRef?.current?.focus();
        } else if (currentPage === totalPages) {
            lastPageRef?.current?.focus();
        }
    }, [currentPage]);

    useEffect(() => {
        // if parent updates current page then set that new value to state
        setCurrentPage(props.currentPage ?? 1);
    }, [props.currentPage]);

    useEffect(() => {
        if (
            !jumpToValue.length ||
            (jumpToValue >= 1 && jumpToValue <= totalPages)
        ) {
            // if jump to input box is cleared then reset error state
            resetErrorMessage();
        }
    }, [jumpToValue]);

    const resetErrorMessage = () => {
        // basic utility function for clearing the jump to input box error state
        setErrorMessage('');
        setErrorInputStyle({});
    };

    const showRightElipsis = () => {
        // conditional check if the right eplisis (...) should be shown
        if (
            totalPages > 6 &&
            (currentPlacementIsMiddle(
                currentPage,
                totalPages,
                minNumOfPagesForEllipsis,
                maxNumOfPagesForBeginning
            ) ||
                currentPlacementIsBeginning(
                    currentPage,
                    totalPages,
                    minNumOfPagesForEllipsis,
                    maxNumOfPagesForBeginning
                ))
        ) {
            return true;
        }

        return false;
    };

    const showLeftElipsis = () => {
        // conditional check if the left eplisis (...) should be shown
        if (
            totalPages > 5 &&
            (currentPlacementIsMiddle(
                currentPage,
                totalPages,
                minNumOfPagesForEllipsis,
                maxNumOfPagesForBeginning
            ) ||
                currentPlacementIsEnd(totalPages, currentPage))
        ) {
            return true;
        }

        return false;
    };

    const handlePageBtnClick = (pageNum, btnRef) => {
        // event handler for if one of the numbered page buttons is clicked
        setNavWithChevrons(false);
        setCurrentPage(pageNum);
        setJumpToValue('');

        // in order for screen reader to reread that the selected button
        // is now the current page, we remove focus, wait a split second,
        // then refocus on the button
        btnRef?.current?.blur();
        btnRef?.current?.focus();

        if (props.handlePageBtnClick) {
            props.handlePageBtnClick(pageNum);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            // event handler for if the previous button is clicked
            setNavWithChevrons(true);

            const newCurrentPage = currentPage - 1;

            if (props.handlePrevClick) {
                props.handlePrevClick(newCurrentPage);
            }

            setCurrentPage(newCurrentPage);
            setJumpToValue('');
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            // event handler for if the next button is clicked
            setNavWithChevrons(true);

            const newCurrentPage = currentPage + 1;

            if (props.handleNextClick) {
                props.handleNextClick(newCurrentPage);
            }

            setCurrentPage(newCurrentPage);
            setJumpToValue('');
        }
    };

    const handleJumpToInputChange = event => {
        const regex = /[a-z]/;

        // event handler for when the user types into the jump to input box
        setJumpToValue(event.target.value.replace(regex, ''));
    };

    const triggerError = () => {
        const errorMsgToDisplay =
            errorMsgJumpToPage || 'Error: Invalid page number';
        setErrorMessage(errorMsgToDisplay);
        setErrorInputStyle({ border: '1px solid var(--Red)' });
    };

    const errorCheck = () => {
        if (!jumpToValue?.length) {
            return null;
        }

        const hasError =
            jumpToValue.indexOf('.') !== -1 ||
            isNaN(jumpToValue) ||
            jumpToValue > totalPages ||
            jumpToValue < 1;

        if (hasError) {
            triggerError();
            return true;
        }

        resetErrorMessage();
        return false;
    };

    const handleClickGo = () => {
        // errorCheck checks for an error and trigger/resets error state
        const hasError = errorCheck();

        if (hasError || !jumpToValue.length) {
            return null;
        } else {
            const jumpToNum = Number(jumpToValue);
            setCurrentPage(jumpToNum);
            if (props.handleClickGo) {
                props.handleClickGo(jumpToNum);
            }
            setJumpToValue('');
        }
    };

    const handleChangeResults = event => {
        // event handler for when the user selects a value for the results per page dropdown
        if (props.handleChangeResults) {
            props.handleChangeResults(event.target.value);
        }
    };

    if (isMobile) {
        // layout for a mobile screen width
        return (
            <div
                data-testid='component-container-mobile'
                className='mobile-container'
                ref={outercontainerRef}>
                <div className='mobile-top-container'>
                    <PageTracker
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isMobile={isMobile}
                        showResultsPerPage={showResultsPerPage}
                        showJumpToPage={showJumpToPage}
                        showPageTracker={showPageTracker}
                        pageTrackerLabel={pageTrackerLabel}
                    />

                    <div className='mobile-top-subcontainer'>
                        <div className='mobile-chevron-outer-container'>
                            <BtnLeftChevron
                                currentPage={currentPage}
                                handlePrevClick={handlePrevClick}
                                ariaLabelPrevBtn={ariaLabelPrevBtn}
                                prevButtonLabel={prevButtonLabel}
                            />
                        </div>

                        <div className='mobile-chevron-outer-container'>
                            <BtnRightChevron
                                nextButtonLabel={nextButtonLabel}
                                ariaLabelNextBtn={ariaLabelNextBtn}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handleNextClick={handleNextClick}
                            />
                        </div>
                    </div>
                </div>

                <div className='mobile-bottom-container'>
                    {showResultsPerPage && (
                        <div className='mobile-bottom-subcontainer'>
                            <ResultsPerPage
                                resultsPerPageLabel={resultsPerPageLabel}
                                resultsPerPageAllLabel={resultsPerPageAllLabel}
                                isMobile={isMobile}
                                handleChangeResults={handleChangeResults}
                            />
                        </div>
                    )}

                    {/* ! jump to page is always displayed on mobile */}
                    <div
                        className={
                            showResultsPerPage
                                ? 'mobile-bottom-subcontainer'
                                : ''
                        }>
                        <JumpToPage
                            ariaLabelJumpToBtn={ariaLabelJumpToBtn}
                            ariaLabelJumpToInput={ariaLabelJumpToInput}
                            defaultJumpToBtnAriaLabel={
                                defaultJumpToBtnAriaLabel
                            }
                            errorMessage={errorMessage}
                            goButtonLabel={goButtonLabel}
                            jumpToInputLabel={jumpToInputLabel}
                            isMobile={isMobile}
                            showJumpToPage={showJumpToPage}
                            showJumpToPageMobile={showJumpToPageMobile}
                            errorInputStyle={errorInputStyle}
                            handleJumpToInputChange={handleJumpToInputChange}
                            handleClickGo={handleClickGo}
                            jumpToValue={jumpToValue}
                            totalPages={totalPages}
                        />
                    </div>
                </div>

                {/* skeleton spacer so error message text has space and doesn't overlap content below pagination bar */}
                <div
                    style={{
                        width: '100%',
                        height: errorMessage.length > 0 ? '56px' : '',
                    }}
                />
            </div>
        );
    } else {
        // layout for tablet and desktop screen widths
        return (
            <div
                data-testid='component-container'
                className='pagination-outer-container'
                ref={outercontainerRef}>
                <div className='pagination-container'>
                    {showResultsPerPage && (
                        <ResultsPerPage
                            resultsPerPageLabel={resultsPerPageLabel}
                            resultsPerPageAllLabel={resultsPerPageAllLabel}
                            isMobile={isMobile}
                            handleChangeResults={handleChangeResults}
                        />
                    )}

                    <div className='pages-container'>
                        <PageTracker
                            currentPage={currentPage}
                            totalPages={totalPages}
                            isMobile={isMobile}
                            showResultsPerPage={showResultsPerPage}
                            showJumpToPage={showJumpToPage}
                            showPageTracker={showPageTracker}
                            pageTrackerLabel={pageTrackerLabel}
                        />

                        <div className='pagination__buttons-container'>
                            <BtnLeftChevron
                                currentPage={currentPage}
                                handlePrevClick={handlePrevClick}
                                ariaLabelPrevBtn={ariaLabelPrevBtn}
                                prevButtonLabel={prevButtonLabel}
                            />

                            <div className='middle-section-container'>
                                <div
                                    className='middle-subsection-container'
                                    id='middle-subsection'>
                                    <BtnFirstPage
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        handlePageBtnClick={handlePageBtnClick}
                                        navWithChevrons={navWithChevrons}
                                        ariaLabelFirstPage={ariaLabelFirstPage}
                                    />

                                    {showLeftElipsis() && (
                                        <div
                                            key='left-elipsis'
                                            data-testid='elipsis'
                                            className='elipsis-container no-select'
                                            aria-label='elipsis'>
                                            <span>...</span>
                                        </div>
                                    )}

                                    <BtnNumberedPages
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        handlePageBtnClick={handlePageBtnClick}
                                        navWithChevrons={navWithChevrons}
                                        ariaLabelPageBtn={ariaLabelPageBtn}
                                        ariaLabelPageBtnLeft={
                                            ariaLabelPageBtnLeft
                                        }
                                        ariaLabelPageBtnMiddle={
                                            ariaLabelPageBtnMiddle
                                        }
                                        ariaLabelPageBtnRight={
                                            ariaLabelPageBtnRight
                                        }
                                        defaultPageBtnPrefixAriaLabel={
                                            defaultPageBtnPrefixAriaLabel
                                        }
                                        defaultPageBtnSuffixAriaLabel={
                                            defaultPageBtnSuffixAriaLabel
                                        }
                                        minNumOfPagesForEllipsis={
                                            minNumOfPagesForEllipsis
                                        }
                                        maxNumOfPagesForBeginning={
                                            maxNumOfPagesForBeginning
                                        }
                                        firstPageRef={firstPageRef}
                                        lastPageRef={lastPageRef}
                                        middleBtnRef={middleBtnRef}
                                        btnRefs={btnRefs}
                                        currentPlacementIsMiddle={currentPlacementIsMiddle(
                                            currentPage,
                                            totalPages,
                                            minNumOfPagesForEllipsis,
                                            maxNumOfPagesForBeginning
                                        )}
                                        currentPlacementIsEnd={currentPlacementIsEnd(
                                            totalPages,
                                            currentPage
                                        )}
                                        loaded={loaded}
                                    />

                                    {showRightElipsis() && (
                                        <div
                                            key='right-elipsis'
                                            data-testid='elipsis'
                                            className='elipsis-container no-select'
                                            aria-label='elipsis'>
                                            <span>...</span>
                                        </div>
                                    )}

                                    <BtnLastPage
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        handlePageBtnClick={handlePageBtnClick}
                                        navWithChevrons={navWithChevrons}
                                        ariaLabelLastPage={ariaLabelLastPage}
                                    />
                                </div>
                            </div>

                            <BtnRightChevron
                                nextButtonLabel={nextButtonLabel}
                                ariaLabelNextBtn={ariaLabelNextBtn}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handleNextClick={handleNextClick}
                            />
                        </div>
                    </div>

                    <JumpToPage
                        ariaLabelJumpToBtn={ariaLabelJumpToBtn}
                        ariaLabelJumpToInput={ariaLabelJumpToInput}
                        defaultJumpToBtnAriaLabel={defaultJumpToBtnAriaLabel}
                        errorMessage={errorMessage}
                        goButtonLabel={goButtonLabel}
                        jumpToInputLabel={jumpToInputLabel}
                        isMobile={isMobile}
                        showJumpToPage={showJumpToPage}
                        showJumpToPageMobile={showJumpToPageMobile}
                        errorInputStyle={errorInputStyle}
                        handleJumpToInputChange={handleJumpToInputChange}
                        handleClickGo={handleClickGo}
                        jumpToValue={jumpToValue}
                        totalPages={totalPages}
                    />
                </div>

                {/* skeleton spacer so error message text has space and doesn't overlap content below pagination bar */}
                <div
                    style={{
                        width: '100%',
                        height: errorMessage.length > 0 ? '56px' : '',
                    }}
                />
            </div>
        );
    }
}

PaginationNav2.propTypes = {
    totalPages: PropTypes.number,
    labels: PropTypes.object,
    ariaLabels: PropTypes.object,
    showResultsPerPage: PropTypes.bool,
    showJumpToPage: PropTypes.bool,
    showJumpToPageMobile: PropTypes.bool,
    showPageTracker: PropTypes.bool,
};

PaginationNav2.defaultProps = {
    totalPages: null,
    labels: {
        prevButtonLabel: 'Previous',
        nextButtonLabel: 'Next',
        pageTrackerLabel: null,
        resultsPerPageLabel: null,
        jumpToInputLabel: null,
        resultsPerPageAllLabel: null,
    },
    ariaLabels: {
        ariaLabelFirstPage: null,
        ariaLabelLastPage: null,
        ariaLabelJumpToBtn: null,
        ariaLabelJumpToInput: null,
        ariaLabelPageBtnLeft: null,
        ariaLabelPageBtnMiddle: null,
        ariaLabelPageBtnRight: null,
        ariaLabelPageBtn: null,
        ariaLabelPrevBtn: null,
        ariaLabelNextBtn: null,
    },
    showResultsPerPage: false,
    showJumpToPage: false,
    showJumpToPageMobile: true,
    showPageTracker: false,
};
