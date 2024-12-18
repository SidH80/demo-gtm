import React, { useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CalendarIcon from '../DateField/Icons/CalendarIcon';
import CalendarPicker from '../DateField/CalendarPicker';
import DesktopCalendarContainer from '../DateField/DesktopCalendarContainer';
import MaskedInput from './MaskedInput/MaskedInput';
import PopUp from '../DateField/PopUp';

import { inRange } from '@18f/us-federal-holidays';

import useInnerWidth from '../../hooks/useInnerWidth';
import useOutsideClick from '../../hooks/useOutsideClick';

import ActionTypes from './dateFieldReducer/constants';
import { createInitialState, dateFieldReducer } from './dateFieldReducer';

import DateFieldProperties from './constants';

import './DateField2.css';

/**
 * @description Generic iteration on the existing DateField component.
 * @param {Object} props
 * @component
 */
const DateField = props => {
    const {
        calendarIconAriaLabel,
        dateFormatHint,
        daysOfTheWeekAbbreviated,
        daysOfTheWeekFull,
        disableWeekendsAndHolidays,
        immediatePropagate,
        maskedInputRef,
        maxDate,
        minDate,
        months,
        propagateDateSelected,
        propagateHolidays,
        propagateResetError,
        prefix,
        suffix,
        ...maskedInputProps
    } = props;
    const { togglePopOutDisplay, togglePopUpDisplay } = ActionTypes;
    const { mobileViewWidth } = DateFieldProperties;

    const isMobile = useInnerWidth() <= mobileViewWidth;
    const desktopCalendarContainerRef = useRef(null);
    const calendarIconRef = useRef(null);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        getFederalHolidays();
    }, []);

    /**
     * @description Listens for click(s) outside the container that encapsulates the calendar display.
     * Clicks outside of said container will toggle the view of the calendar.
     */
    useOutsideClick(desktopCalendarContainerRef, calendarIconRef, () => {
        dispatch({ type: togglePopOutDisplay, isClosing: true });
    });

    const [state, dispatch] = useReducer(
        dateFieldReducer,
        createInitialState()
    );

    /**
     * @description Handles the display of the calendar based on the current view (i.e., desktop or mobile).
     */
    const handleCalendarIconClick = () => {
        dispatch({ type: isMobile ? togglePopUpDisplay : togglePopOutDisplay });
    };

    /**
     * @description Handles the close event for the calendar display.
     * @param {String} date
     */
    const handleCloseCalendarContent = date => {
        // Sets the value of the input field ref to the selected date within the calendar.
        if (maskedInputRef.current) {
            date !== maskedInputRef.current.value && propagateResetError();
            propagateDateSelected(
                immediatePropagate ? date : maskedInputRef.current.value
            );
            maskedInputRef.current.value = date;
            // Focus on input field for accessibility.
            maskedInputRef.current.focus();
        }
        dispatch({
            type: isMobile ? togglePopUpDisplay : togglePopOutDisplay,
            isClosing: true,
        });
    };

    /**
     * @description Renders the calendar display.
     * @returns {JSX}
     */
    const getCalendarView = () => {
        return (
            <CalendarPicker
                currentDate={maskedInputRef.current.value}
                daysOfTheWeekAbbreviated={daysOfTheWeekAbbreviated}
                daysOfTheWeekFull={daysOfTheWeekFull}
                disableWeekendsAndHolidays={disableWeekendsAndHolidays}
                disabledDates={holidays}
                minDate={minDate}
                maxDate={maxDate}
                months={months}
                onClose={handleCloseCalendarContent}
                prefix={prefix}
                resetToToday={false}
                suffix={suffix}
            />
        );
    };

    /**
     * @description Aggregates a collection of federal holidays between a defined lower bound and upper bound.
     * @returns {String[]}
     */
    const getFederalHolidays = () => {
        const holidays = inRange(new Date(minDate), new Date(maxDate), {
            shiftSaturdayHolidays: true,
            shiftSundayHolidays: true,
        }).map(date => {
            const {
                regexPatterns: { dateFormat },
                interpolations: { dateFormat: dateFormatInterpolation },
            } = DateFieldProperties;
            /**
             * @18f/us-federal-holidays formats dates as YYYY-MM-DD by default.
             * The CalendarPicker component expects MM/DD/YYYY format, so that translation needs to transpire.
             */
            if (!date.dateString.match(dateFormat)) {
                return null;
            }
            return date.dateString.replace(dateFormat, dateFormatInterpolation);
        });
        setHolidays(holidays);
        propagateHolidays(holidays);
    };

    /**
     * @description Closes calendar pop-up.
     */
    const closeCalendarPopUp = () => {
        dispatch({ type: togglePopUpDisplay, isClosing: true });
    };

    return (
        <>
            <p className={'date-format-hint'}>{dateFormatHint}</p>
            <MaskedInput {...maskedInputProps} ref={maskedInputRef} />
            <button
                aria-label={calendarIconAriaLabel}
                className='DateField__calendarButton'
                onClick={handleCalendarIconClick}
                ref={calendarIconRef}>
                <CalendarIcon innerRef={calendarIconRef} />
            </button>
            {state.popOutDisplay && (
                <div ref={desktopCalendarContainerRef}>
                    <DesktopCalendarContainer content={getCalendarView()} />
                </div>
            )}
            {state.popUpDisplay && (
                <PopUp
                    content={getCalendarView()}
                    handleClose={closeCalendarPopUp}
                />
            )}
        </>
    );
};

