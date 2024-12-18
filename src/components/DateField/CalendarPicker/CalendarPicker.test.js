import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import CalendarPicker from './CalendarPicker';

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
];

describe('<CalendarPicker />', () => {
    const MockComponent = props => {
        return <CalendarPicker onClose={jest.fn()} {...props} />;
    };
    describe('On render', () => {
        describe('Without props - "current" month (January); year (2023)', () => {
            const mockDaysInJanuary = Array.from(
                { length: 31 },
                (_, i) => i + 1
            );

            beforeAll(() => {
                jest.useFakeTimers('modern');
                jest.setSystemTime(new Date('01/01/2023'));
            });

            afterAll(() => {
                jest.useRealTimers();
            });

            test('displays month and year header.', () => {
                render(MockComponent());
                expect(
                    screen.getByRole('heading', {
                        level: 4,
                        name: 'January 2023',
                    })
                ).toBeInTheDocument();
            });
            test.each([
                'Previous month December 2022',
                'Next month February 2023',
            ])('displays "%s" selection button.', monthSelectionButtonName => {
                render(MockComponent({ months: mockMonths }));
                expect(
                    screen.getByRole('button', {
                        name: monthSelectionButtonName,
                    })
                ).toBeInTheDocument();
            });
            test.each(mockDaysInJanuary)(
                'displays each day "January (%s)" of the month as a button.',
                dayOfMonthName => {
                    render(MockComponent());
                    expect(
                        screen.getByRole('button', {
                            name: `January ${dayOfMonthName}`,
                        })
                    ).toBeInTheDocument();
                }
            );

            describe('Focus', () => {
                test('focus is applied to month and year header.', () => {
                    render(MockComponent());
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'January 2023',
                        })
                    ).toHaveFocus();
                });
                test('focus is applied to month and year header on previous month selection.', () => {
                    render(MockComponent({ months: mockMonths }));
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Previous month December 2022',
                        })
                    );
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'December 2022',
                        })
                    ).toHaveFocus();
                });
                test('focus is applied to month and year header on next month selection.', () => {
                    render(MockComponent({ months: mockMonths }));
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Next month February 2023',
                        })
                    );
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'February 2023',
                        })
                    ).toHaveFocus();
                });
            });

            describe('Validation for currentDate.', () => {
                const MockValidationComponent = currentDate => {
                    return (
                        <CalendarPicker
                            onClose={jest.fn()}
                            currentDate={currentDate}
                        />
                    );
                };
                test.each([
                    '01/03',
                    '13/14/2022',
                    '01/01/1800',
                    '01/01/3001',
                    '01/00/2022',
                    '01/40/2022',
                ])(
                    'displays default date of "January 2023" for malformed date ("%s").',
                    malformedDate => {
                        render(MockValidationComponent(malformedDate));
                        expect(
                            screen.getByRole('heading', {
                                level: 4,
                                name: 'January 2023',
                            })
                        ).toBeInTheDocument();
                    }
                );
                test('displays default date of "January 2023" for a "current" date outside of the defined range (January 1, 2023 - February 1, 2023).', () => {
                    render(
                        <CalendarPicker
                            onClose={jest.fn()}
                            minDate={'01/01/2023'}
                            maxDate={'02/01/2023'}
                            currentDate={'02/04/2023'}
                        />
                    );
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'January 2023',
                        })
                    ).toBeInTheDocument();
                });
                test('displays month and year header for a leap year.', () => {
                    render(MockValidationComponent('02/01/2024'));
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'February 2024',
                        })
                    ).toBeInTheDocument();
                });
            });

            describe('Unmount', () => {
                const mockOnClose = jest.fn();
                const MockUnmountComponent = props => {
                    return <CalendarPicker onClose={mockOnClose} {...props} />;
                };
                test('calls onClose callback on manual tear down.', () => {
                    const { unmount } = render(MockUnmountComponent());
                    unmount();
                    expect(mockOnClose).toHaveBeenCalled();
                });
                test('calls onClose callback on date selection.', () => {
                    render(MockUnmountComponent());
                    userEvent.click(
                        screen.getByRole('button', { name: 'January 4' })
                    );
                    expect(mockOnClose).toHaveBeenCalled();
                });
                test('calls onClose callback on date selection being the "current" day.', () => {
                    render(MockUnmountComponent({ currentDate: '01/04/2023' }));
                    userEvent.click(
                        screen.getByRole('button', { name: 'January 4' })
                    );
                    expect(mockOnClose).toHaveBeenCalled();
                });
                test('calls onClose callback on date selection with resetToToday flag set to false.', () => {
                    render(MockUnmountComponent({ resetToToday: false }));
                    userEvent.click(
                        screen.getByRole('button', { name: 'January 4' })
                    );
                    expect(mockOnClose).toHaveBeenCalled();
                });
            });
        });

        describe('With props', () => {
            describe('Disabled', () => {
                const MockDisabledBasedComponent = props => {
                    return <CalendarPicker onClose={jest.fn()} {...props} />;
                };
                test.each([6, 7, 13, 14, 20, 21, 27, 28])(
                    'disables each weekend day (%s) of January 2024.',
                    weekendDay => {
                        render(
                            MockDisabledBasedComponent({
                                minDate: '01/01/2024',
                            })
                        );
                        expect(
                            screen.getByRole('button', {
                                name: `January ${weekendDay}`,
                            })
                        ).toBeDisabled();
                    }
                );
                test.each([3, 4])(
                    'disables (%s) of January 2024 that is represented in the disabledDates prop.',
                    weekendDay => {
                        render(
                            MockDisabledBasedComponent({
                                disabledDates: ['01/03/2024', '01/04/2024'],
                                months: mockMonths,
                                minDate: '01/01/2024',
                            })
                        );
                        expect(
                            screen.getByRole('button', {
                                name: `January ${weekendDay}`,
                            })
                        ).toBeDisabled();
                    }
                );
                test('disables previous month selection (December 2022) for a "current" date of February 2023 and a minDate of January 2023.', () => {
                    render(
                        MockDisabledBasedComponent({
                            minDate: '01/01/2023',
                            months: mockMonths,
                            currentDate: '02/01/2023',
                        })
                    );
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Previous month January 2023',
                        })
                    );
                    expect(
                        screen.getByRole('button', {
                            name: 'Previous month December 2022',
                        })
                    ).toBeDisabled();
                });
                test('disables next month selection (December 2022) for a "current" date of September 2022 and a maxDate of November 2022.', () => {
                    render(
                        MockDisabledBasedComponent({
                            maxDate: '11/01/2022',
                            months: mockMonths,
                            currentDate: '09/01/2022',
                        })
                    );
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Next month October 2022',
                        })
                    );
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Next month November 2022',
                        })
                    );
                    expect(
                        screen.getByRole('button', {
                            name: 'Next month December 2022',
                        })
                    ).toBeDisabled();
                });
            });

            describe('Not disabled', () => {
                const MockNonDisabledBasedComponent = props => {
                    return (
                        <CalendarPicker
                            onClose={jest.fn()}
                            {...props}
                            disableWeekendsAndHolidays={false}
                        />
                    );
                };
                test.each([6, 7, 13, 14, 20, 21, 27, 28])(
                    'does not disable each weekend day (%s) of January 2024.',
                    weekendDay => {
                        render(
                            MockNonDisabledBasedComponent({
                                minDate: '01/01/2024',
                            })
                        );
                        expect(
                            screen.getByRole('button', {
                                name: `January ${weekendDay}`,
                            })
                        ).not.toBeDisabled();
                    }
                );
                test.each([3, 4])(
                    'does not disable (%s) of January 2024 that is represented in the disabledDates prop.',
                    weekendDay => {
                        render(
                            MockNonDisabledBasedComponent({
                                disabledDates: ['01/03/2024', '01/04/2024'],
                                months: mockMonths,
                                minDate: '01/01/2024',
                            })
                        );
                        expect(
                            screen.getByRole('button', {
                                name: `January ${weekendDay}`,
                            })
                        ).not.toBeDisabled();
                    }
                );
                test('resets the month to January when current month is December and the next month is selected.', () => {
                    render(
                        MockNonDisabledBasedComponent({
                            minDate: '12/01/2022',
                            months: mockMonths,
                        })
                    );
                    userEvent.click(
                        screen.getByRole('button', {
                            name: 'Next month January 2023',
                        })
                    );
                    expect(
                        screen.getByRole('heading', {
                            level: 4,
                            name: 'January 2023',
                        })
                    ).toBeInTheDocument();
                });
            });
        });
    });
});
