import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DropdownSectionSubNav from '.';
import ChevronDownIcon from '../ChevronDownIcon';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DropdownSectionSubNav Tests', () => {
    const navSelected = {
        id: 'navLink1',
        linkDisplayText: 'Test Dropdown',
        subNav: [
            {
                id: 'navLink2',
                linkDisplayText: 'Test Link 1',
                linkDestination: '/ola/nav_link_1',
                linkDescription: 'This is a sample description for nav link 1',
            },
            {
                id: 'navLink3',
                linkDisplayText: 'Test Link 2',
                linkDestination: '/',
                linkDescription: 'This is a sample description for nav link 2',
            },
        ],
        state: true,
        icon: <ChevronDownIcon />,
    };

    const navNotSelected = {
        id: 'navLink1',
        linkDisplayText: 'Test Dropdown',
        subNav: [
            {
                id: 'navLink2',
                linkDisplayText: 'Test Link 1',
                linkDestination: '/ola/nav_link_1',
                linkDescription: 'This is a sample description for nav link 1',
            },
            {
                id: 'navLink3',
                linkDisplayText: 'Test Link 2',
                linkDestination: '/ola/nav_link_2',
                linkDescription: 'This is a sample description for nav link 2',
            },
        ],
        icon: <ChevronDownIcon />,
    };

    const clickStateFunctionMock = jest.fn();

    it('should render with 1 nav link without crashing', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <DropdownSectionSubNav
                    link={navNotSelected}
                    clickStateFunction={clickStateFunctionMock}
                />
            </MemoryRouter>
        );
        const list = getByRole('listitem');
        expect(list).not.toHaveClass('DropdownSubNav__selected');
        const navLink = getByRole('button', { name: 'Test Dropdown' });
        expect(navLink).toBeInTheDocument();
    });

    it('should set navLink active on click', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/']}>
                <DropdownSectionSubNav
                    link={navSelected}
                    clickStateFunction={clickStateFunctionMock}
                />
            </MemoryRouter>
        );

        const navLink = getByRole('button');
        fireEvent.click(navLink);
        expect(clickStateFunctionMock).toHaveBeenCalled();
        expect(document.activeElement).toBe(navLink);
        const subNavLinkCurrent = getByRole('link', {
            name: 'Test Link 2 Current',
        });
        expect(subNavLinkCurrent).toHaveClass('active');
    });

    it('should display 2 sub nav links when parent nav link is activated', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <DropdownSectionSubNav
                    link={navSelected}
                    clickStateFunction={clickStateFunctionMock}
                />
            </MemoryRouter>
        );
        const navLink = getByRole('button');
        fireEvent.click(navLink);
        expect(clickStateFunctionMock).toHaveBeenCalled();
        expect(navLink).toHaveAttribute('aria-expanded', 'true');
        const list = getByRole('list');
        expect(list).toHaveAttribute('aria-hidden', 'false');
    });
});
