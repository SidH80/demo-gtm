import React from 'react';
import PropTypes from 'prop-types';
import './HelptipContent.css';
import PointerIcon from '../PointerIcon';

/**
 * @description This component renders the message that should display for
 * the helptip
 */

const HelptipContent = ({ content, isOpen, pointerPosition }) => {
    return (
        <div
            className='helptip-content'
            aria-expanded={isOpen}
            aria-hidden={!isOpen}>
            <PointerIcon isOpen={isOpen} pointerPosition={pointerPosition} />
            <div className='helptip-content__content'>{content}</div>
        </div>
    );
};

HelptipContent.propTypes = {
    /**@prop {object} content - The prop containing the message associated with the helptip (content: type JSX.Element) */
    content: PropTypes.object,
    /**@prop {boolean} isOpen - Determines wheather the content is being displayed or not */
    isOpen: PropTypes.bool,
    pointerPosition: PropTypes.number,
};

HelptipContent.defaultProps = {
    content: <div />,
    isOpen: false,
    pointerPosition: 0,
};

export default HelptipContent;
