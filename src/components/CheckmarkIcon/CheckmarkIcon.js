import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description an SVG representing a checkbox
 * fontawesome/solid/check.svg
 * A style object or CSS class can be provided
 * in order to edit some of the SVG container's
 * properties such as background, border radius, etc.
 *
 * Other props sent to the component edit the
 * SVG path itself (the checkmark)
 */
export default function CheckmarkIcon(props) {
    const {
        isAriaHidden,
        isFocusable,
        height,
        width,

        checkColor,
        checkmarkContainerClassNames,
        checkmarkIconClassNames,
    } = props;

    return (
        <svg
            aria-hidden={isAriaHidden}
            className={checkmarkContainerClassNames}
            focusable={isFocusable}
            viewBox='0 0 512 512'
            xmlns='http://www.w3.org/2000/svg'

            height={height}
            width={width}
        >
            <path
                className={checkmarkIconClassNames}
                fill={checkColor}
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            />
        </svg>
    );
}

CheckmarkIcon.propTypes = {
    /**@prop isAriaHidden - determines if the SVG should be accessible to screen readers */
    isAriaHidden: PropTypes.bool,

    /**@prop isFocusable - determines if the SVG will be a focusable element */
    isFocusable: PropTypes.bool,

    /**@prop height - height dimension of the SVG container */
    height: PropTypes.string,

    /**@prop width - width dimension of the SVG container */
    width: PropTypes.string,

    /**@prop checkColor - the color of the checkmark (blue by default) */
    checkColor: PropTypes.string,

    /**@prop checkmarkContainerClassNames - CSS class to be added to container SVG */
    checkmarkContainerClassNames: PropTypes.string,

    /**@prop checkmarkIconClassNames - styles the SVG container in which the checkmark exists */
    checkmarkIconClassNames: PropTypes.string,
};

CheckmarkIcon.defaultProps = {
    isAriaHidden: true,
    isFocusable: false,
    height: '20',
    width: '20',
    checkColor: '#00599C',
    checkmarkContainerClassNames: '',
    checkmarkIconClassNames: '',
};