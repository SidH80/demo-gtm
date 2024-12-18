import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import './ExpandableCheckbox.css';

/**
 * @description checkbox component that when checked,
 * renders additional content underneath, similar to
 * an expandable accordion
 */
const ExpandableCheckbox = ({
    id,
    label,
    children,
    checked,
    required,
    inputRef,
    labelClassNames,
    labelPosition,
    checkboxClassNames,
    ...rest
}) => {
    return (
        <React.Fragment>
            <Checkbox
                id={id}
                label={label}
                checked={checked}
                required={required}
                labelClassNames={labelClassNames}
                checkboxClassNames={checkboxClassNames}
                labelPosition={labelPosition}
                ref={inputRef}
                {...rest}
            />
            {checked && (
                <div className='expandable-checkbox__content'>{children}</div>
            )}
        </React.Fragment>
    );
};

ExpandableCheckbox.propTypes = {
    /**@prop label - label to display with the checkbox */
    label: PropTypes.string,

    /**@prop checked - determines if the parent checkbox is checked and content sould render underneath */
    checked: PropTypes.bool,

    /**@prop required - determines if the checkbox is a required field and styles the labela accordingly */
    required: PropTypes.bool,

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

    /**@prop labelClassNames - custom styles to be passed to the label */
    labelClassNames: PropTypes.string,

    /**@prop labelPosition - determines if the checkbox label should appear on the left */
    labelPosition: PropTypes.oneOf(['left', 'LEFT', 'right', 'RIGHT']),

    /**@prop checkboxClassNames - custom styles to be passed to the checkbox parent */
    checkboxClassNames: PropTypes.string,

    /**@prop rest - HTML input element attributes to be passed to the input element */
    rest: PropTypes.string,
};

ExpandableCheckbox.defaultProps = {
    id: 'expanded-checkbox',
    label: '',
    checked: null,
    required: false,
    inputRef: null,
    labelClassNames: '',
    labelPosition: 'right',
    checkboxClassNames: '',
    rest: null,
};

export default React.forwardRef((props, ref) => {
    return <ExpandableCheckbox inputRef={ref} {...props} />;
});
