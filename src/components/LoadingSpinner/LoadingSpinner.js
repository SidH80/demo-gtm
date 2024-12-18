import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

/**
 * @description This class creates a component for the loading spinner
 * that will be displayed on the loading page.
 */
export class LoadingSpinner extends Component {
    render() {
        const spinnerTineStyle =
            this.props.pageOverlay === true
                ? 'spinner-animation whiteBackground'
                : 'spinner-animation blackBackground';
        return (
            <div className='spinner' role='progressbar' aria-hidden={true}>
                <div
                    className={spinnerTineStyle}
                    data-testid='spinner-style'
                    style={{
                        transform: 'rotate(0deg) translate(0, -105%)',
                        animationDelay: '0.2s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(30deg) translate(0, -105%)',
                        animationDelay: '0.25s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(60deg) translate(0, -105%)',
                        animationDelay: '0.3s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(90deg) translate(0, -105%)',
                        animationDelay: '0.4s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(120deg) translate(0, -105%)',
                        animationDelay: '0.5s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(150deg) translate(0, -105%)',
                        animationDelay: '0.6s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(180deg) translate(0, -105%)',
                        animationDelay: '0.7s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(210deg) translate(0, -105%)',
                        animationDelay: '0.8s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(240deg) translate(0, -105%)',
                        animationDelay: '0.9s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(270deg) translate(0, -105%)',
                        animationDelay: '1s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(300deg) translate(0, -105%)',
                        animationDelay: '1.1s',
                    }}
                />
                <div
                    className={spinnerTineStyle}
                    style={{
                        transform: 'rotate(330deg) translate(0, -105%)',
                        animationDelay: '1.2s',
                    }}
                />
            </div>
        );
    }
}

LoadingSpinner.propTypes = {
    /**@param {boolean} pageOverlay - Class name(s) passed to define whether page overlay is used */
    pageOverlay: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
    pageOverlay: true,
};
