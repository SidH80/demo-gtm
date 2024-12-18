import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import fedHolidays from '@18f/us-federal-holidays';

import DateField from './DateField2';

/**
 * @description Renders a screen with a given width.
 * For DateField, mobile view is defined by 767 pixels.
 */
const simulateScreenResize = width => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
};

describe('DateField', () => {
    const mockPropagateHolidays = jest.fn();
    const mockPropagateResetError = jest.fn();
    const mockPropagateDateSelected = jest.fn();

    const MockDateFieldComponent = (immediatePropagate = false) => {
        const mockProps = {
            calendarIconAriaLabel: 'Calendar Picker Button',
            dateFormatHint: 'MM/DD/YYYY',
            daysOfTheWeekAbbreviated: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            daysOfTheWeekFull: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            immediatePropagate: immediatePropagate,
            maskedInputRef: {
                current: null,
            },
            maxDate: '12/20/2024',
            minDate: '12/20/2023',
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
            propagateDateSelected: mockPropagateDateSelected,
            propagateHolidays: mockPropagateHolidays,
            propagateResetError: mockPropagateResetError,
        };
        return <DateField {...mockProps} />;
    };

    describe('Render', () => {
        describe('Content', () => {
            it.each([
                'date-format-hint',
                'masked-input',
                'DateField__calendarButton',
            ])(
                'should render components with appropriate className attribute.("%s").',
                className => {
                    const { container } = render(MockDateFieldComponent());
                    expect(
                        container.getElementsByClassName(className).length
                    ).toBe(1);
                }
            );

            it('should render MM/DD/YYYY hint.', () => {
                render(MockDateFieldComponent());
                expect(screen.getByText('MM/DD/YYYY')).toBeInTheDocument();
            });

            it('should render accessible label for the CalendarIcon.', () => {
                render(MockDateFieldComponent());
                expect(
                    screen.getByLabelText('Calendar Picker Button')
                ).toBeInTheDocument();
            });
        });

        describe('Federal Holidays', () => {
            it('should call inRange from the @18f/us-federal-holidays library with the arguments of [Date object - minDate, Date object - maxDate, options configuration].', () => {
                const inRangeSpy = jest.spyOn(fedHolidays, 'inRange');
                render(MockDateFieldComponent());
                expect(inRangeSpy.mock.calls).toEqual([
                    [
                        new Date('12/20/2023'),
                        new Date('12/20/2024'),
                        {
                            shiftSaturdayHolidays: true,
                            shiftSundayHolidays: true,
                        },
                    ],
                ]);
            });

            it('should call propagateHolidays prop function on resolved fetching of federal holidays.', () => {
                render(MockDateFieldComponent());
                const mockReturnedHolidays = [
                    '12/25/2023',
                    '01/01/2024',
                    '01/15/2024',
                    '02/19/2024',
                    '05/27/2024',
                    '06/19/2024',
                    '07/04/2024',
                    '09/02/2024',
                    '10/14/2024',
                    '11/11/2024',
                    '11/28/2024',
                ];
                expect(mockPropagateHolidays).toHaveBeenCalledWith(
                    mockReturnedHolidays
                );
            });
        });
    });

    describe('Toggle CalendarPicker', () => {
        describe('Render', () => {
            it.each`
                screenSize | view
                ${750}     | ${'desktop'}
                ${950}     | ${'mobile'}
            `(
                'should render CalendarPicker component on CalendarIcon click in a "$view" view.',
                async ({ screenSize }) => {
                    await waitFor(() => {
                        simulateScreenResize(screenSize);
                    });
                    const { container } = render(MockDateFieldComponent());
                    userEvent.click(screen.getByRole('button'));
                    expect(
                        container.getElementsByClassName('CalendarPicker__main')
                            .length
                    ).toBe(1);
                }
            );
        });

        it('should set date to the selected date within the CalendarPicker component.', async () => {
            render(MockDateFieldComponent());
            const maskedInput = screen.getByRole('textbox');
            userEvent.type(maskedInput, '12/20/2023');
            userEvent.click(screen.getByRole('button'));
            await waitFor(() => {
                userEvent.click(screen.getByRole('button', { name: /21/i }));
                expect(maskedInput.value).toBe('12/21/2023');
            });
        });

        it('should focus on the input field for a selected date.', async () => {
            render(MockDateFieldComponent());
            const maskedInput = screen.getByRole('textbox');
            userEvent.type(maskedInput, '12/20/2023');
            userEvent.click(screen.getByRole('button'));
            await waitFor(() => {
                userEvent.click(screen.getByRole('button', { name: /21/i }));
                expect(maskedInput).toHaveFocus();
            });
        });

        it.each`
            description                                        | input
            ${'should persist existing date (valid input).'}   | ${'12/21/2023'}
            ${'should persist existing date (invalid input).'} | ${'14/'}
        `('$description', async ({ input }) => {
            render(MockDateFieldComponent());
            const maskedInput = screen.getByRole('textbox');
            userEvent.type(maskedInput, input);
            userEvent.click(screen.getByRole('button'));
            userEvent.click(document.body);
            await waitFor(() => {
                expect(maskedInput.value).toBe(input);
            });
        });

        describe('Unmount', () => {
            it('should close the CalendarPicker component when a date is selected.', async () => {
                const { container } = render(MockDateFieldComponent());
                const maskedInput = screen.getByRole('textbox');
                userEvent.type(maskedInput, '12/20/2023');
                userEvent.click(screen.getByRole('button'));
                await waitFor(() => {
                    userEvent.click(
                        screen.getByRole('button', { name: /21/i })
                    );
                    expect(
                        container.getElementsByClassName('CalendarPicker__main')
                            .length
                    ).toBe(0);
                });
            });

            it('should close the CalendarPicker when outside click is registered.', () => {
                const { container } = render(MockDateFieldComponent());
                userEvent.click(screen.getByRole('button'));
                userEvent.click(document.body);
                expect(
                    container.getElementsByClassName('CalendarPicker__main')
                        .length
                ).toBe(0);
            });

            it('should call propagateResetError prop function when a date is selected.', () => {
                render(MockDateFieldComponent());
                userEvent.click(screen.getByRole('button'));
                userEvent.click(document.body);
                expect(mockPropagateResetError).toHaveBeenCalled();
            });

            it('should call propagateDateSelected prop function when a date is selected.', () => {
                render(MockDateFieldComponent());
                userEvent.click(screen.getByRole('button'));
                userEvent.click(document.body);
                expect(mockPropagateDateSelected).toHaveBeenCalled();
            });

            describe('Mobile', () => {
                it('should close the CalendarPicker when close icon is clicked.', async () => {
                    await waitFor(() => {
                        simulateScreenResize(750);
                    });
                    const { container } = render(MockDateFieldComponent());
                    userEvent.click(screen.getByRole('button'));
                    const [closeButton] = container.getElementsByClassName(
                        'PopUp__closeIcon'
                    );
                    userEvent.click(closeButton);
                    expect(
                        container.getElementsByClassName('CalendarPicker__main')
                            .length
                    ).toBe(0);
                });

                it.each`
                    description                                        | input
                    ${'should persist existing date (valid input).'}   | ${'12/21/2023'}
                    ${'should persist existing date (invalid input).'} | ${'14/'}
                `('$description', async ({ input }) => {
                    await waitFor(() => {
                        simulateScreenResize(750);
                    });
                    const { container } = render(MockDateFieldComponent());
                    const maskedInput = screen.getByRole('textbox');
                    userEvent.type(maskedInput, input);
                    userEvent.click(screen.getByRole('button'));
                    const [closeButton] = container.getElementsByClassName(
                        'PopUp__closeIcon'
                    );
                    userEvent.click(closeButton);
                    expect(maskedInput.value).toBe(input);
                });

                it('should persist valid date when close icon is clicked.', async () => {
                    const { container } = render(MockDateFieldComponent());
                    const maskedInput = screen.getByRole('textbox');
                    userEvent.type(maskedInput, '12/20/2023');
                    userEvent.click(screen.getByRole('button'));
                    const [closeButton] = container.getElementsByClassName(
                        'PopUp__closeIcon'
                    );
                    userEvent.click(closeButton);
                    expect(maskedInput.value).toBe('12/20/2023');
                });
            });
        });
    });

    describe('Propagate date', () => {
        it('DateField2 calls propagateDateSelected with selected value from calendar.', async () => {
            render(MockDateFieldComponent(true));
            userEvent.click(screen.getByRole('button'));
            await waitFor(() => {
                userEvent.click(screen.getByRole('button', { name: /21/i }));
                expect(mockPropagateDateSelected).toHaveBeenCalledWith(
                    '12/21/2023'
                );
            });
        });

        it('DateField2 calls propagateDateSelected with the ref value.', () => {
            render(MockDateFieldComponent());
            userEvent.click(screen.getByRole('button'));
            const maskedInput = screen.getByRole('textbox');
            userEvent.type(maskedInput, '12/20/2023');
            expect(mockPropagateDateSelected).toHaveBeenCalledWith(
                '12/20/2023'
            );
        });
    });
});
