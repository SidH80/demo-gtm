const MOBILE_VIEW_WIDTH = 767;
const REGEX_DATE_FORMAT_YYYY_MM_DD = /(\d{4})-(\d{1,2})-(\d{1,2})/;
const INTERPOLATION_DATE_FORMAT_MM_DD_YY = '$2/$3/$1';

export default Object.freeze({
    interpolations: {
        dateFormat: INTERPOLATION_DATE_FORMAT_MM_DD_YY,
    },
    mobileViewWidth: MOBILE_VIEW_WIDTH,
    regexPatterns: {
        dateFormat: REGEX_DATE_FORMAT_YYYY_MM_DD,
    },
});
