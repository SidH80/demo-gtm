import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { focusTrapService } from '../../helpers';

/**
 * @description This component is designed to direct focus onto wrapped components. This is helpful when
 * the application intends for the user to perform an action before they may resume any actions
 * within the application. This is especially relevant when a user is prompted for input. This
 * component's functionality is supported by the FocusTrapService.
 */

const FocusTrap = ({ ariaLabel, isModal, onSetFocus, children }) => {
    const [focusService, setFocusService] = useState(null);
    const focusRef = useRef(null);

    /**
     * @function useEffect Responsible for creating and removing the focus service.
     */
    useEffect(() => {
        if (focusService === null) {
            const service = new focusTrapService(focusRef.current, isModal);
            onSetFocus();
            setFocusService(service);
        }

        return () => {
            if (focusService !== null) {
                focusService.deconstruct();
                setFocusService(null);
            }
        };
    }, [focusService, isModal, onSetFocus]);

    return (
        <section ref={focusRef} aria-labelledby={ariaLabel}>
            {children}
        </section>
    );
};

FocusTrap.propTypes = {
    /**@prop {string} ariaLabel - Value of aria-labelledby attribute to be applied (if any) */
    ariaLabel: PropTypes.string,

    /**@prop {boolean} isModal - Determines if the FocusTrap is being used on the timeout modal*/
    isModal: PropTypes.bool,

    /**@prop {function} onSetFocus - Function responsible for setting focus on the timeout modal */
    onSetFocus: PropTypes.func,

    /**@prop {node} children - the components to pass into the section */
    children: PropTypes.node,
};

FocusTrap.defaultProps = {
    ariaLabel: null,
    isModal: true,
    onSetFocus: () => {},
    children: null,
};

export default FocusTrap;
