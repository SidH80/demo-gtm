import React from 'react';
import PropTypes from 'prop-types';
import './InputErrorMessage.css';

const InputErrorMessage = ({
    component: Component,
    errorMessage,
    ariaLive,
    ...rest
}) => {
    return (
        <Component
            className='input-error-message'
            aria-live={ariaLive}
            {...rest}>
            {errorMessage}
        </Component>
    );
};

InputErrorMessage.propTypes = {
    ariaLive: PropTypes.string,
    component: PropTypes.elementType,
    errorMessage: PropTypes.string,
    rest: PropTypes.object,
};

InputErrorMessage.defaultProps = {
    ariaLive: 'polite',
    component: 'p',
    errorMessage: '',
};

export default InputErrorMessage;
