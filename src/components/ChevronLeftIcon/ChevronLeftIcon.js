import React from 'react';
import PropTypes from 'prop-types';
import './ChevronLeftIcon.css';

/**
 *  @description This component is a chevron left icon that displays as either blue or grey
 */
export default function ChevronLeftIcon(props) {
    const { height, isFocusable, isMute, width, ...rest } = props;
    return (
        <svg
            data-testid={
                isMute ? 'chevron-left-icon--mute' : 'chevron-left-icon--active'
            }
            className={
                isMute ? 'chevron-left-icon--mute' : 'chevron-left-icon--active'
            }
            focusable={isFocusable ? 'true' : 'false'}
            viewBox='0 0 320 512'
            height={height}
            width={width}
            {...rest}>
            <path
                fill='currentColor'
                d='M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z'
            />
        </svg>
    );
}

ChevronLeftIcon.propTypes = {
    /**@prop {string} height - height of the svg, defaults to 12px */
    height: PropTypes.string,
    /**@prop {bool} isFocusable */
    isFocusable: PropTypes.bool,
    /**@prop {bool} isMute - Icon will be gray if true, and blue if false */
    isMute: PropTypes.bool,
    /**@prop {string} width - width of the svg, defaults to 8px */
    width: PropTypes.string,
    /**@prop  all other props will get passed to the svg use this for accessibility */
    ['string']: PropTypes.string,
};

ChevronLeftIcon.defaultProps = {
    height: '12px',
    width: '8px',
    isFocusable: false,
    isMute: false,
};
