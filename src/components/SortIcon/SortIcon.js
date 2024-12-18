import React from 'react';
import PropTypes from 'prop-types';
import './SortIcon.css';

/**
 *  @description This component renders an up and down pointed sort icon used primarily in tables
 */

export default function SortIcon(props) {
    return (
        <>
            <svg
                className='sort-icon down'
                viewBox="0 0 320 512"
                >
                <path
                    fill={props.isSortedDesc ? 'white' : 'currentColor'}
                    d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/>
            </svg>

            <svg
                className='sort-icon up'
                viewBox="0 0 320 512"
                >
                <path
                    fill={props.isSortedAsc ? 'white' : 'currentColor'}
                    d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41zz"/>
            </svg>
        </>
    );
}

SortIcon.propTypes = {
    // Indicates whether sort is currently ascending in particular table column
    isSortedAsc: PropTypes.bool,
    // Indicates whether sort is currently descending in particular table column
    isSortedDesc: PropTypes.bool,
};

SortIcon.defaultProps = {
    isSortedAsc: false,
    isSortedDesc: false
};