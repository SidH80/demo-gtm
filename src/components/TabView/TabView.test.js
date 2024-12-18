import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import TabView from '.';

const component = (
    <TabView
        label='Tabs label'
        chevronLeftAriaLabel={'Left Chevron'}
        chevronRightAriaLabel={'Right Chevron'}>
        <TabView.Tab title='Tab1' onTabSelect={jest.fn()}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Tab2' onTabSelect={jest.fn()}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Tab3' onTabSelect={jest.fn()}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Tab4' onTabSelect={jest.fn()}>
            <p>Content4</p>
        </TabView.Tab>
    </TabView>
);

describe('TabView Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render', () => {
        render(component);

        expect(screen.getByText('Tab1')).toBeInTheDocument();
    });

    it('Should set active tab on load', () => {
        render(
            <TabView
                activeTabIndex={2}
                label='Tabs label'
                chevronLeftAriaLabel={'Left Chevron'}
                chevronRightAriaLabel={'Right Chevron'}>
                <TabView.Tab title='Tab1' onTabSelect={jest.fn()}>
                    <p>Content1</p>
                </TabView.Tab>
                <TabView.Tab title='Tab2' onTabSelect={jest.fn()}>
                    <p>Content2</p>
                </TabView.Tab>
                <TabView.Tab title='Tab3' onTabSelect={jest.fn()}>
                    <p>Content3</p>
                </TabView.Tab>
                <TabView.Tab title='Tab4' onTabSelect={jest.fn()}>
                    <p>Content4</p>
                </TabView.Tab>
            </TabView>
        );

        expect(
            screen
                .getByRole('listitem', { name: /Tab3/ })
                .getAttribute('aria-label')
        ).toBe('Tab3 Current');
    });

    it('Should navigate tabs', () => {
        render(component);

        const tabTwo = screen.getByTestId('tab-btn-1');
        const tabFour = screen.getByTestId('tab-btn-3');
        const tabOneLi = screen.getByRole('listitem', { name: /Tab1/ });
        const tabTwoLi = screen.getByRole('listitem', { name: /Tab2/ });
        const tabFourLi = screen.getByRole('listitem', { name: /Tab4/ });

        expect(tabOneLi.getAttribute('aria-label')).toBe('Tab1 Current');

        userEvent.click(tabTwo);

        expect(tabTwoLi.getAttribute('aria-label')).toBe('Tab2 Current');

        userEvent.click(tabFour);

        expect(tabFourLi.getAttribute('aria-label')).toBe('Tab4 Current');
    });

    it('Should allow moving tab focus with arrow keys', () => {
        const rightArrow = {
            key: 'ArrowRight',
            code: 'ArrowRight',
            keyCode: 39,
            charCode: 39,
        };

        const leftArrow = {
            key: 'ArrowLeft',
            code: 'ArrowLeft',
            keyCode: 37,
            charCode: 37,
        };

        render(
            <TabView
                label='Tabs label'
                chevronLeftAriaLabel={'Left Chevron'}
                chevronRightAriaLabel={'Right Chevron'}>
                <TabView.Tab title='Tab1' onTabSelect={jest.fn()}>
                    <p>Content1</p>
                </TabView.Tab>
                <TabView.Tab title='Tab2' onTabSelect={jest.fn()}>
                    <p>Content2</p>
                </TabView.Tab>
                <TabView.Tab title='Tab3' onTabSelect={jest.fn()}>
                    <p>Content3</p>
                </TabView.Tab>
            </TabView>
        );

        const tabOne = screen.getByRole('listitem', { name: /Tab1/ });
        const tabThree = screen.getByRole('listitem', { name: /Tab3/ });

        userEvent.tab();

        //Start on first tab
        expect(tabOne).toHaveFocus();

        // Arrow right to tab 3
        fireEvent.keyDown(tabOne, rightArrow);
        fireEvent.keyDown(tabOne, rightArrow);

        expect(tabThree).toHaveFocus();

        // Arrow right at end of tabs should wrap around
        fireEvent.keyDown(tabOne, rightArrow);

        expect(tabOne).toHaveFocus();

        // Arrow left at beginning of tabs should wrap around
        fireEvent.keyDown(tabOne, leftArrow);

        expect(tabThree).toHaveFocus();

        // Arrow left back to first tab
        fireEvent.keyDown(tabOne, leftArrow);
        fireEvent.keyDown(tabOne, leftArrow);

        expect(tabOne).toHaveFocus();
    });

    it('Should display chevrons on zoom in', async () => {
        render(component);

        expect(
            screen.queryByRole('button', { name: 'Right Chevron' })
        ).not.toBeInTheDocument();

        // resize the window
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 500,
        });
        window.dispatchEvent(new Event('resize'));

        expect(
            screen.getByRole('button', { name: 'Right Chevron' })
        ).toBeInTheDocument();
    });
});

