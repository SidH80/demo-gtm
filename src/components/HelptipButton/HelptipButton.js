import React from 'react';
import PropTypes from 'prop-types';
import HelptipIcon from '../HelptipIcon';
import './HelptipButton.css';

/**
 * This component is the button that has the helptip text along
 * with the helptip icon. Selecting this button will open up the
 * associated helptip content. It accepts the following props:
 *
 * ariaLabel {String}: Indicates 'aria-label' attribute of this button (for assistive technologies)
 * buttonOffset {Number}: Number of pixels to apply to button's 'margin-left' property.
 * clickHandler {Function}: Function defining action(s) to perform upon button click
 * iconOffset {Number}: Number of pixels of left margin/padding between the helptip button text content and the helptip icon
 * isOpen {Boolean}: Indicates whether the HelptipContent associated with this button is open/displayed or closed/hidden
 * label {JSX Element | String}: Textual/HTML markup that is to form button content
 */

const HelptipButton = ({
    ariaLabel,
    buttonOffset,
    classNameList,
    clickHandler,
    component: Component,
    iconOffset,
    id,
    inputRef,
    isBold,
    isOpen,
    label,
}) => {
    const icon = (
        <span aria-hidden='true' style={{ marginLeft: iconOffset + 'px' }}>
            <HelptipIcon isOpen={isOpen} id={id} />
        </span>
    );

    const boldFont = isBold ? 'helptip-button__font-style' : '';

    return (
        <Component className='helptip-button__button-wrapper'>
            <button
                aria-expanded={isOpen}
                aria-label={ariaLabel}
                className='helptip-button'
                onClick={clickHandler}
                type='button'
                ref={inputRef}>
                <span
                    className={classNameList + ' ' + boldFont}
                    style={{
                        marginLeft: buttonOffset + 'px',
                    }}>
                    {label}
                    {icon}
                </span>
            </button>
        </Component>
    );
};

export default HelptipButton;

HelptipButton.propTypes = {
    /**@param {boolean} isOpen - Determines whether the HelptipButton is open or closed */
    isOpen: PropTypes.bool,
    // A unique ID to identify this helptip group from others
    id: PropTypes.string,
    /**@param {oneOfType} label - Provides a description*/
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**@param {function} clickHandler - Function that performs 'HelptipButton' functionality when component is clicked */
    clickHandler: PropTypes.func,
    /**@param {string} component -  */
    component: PropTypes.string,
    inputRef: PropTypes.object,
    /**@param {boolean} isBold - Determines whether the label is bold or not */
    isBold: PropTypes.bool,
};

HelptipButton.defaultProps = {
    ariaExpanded: false,
    clickHandler: () => {},
    component: 'h3',
    inputRef: null,
    isBold: false,
    isOpen: false,
    label: '',
};
