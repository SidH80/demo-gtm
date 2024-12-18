import React, { Component } from 'react';
import InputLabel from '../InputLabel';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';
import PropTypes from 'prop-types';
import './Radio.css';

const isControlledInput = value => {
    return value !== undefined && value !== null;
};

class Radio extends Component {
    handleChange = evt => {
        // If radio button is rendered as a child to RadioGroup, then the onChange method
        // from the context object should be called. Otherwise, skip it
        if (Object.prototype.hasOwnProperty.call(this.context, 'onChange')) {
            const { onChange } = this.context;
            onChange(evt);
        }
        this.props.onChange(evt);
    };

    render() {
        const {
            value,
            id,
            label,
            onFocus,
            disabled,
            checked,
            required,
        } = this.props;

        // Check whether this instance of the component has the selected context value (Note: it will have
        // this value in its context if this component was rendered as a child within the RadioGroup component )
        const hasSelectedContext = Object.prototype.hasOwnProperty.call(
            this.context,
            'selected'
        );

        const classes =
            (hasSelectedContext && this.context.selected === value) ||
            this.props.selected
                ? 'radio-button radio-button--checked'
                : 'radio-button';

        const disabledClass = this.props.disabled ? '--disabled' : '';
        // Name variable is equal to the context value passed from RadioGroup or passed directly as a prop
        // to the component itself when rendered outside of a RadioGroup
        const name = this.props.name ? this.props.name : this.context.name;

        return (
            <div className={classes}>
                <input
                    tabIndex={0}
                    ref={this.props.innerRef}
                    type='radio'
                    className={'radio-button__input' + disabledClass}
                    onChange={this.handleChange}
                    value={value}
                    onFocus={onFocus}
                    data-testid={id}
                    id={id}
                    name={name}
                    disabled={disabled}
                    {...(isControlledInput(checked)
                        ? { checked: checked }
                        : {})}
                    required={required}
                    aria-required={required}
                    aria-label={
                        this.props.ariaLabel ? this.props.ariaLabel : null
                    }
                />
                <InputLabel
                    htmlFor={id}
                    label={label}
                    className={disabledClass}
                />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => (
    <Radio innerRef={ref} {...props} />
));

Radio.contextType = RadioGroupContext;

Radio.propTypes = {
    /**@prop value {String} - 'value' attribute of HTML <input> element */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /**@prop id {String} - 'id' attribute of HTML <input> element*/
    id: PropTypes.string,

    /**@prop label {String} - Text to display in <label> element for input */
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
        PropTypes.array,
    ]),

    /**@prop onChange {Function} - Function to address radio button clicks*/
    onChange: PropTypes.func,

    /**@prop onChange {Function} - Function to address radio button focus*/
    onFocus: PropTypes.func,

    /**@prop onChange {Function or Boolean} - Determines if button should be disabled */
    disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),

    /**@prop onChange {Boolean} - Determines if button should be required */
    required: PropTypes.bool,
};

Radio.defaultProps = {
    value: null,
    id: '',
    label: '',
    onChange: () => {},
    onFocus: () => {},
    disabled: false,
    required: false,
};
