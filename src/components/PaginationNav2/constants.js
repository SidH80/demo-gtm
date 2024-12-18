const BREAKPOINT_FULL_WIDTH = 781;
const BREAKPOINT_NO_RESULTS_AND_JUMP_TO = 503;
const BREAKPOINT_NO_JUMP_TO = 632;
const BREAKPOINT_NO_RESULTS = 652;
const MIN_NUM_OF_PAGES_FOR_ELLIPSIS = 6;
const MAX_NUM_OF_PAGES_FOR_BEGINNING = 4;

const DEFAULT_JUMP_TO_BTN_ARIA_LABEL = 'Go';
const DEFAULT_PAGE_BTN_PREFIX_ARIA_LABEL = 'Page';
const DEFAULT_PAGE_BTN_SUFFIX_ARIA_LABEL = ', current page';

export default Object.freeze({
    // functionality
    breakpointFullWidth: BREAKPOINT_FULL_WIDTH,
    breakpointNoResultsAndJumpTo: BREAKPOINT_NO_RESULTS_AND_JUMP_TO,
    breakpointNoJumpTo: BREAKPOINT_NO_JUMP_TO,
    breakpointNoResults: BREAKPOINT_NO_RESULTS,
    minNumOfPagesForEllipsis: MIN_NUM_OF_PAGES_FOR_ELLIPSIS,
    maxNumOfPagesForBeginning: MAX_NUM_OF_PAGES_FOR_BEGINNING,
    // verbiage
    defaultJumpToBtnAriaLabel: DEFAULT_JUMP_TO_BTN_ARIA_LABEL,
    defaultPageBtnPrefixAriaLabel: DEFAULT_PAGE_BTN_PREFIX_ARIA_LABEL,
    defaultPageBtnSuffixAriaLabel: DEFAULT_PAGE_BTN_SUFFIX_ARIA_LABEL,
});
