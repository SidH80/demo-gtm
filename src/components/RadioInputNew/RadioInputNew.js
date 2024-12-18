import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioInputNew.css';
import InputControl from '../InputControl';
import InputErrorMessage from '../InputErrorMessage';
import InputLabel from '../InputLabel';
import Radio from '../Radio';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';

/**
 *This component creates an HTML form element group consisting of a radio and text input field,
 *labels for each, and a message to the user displaying information regarding validation errors
 *for the text input. It receives the props "filter" "onInput" and "onFocus" to filter and handle the "input"
 *event on the text input, and the "focus" event on the radio input respectively. Validation
 *handler for the text input should be a function returning a bool passed as the 'filter' prop from the parent.
 */

export default class RadioInputNew extends Component {
    constructor(props) {
        super(props);
        this.radioButtonRef = React.createRef();
    }

    handleFocus = evt => {
        this.props.onFocus(evt);
    };

    handleInput = evt => {
        this.radioButtonRef.current.click();
        // If radio input component is rendered as a child to RadioGroup, then the onChange method
        // from the context object should be called. Otherwise, skip it
        if (Object.prototype.hasOwnProperty.call(this.context, 'onChange')) {
            const { onChange } = this.context;
            onChange(evt);
        }
        this.props.onInput(evt);
    };

    render() {
        const {
            id,
            inputFieldLabel,
            inputFieldClass,
            inputFieldError,
            inputFieldHelperText,
            inputDefaultValue,
            ...other
        } = this.props;
        const { selected } = this.context;
        const inputFieldClassName = inputFieldClass
            ? inputFieldClass
            : 'radio-input-text';
        const inputErrorClass = inputFieldError ? 'input--error-outline' : null;
        return (
            <div className='radio-input-container'>
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
                    <InputControl
                        id={`${id}-input`}
                        name={this.props.inputFieldName}
                        onFocus={this.handleFocus}
                        filter={this.props.filter}
                        onInput={this.handleInput}
                        disabled={selected && selected !== this.props.value}
                        className={`${inputFieldClassName} ${inputErrorClass}`}
                        type='text'
                        receiveValue={this.props.receiveValue}
                        inputRef={this.props.inputRef}
                        defaultValue={inputDefaultValue}
                    />
                </div>
            </div>
        );
    }
}

RadioInputNew.contextType = RadioGroupContext;

RadioInputNew.propTypes = {
    /**@prop id {String} id attribute of associated radio input. Also used for input element as `{id}-input` */
    id: PropTypes.string,

    errorMessage: PropTypes.string,

    /**@prop onFocus {Function} onFocus callback attribute of input element. */
    onFocus: PropTypes.func,

    /**@prop filter {Function} - callback passed to input element. Filters allowed values into the input. Expects boolean to be returned. */
    filter: PropTypes.func,

    /**@prop onInput {Function} - callback trigged when the value of the input element has changed. Note: value will only change if filter criteria is met. */
    onInput: PropTypes.func,

    /**@prop onChange {Function} - callback function triggered when state of radio input changes. */
    onChange: PropTypes.func,

    /**@prop inputFieldName {String} - name attribute of the input element. */
    inputFieldName: PropTypes.string,

    /**@prop inputFieldClass {String} - class attribute of the input element. */
    inputFieldClass: PropTypes.string,

    /**@prop inputFieldHelperText {String} - text prompt displayed above the input element. */
    inputFieldHelperText: PropTypes.node,

    /**@prop inputFieldLabel {String} - screenreader label associated with the input element. */
    inputFieldLabel: PropTypes.string,

    /**@props inputFieldError {String} - Error label displayed when input error has occured. */
    inputFieldError: PropTypes.string,

    /**@props inputRef {Object} - ref object to be linked to the DOM reference of the input element. */
    inputRef: PropTypes.object,

    /**@props inputDefaultValue {string} - the default value of the input element associated with the radio control. */
    inputDefaultValue: PropTypes.string,
};

RadioInputNew.defaultProps = {
    id: '',
    inputFieldName: '',
    inputFieldClass: null,
    inputFieldHelperText: null,
    inputFieldLabel: null,
    inputFieldError: null,
    inputRef: null,
    inputDefaultValue: '',
    errorMessage: null,
    onFocus: () => {},
    filter: () => {},
    onInput: () => {},
    onChange: () => {},
    receiveValue: () => {},
};
