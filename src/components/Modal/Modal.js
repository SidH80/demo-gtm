import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import FocusTrap from '../FocusTrap';
import {
    allowBodyScroll,
    preventBodyScroll,
    getClassNames,
} from '../../helpers';

import './Modal.css';
import { ModalCloseIcon } from './subcomponents';

/**
 * @description used to render an overlay with popup content across the application. It
 * will be appended to the body element in the DOM.
 */
export const Modal = React.forwardRef((props, ref) => {
    const { ariaCloseLabel, appRoot, children, classes, onClose, role } = props;

    const handleEscape = useCallback(
        evt => {
            if (evt.key === 'Escape') {
                evt.preventDefault();
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleEscape, false);

        return () =>
            document.removeEventListener('keydown', handleEscape, false);
    }, [handleEscape]);

    useEffect(() => {
        preventBodyScroll();
        if (appRoot) {
            appRoot.setAttribute('aria-hidden', true);
        }

        return () => {
            allowBodyScroll();
            if (appRoot) {
                appRoot.removeAttribute('aria-hidden');
            }
        };
    }, []);

    return createPortal(
        <div
            className={getClassNames('modal__overlay', classes.overlay)}
            onClick={onClose}>
            <div
                aria-modal='true'
                className={getClassNames('modal__content', classes.content)}
                onClick={evt => evt.stopPropagation()}
                ref={ref}
                role={role}>
                <FocusTrap>
                    {children}
                    <button
                        aria-label={ariaCloseLabel}
                        className={getClassNames(
                            'modal__close-button',
                            classes.closeButton
                        )}
                        onClick={onClose}
                        id='close-button'
                        type='button'>
                        <ModalCloseIcon />
                    </button>
                </FocusTrap>
            </div>
        </div>,
        document.body
    );
});

Modal.propTypes = {
    ariaCloseLabel: PropTypes.string.isRequired,
    /**@prop children - the content of the modal
     * should be a <ModalHeader>, <ModalBody>, and a <div> containing IrsButtons in that order
     */
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
        content: PropTypes.string,
        closeButton: PropTypes.string,
        overlay: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    role: PropTypes.string,
};

Modal.defaultProps = {
    appRoot: document.querySelector('#root'),
    classes: {
        content: '',
        closeButton: '',
        overlay: '',
    },
    role: 'dialog',
};
