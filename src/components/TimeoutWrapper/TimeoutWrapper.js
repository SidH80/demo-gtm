import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TimeoutWrapper.css';

import TimeoutModal from '../TimeoutModal';
import FocusTrap from '../FocusTrap';

import { Timeout, preventBodyScroll, allowBodyScroll } from '../../helpers';

/**
 * This is a reusable timeout wrapper. When you wrap it around
 * a tree of elements, it will count down for 10 minutes. After 10
 * minutes, it will render a timeout modal that will count down for
 * 5 minutes.
 */
export default class TimeoutWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenFlag: false, //Boolean flag indicates aria-hidden attr of MPV application [hidden(true) or visible(false)]
            visible: false, //Boolean flag indicates timeout modal is currently visible(true) or hidden(false)
            duration: props.duration, //Time to idle before timeout modal appears
            countDown: props.countDown, //Time to idle after modal is displayed before session must end
            sessionEndTime: null,
        };
    }

    componentDidMount() {
        //Create new TimeoutService object with callback to be executed and delay in milliseconds
        this.timeoutObject = new Timeout(this.showTimeoutModal, this.state.duration);
        //Add event listener to update timer every time custom 'resetTimeout' event is fired
        window.addEventListener('resetTimeout', this.updateTimer);
        //Initialize timer
        this.timeoutObject.dispatchResetEvent();
    }


    /**
     * @method updateTimer
     * This function resets the modal and sessionEnd timers. It is the
     * callback to be invoked when a 'resetTimeout' event is registered on the window, i.e. the
     * user interacts with the application by clicking, mousemove, etc.
     */
    updateTimer = () => {
        //Ignore when timeout modal is active
        if (this.state.visible) return;
        //Reset modal timer
        this.timeoutObject.resetTimeoutTimer();
        //Set sessionEndTime to (t + state.duration + state.countDown) (t = current time)
        const sessionEndTime = new Date().getTime() + this.state.duration + this.state.countDown;
        this.setState({ sessionEndTime });
    }


    /**
     * @method showTimeoutModal
     * This function will set the state of the modal to visible
     * and prevent scrolling on the body.
     */
    showTimeoutModal = () => {
        //Ignore when timeout modal is active
        if (this.state.visible) return;

        //Hide Medallia survey invitation if visible
        const medalliaInvitation = document.getElementById('MDigitalInvitationWrapper');
        if (medalliaInvitation) {
            medalliaInvitation.style.display = 'none';
        }

        //Hide Medallia survey if visible
        const medalliaSurvey = document.getElementById('MDigitalLightboxWrapper');
        if (medalliaSurvey) {
            medalliaSurvey.style.display = 'none';
        }

        Array.from(document.querySelectorAll('input')).forEach(input => input.disabled = true);
        this.setState({ visible: true, });
        preventBodyScroll();
    };


    /**
     * @method hideTimeoutModal
     * This function will set the state of the modal to
     * not visible and re-enable scrolling on the page.
     * @param {function} cb -Callback function to set programmatic focus
     * on page title when timeout modal is removed from DOM
     */
    hideTimeoutModal = (cb) => {

        //Hide Medallia survey invitation if it was visible before timeout modal appeared
        const medalliaInvitation = document.getElementById('MDigitalInvitationWrapper');
        if (medalliaInvitation) {
            medalliaInvitation.style.display = 'block';
            medalliaInvitation.focus();
        }

        //Show Medallia survey if it was visible before timeout modal appeared
        const medalliaSurvey = document.getElementById('MDigitalLightboxWrapper');
        if (medalliaSurvey) {
            medalliaSurvey.style.display = 'block';
            medalliaSurvey.focus();
        }

        Array.from(document.querySelectorAll('input')).forEach(input => input.disabled = false);
        this.setState(
            {
                visible: false, //Hide timeout modal
                hiddenFlag: false, //Show MPV application
            }, () => {
                //Reinitialize timers on modal exit
                this.timeoutObject.dispatchResetEvent();
            }
        );
        allowBodyScroll();
        if (cb && typeof cb === 'function') {
            cb();
        }
        this.props.onContinue();
    };


    /**
     * @method focusComplete
     * This function will set the state of Focus
     */
    focusComplete = () => {
        this.setState({
            hiddenFlag: true,
        });
    };

    render() {
        const bodyClasses = this.state.visible ? 'timeout__backdrop' : '';
        const ariaLabel = 'timeout-modal-header';
        return (
            <div>
                {this.state.visible && (
                    <div
                        aria-modal={true}
                        className='timeout-modal--active'
                        role='dialog'
                        aria-labelledby={ariaLabel}>
                        <FocusTrap onSetFocus={this.focusComplete}>
                            <TimeoutModal
                                hasLangPicker={this.props.hasLangPicker}
                                promptText={this.props.promptText}
                                countDownText={this.props.countDownText}
                                continueText={this.props.continueText}
                                continueFunction={this.hideTimeoutModal}
                                endText={this.props.endText}
                                logout={this.props.logout}
                                headerId={ariaLabel}
                                pageHeaderId={this.props.pageHeaderId}
                                sessionEndTime={this.state.sessionEndTime}
                                timeoutObject={this.timeoutObject}
                                closeBtnAriaLabel={this.props.closeBtnAriaLabel}
                            />
                        </FocusTrap>
                    </div>
                )}
                <div className={bodyClasses} />
                <div aria-hidden={this.state.hiddenFlag}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

TimeoutWrapper.propTypes = {
    /**@prop {function} hasLangPicker Value to be applied as true or null attribute on header*/
    hasLangPicker: PropTypes.func,

    /**@prop {string} pageHeaderId id property of the main header element of the application page for modal to set focus on when dismissed.*/
    pageHeaderId: PropTypes.string,

    /**@prop {string} continueText Provides an option regarding whether or not to extend the session ex."Yes". */
    continueText: PropTypes.string,

    /**@prop {string} promptText Provides an option regarding whether or not to extend the session ex."Yes". */
    promptText: PropTypes.string,

    /**@prop {string} countDownText Provides an option regarding whether or not to extend the session ex."Yes". */
    countDownText: PropTypes.string,

    /**@prop {string} logout Function that is invoked when the user hides timeout modal. */
    onContinue: PropTypes.func,

    /**@prop {string} endText Provides an option regarding whether or not to extend the session ex."No". */
    endText: PropTypes.string,

    /**@prop {string} logout Function that is invoked when a user is logged out. */
    logout: PropTypes.func,

    /**@prop {string} duration Designates how long a user can be idle before timeout dialog is displayed */
    duration: PropTypes.number,

    /**@prop {string} countDown -Designates how long before user is logged out after timeout modal appears */
    countDown: PropTypes.number,

    closeBtnAriaLabel: PropTypes.string
};

TimeoutWrapper.defaultProps = {
    hasLangPicker: () => undefined,
    continueText: 'YES',
    endText: 'NO, LOGOUT',
    promptText: 'Do you need more time?',
    countDownText: 'Your session will expire in',
    onContinue: () => undefined,
    logout: () => { },
    duration: 600000, // 10 minutes
    countDown: 300000, // 5 minutes
};
