import React from 'react';
import './ExternalArrow.css';

/**
 * @description This component renders an icon that is an external arrow.
 * In this component we are putting the svg directly into our component
 * so that we can have finer control over its appearance. When we
 * load the svg through an img tag we have no control over its appearance
 * unless we go into the file and manually change it. This means
 * we can't dynamically alter any of the values.
 *
 * fontawesome/solid/external-link-alt.svg
 */

export default function ExternalArrow() {
    return (
        <svg
            data-testid='external-icon'
            aria-hidden='true'
            className='external-icon'
            fill='currentColor'
            focusable='false'
            viewBox='0 0 512 512'
            height='14'
            width='14'>
            <path d='M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z' />
        </svg>
    );
}
