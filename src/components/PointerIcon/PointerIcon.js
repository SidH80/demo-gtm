import React, { Component } from 'react';
import './PointerIcon.css';

/**
 * This component renders the svg element for the pointer of the helptip.
 */

export default class PointerIcon extends Component {
    render() {
        if (!this.props.isOpen) {
            return null;
        }

        let pointerStyle = {
            left: this.props.pointerPosition + 'px',
        };

        return (
            <svg
                className='pointer-icon'
                title='pointerIcon'
                focusable='false'
                aria-hidden='true'
                height='10px'
                style={pointerStyle}
                width='10px'>
                <path d='M5 0 L0 10 L10 10 Z' fill='#FFFFFF' />
                <path d='M5 0 L0 10' stroke='#D6D7D9' />
                <path d='M5 0 L10 10' stroke='#D6D7D9' />
                <path d='M0 5 L10 10' />
            </svg>
        );
    }
}
