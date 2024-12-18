import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioInput.css';
import InputErrorMessage from '../InputErrorMessage';
import InputLabel from '../InputLabel';
import Radio from '../Radio';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';

/**
 *This component creates an HTML form element group consisting of a radio and text input field,
 *labels for each, and a message to the user displaying information regarding validation errors
 *for the text input. It receives the props "onChange" and "onFocus" to handle the "change"
 *event on the text input, and the "focus" event on the radio input respectively. Validation
 *handler for the text input should be a function passed as the 'onChange' prop from the parent.
 */
export default class RadioInput extends Component {
    constructor(props) {
        super(props);

        this.radioButtonRef = React.createRef();
    }

    handleFocus = evt => {
        this.props.onFocus(evt);
    };

    handleChange = evt => {
        this.radioButtonRef.current.click();
        // If radio input component is rendered as a child to RadioGroup, then the onChange method
        // from the context object should be called. Otherwise, skip it
        if (Object.prototype.hasOwnProperty.call(this.context, 'onChange')) {
            const { onChange } = this.context;
            onChange(evt);
        }
        this.props.onChange(evt);
    };

    render() {
        const {
            id,
            inputFieldLabel,
            inputFieldError,
            inputFieldHelperText,
            ...other
        } = this.props;
        const { selected } = this.context;
        const inputErrorClass = inputFieldError ? 'input--error-outline' : null;

        return (
            <div
                className='radio-input-container'
                data-testid='radio-input-container'>
                <Radio {...other} id={id} ref={this.radioButtonRef} />
                <div className='radio-input-field'>
                    <InputErrorMessage errorMessage={inputFieldError} />
                    {inputFieldHelperText && (
                        <p className='input-instructions'>
                            {' '}
                            {inputFieldHelperText}{' '}
                        </p>
                    )}
                    {inputFieldLabel && (
                        <InputLabel
                            htmlFor={`${id}-input`}
                            className='sr-only'
                            label={inputFieldLabel}
                        />
                    )}
                    <input
                        id={`${id}-input`}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange}
                        name={this.props.inputFieldName}
                        data-testid='dlnInput'
                        disabled={selected && selected !== this.props.value}
                        className={`radio-input-text ${inputErrorClass}`}
                        type='text'
                        value={this.props.inputFieldValue}
                        ref={this.props.inputRef}
                    />
                </div>
            </div>
        );
    }
}

RadioInput.contextType = RadioGroupContext;

RadioInput.propTypes = {
    errorMessage: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    inputFieldHelperText: PropTypes.node,
    inputFieldLabel: PropTypes.string,
    inputFieldError: PropTypes.string,
    inputFieldValue: PropTypes.string,
    inputRef: PropTypes.object,
};

RadioInput.defaultProps = {
    inputFieldHelperText: null,
    inputFieldLabel: null,
    inputFieldError: null,
    inputFieldValue: '',
    inputRef: null,
    errorMessage: null,
    onFocus: () => {},
    onChange: () => {},
};
