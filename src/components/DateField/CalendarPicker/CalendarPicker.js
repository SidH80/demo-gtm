import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './CalendarPicker.css';
import PropTypes from 'prop-types';
import CalendarLeft from '../Icons/CalendarLeft';
import CalendarRight from '../Icons/CalendarRight';
import { createMonthMapping, dateFormat } from '../../../helpers/dateService';
import {
    isDateInRange,
    compareYearMonthDates,
    isDisabled,
} from '../../../helpers/calendarService';

/**
 * this function component is the calendar picker component
 * it calls the onClose function with the selected date as the parameter.
 * it also uses a current date prop which determines if a different date is active based on the DateField
 * @param {*} props takes in onClose and currentDate
 * @returns jsx for a calendar picker component
 */
const CalendarPicker = props => {
    const {
        months,
        daysOfTheWeekFull,
        daysOfTheWeekAbbreviated,
        prefix,
        suffix,
        resetToToday,
        disableWeekendsAndHolidays,
    } = props;

    const today = props.minDate ? new Date(props.minDate) : new Date();
    const headingRef = useRef(null);

    //functions
    const formatDate = (month, day, year) => {
        let monthString = (++month).toString();
        let dayString = day.toString();

        if (monthString.length < 2) monthString = '0' + monthString;
        if (dayString.length < 2) dayString = '0' + dayString;

        return monthString + '/' + dayString + '/' + year;
    };

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    };

    /**
     * this function returns an object formatted how we want a day to be displayed within a calendar grid.
     * @param {*} args
     * @returns an object containing day details, an active state, and soon a disabled state
     */
    const getDayDetails = args => {
        let date = args.index - args.firstDay;
        let day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date =
            (date < 0
                ? prevMonthNumberOfDays + date
                : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();

        const monthMapping = createMonthMapping(args.month);
        const nonZeroBasedIndexTimestamp = new Date(
            args.year,
            monthMapping[month] - 1,
            _date
        ).toLocaleString('en-US', dateFormat);
        const { minDate, maxDate } = props;
        const isDayDisabled = !isDateInRange(
            nonZeroBasedIndexTimestamp,
            minDate,
            maxDate
        );

        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: daysOfTheWeekFull[day],
            active: date === state.day - 1 && args.month === state.month,
            disabled: disableWeekendsAndHolidays
                ? isDayDisabled ||
                  isDisabled(
                      args.month + 1 + '/' + _date + '/' + args.year,
                      props.disabledDates
                  )
                : isDayDisabled,
        };
    };

    /**
     * this function returns an array of days by doing calculations based on the input month and year.
     * @param {number} year
     * @param {number} month
     * @returns an array of days (as seen in getDayDetails above)
     */
    const getMonthDetails = (year, month) => {
        let firstDay = new Date(year, month).getDay();
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month,
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    };

    /**
     * this function slices an array into evenly sized chunks based on the chunkSize passed in
     * @param {[]} arr
     * @param {number} chunkSize
     * @returns a 2d array with evenly sized chunks
     */
    const sliceIntoChunks = (arr, chunkSize) => {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    };

    /**
     * this function handles a click on the advance or back button on the calendar.
     * it also handles if the year advances or decrements.
     * @param {number} offset
     */
    const handleMonthClick = offset => {
        let curMonth = state.month + offset;
        let curYear = state.year;

        if (curMonth === -1) {
            curMonth = 11;
            --curYear;
        } else if (curMonth === 12) {
            curMonth = 0;
            ++curYear;
        }

        const { minDate, maxDate } = props;

        setState({
            ...state,
            month: curMonth,
            year: curYear,
            calendarGrid: getMonthDetails(curYear, curMonth),
            disablePreviousMonth: compareYearMonthDates(
                { curYear, curMonth },
                minDate,
                true
            ),
            disableNextMonth: compareYearMonthDates(
                { curYear, curMonth },
                maxDate,
                false
            ),
        });
        focusTitle();
    };

    /**
     * this function determines what the onclick of a calendar date should be.
     * this is needed to handle 3 cases: a disabled date, a click of a current date, and a click of today while there is no current date prop
     * @param {*} weekDay
     * @returns null or an onclick function
     */
    const determineDateOnClick = weekDay => {
        if (weekDay.disabled) {
            return null;
        } else if (
            (props?.currentDate?.length > 0 &&
                new Date(props?.currentDate).getDate() === weekDay.date) ||
            (!props.currentDate && today.getDate() === weekDay.date)
        ) {
            return () => {
                props.onClose(formatDate(state.month, state.day, state.year));
            };
        } else {
            return () => {
                setState({
                    ...state,
                    day: weekDay.date,
                });
                if (!resetToToday) {
                    props.onClose(
                        formatDate(state.month, weekDay.date, state.year)
                    );
                }
            };
        }
    };

    /**
     * this function renders our calendar grid tbody.
     * each week is put into a tr, and each day is put into a td
     * there is a conditional where if the day is not part of a current month, it renders an empty td
     * @param {day[][]} days 2d array of days output by the sliceIntoChunks function
     * @returns
     */
    const renderCalendarGrid = days => {
        if (!days) return null;

        const weeks = days ? sliceIntoChunks(days, 7) : null;

        return (
            <tbody>
                {weeks.map((week, i) => {
                    if (week[0].month === 1) {
                        return null;
                    }

                    return (
                        <tr key={i}>
                            {week.map(weekDay => {
                                return weekDay.month === 0 ? (
                                    <td
                                        className='CalendarPicker__dayTd'
                                        key={weekDay.timestamp}>
                                        <button
                                            aria-label={`${
                                                months[state.month]
                                            } ${weekDay.date}`}
                                            disabled={weekDay.disabled}
                                            onClick={determineDateOnClick(
                                                weekDay
                                            )}
                                            className={
                                                'CalendarPicker__dayButton ' +
                                                (weekDay.active &&
                                                !weekDay.disabled
                                                    ? 'active'
                                                    : '') +
                                                (weekDay.disabled
                                                    ? 'disabled'
                                                    : '')
                                            }>
                                            {weekDay.date}
                                        </button>
                                    </td>
                                ) : (
                                    <td key={weekDay.timestamp}></td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    /**
     * this function performs similar date validation to the DateField component,
     * but is simpler because it only returns booleans rather than an entire error message
     * @returns boolean whether the currentDate prop is valid
     */
    const validateCurrentDateProp = () => {
        if (!props.currentDate) {
            return false;
        }

        let mdy = props.currentDate.split('/'); //month day year

        if (mdy.length !== 3 || mdy[2].length !== 4) {
            return false;
        }

        let month = parseInt(mdy[0], 10);
        let day = parseInt(mdy[1], 10);
        let year = parseInt(mdy[2], 10);
        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        if (month > 12 || month < 1) {
            return false;
        } else if (year < 1900) {
            return false;
        } else if (year >= 3000) {
            return false;
        }

        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        }
        if (day < 1 || day > monthLength[month - 1]) {
            return false;
        }

        if (!isDateInRange(props.currentDate, props.minDate, props.maxDate)) {
            return false;
        }

        return true;
    };

    //state
    const [state, setState] = useState({
        month: validateCurrentDateProp()
            ? parseInt(props.currentDate.split('/')[0], 10) - 1
            : today.getMonth(),
        day: validateCurrentDateProp()
            ? parseInt(props.currentDate.split('/')[1], 10)
            : today.getDate(),
        year: validateCurrentDateProp()
            ? parseInt(props.currentDate.split('/')[2], 10)
            : today.getFullYear(),
        calendarGrid: null,
        disablePreviousMonth: false,
        disableNextMonth: false,
    });

    //effects
    useEffect(() => {
        setState({
            ...state,
            calendarGrid: getMonthDetails(state.year, state.month),
        });

        return () => {
            const { month, day, year } = state;
            const formattedDate = formatDate(month, day, year);

            if (resetToToday) {
                props.onClose(formattedDate);
            }
        };
    }, [state.day]);

    useEffect(() => {
        if (state.calendarGrid) {
            const { year, month } = state;
            const { minDate, maxDate } = props;
            setState({
                ...state,
                disablePreviousMonth: compareYearMonthDates(
                    { curYear: year, curMonth: month },
                    minDate,
                    true
                ),
                disableNextMonth: compareYearMonthDates(
                    { curYear: year, curMonth: month },
                    maxDate,
                    false
                ),
            });
        }
    }, [state.calendarGrid]);

    useLayoutEffect(() => {
        focusTitle();
    }, []);

    /**
     * @description Bringing focus to the title of the CalendarPicker.
     * The title is defined as the <Month Year> (i.e., December 2023).
     * Focus will be triggered on mount and both next and previous month clicks.
     */
    const focusTitle = () => {
        headingRef.current.focus();
    };

    /**
     * @description Returns the aria-label for the preceding month for a set date.
     * A preceding month should read as 'Previous month <month> <year>' for screen readers.
     * If the month is January, reset the idex to the last entry (December).
     * Additionally, set the year to the previous year.
     * @returns {string}
     */
    const getPrecedingMonthLabel = () => {
        return `${prefix} ${
            state.month === 0
                ? months[months.length - 1]
                : months[state.month - 1]
        } ${state.month === 0 ? state.year - 1 : state.year}`;
    };

    /**
     * @description Returns the aria-label for the next month for a set date.
     * The next month should read as 'Next month <month> <year>' for screen readers.
     * If the month is December, reset the idex to the first entry (January).
     * Additionally, set the year to the next year.
     * @returns {string}
     */
    const getNextMonthLabel = () => {
        return `${suffix} ${
            state.month === months.length - 1
                ? months[0]
                : months[state.month + 1]
        } ${state.month === months.length - 1 ? state.year + 1 : state.year}`;
    };

    return (
        <div className='CalendarPicker__main' data-testid='calendarPicker'>
            <div className='CalendarPicker__title'>
                <button
                    aria-label={getPrecedingMonthLabel()}
                    className={
                        'CalendarPicker__monthSelectorButton left ' +
                        (state.disablePreviousMonth ? 'disabled' : '')
                    }
                    disabled={state.disablePreviousMonth}
                    onClick={() => handleMonthClick(-1)}>
                    <CalendarLeft />
                </button>
                <h4
                    className='CalendarPicker__h1'
                    ref={headingRef}
                    tabIndex={0}>
                    {months[state.month] + ' ' + state.year}
                </h4>
                <button
                    aria-label={getNextMonthLabel()}
                    className={
                        'CalendarPicker__monthSelectorButton right ' +
                        (state.disableNextMonth ? 'disabled' : '')
                    }
                    disabled={state.disableNextMonth}
                    onClick={() => handleMonthClick(1)}>
                    <CalendarRight />
                </button>
            </div>
            <table className='CalendarPicker__table'>
                <thead>
                    <tr role='presentation'>
                        {daysOfTheWeekAbbreviated.map((dayOfWeek, i) => {
                            return (
                                <th
                                    className='CalendarPicker__th'
                                    key={'day' + i}>
                                    <span>{dayOfWeek}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                {renderCalendarGrid(state.calendarGrid)}
            </table>
        </div>
    );
};

CalendarPicker.propTypes = {
    /**@prop {callback} onClose - function to be called by calendar picker to handle date output */
    onClose: PropTypes.func,

    /**@prop {string} currentDate - current date to be passed in so that the calendar knows which date to highlight */
    currentDate: PropTypes.string,

    //we're going with 'mm/dd/yyyy for both
    /**@prop {array} disabledDates */
    disabledDates: PropTypes.arrayOf(PropTypes.string),

    /**@prop {string} maxDate - "MM/DD/YYYY"*/
    maxDate: PropTypes.string,

    /**@prop {string} minDate - "MM/DD/YYYY"*/
    minDate: PropTypes.string,

    /**@prop {array} months - A collection of months for rendering a standard calendar. */
    months: PropTypes.arrayOf(PropTypes.string),

    /**@prop {array} daysOfTheWeekAbbreviated - A collection of abbreviated days of the week (i.e. Saturday -> S) for rendering a standard calendar. */
    daysOfTheWeekAbbreviated: PropTypes.arrayOf(PropTypes.string),

    /**@prop {array} daysOfTheWeekFull - A collection of full days of the week (i.e. Saturday) for rendering a standard calendar. */
    daysOfTheWeekFull: PropTypes.arrayOf(PropTypes.string),

    /**@prop {string} prefix - The prefix for the previous month. */
    prefix: PropTypes.string,

    /**@prop {boolean} resetToToday - The flag to determine if a non-selected date should default to today. */
    resetToToday: PropTypes.bool,

    /**@prop {string} suffix - The suffix for the next month. */
    suffix: PropTypes.string,

    /**@prop {boolean} disableWeekendsAndHolidays - The flag to determine if weekends and holidays are prohibited from being selected. */
    disableWeekendsAndHolidays: PropTypes.bool,
};

CalendarPicker.defaultProps = {
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
    prefix: 'Previous month',
    suffix: 'Next month',
    resetToToday: true,
    disableWeekendsAndHolidays: true,
};

export default CalendarPicker;
