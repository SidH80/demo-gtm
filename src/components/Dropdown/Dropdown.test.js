import React from 'react';
import Dropdown from '.';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Dropdown Tests', () => {
    const nav = require('../../test/mockRoutes').default;

    const simulateScreenResize = width => {
        window.innerWidth = width;
        window.dispatchEvent(new Event('resize'));
    };

    const userLink = [
        {
            id: 'userLink1',
            linkDisplayText: 'Profile',
            linkDestination: '/',
            linkDescription:
                'Profile This link will open the User Profile page in the same browser window.',
            newWindow: false,
            handleClick: () => {
                gaPageEventMethods.sendHeaderProfileClick();
            },
            icon: '',
        },
        {
            id: 'userLink2',
            linkDisplayText: 'Logout',
            linkDestination: '/',
            linkDescription: 'Logout This link will log the user out.',
            newWindow: false,
            blurToButton: true,
            handleClick: () => {},
            icon: '',
        },
    ];

    const BrowserRouterComp = (
        <BrowserRouter>
            <Dropdown
                links={[nav.paths]}
                hiddenElements={['dropdown-wrapper']}
                userLinks={userLink}
                userName={'Test User'}
            />
        </BrowserRouter>
    );

    it('should render without crashing', () => {
        render(BrowserRouterComp);
        expect(
            screen.getByRole('button', { name: 'Menu' })
        ).toBeInTheDocument();
    });

    it('should change the state on trigger', () => {
        render(BrowserRouterComp);
        expect(screen.getByText('Menu')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Menu'));
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('should set dropdown active to false on resize', async () => {
        await waitFor(() => {
            simulateScreenResize(750);
            window.dispatchEvent(new Event('resize'));
        });

        const { container } = render(BrowserRouterComp);

        expect(
            container.getElementsByClassName('dropdown-menu-control').length
        ).toBe(0);
        expect(
            container.getElementsByClassName('dropdown-wrapper').length
        ).toBe(1);
    });

    it('should have class .dropdown__box--layout dropdown__box--style when state is active', () => {
        const { container } = render(BrowserRouterComp);
        fireEvent.click(screen.getByText('Menu'));
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(
            container.getElementsByClassName(
                'dropdown__box--layout dropdown__box--style'
            ).length
        ).toBe(1);
    });
});
