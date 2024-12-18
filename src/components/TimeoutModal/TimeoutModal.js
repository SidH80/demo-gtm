import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TimeoutModal.css';
import IrsButton from '../IrsButton';
import CloseButton from '../CloseButton';

const isUndefined = require('lodash/isUndefined');

/**
 * This component displays a popup timeout modal where a user
 * can select to continue with their session or select a terminal
 * option.
 */
export default class TimeoutModal extends Component {
    constructor(props) {
        super(props);
        if (!isUndefined(props.timeoutObject)) {
            props.timeoutObject.endTimeoutTimer();
        }

        this.sessionEndTime = props.sessionEndTime;

        this.state = {
            timeRemaining: this.sessionEndTime - new Date().getTime() - 1000,
        };

        // Update the timer every second
        this.timerIntervalId = setInterval(this.updateTimer, 1000);

        this.headerElement = React.createRef();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let ref =
            this.headerElement.current !== null
                ? this.headerElement
                : {
                      current: {
                          focus: function () {
                              return;
                          },
                      },
                  };
        ref.current.focus();
    }

    componentWillUnmount() {
        // Remove the interval set on Window, identified by 'timerIntervalId' in constructor.
        window.clearInterval(this.timerIntervalId);
    }

    updateTimer = () => {
        var now = new Date().getTime();
        var timeRemaining = this.sessionEndTime - now;
        if (timeRemaining < 1000) {
            window.clearInterval(this.timerIntervalId);
            this.props.logout();
        }
        this.setState({ timeRemaining });
    };

    continueSelected = () => {
        const pageHeaderId = this.props.pageHeaderId
            ? this.props.pageHeaderId
            : 'title';
        const headerElement = document.getElementById(pageHeaderId);
        const modalCount = document.querySelectorAll('[role="dialog"]').length;
        const modal = document.querySelectorAll('[role="dialog"]')[1];
        const modalHeader = modal?.querySelector('h1');

        if (headerElement) {
            if (modalCount > 1) {
                this.props.continueFunction(
                    modalHeader.focus.bind(modalHeader)
                );
                //Set programmatic focus on page title when closing timeout modal
            } else {
                this.props.continueFunction(
                    headerElement.focus.bind(headerElement)
                );
            }
        } else {
            this.props.continueFunction(null);
        }
    };

    formatTime = () => {
        const distance = this.state.timeRemaining;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (minutes <= 0 && seconds <= 0) {
            return {
                minutes: '0',
                seconds: '00',
                timeString: `${minutes}:${seconds}`,
            };
        }
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return {
            minutes: minutes,
            seconds: seconds,
            timeString: `${minutes}:${seconds}`,
        };
    };

    render() {
        const time = this.formatTime();
        return (
            <div className='timeout-modal-box' id={'timeout-modal-box'}>
                <h1
                    className='timeout-modal__header'
                    id={this.props.headerId}
                    ref={this.headerElement}
                    tabIndex={-1}>
                    {this.props.hasLangPicker ? (
                        <span>{this.props.promptText}</span>
                    ) : (
                        <span>Do you need more time?</span>
                    )}
                </h1>
                {this.props.hasLangPicker ? (
                    <p>{`${this.props.countDownText} ${time.minutes}:${time.seconds}.`}</p>
                ) : (
                    <p>{`Your session will expire in ${time.minutes}:${time.seconds}.`}</p>
                )}
                <div className='timeout-modal__button'>
                    <IrsButton
                        active
                        inverted
                        buttonText={this.props.endText}
                        clickEvent={this.props.logout}
                        id='timeout-logout'
                        className={
                            'timeoutModal__buttonDisplay timeout-modal__button--logout'
                        }
                    />
                    <IrsButton
                        active
                        buttonText={this.props.continueText}
                        clickEvent={this.continueSelected}
                        className={
                            'timeoutModal__buttonDisplay timeout-modal__button--continue'
                        }
                    />
                    <CloseButton
                        ariaLabel={this.props.closeBtnAriaLabel}
                        clickEvent={this.continueSelected}
                        id={'close-button'}
                    />
                </div>
            </div>
        );
    }
}

TimeoutModal.propTypes = {
    /**@prop {function} hasLangPicker -Value to be applied as true or null attribute on header*/
    hasLangPicker: PropTypes.func,

    /**@prop {string} headerId -Value to be applied as 'id' attribute on header*/
    headerId: PropTypes.string,

    /**@prop {string} pageHeaderId -id property of the main heading element of the application page for modal to set focus on when dismissed.*/
    pageHeaderId: PropTypes.string,

    /**@prop {object} timeoutObject -Stores the time limit for the modal (timoutObject: type Object) */
    timeoutObject: PropTypes.object,

    /**@prop {string} continueText -Provides an option regarding whether or not to extend the session ex."Yes" (continueText: type String). */
    continueText: PropTypes.string,

    /**@prop {function} continueFunction -Function that is invoked when a user chooses to continue their session (continueFunction: type String). */
    continueFunction: PropTypes.func,

    /**@prop {string} endText -Provides an option regarding whether or not to extend the session ex."No" (endText: type function). */
    endText: PropTypes.string,

    /**@prop {string} logout -Function that is invoked when a user is logged out. */
    logout: PropTypes.func,

    /**@prop {number} duration -Controls the length of time the modal is displayed before defaulting to end the session (duration: type number). */
    duration: PropTypes.number,

    /**@prop {number} sessionEndTime -Identifies when the current session should timeout (the time it takes for timeout modal to appear + the time it takes to countdown to 0) */
    sessionEndTime: PropTypes.number,

    closeBtnAriaLabel: PropTypes.string,
};

TimeoutModal.defaultProps = {
    hasLangPicker: () => null,
    continueText: '',
    endText: '',
    promptText: '',
    countDownText: '',
    continueFunction: () => {},
    headerId: '',
    sessionEndTime: null,
    logout: () => {},
    closeBtnAriaLabel: 'Close Timeout Message.',
};