DateField.propTypes = {
    /**@prop {string} calendarIconAriaLabel Aria-Label for CalendarIcon.*/
    calendarIconAriaLabel: PropTypes.string,
    /**@prop {string} dateFormatHint Hint text for how the date should be formatted.*/
    dateFormatHint: PropTypes.string,
    /**@prop {Array} daysOfTheWeekAbbreviated The shorthand representation for the days of the week. (i.e., Monday -> M).*/
    daysOfTheWeekAbbreviated: PropTypes.arrayOf(PropTypes.string),
    /**@prop {Array} daysOfTheWeekFull The non-shorthand representation for the days of the week.*/
    daysOfTheWeekFull: PropTypes.arrayOf(PropTypes.string),
    /**@prop {bool} disableWeekendsAndHolidays The flag to determine if weekends and holidays will be prohibited.*/
    disableWeekendsAndHolidays: PropTypes.bool,
    /**@prop {bool} immediatePropagate Immediately propagate the date selected without considering updating the ref value. */
    immediatePropagate: PropTypes.bool,
    /**@prop {Array} maskedInputRef Ref for the provided input field.*/
    maskedInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    /**@prop {string} maxDate The upper bound for selecting a date.*/
    maxDate: PropTypes.string,
    /**@prop {string} minDate The lower bound for selecting a date.*/
    minDate: PropTypes.string,
    /**@prop {Array} months The months necessary for populating the CalendarPicker component.*/
    months: PropTypes.arrayOf(PropTypes.string),
    /**@prop {func} propagateDateSelected Lift up the action when a date is selected for consuming application.*/
    propagateDateSelected: PropTypes.func,
    /**@prop {func} propagateHolidays Lift up the retrieved holidays for validation in consuming application.*/
    propagateHolidays: PropTypes.func,
    /**@prop {func} propagateResetError Lift up the clearing of any error on the input field.*/
    propagateResetError: PropTypes.func,
    /**@prop {string} defaultValue Default value for the input field.*/
    defaultValue: PropTypes.string,
    /**@prop {string} inputMode The input mode for the input field. */
    inputMode: PropTypes.string,
    /**@prop {bool} isError Flag that will determine whether a className will be appended.*/
    isError: PropTypes.bool,
    /**@prop {number} maxLength The character limit for the input field.*/
    maxLength: PropTypes.number,
    /**@prop {func} onBlur Handler for blur event.*/
    onBlur: PropTypes.func,
    /**@prop {func} onInput Handler for input event.*/
    onInput: PropTypes.func,
    /**@prop {string} name Name for the input field for a corresponding label.*/
    name: PropTypes.string,
    /**@prop {string} pattern Regex pattern guideline for the input.*/
    pattern: PropTypes.string,
    /**@prop {string} prefix Prefix for month identifier in label. */
    prefix: PropTypes.string,
    /**@prop {number} size The size of the input field.*/
    size: PropTypes.number,
    /**@prop {string} suffix Suffix for month identifier in label. */
    suffix: PropTypes.string,
};

DateField.defaultProps = {
    calendarIconAriaLabel: 'Calendar Picker Button',
    dateFormatHint: '',
    daysOfTheWeekAbbreviated: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    daysOfTheWeekFull: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    defaultValue: '',
    immediatePropagate: false,
    inputMode: '',
    isError: false,
    maskedInputRef: null,
    maxDate: '',
    maxLength: 25,
    minDate: '',
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    name: '',
    onBlur: () => {},
    onInput: () => {},
    pattern: '',
    prefix: 'Previous month',
    propagateDateSelected: () => {},
    propagateHolidays: () => {},
    propagateResetError: () => {},
    size: 10,
    suffix: 'Next month',
};

export default DateField;
