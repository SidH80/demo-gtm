import 'babel-polyfill';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DateField from './DateField';
import { holidayDatesList } from './DateField';

const mockId = 'datePickerId';
const mockTestId = 'dateFieldInput';
const mockDateFieldErrorId = 'dateFieldError';

const mockMonths = [
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
];
const mockAbbreviatedDaysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const mockFullDaysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const mockDateFormat = 'MM/DD/YYYY';

const mockDateFieldConfiguration = {
    dateFormat: mockDateFormat,
    calendarConfiguration: {
        months: mockMonths,
        daysOfTheWeek: {
            abbreviated: mockAbbreviatedDaysOfTheWeek,
            full: mockFullDaysOfTheWeek,
        },
    },
};

const mockHandleDateFieldChange = jest.fn();
const mockGetContextToError = jest.fn();
const mockSetErrorContext = jest.fn();

const mockStandardProps = {
    id: mockId,
    dateFieldConfiguration: mockDateFieldConfiguration,
    handleDateFieldChange: mockHandleDateFieldChange,
    getContextToError: mockGetContextToError,
    setErrorContext: mockSetErrorContext,
    minDate: '12/02/2000',
    maxDate: '12/25/2000',
};

const genericContextToError = {
    required: '',
    invalid: '',
    month: '',
    betweenMinMax: '',
    afterMin: '',
    notEligible: '',
    day: '',
    after: '',
    between: '',
};

const updateErrorContext = (id, properties) => {
    return {
        ...genericContextToError,
        [id]: properties,
    };
};

const MockStandardDateFieldComponent = () => (
    <DateField {...mockStandardProps} />
);

const MockDateFieldComponentEmpty = () => <DateField />;

const MockDateFieldComponent = props => <DateField {...props} />;

