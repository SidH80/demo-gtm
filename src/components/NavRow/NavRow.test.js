import React from 'react';
import NavRow from '.';
import renderWithRouter from '../../test/renderWithRouter';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('NavRow Tests', () => {
    const navLinks = [
        {
            id: 'navTestLink1',
            linkDisplayText: 'Display Text 1',
            linkDestination: '/ola/',
            linkDescription: 'Nav Link Description 1',
            newWindow: false,
        },
        {
            id: 'navTestLink2',
            linkDisplayText: 'Display Text 2',
            linkDestination: '/ola/test_balance',
            linkDescription: 'Nav Link Description 2',
            newWindow: false,
        },
        {
            id: 'navTestLink3',
            linkDisplayText: 'Display Text 3',
            subNav: [
                {
                    id: 'subNavTestLink1',
                    linkDisplayText: 'Sub Nav Display Text 1',
                    linkDestination: '/ola/test_payment_options',
                    linkDescription: 'Sub Nav Link Description 1',
                    newWindow: false,
                },
                {
                    id: 'subNavTestLink2',
                    linkDisplayText: 'Sub Nav Display Text 2',
                    linkDestination: '/ola/test_payment_activity',
                    linkDescription: 'Sub Nav Link Description 2',
                    newWindow: false,
                },
            ],
        },
    ];

    const languageCodes = ['es'];

    const navRowWithMemRouter = (
        <MemoryRouter initialEntries={['/ola/test_balance']}>
            <NavRow links={navLinks} />
        </MemoryRouter>
    );

    it('should render component without props with default settings', () => {
        renderWithRouter(<NavRow />);
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('tab-nav-row');
        expect(nav).toHaveAttribute('aria-label', 'application');
        const list = screen.getByRole('list');
        expect(list).toHaveClass('link-list');
    });

    it('should append " Current" to the aria label description of the active tab that matches window pathname', () => {
        const { getByText } = render(navRowWithMemRouter);
        const tabTwo = getByText('Display Text 2');
        expect(tabTwo).toHaveAttribute('aria-label', 'Display Text 2 Current');
    });

    it('should add selected class of the active tab that matches window pathname', () => {
        const { getByText } = render(navRowWithMemRouter);
        const tabTwo = getByText('Display Text 2');
        expect(tabTwo).toHaveClass(
            'tab-nav-row-item__link tab-nav-row__li--selected'
        );
    });

    it.each([
        'Display Text 1',
        'Display Text 2',
        'Display Text 3',
        'Sub Nav Display Text 1',
        'Sub Nav Display Text 2',
    ])('should render "%s" nav item', displayText => {
        renderWithRouter(
            <NavRow links={navLinks} languageCodes={languageCodes} />
        );
        const item = screen.getByText(displayText);
        expect(item).toBeInTheDocument();
    });
});
