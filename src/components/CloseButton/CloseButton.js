import React from 'react';
import PropTypes from 'prop-types';
import { ModalCloseIcon } from '../Modal/subcomponents';
import './CloseButton.css';

/**
 * This component is the close button that utilizes the Modal Close Icon.
 * Selecting this button will close the window or modal it is on.
 * It accepts the following props:
 *
 * ariaLabel {String}: Indicates 'aria-label' attribute of this button (for assistive technologies)
 * clickEvent {Function}: Function defining action(s) to perform upon button click
 * id {String}: Indicated a unique identifier
 */

const CloseButton = props => {
    const { ariaLabel, id, clickEvent } = props;
    return (
        <button
            aria-label={ariaLabel}
            onClick={clickEvent}
            type='button'
            className='close-button__button-wrapper'>
            <ModalCloseIcon id={id} />
        </button>
    );
};

CloseButton.propTypes = {
    // A unique ID to identify this button from others
    id: PropTypes.string,

    /**@param {string} ariaLabel - Provides a description for AT*/
    ariaLabel: PropTypes.string,

    /**@param {function} clickEvent - Function that performs 'CloseButton' functionality when component is clicked */
    clickEvent: PropTypes.func,
};

CloseButton.defaultProps = {
    clickEvent: () => {},
    id: '',
    ariaLabel: '',
};

export default CloseButton;