describe('DateField', () => {
    const standardDateFormat = 'MM/DD/YYYY';
    describe('Empty Props', () => {
        test('should render empty props component.', () => {
            render(MockDateFieldComponentEmpty());
            expect(screen.getByText(standardDateFormat)).toBeInTheDocument();
        });
    });
    describe('Standard Input Events', () => {
        test('should render component.', () => {
            render(MockStandardDateFieldComponent());

            expect(screen.getByText(standardDateFormat)).toBeInTheDocument();
        });

        test('should format M [month] as MM/.', () => {
            render(MockStandardDateFieldComponent());
            const dateFieldInput = screen.getByTestId(mockTestId);
            userEvent.type(dateFieldInput, '2');

            expect(dateFieldInput.value).toBe('02/');
        });

        test('should format MM/D [month/day] as MM/DD/.', () => {
            render(MockStandardDateFieldComponent());
            const dateFieldInput = screen.getByTestId(mockTestId);
            userEvent.type(dateFieldInput, '02/4');

            expect(dateFieldInput.value).toBe('02/04/');
        });
    });

    describe('Error Validation [with minDate and maxDate props]', () => {
        test('should render Scheduled Payment Date is required for an empty input and required error type with the configuration of {context: required, errorMessage: Scheduled Payment Date is required.', async () => {
            const mockRequiredErrorType = 'required';
            const mockRequiredErrorMessage =
                'Scheduled Payment Date is required.';

            const mockContextToError = updateErrorContext(
                mockRequiredErrorType,
                {
                    context: mockRequiredErrorType,
                    errorMessage: mockRequiredErrorMessage,
                }
            );
            const mockProps = {
                ...mockStandardProps,
                required: true,
                label: 'Scheduled Payment Date',
                getContextToError: jest
                    .fn()
                    .mockReturnValueOnce(mockContextToError),
            };
            render(MockDateFieldComponent(mockProps));
            const dateFieldInput = screen.getByTestId(mockTestId);
            fireEvent.focus(dateFieldInput);
            userEvent.type(dateFieldInput, '');
            fireEvent.blur(dateFieldInput);

            await waitFor(() => {
                const dateFieldError = screen.getByTestId(mockDateFieldErrorId);

                expect(dateFieldError.textContent).toBe(
                    'Scheduled Payment Date is required.'
                );
            });
        });
        test.each`
            errorType          | input           | configuration                                                                                           | expectedErrorMessage
            ${'empty'}         | ${' '}          | ${{ context: 'empty', errorMessage: 'Error: Please enter a date.' }}                                    | ${'Error: Please enter a date.'}
            ${'invalid'}       | ${'01/20'}      | ${{ context: 'invalid', errorMessage: 'Error: 01/20 is not a valid date.' }}                            | ${'Error: 01/20 is not a valid date.'}
            ${'betweenMinMax'} | ${'12/25/2001'} | ${{ context: 'betweenMinMax', errorMessage: 'Error: Date must be between 12/02/2000 and 12/25/2000.' }} | ${'Error: Date must be between 12/02/2000 and 12/25/2000.'}
            ${'afterMin'}      | ${'12/01/2000'} | ${{ context: 'afterMin', errorMessage: 'Error: Date must be after 12/02/2000.' }}                       | ${'Error: Date must be after 12/02/2000.'}
            ${'notEligible'}   | ${'12/16/2000'} | ${{ context: 'notEligible', errorMessage: 'Error: 12/16/2000 is not a schedulable date.' }}             | ${'Error: 12/16/2000 is not a schedulable date.'}
            ${'day'}           | ${'12/34/2000'} | ${{ context: 'day', errorMessage: 'Error: 34 is not a valid day in December.' }}                        | ${'Error: 34 is not a valid day in December.'}
        `(
            'should render $expectedErrorMessage for an input of $input and $errorType error type with the configuration of $configuration.',
            async ({
                expectedErrorMessage,
                input,
                errorType,
                configuration,
            }) => {
                const mockContextToError = updateErrorContext(
                    errorType,
                    configuration
                );
                const mockProps = {
                    ...mockStandardProps,
                    getContextToError: jest
                        .fn()
                        .mockReturnValueOnce(mockContextToError),
                };
                render(MockDateFieldComponent(mockProps));
                const dateFieldInput = screen.getByTestId(mockTestId);
                fireEvent.focus(dateFieldInput);
                userEvent.type(dateFieldInput, input);
                fireEvent.blur(dateFieldInput);

                await waitFor(() => {
                    const dateFieldError = screen.getByTestId(
                        mockDateFieldErrorId
                    );

                    expect(dateFieldError.textContent).toBe(
                        expectedErrorMessage
                    );
                });
            }
        );
    });

    describe('Error Validation [without minDate and maxDate props]', () => {
        test.each`
            errorType    | input           | configuration                                                                                  | expectedErrorMessage
            ${'after'}   | ${'12/04/1776'} | ${{ context: 'after', errorMessage: 'Error: Date must be after 01/01/1900.' }}                 | ${'Error: Date must be after 01/01/1900.'}
            ${'between'} | ${'01/20/3001'} | ${{ context: 'between', errorMessage: 'Error: Date must between 01/01/1900 and 01/01/3000.' }} | ${'Error: Date must between 01/01/1900 and 01/01/3000.'}
        `(
            'should render $expectedErrorMessage for an input of $input and $errorType error type with the configuration of $configuration.',
            async ({
                expectedErrorMessage,
                input,
                errorType,
                configuration,
            }) => {
                const mockContextToError = updateErrorContext(
                    errorType,
                    configuration
                );
                const mockProps = {
                    ...mockStandardProps,
                    getContextToError: jest
                        .fn()
                        .mockReturnValueOnce(mockContextToError),
                };
                delete mockProps.minDate;
                delete mockProps.maxDate;

                render(MockDateFieldComponent(mockProps));
                const dateFieldInput = screen.getByTestId(mockTestId);
                fireEvent.focus(dateFieldInput);
                userEvent.type(dateFieldInput, input);
                fireEvent.blur(dateFieldInput);

                await waitFor(() => {
                    const dateFieldError = screen.getByTestId(
                        mockDateFieldErrorId
                    );

                    expect(dateFieldError.textContent).toBe(
                        expectedErrorMessage
                    );
                });
            }
        );
    });

    describe('CalendarPicker Integration', () => {
        const mockCalendarId = 'calendarPicker';

        test('should display component.', async () => {
            render(MockStandardDateFieldComponent());
            const calendarButton = screen.getByRole('button');
            userEvent.click(calendarButton);
            await waitFor(() => {
                expect(screen.queryByTestId(mockCalendarId)).not.toBeNull();
            });
        });
    });

    describe('Federal holidays List', () => {
        test('verify new method holidayDatesList is functioning.', async () => {
            const mockHolidays = [
                '10/10/2022',
                '11/11/2022',
                '11/24/2022',
                '12/26/2022',
                '01/02/2023',
                '01/16/2023',
                '02/20/2023',
                '05/29/2023',
                '06/19/2023',
                '07/04/2023',
                '09/04/2023',
            ];
            const fedHolidays = holidayDatesList(new Date('09/12/2023'));
            expect(fedHolidays).toEqual(mockHolidays);
        });
    });
});
