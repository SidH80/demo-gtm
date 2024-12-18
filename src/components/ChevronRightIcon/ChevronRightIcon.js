import React from 'react';
import PropTypes from 'prop-types';
import './ChevronRightIcon.css';

/**
 *  @description This component is a chevron left icon that displays as either blue or grey
 * depending on the mute prop that gets passed down.
 *
 * fontawesome/solid/angle-right.svg
 */
export default function ChevronRightIcon(props) {
    const {
        height,
        isFocusable,
        isMute,
        width,
        iconColor,
        viewBox,
        ...rest
    } = props;

    return (
        <svg
            data-testid={
                isMute
                    ? 'chevron-right-icon--mute'
                    : 'chevron-right-icon--active'
            }
            className={
                isMute
                    ? 'chevron-right-icon--mute'
                    : 'chevron-right-icon--active'
            }
            focusable={isFocusable ? 'true' : 'false'}
            viewBox={viewBox}
            height={height}
            width={width}
            {...rest}>
            <path
                d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'
                fill={iconColor}
            />
        </svg>
    );
}

ChevronRightIcon.propTypes = {
    /**@prop {string} height - height of the svg, defaults to 12px */
    height: PropTypes.string,
    /**@prop {'false' or 'true'} isFocusable */
    isFocusable: PropTypes.bool,
    /**@prop {bool} isMute - Icon will be gray if true, and blue if false */
    isMute: PropTypes.bool,
    /**@prop {string} width - width of the svg, defaults to 8px */
    width: PropTypes.string,
    /**@prop  all other props will get passed to the svg use this for accessibility */
    ['string']: PropTypes.string,
    /**@prop {string} iconColor - color of the svg, defaults to currentColor */
    iconColor: PropTypes.string,
    /**@prop {string} viewBox - position and dimensions of the svg, defaults to '0 0 256 512' */
    viewBox: PropTypes.string,
};

ChevronRightIcon.defaultProps = {
    height: '12px',
    width: '8px',
    isFocusable: false,
    isMute: false,
    iconColor: 'currentColor',
    viewBox: '0 0 256 512',
};
