import React, {
    useState,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import './DateField.css';
import CalendarIcon from './Icons/CalendarIcon';
import CalendarPicker from './CalendarPicker';
import PopUp from './PopUp';
import DesktopCalendarContainer from './DesktopCalendarContainer';
import { isDateInRange, isDisabled } from '../../helpers/calendarService';
import { inRange } from '@18f/us-federal-holidays';

/**
 * this component is the date input component complete with self validation and formatting
 * it does not allow users to input numbers and letters, and ensures that anything that they enter is in the
 * MM/DD/YYYY format
 * it also displays relevant errors to the user when they provide inproper input
 * @param {*} props takes in props defined below in proptypes
 * @returns jsx containing a date input box
 */
const DateField = forwardRef((props, ref) => {
    const inputRef = useRef();
    const [state, setState] = useState({
        error: null,
        popUpOpen: false,
        popOutOpen: false,
        date: props.scheduledDate,
    });

    useImperativeHandle(
        ref,
        () => ({
            getError: () => {
                return state.error;
            },
            // Expose the input field to the parent.
            getInputRef: () => {
                return inputRef;
            },
            getDate: () => {
                return state.date;
            },
        }),
        [state]
    );

    const {
        dateFieldConfiguration,
        getContextToError,
        setErrorContext,
    } = props;

    const { handleDateFieldChange = () => {} } = props;
    const {
        dateFormat,
        calendarConfiguration: {
            months,
            daysOfTheWeek: { abbreviated, full },
        },
    } = dateFieldConfiguration;

    useEffect(() => {
        const { storedError } = dateFieldConfiguration || {};
        if (storedError) {
            setState({ ...state, error: storedError });
        }
    }, [dateFieldConfiguration]);

    /**
     * this function handles a user's input once they have released their keyboard key
     * it uses regex to check for any alpha characters, then strips all / characters
     * then adds in / characters in their proper locations
     * @param {event} event keyUp event
     * @returns
     */
    const handleInput = event => {
        let inputLength = event.target.value.length;
        const cursorPosition = event.target.selectionStart;

        //error handling for non numeric and non slash chars
        const alphaRegEx = /[^0-9|/]/g;
        if (alphaRegEx.test(event.target.value)) {
            event.target.value = event.target.value.replace(alphaRegEx, '');
            return;
        }

        //format to MM/DD/YYYY
        let formattedString = event.target.value
            .replace(/\//g, '')
            .substring(0, 8);

        if (formattedString.length === 1 && parseInt(formattedString, 10) > 1) {
            formattedString = '0' + formattedString;
        }
        if (
            formattedString.length === 3 &&
            parseInt(formattedString.slice(-1)) > 3
        ) {
            formattedString =
                formattedString.slice(0, 2) + '0' + formattedString.slice(-1);
        }

        if (formattedString.length >= 4) {
            formattedString =
                formattedString.slice(0, 2) +
                '/' +
                formattedString.slice(2, 4) +
                '/' +
                formattedString.slice(4);
        } else if (formattedString.length >= 2) {
            formattedString =
                formattedString.slice(0, 2) + '/' + formattedString.slice(2);
        }

        event.target.value = formattedString;

        setState({ ...state, date: event.target.value, error: '' });

        //reset saved cursor position if we have backspaced
        if (cursorPosition < inputLength) {
            event.target.selectionStart = cursorPosition;
            event.target.selectionEnd = cursorPosition;
        }
    };

    /**
     * this function handles if a user presses backspace or delete when their cursor is right next to a /
     * it jumps their cursor over the / so that they can backspace their input properly in case they make a mistake
     * @param {*} event keydown event
     */
    const handleBackspace = event => {
        let cursorPosition = event.target.selectionStart;
        let key = event.key;

        //in order to backspace or delete past the / we need to jump the cursor over 1 position
        if (
            key === 'Backspace' &&
            event.target.value.charAt(cursorPosition - 1) === '/'
        ) {
            event.target.selectionStart = cursorPosition - 1;
            event.target.selectionEnd = cursorPosition - 1;
        }

        if (
            key === 'Delete' &&
            event.target.value.charAt(cursorPosition) === '/'
        ) {
            event.target.selectionStart = cursorPosition + 1;
            event.target.selectionEnd = cursorPosition + 1;
        }
    };

    /**
     * this event handler checks the user's input for validity once they move focus away from the input component
     * it displays the relevant formatting/input errors based on their input.
     * @param {*} event onBlur event
     * @returns
     */
    const validateInput = event => {
        const contextToError = getContextToError(event.target.value);

        const {
            afterMin,
            betweenMinMax,
            empty,
            invalid,
            notEligible,
            required,
        } = contextToError;

        //no input after removing focus on required

        if (event.target.value.length === 0) {
            if (props.required) {
                setState({
                    ...state,
                    error: required.errorMessage,
                });
                setErrorContext(required.context);
            } else {
                setState({ ...state, error: empty.errorMessage });
                setErrorContext(empty.context);
            }
            return;
        }

        let mdy = event.target.value.split('/'); //month day year

        if (mdy.length !== 3 || mdy[2].length !== 4) {
            setState({
                ...state,
                error: invalid.errorMessage,
            });
            setErrorContext(invalid.context);
            return;
        }

        let month = parseInt(mdy[0], 10);
        let day = parseInt(mdy[1], 10);
        let year = parseInt(mdy[2], 10);
        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (month > 12 || month < 1) {
            setState({
                ...state,
                date: '',
                error: contextToError.month.errorMessage,
            });
            setErrorContext(contextToError.month.context);
            return;
        }

        const { minDate, maxDate } = props;
        const { value } = event.target;
        if (!minDate && !maxDate) {
            validateInputOnEmptyProps(year, contextToError);
        } else {
            const isValidDate = isDateInRange(value, minDate, maxDate);
            if (!isValidDate) {
                let errorMessage = '';
                const inputAsDate = new Date(value);
                const minDateAsDate = new Date(minDate);
                const maxDateAsDate = new Date(maxDate);

                if (inputAsDate > maxDateAsDate) {
                    errorMessage = betweenMinMax.errorMessage;
                    setErrorContext(betweenMinMax.context);
                } else if (inputAsDate < minDateAsDate) {
                    errorMessage = afterMin.errorMessage;
                    setErrorContext(afterMin.context);
                }
                setState({
                    ...state,
                    date: '',
                    error: errorMessage,
                });
            }
        }

        if (isDisabled(event.target.value, props.disabledDates)) {
            setState({
                ...state,
                date: '',
                error: notEligible.errorMessage,
            });
            setErrorContext(notEligible.context);
            return;
        }

        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        }
        if (day < 1 || day > monthLength[month - 1]) {
            setState({
                ...state,
                error: contextToError.day.errorMessage,
                date: '',
            });
            setErrorContext(contextToError.day.context);
        }
        handleDateFieldChange(event.target.value);
    };

    const validateInputOnEmptyProps = (year, contextToError) => {
        const { after, between } = contextToError;
        if (year < 1900) {
            setState({
                ...state,
                date: '',
                error: after.errorMessage,
            });
            setErrorContext(after.context);
            return;
        } else if (year >= 3000) {
            setState({
                ...state,
                date: '',
                error: between.errorMessage,
            });
            setErrorContext(between.context);
            return;
        }
    };

    /**
     * this function toggles either the popup or the popout calendar pickers based on what kind of display the user is using.
     */
    const toggleCalendarPicker = () => {
        if (window.innerWidth <= 767) {
            setState({ ...state, popUpOpen: !state.popUpOpen });
        } else {
            setState({ ...state, popOutOpen: !state.popOutOpen });
        }
    };

    /**
     * this function resets the error state of this component to empty
     */
    const resetError = () => {
        setState({ ...state, error: null });
    };

    /**
     * this function sets the input's value to be what the calendar picker's output is, as well as the state and error
     * @param {*} date
     */
    const handleCalendarOutput = date => {
        if (inputRef && inputRef.current) {
            inputRef.current.value = date;

            setState({
                ...state,
                popUpOpen: false,
                popOutOpen: false,
                date: date,
                error: null,
            });
        }
        handleDateFieldChange(date);
    };

    const calendarPicker = (
        <CalendarPicker
            onClose={handleCalendarOutput}
            currentDate={state.date ? state.date : props.scheduledDate}
            disabledDates={props.disabledDates}
            disableWeekendsAndHolidays={props.disableWeekendsAndHolidays}
            minDate={props.minDate}
            maxDate={props.maxDate}
            months={months}
            daysOfTheWeekAbbreviated={abbreviated}
            daysOfTheWeekFull={full}
        />
    );

    /**
     * this custom hook listens for a user to click outside of the calendar popout, and treats it as a "close action"
     * @param {*} ref reference to the component we are tracking an outside click of
     */
    const useOutsideClick = ref => {
        useEffect(() => {
            const handleClickOutside = event => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setState({ ...state, popOutOpen: false });
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    };

    const desktopCalendarContainerRef = useRef(null);
    useOutsideClick(desktopCalendarContainerRef);

    return (
        <>
            <div key={props.scheduledDate}>
                {props.label && (
                    <label className='DateField__label'>
                        {props.label}
                        {props.required && (
                            <span className='DateField__required'>*</span>
                        )}
                    </label>
                )}
                <div className='DateField__hint'>{dateFormat}</div>
                <input
                    id={props.id}
                    data-testid='dateFieldInput'
                    className='DateField__input'
                    required={props.required}
                    style={state.error ? { border: '1px solid #D11242' } : null}
                    size={12}
                    maxLength={10}
                    pattern='[0-9]{2}/[0-9]{2}/[0-9]{4}'
                    inputMode='numeric'
                    onKeyUp={handleInput}
                    defaultValue={props.scheduledDate}
                    onKeyDown={handleBackspace}
                    onBlur={validateInput}
                    onFocus={props.clearError ? resetError : undefined}
                    ref={inputRef}></input>
                <button
                    className='DateField__calendarButton'
                    onClick={toggleCalendarPicker}>
                    <CalendarIcon></CalendarIcon>
                </button>
                {state.popOutOpen && (
                    <div ref={desktopCalendarContainerRef}>
                        <DesktopCalendarContainer
                            content={calendarPicker}></DesktopCalendarContainer>
                    </div>
                )}
                {state.error && (
                    <div
                        data-testid='dateFieldError'
                        className='DateField__error'>
                        {state.error}
                    </div>
                )}
                {state.popUpOpen && (
                    <PopUp
                        content={calendarPicker}
                        handleClose={toggleCalendarPicker}></PopUp>
                )}
            </div>
        </>
    );
});

DateField.propTypes = {
    /**@prop {bool} required - whether input is required or not */
    required: PropTypes.bool,

    /**@prop {bool} disabled - whether input is disabled or not */
    disabled: PropTypes.bool,

    /**@prop {string} label - label for input */
    label: PropTypes.string,

    /**@prop {string} placeholder - placeholder text inside input */
    placeholder: PropTypes.string,

    /**@prop {string} id - id for element */
    id: PropTypes.string,

    //we're going with 'mm/dd/yyyy for both
    /**@prop {array} disabledDates */
    disabledDates: PropTypes.arrayOf(PropTypes.string),

    /**@prop {string} maxDate - "MM/DD/YYYY"*/
    maxDate: PropTypes.string,

    /**@prop {string} minDate - "MM/DD/YYYY"*/
    minDate: PropTypes.string,

    /**@prop {string} scheduledDate - 'MM/DD/YYYY' */
    scheduledDate: PropTypes.string,

    /**@prop {function} handleDateFieldChange - parent function that processes a date change. */
    handleDateFieldChange: PropTypes.func,

    /**@prop {Object} dateFieldConfiguration - configuration leveraged to display date content and forward calendar configuration. */
    dateFieldConfiguration: PropTypes.shape({
        dateFormat: PropTypes.string,
        calendarConfiguration: PropTypes.shape({
            months: PropTypes.arrayOf(PropTypes.string),
            daysOfTheWeek: PropTypes.shape({
                abbreviated: PropTypes.arrayOf(PropTypes.string),
                full: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
    }),

    /**@prop {function} getContextToError - parent function that retrieves a look-up for an error context to its appropriate content. */
    getContextToError: PropTypes.func,

    /**@prop {function} setErrorContext - parent function that sets a specific error context that is handled through validation. */
    setErrorContext: PropTypes.func,
};

const DISABLED_DAYS_START_NUM = 365;

export const holidayDatesList = (date = new Date()) => {
    const options = { shiftSaturdayHolidays: true, shiftSundayHolidays: true };

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - DISABLED_DAYS_START_NUM);

    const holidays = inRange(startDate, date, options);

    return holidays.map(v =>
        v.dateString.replace(
            /(\d{4})-(\d{1,2})-(\d{1,2})/,
            (match, y, m, d) => m + '/' + d + '/' + y
        )
    );
};

DateField.defaultProps = {
    required: false,
    disabled: false,
    label: null,
    placeholder: 'MM/DD/YYYY',
    id: null,
    disabledDates: holidayDatesList(new Date()),
    clearError: true,
    scheduledDate: '',
    dateFieldConfiguration: {
        dateFormat: 'MM/DD/YYYY',
        calendarConfiguration: {
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
                'January',
            ],
            daysOfTheWeek: {
                abbreviated: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                full: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ],
            },
        },
    },
    getContextToError: () => {},
    setErrorContext: () => {},
};

export default DateField;
