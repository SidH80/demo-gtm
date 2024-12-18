import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

import getClassNames from '../../helpers/getClassNames';

// Used on keydown to determine if user input is allowed

/**
 * Gets the entire value in the text box while accounting for caret positions (denoted as | below) and highlighted
 * selection ranges
 * @example adding letter "X" in middle of text box value such as beforeCaret|afterCaret
 * // returns "beforeCaretXafterCaret"
 * @example adding letter "X" in the middle of a highlighted range in the text box value such as
 * beforeRange|highlightedRange|afterRange
 * // returns "beforeRangeXafterRange"
 *
 * @param {object} e - event
 * @param {string} newText - new text to be added in the input
 * @returns full text box value
 */

// Event listener sequence for typing: onkeydown -> oninput -> onkeyup -> onblur
// Event listener sequence for pasting with CTRL + V: onkeydown -> onpaste -> oninput -> onblur
// Event listener sequence for pasting with right click + paste: onpaste -> oninput -> onblur
// If you notice -- onInput is called both when typing on the keyboard and when pasting in values
const TextField = React.forwardRef(
    (
        {
            as,
            name,
            onBlur,
            onChange,
            onFocus,
            canInput,
            className,
            initialValue,
            interceptValue,
            placeholder,
            defaultValue,
            formatOnBlur,
            formatOnFocus,
            key,
            autoComplete,
            autoCorrect,
            ...rest
        },
        ref
    ) => {
        const inputRef = ref !== null ? ref : useRef();
        const selectionRange = useRef([]);
        const prevValue = useRef(initialValue);

        // Check if space bar has been pressed more than once
        const isDoubleSpace = (e) => e.keyCode === 32 && prevValue.current.charAt(prevValue.current.length - 1) === ' '

        /**
         * Used on all keydown strokes. If the text is prohibited (via the
         * canInput prop), then the event stops and the data is not entered
         * into the text field.
         */

        const getInitialRange = (e) => {

            if (isDoubleSpace(e)) {
                e.preventDefault()
            }

            const { selectionStart, selectionEnd } = e.target;
            selectionRange.current = [selectionStart, selectionEnd];
        }

        /**
         * Used when the user pastes data into the text field. If the text
         * is prohibited (via canInput prop), then the event stops and the
         * data is not entered into the text field.
         */

        /**
         * This is only executed when the canInput returns true
         *
         * Used when the keydown or paste event is permitted. The user of
         * this component can also intercept the value about to be added
         * into the text field in order to manipulate it (such as needing
         * to add hyphens to a 10 digit phone number)
         */
        const handleInput = e => {
            if (
                typeof canInput === 'function' &&
                canInput(e.target.value) === false
                )
            {
                // Restore the value and initial selection range and exit function
                e.target.value = prevValue?.current || '';
                e.target.setSelectionRange(...selectionRange.current);
                return;
            }
            prevValue.current = e.target.value;

            if (onChange) {
                onChange(e)
            }
        };

        const handleFocus = e => {
            if(formatOnFocus){
                const nextValue = formatOnFocus && formatOnFocus(e.target.value) || e.target.value;

                if (nextValue !== e.target.value) {
                    e.target.value = nextValue;
                }

                prevValue.current = nextValue;

                if (onFocus) {
                    onFocus(e);
                }

            }else{

                // used for handling formatting when the field is focused
                if (e.target.value.includes('$')) {
                    e.target.value = e.target.value.replace(/[$,]/g, '');
                }

                if (onFocus) {
                    onFocus(fullValue, pastedData, e);
                }
            }
        };

        /**
         * Used when the user leaves an input
         */
        const handleBlur = e => {
            // This will transform the text box value as the user leaves the input
            if(formatOnBlur){
                const nextValue = formatOnBlur && formatOnBlur(e.target.value) || e.target.value;

                // Mutate the input's value if it was transformed
                if (nextValue !== e.target.value) {
                    e.target.value = nextValue;
                }
            }

            // Ex -> you could transform 23000 to $23,000.00 when they leave
            if (interceptValue) {
                e.target.value = interceptValue(e.target.value, e);
            }
            if (onBlur) {
                onBlur(e);
            }
        };

        // Event listener sequence for typing: onkeydown -> oninput -> onkeyup -> onblur

        useEffect(() => {
            inputRef.current.value = defaultValue ? defaultValue : null;
        }, [defaultValue])

        useEffect(() => {
            inputRef.current.onpaste = getInitialRange;
            inputRef.current.onkeydown = getInitialRange;
            inputRef.current.oninput = handleInput;
            inputRef.current.onblur = handleBlur;
            inputRef.current.onfocus = handleFocus;
        }, [name, inputRef.current]);

        const Component = as || 'input';



        return (
            <React.Fragment>
                <Component
                    className={getClassNames('textField',
                    className)}

                    defaultValue={initialValue || undefined}
                    placeholder={placeholder}
                    key={key}
                    ref={el => {
                        inputRef.current = el;
                        typeof ref === 'function' ? ref(el) : (ref = el);
                    }}
                    autoComplete={autoComplete || 'off'}
                    autoCorrect={autoCorrect || 'off'}
                    {...rest}
                />
            </React.Fragment>
        );
    }
);

TextField.propTypes = {
    /** @prop name - name of field */
    name: PropTypes.string,

    /** @Prop autoComplete - autoCompete true/false */
        autoComplete: PropTypes.bool,

    /** @Prop autoCorrect - autoCompete true/false */
        autoCorrect: PropTypes.bool,

    /** @prop canInput - callback which is passed the character key being pressed to determine if it should persist in the input field */
    canInput: PropTypes.func,

    /** @prop className - used for styling */
    className: PropTypes.string,

    /** @prop interceptValue - callback which is passed the entire value of the input field as the input is changing in order
     * to possibly change the data before it gets persisted into the input field
     */
    interceptValue: PropTypes.func,

    /** @prop placeholder - used for formatting */
    placeholder: PropTypes.string,

    /** @prop key - used for setting a unique key */
    key: PropTypes.string,

    /** @prop formatOnBlur - callback which is passed the entire value of the input field as the input is changing in order
     * to possibly change the data before it gets persisted into the input field
     */
    formatOnBlur: PropTypes.func,

};

export default TextField;
