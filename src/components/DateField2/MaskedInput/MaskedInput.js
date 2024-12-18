import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import MaskedInputProperties from './constants';

import './MaskedInput.css';

/**
 * @description Stateless input control that exposes itself to consumers.
 * @component
 */
const MaskedInput = forwardRef((props, ref) => {
    const { isError, ...inputProps } = props;

    /**
     * @description Handles the key down event.
     * Extracted logic from the existing DateField component.
     * @param {Object} e
     */
    const handleKeyDown = e => {
        const {
            keys: { backspaceKey, deleteKey },
        } = MaskedInputProperties;
        const {
            key,
            target,
            target: { value },
        } = e;
        const cursorPosition = target.selectionStart;
        if (key === backspaceKey && value.charAt(cursorPosition - 1) === '/') {
            target.selectionStart = cursorPosition - 1;
            target.selectionEnd = cursorPosition - 1;
        }
        if (key === deleteKey && value.charAt(cursorPosition) === '/') {
            target.selectionStart = cursorPosition + 1;
            target.selectionEnd = cursorPosition + 1;
        }
    };

    /**
     * @description Handles the key up event.
     * Extracted logic from the existing DateField component.
     * @param {Object} target
     */
    const handleKeyUp = target => {
        const {
            regexPatterns: { alphaPattern, dateSlashPattern },
        } = MaskedInputProperties;
        const {
            value: { length },
            selectionStart,
        } = target;
        if (alphaPattern.test(target.value)) {
            target.value = target.value.replace(alphaPattern, '');
            return;
        }
        let formattedInput = target.value
            .replace(dateSlashPattern, '')
            .substring(0, 8);
        if (formattedInput.length === 1 && parseInt(formattedInput, 10) > 1) {
            formattedInput = `0${formattedInput}`;
        }
        if (
            formattedInput.length === 3 &&
            parseInt(formattedInput.slice(-1)) > 3
        ) {
            formattedInput = `${formattedInput.slice(
                0,
                2
            )}0${formattedInput.slice(-1)}`;
        }
        if (formattedInput.length >= 4) {
            formattedInput = `${formattedInput.slice(
                0,
                2
            )}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4)}`;
        } else if (formattedInput.length >= 2) {
            formattedInput = `${formattedInput.slice(
                0,
                2
            )}/${formattedInput.slice(2)}`;
        }
        target.value = formattedInput;
        if (selectionStart < length) {
            target.selectionStart = selectionStart;
            target.selectionEnd = selectionStart;
        }
    };

    /**
     * @description Sets the class for the input field.
     * There is a default class and an additional class appended if there is an error on the input field.
     * @returns {String}
     */
    const getClassName = () => {
        return `masked-input ${isError ? 'masked-input__error' : ''}`;
    };

    return (
        <input
            {...inputProps}
            className={getClassName()}
            ref={ref}
            onKeyDown={handleKeyDown}
            onKeyUp={e => {
                handleKeyUp(e.target);
            }}
        />
    );
});

MaskedInput.propTypes = {
    /**@prop {string} defaultValue Default value for the input field.*/
    defaultValue: PropTypes.string,
    /**@prop {string} inputMode The input mode for the input field. */
    inputMode: PropTypes.string,
    /**@prop {bool} isError Flag that will determine whether a className will be appended.*/
    isError: PropTypes.bool,
    /**@prop {number} maxLength The character limit for the input field.*/
    maxLength: PropTypes.number,
    /**@prop {string} name Name for the input field for a corresponding label.*/
    name: PropTypes.string,
    /**@prop {func} onBlur Handler for blur event.*/
    onBlur: PropTypes.func,
    /**@prop {func} onInput Handler for input event.*/
    onInput: PropTypes.func,
    /**@prop {string} pattern Regex pattern guideline for the input.*/
    pattern: PropTypes.string,
    /**@prop {number} size The size of the input field.*/
    size: PropTypes.number,
};

MaskedInput.defaultProps = {
    defaultValue: '',
    inputMode: '',
    isError: false,
    maxLength: 25,
    name: '',
    onBlur: () => {},
    onInput: () => {},
    pattern: null,
    size: 10,
};

export default MaskedInput;
