import React from 'react';
import PropTypes from 'prop-types';

import './SingleSelect.css';

const isControlledInput = value => {
    return value !== undefined && value !== null;
};

/**
 * @description a component used to select one item
 * from a list of <option> elements. It can either be
 * controlled or uncontrolled.
 *
 * @example ./SingleSelect.showcase.js
 */
export const SingleSelect = ({
    id,
    value,
    hasError,
    inputRef,
    children,
    required,
    disabled,
    classNames,
    defaultValue,
    ...rest
}) => {
    /**
     * When a user of this component passes "value"
     * as a prop, we know they want to control its
     * value. Otherwise, we let the native DOM to
     * handle the state of the select control and
     * pass a defaultValue if the developer wants
     * an initial placeholder option.
     */
    const controlledInputProps = {
        value: value || '',
    };
    const uncontrolledInputProps = {
        defaultValue: defaultValue || '',
    };

    return (
        <select
            id={id}
            ref={inputRef}
            disabled={disabled}
            required={required}
            className={`single-select ${
                hasError ? 'single-select--error' : 'single-select--no-error'
            } ${classNames}`}
            {...(isControlledInput(value)
                ? controlledInputProps
                : uncontrolledInputProps)}
            {...rest}>
            {children}
        </select>
    );
};

SingleSelect.propTypes = {
    /**@prop {string} id - id associated with select control (enforced for accessibility) */
    id: PropTypes.string,

    /**@prop {string} value - the value of the option that is currently selected */
    value: PropTypes.string,

    /**@prop {boolean} hasError - if the input should be styled as if it has an error */
    hasError: PropTypes.bool,

    /**@prop ref - ref to access the native input element in the DOM */
    inputRef: PropTypes.oneOfType([
        /** A ref should be a DOM node */
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),

        /**
         * A ref can also be a callback function
         * @see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
         */
        PropTypes.func,
    ]),

    /**@prop {DOM Element} children - HTML <option> element(s) */
    children: PropTypes.node,

    /**@prop {boolean} required - determines if the select control is a required input (enforced for accessibility) */
    required: PropTypes.bool,

    /**@prop {boolean} disabled - determines if the control is enabled or disabled (enforced for styling) */
    disabled: PropTypes.bool,

    /**@prop {string} classNames - CSS classes to be passed to the select control for styling */
    classNames: PropTypes.string,

    /**@prop rest - HTML input element attributes to be passed to the input element, i.e. onChange, onFocus, etc. */
    rest: PropTypes.string,
};

SingleSelect.defaultProps = {
    id: '',
    value: null,
    inputRef: null,
    required: false,
    disabled: false,
    defaultValue: '',
    classNames: '',
    rest: null,
};

export default React.forwardRef((props, ref) => {
    return <SingleSelect inputRef={ref} {...props} />;
});
