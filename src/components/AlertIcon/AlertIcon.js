import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description - This component renders the alert icon ("!" surrounded by a filled circle).
 * fontawesome/solid/exclamation-circle.svg
 * It accepts the following props:
 *  - fill: Indicates fill color of svg element
 *  - height: Indicates height of svg element
 *  - width: Indicates width of svg element
 */
export default class AlertIcon extends Component {
    render() {
        return (
            <svg
                className={this.props.classes}
                focusable='false'
                height={this.props.height}
                width={this.props.width}
                viewBox="0 0 512 512">
                <g
                    stroke='none'
                    strokeWidth='1'
                    fill={this.props.fill}
                    fillRule='evenodd'>
                    <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
                </g>
            </svg>
        );
    }
}

AlertIcon.propTypes = {
    /**@prop {string} classes - Indicates the CSS class associated to the component */
    classes: PropTypes.string,
    /**@prop {string} fill - Indicates fill color of svg element */
    fill: PropTypes.string,
    /**@prop {string} height - Indicates height of svg element */
    height: PropTypes.string,
    /**@prop {string} width - Indicates width of svg element */
    width: PropTypes.string,
};

AlertIcon.defaultProps = {
    classes: '',
    fill: 'rgb(0, 0, 0)',
    height: '28px',
    width: '28px',
};
