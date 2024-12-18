import React, { Component } from 'react';
import './TextFieldError.css';

export default class TextFieldError extends Component {
    render() {
        const { component: Component = 'p', errorMessage, isError, errorMessageLabel, className } = this.props;
        if(errorMessageLabel){
            return errorMessage ? (
            <p  className='error-message_label_cltp'
            aria-live='polite'>{errorMessage}
            </p>
            ) : null;

        }else{
            return (
                <Component className={className? className:'text-field-error-message'}
                            aria-live='polite'
                >
                {isError ? errorMessage : ''}
                </Component>
            );
        }
    }
}