import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './StepIndicatorItem.css';

const StepIndicatorItem = ({ title, status, stepNum, onKnotClick, screenReaderStatus }) => {
    let knotClass = '';
    let labelClass = '';
    let titleClass = '';

    if (status === 'active') {
        knotClass = 'stepIndicator-knot-active';
        labelClass = 'stepIndicator-label-active';
        titleClass = 'stepIndicator-title-active';
    } else if (status === 'completed') {
        knotClass = 'stepIndicator-knot-completed';
        labelClass = 'stepIndicator-label-completed';
        titleClass = 'stepIndicator-title-link';
    } else if (status === 'finished') {
        knotClass = 'stepIndicator-knot-finished';
        labelClass = 'stepIndicator-label-finished';
    } else {
        labelClass = 'stepIndicator-label';
    }

    const stepIndicatorKnot = (
        <Fragment>
            <div className={'stepIndicator-knot ' + knotClass}>
                <div className={labelClass} aria-hidden='true'>
                    {status === 'completed' || status === 'finished'
                        ? ''
                        : stepNum}
                </div>
            </div>
            <div
                className={'stepIndicator-title ' + titleClass}
                aria-hidden='true'>
                {title}
            </div>
        </Fragment>
    );

    if (status === 'completed') {
        return (
            <li className='stepIndicator-item'>
                <div className='stepIndicator-knot-line'>
                    <div className='stepIndicator-line' />
                    <a
                        className='stepIndicator-anchor'
                        href='/'
                        aria-label={`${title} ${screenReaderStatus}`}
                        onClick={e => {
                            e.preventDefault();
                            onKnotClick(stepNum);
                        }}>
                        {stepIndicatorKnot}
                    </a>
                </div>
            </li>
        );
    }

    return (
        <li className='stepIndicator-item'>
            <div className='stepIndicator-knot-line'>
                <div className='stepIndicator-line' />

                {stepIndicatorKnot}

                <span className='sr-only'>{`${title} ${screenReaderStatus}`}</span>
            </div>
        </li>
    );
};

export default StepIndicatorItem;

StepIndicatorItem.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    screenReaderStatus: PropTypes.string,
    stepNum: PropTypes.number,
    onKnotClick: PropTypes.func,
};

StepIndicatorItem.defaultProps = {
    title: 'Step Title',
    status: 'not_active',
    screenReaderStatus: 'not active',
    stepNum: 0,
    onKnotClick: () => {},
};
