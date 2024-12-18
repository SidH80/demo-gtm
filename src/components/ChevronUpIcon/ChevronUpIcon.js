import React from 'react';
import PropTypes from 'prop-types';
import './ChevronUpIcon.css';

/**
 *  @description This component is a chevron up icon
 */
export default function ChevronUpIcon(props) {
    const { isFocusable, ...rest } = props;
    return (
        <svg
            className='up-chevron'
            fill='currentColor'
            focusable={isFocusable}
            preserveAspectRatio='xMidYMid meet'
            viewBox='0 0 448 512'
            {...rest}>
            <path d='M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z' />
        </svg>
    );
}

ChevronUpIcon.defaultProps = {
    isFocusable: 'true',
};

ChevronUpIcon.propTypes = {
    isFocusable: PropTypes.string,
    ['string']: PropTypes.string,
};
