import React from 'react';
import './InfoIcon.css';
import PropTypes from 'prop-types';
/**
 * This component returns the svg icon of the
 * alert Info icon.
 *
 * fontawesome/solid/info-circle.svg
 */

export default function InfoIcon(props) {
    return (
        <svg
            className='info-icon'
            fill={props.fill}
            focusable={false}
            height={props.height}
            width={props.width}
            viewBox="0 0 512 512">
            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
        </svg>
    );
}

InfoIcon.propTypes = {
    /**@prop {string} height -Value of 'height' attribute for <svg> element */
    height: PropTypes.string,

    /**@prop {string} width -Value of 'width' attribute for <svg> element */
    width: PropTypes.string,

    /**@prop {string} fill -Value of 'fill' attribute for <svg> element */
    fill: PropTypes.string,
};

InfoIcon.defaultProps = {
    height: '24px',
    width: '24px',
    fill: '#1B1B1B'
};