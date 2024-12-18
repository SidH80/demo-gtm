import PropTypes from 'prop-types';
import React from 'react';

import CheckmarkIcon from '../CheckmarkIcon';
import './Checkbox.css';
import getClassNames from '../../helpers/getClassNames';

/**
 * @description a single checkbox component used when the user
 * is able to select more than one option. It can be controlled
 * or uncontrolled.
 *
 * It uses an SVG to visually replace the default HTML checkbox
 * while preserving the original interactive checkbox element in
 * the DOM for accessibility technologies.
 *
 * For accessibility guidance on creating a custom checkbox
 * @see https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/
 */
export function Checkbox(props) {
    const {
        className,
        disabled,
        inputRef,
        labelClassNames,
        labelPosition,
        required,
        label,
        ...rest
    } = props;
    const isReverseCheckbox =
        typeof labelPosition === 'string' &&
        labelPosition.toLowerCase() === 'left';

    const labelPositionClassNames = isReverseCheckbox
        ? 'irs-checkbox__label--left'
        : 'irs-checkbox__label--right';

    const requiredClassNames = required ? 'irs-checkbox__label--required' : '';

    return (
        <div
            className={getClassNames(
                'irs-checkbox',
                disabled ? 'irs-checkbox--disabled' : '',
                className
            )}>
            <input
                disabled={disabled}
                ref={inputRef}
                type='checkbox'
                {...rest}
            />

            <CheckmarkIcon
                checkmarkContainerClassNames='irs-checkbox__check-container'
                checkmarkIconClassNames='irs-checkbox__check-icon'
            />
            <span
                className={`${labelPositionClassNames} ${requiredClassNames} ${labelClassNames}`}>
                {label}
            </span>
        </div>
    );
}

Checkbox.propTypes = {
    /**@prop className - class name to apply to the parent div */
    className: PropTypes.string,

    /**@prop disabled - determines if the checkbox is not allowed to be checked */
    disabled: PropTypes.bool,

    /**@prop ref - ref to access the native input element in the DOM */
    inputRef: PropTypes.oneOfType([
        /** A ref should be a DOM node */
        PropTypes.shape({
            current: PropTypes.oneOfType([
                PropTypes.instanceOf(Element),
                PropTypes.oneOf(null),
            ]),
        }),

        /**
         * A ref can also be a callback function
         * @see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
         */
        PropTypes.func,
    ]),
    /**@prop labelPosition - determines if the checkbox label should appear on the left */
    labelPosition: PropTypes.oneOf(['left', 'LEFT', 'right', 'RIGHT']),

    /**@prop labelClassNames - CSS classes to be passed to the text that acts as a label */
    labelClassNames: PropTypes.string,

    /**@prop rest - HTML input element attributes to be passed to the input element, i.e. onChange, onFocus, etc. */
    rest: PropTypes.string,
};

Checkbox.defaultProps = {
    className: '',
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    id: 'checkbox-input',
    inputRef: null,
    label: '',
    labelPosition: 'right',
    labelClassNames: '',
    required: false,
    rest: null,
};

export default React.forwardRef((props, ref) => {
    return <Checkbox inputRef={ref} {...props} />;
});