describe('Mobile TabView Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.innerWidth = 700;
    });

    it('Should render mobile view', () => {
        render(component);

        expect(
            screen.getByRole('button', { name: 'Right Chevron' })
        ).toBeInTheDocument();
    });

    it('Should allow moving tab focus with arrow keys', () => {
        const rightArrow = {
            key: 'ArrowRight',
            code: 'ArrowRight',
            keyCode: 39,
            charCode: 39,
        };

        const leftArrow = {
            key: 'ArrowLeft',
            code: 'ArrowLeft',
            keyCode: 37,
            charCode: 37,
        };

        render(
            <TabView
                label='Tabs label'
                chevronLeftAriaLabel={'Left Chevron'}
                chevronRightAriaLabel={'Right Chevron'}>
                <TabView.Tab title='Tab1' onTabSelect={jest.fn()}>
                    <p>Content1</p>
                </TabView.Tab>
                <TabView.Tab title='Tab2' onTabSelect={jest.fn()}>
                    <p>Content2</p>
                </TabView.Tab>
                <TabView.Tab title='Tab3' onTabSelect={jest.fn()}>
                    <p>Content3</p>
                </TabView.Tab>
                <TabView.Tab title='Tab4' onTabSelect={jest.fn()}>
                    <p>Content4</p>
                </TabView.Tab>
                <TabView.Tab title='Tab5' onTabSelect={jest.fn()}>
                    <p>Content5</p>
                </TabView.Tab>
            </TabView>
        );

        const tabOne = screen.getByRole('listitem', { name: /Tab1/ });
        const tabThree = screen.getByRole('listitem', { name: /Tab3/ });

        userEvent.tab();

        // Start on first tab
        expect(tabOne).toHaveFocus();

        // Arrow right to tab 3
        fireEvent.keyDown(tabOne, rightArrow);
        fireEvent.keyDown(tabOne, rightArrow);

        expect(tabThree).toHaveFocus();

        // Arrow right at end of tabs should wrap around
        fireEvent.keyDown(tabOne, rightArrow);

        expect(tabOne).toHaveFocus();

        // Arrow left at beginning of tabs should wrap around
        fireEvent.keyDown(tabOne, leftArrow);

        expect(tabThree).toHaveFocus();

        // Arrow left back to first tab
        fireEvent.keyDown(tabOne, leftArrow);
        fireEvent.keyDown(tabOne, leftArrow);

        expect(tabOne).toHaveFocus();

        // Test when only one tab is displayed
        userEvent.click(screen.getByRole('button', { name: 'Right Chevron' }));

        userEvent.tab();

        const tabFour = screen.getByRole('listitem', { name: /Tab4/ });
        const tabFive = screen.getByRole('listitem', { name: /Tab5/ });

        expect(tabFour).toHaveFocus();

        fireEvent.keyDown(tabFour, leftArrow);
        expect(tabFive).toHaveFocus();

        fireEvent.keyDown(tabFour, rightArrow);
        expect(tabFour).toHaveFocus();
    });

    it('Should shift tabs on chevron clicks', async () => {
        render(component);

        const rightChevron = screen.getByRole('button', {
            name: 'Right Chevron',
        });

        // Left chevron should be hidden
        expect(
            screen.queryByRole('button', { name: 'Left Chevron' })
        ).not.toBeInTheDocument();

        userEvent.click(rightChevron);

        expect(
            screen.getByRole('listitem', { name: /Tab4/ })
        ).toBeInTheDocument();

        // Right chevron should be hidden
        expect(
            screen.queryByRole('button', { name: 'Right Chevron' })
        ).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('button', { name: 'Left Chevron' }));

        expect(
            screen.getByRole('listitem', { name: /Tab1/ })
        ).toBeInTheDocument();
    });

    it('Should not move selected tab if out of range on chevron click', () => {
        render(component);

        const rightChevron = screen.getByRole('button', {
            name: 'Right Chevron',
        });
        const tabOne = screen.getByRole('listitem', { name: /Tab1/ });

        userEvent.click(tabOne);
        expect(tabOne.getAttribute('aria-label')).toBe('Tab1 Current');

        userEvent.click(rightChevron);
        const tabFour = screen.getByRole('listitem', { name: /Tab4/ });
        expect(tabFour.getAttribute('aria-label')).toBe(
            'Tab4 double tap to activate'
        );

        userEvent.click(screen.getByRole('button', { name: 'Left Chevron' }));

        expect(tabOne.getAttribute('aria-label')).toBe('Tab1 Current');
    });

    it('Should remove chevrons on zoom out', async () => {
        render(component);

        expect(
            screen.getByRole('button', { name: 'Right Chevron' })
        ).toBeInTheDocument();

        // resize the window
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        window.dispatchEvent(new Event('resize'));

        expect(
            screen.queryByRole('button', { name: 'Right Chevron' })
        ).not.toBeInTheDocument();
    });
});

