import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import './InputControl.css';

/**
 * This component renders an input control with input validation.
 */

export default class InputControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isInputValid: false,
            input: this.props.inputRef ? this.props.inputRef : React.createRef()
        };
    }

    componentDidMount() {
        const node = this.state.input.current;
        const { defaultValue } = this.props;
        node.onkeydown = e => { this.handleIncomingValue(e); };
        node.onkeyup = e => { this.handleIncomingValue(e); };
        node.onkeypress = e => { this.handleIncomingValue(e); }
        node.onpaste = e  => { this.handleIncomingValue(e); };
        node.onfocus = e => { this.handleFocus(e); };
        node.onfocusout = e => { this.handleFocusOut(e); };
        node.oninput = e => { this.handleInput(e); };
        node.onblur = e => { this.handleBlur(e); };

        if(defaultValue && this.props.filter(defaultValue)){
            this.setState({ value: defaultValue });
        }
        else {
            node.value = '';
        }
    }

    handleBlur = e => {
        if (e.type === 'keydown'){
              if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 9 ){
            this.setState({ value: this.props.inputRef.current.value ? this.props.inputRef.current.value : e.target.value });
            this.props.onBlur && this.props.onBlur(e);
        }}
        this.setState({ value: this.props.inputRef.current.value ? this.props.inputRef.current.value : e.target.value });
        this.props.onBlur && this.props.onBlur(e);
    };

    handleFocus = e => {
        this.props.onFocus && this.props.onFocus(e);
    }

    handleFocusOut = e => {
        this.setState({ isInputValid: false });
        this.props.onFocusOut && this.props.onFocusOut(e);
    }

    handleInput = e => {
        if(this.filter(e)) {
            this.setState({ value: e.target.value });
        }
        else {
            e.target.value = this.state.value;
        }
        this.props.onInput && this.props.onInput(e);
    }

    handleIncomingValue = e => {
        let keyCode = e.which || e.keyCode;
        let returnVal = false;

        if(e.type === 'keyup')
        {
            if(e.ctrlKey || e.metaKey)
            {
                this.setState({ value: e.target.value });
                returnVal = true;
            }
            if(this.state.isInputValid)
            {
                this.setState({ value: e.target.value });
                returnVal = true;
            }
            else
            {
                const cursorStart = e.target.selectionStart;
                const cursorEnd = e.target.selectionEnd;
                e.target.value = this.state.value;
                e.target.setSelectionRange(cursorStart, cursorEnd);
            }
            this.setState({ isInputValid: false }); // reset validity check
        }
        else if(e.type === 'keydown')
        {
            if(e.ctrlKey || e.metaKey)
            {
                returnVal = true;
            }
            else if
            (
                keyCode === 8   || // backspace
                keyCode === 46     // delete
            )
            {
                // Allow backspace and delete and set validation to true.
                this.setState({ isInputValid: true });
                returnVal = true;
            }
            else if
            (
                // Allow these keys but do not set validation to true.
                this.isKeyAllowed(keyCode)
            )
            {
                returnVal = true;
            }
            else
            {
                if(this.filter(e, e.key))
                {
                    this.setState({ isInputValid: true });
                    returnVal = true;
                }
                else
                {
                    e.preventDefault();
                }
            }
        }
        else if(e.type === 'paste')
        {
            let incomingValue = '';
            if(e.clipboardData)
            {
                incomingValue = e.clipboardData.getData('text/plain');
            }
            else if(window.clipboardData)
            {
                incomingValue = window.clipboardData.getData('Text');
            }

            if(this.filter(e, incomingValue))
            {
                this.setState({ isInputValid: true });
                returnVal = true;
            }
            else
            {
                e.preventDefault();
            }
        }
        return returnVal;
    }

    isKeyAllowed = keyCode => {
        return (keyCode === 9   || // tab
                keyCode === 16  || // shift
                keyCode === 17  || // ctrl
                keyCode === 33  || // page up
                keyCode === 34  || // page down
                keyCode === 37  || // left arrow
                keyCode === 38  || // up arrow
                keyCode === 39  || // right arrow
                keyCode === 40  ||  // down arrow
                keyCode === 229
        );
    };

    getNewValue = (e, incomingValue) => {
        const currentValue = e.target.value;
        let newValue = currentValue;
        if(e.target.selectionStart || e.target.selectionStart === 0)
        {
            const startPos = e.target.selectionStart;
            const endPos = e.target.selectionEnd;
            newValue = currentValue.substring(0, startPos) + incomingValue + currentValue.substring(endPos, currentValue.length);
        }
        return newValue;
    }

    filter = (e, incomingValue = '') => {
        let newValue = this.getNewValue(e, incomingValue);
        return this.props.filter(newValue);
    }

    render() {
        const {
            id,
            name,
            type,
            placeholder,
            className,
            defaultValue,
            isError,
            inputControlErrorMsg,
            required,
        } = this.props;
        const inputErrorClass = isError ? 'input--error-outline' : null;

        return (
            <div>
                <input
                    aria-label={this.props.ariaLabel}
                    id={id}
                    name={name}
                    type={type}
                    disabled={this.props.disabled}
                    className={`input-text ${inputErrorClass} ${className}`}
                    placeholder={placeholder}
                    ref={this.state.input}
                    autoComplete="off"
                    autoCorrect="off"
                    defaultValue={defaultValue}
                    required={required}
                    aria-required={required}
                    // value={this.state.value}
                />
                <InputErrorMessage errorMessage={isError ? inputControlErrorMsg : ''} />
            </div>
        );
    }
}

InputControl.propTypes = {
    /**@prop {string} ariaLabel - Value of aria-labelledby attribute to be applied (if any) */
    ariaLabel: PropTypes.string,
    /**@prop id {String} -The id value of the input element. */
    id: PropTypes.string.isRequired,

    /**@prop name {String} - The name attribute of the input element. */
    name: PropTypes.string.isRequired,

    /**@prop type {String} - type attribute of the input element. */
    type: PropTypes.string.isRequired,

    /**@prop inputRef {Object} - ref object to be linked to the DOM reference of the input element. */
    inputRef: PropTypes.object,

    /**@prop disabled {Bool} - disabled attribute of the input element. */
    disabled: PropTypes.bool,

    /**@prop className {String} - class attribute of the input element. */
    className: PropTypes.string,

    /**@prop placeholder {String} - placeholder text of the input element. */
    placeholder: PropTypes.string,

    /**@prop onFocus {Function} - callback triggered on the input element's focus event. */
    onFocus: PropTypes.func,

    /**@prop onFocusOut {Function} - callback triggered on the input element's focusout event. */
    onFocusOut: PropTypes.func,

    /**@prop onInput {Function} - callback triggered on when input element's value changes. */
    onInput: PropTypes.func,

    /**@prop filter {Function} - callback function to filter allowed values into the input. Expects boolean to be returned. */
    filter: PropTypes.func,

    /**@prop onBlur {Function} - callback triggered on the input element's onblur event. */
    onBlur: PropTypes.func,

    /**@prop required {Bool} - required attribute of the input element. */
    required: PropTypes.bool,
}

InputControl.defaultProps = {
    ariaLabel: null,
    id: '',
    name: '',
    type: 'text',
    inputRef: null,
    disabled: false,
    className: '',
    placeholder: '',
    onFocus: () => {},
    onFocusOut: () => {},
    onBlur: () => {},
    onInput: () => {},
    filter: () => { return true; },
    defaultValue: '',
    required: false,
}