import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ headerText, showGrayBox, classes, children }) => {
    const grayClass = showGrayBox ? '-gray' : '';
    return (
        <div className={`card ${classes}`}>
            <div className={'ms-row-one card--header' + grayClass}>
                <h2>{headerText}</h2>
            </div>
            <div className={'ms-row-two card--content' + grayClass}>
                {children}
            </div>
        </div>
    );
};

Card.propTypes = {
    headerText: PropTypes.string.isRequired,
    showGrayBox: PropTypes.bool,
    classes: PropTypes.string,
};

Card.defaultProps = {
    headerText: '',
    showGrayBox: false,
    classes: '',
};

export default Card;
