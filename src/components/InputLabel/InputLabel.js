import React from 'react';
import './InputLabel.css';
import PropTypes from 'prop-types';

const InputLabel = ({ label, htmlFor, isRequired, className }) => {
    const classes = className ? `input-label ${className}` : 'input-label';
    const requiredClass = isRequired ? 'input-label--required' : '';

    return (
        <label className={`${classes} ${requiredClass}`} htmlFor={htmlFor}>
            {label}
        </label>
    );
};

export default InputLabel;

InputLabel.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
        PropTypes.func,
    ]),
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    isRequired: PropTypes.bool,
};