describe('Mobile TabView Tests for very small mobile views and long tab labels', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.innerWidth = 375;
    });

    it('Should render mobile view for very small mobiles', () => {
        render(component);

        expect(
            screen.getByRole('button', { name: 'Right Chevron' })
        ).toBeInTheDocument();
    });
    it('Should run handleLongTabsfn when clicked', () => {
        render(component);

        const tabOne = screen.getByRole('listitem', { name: /Tab1/ });
        userEvent.click(tabOne);
        expect(tabOne).toHaveFocus();
    });
    it('Should run handleLongTabsfn when there is long tabs and tab is clicked', () => {
        render(
            <TabView
                label='Tabs label'
                chevronLeftAriaLabel={'Left Chevron'}
                chevronRightAriaLabel={'Right Chevron'}>
                <TabView.Tab title='Overview' onTabSelect={jest.fn()}>
                    <p>Content1</p>
                </TabView.Tab>
                <TabView.Tab title='Authorizations' onTabSelect={jest.fn()}>
                    <p>Content2</p>
                </TabView.Tab>
                <TabView.Tab title='Account Balance' onTabSelect={jest.fn()}>
                    <p>Content3</p>
                </TabView.Tab>
                <TabView.Tab title='Tab4' onTabSelect={jest.fn()}>
                    <p>Content4</p>
                </TabView.Tab>
            </TabView>
        );

        const tabThree = screen.getByRole('listitem', {
            name: /Account Balance/,
        });
        userEvent.click(tabThree);
        expect(tabThree).toHaveFocus();
    });
    it('Should run handleLongTabsfn when there is no long tabs and tab is clicked', () => {
        render(
            <TabView
                label='Tabs label'
                chevronLeftAriaLabel={'Left Chevron'}
                chevronRightAriaLabel={'Right Chevron'}>
                <TabView.Tab title='Tab1' onTabSelect={jest.fn()}>
                    <p>Content1</p>
                </TabView.Tab>
                <TabView.Tab title='Tab2' onTabSelect={jest.fn()}>
                    <p>Content2</p>
                </TabView.Tab>
                <TabView.Tab title='Tab3' onTabSelect={jest.fn()}>
                    <p>Content3</p>
                </TabView.Tab>
                <TabView.Tab title='Tab4' onTabSelect={jest.fn()}>
                    <p>Content4</p>
                </TabView.Tab>
            </TabView>
        );

        const tabOne = screen.getByRole('listitem', { name: /Tab1/ });
        userEvent.click(tabOne);
        expect(tabOne).toHaveFocus();
    });
});
