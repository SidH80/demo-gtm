import React from 'react';
import HeaderBar from '.';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Bar Tests', () => {
    const userObject = {
        userFirstName: 'Jane',
        userLastName: 'Smith',
        userId: '1234',
        username: 'jsmith',
    };

    const component = (
        <Router>
            <HeaderBar
                user={userObject}
                logoUrl={process.env.PUBLIC_URL + '/IRS_LOGO.png'}
                logoAltText='Logo of the IRS'
                userLinks={[]}
                navLinks={[]}
            />
        </Router>
    );

    const { container } = render(component);

    it('should render without crashing with no props', () => {
        render(
            <Router>
                <HeaderBar />
            </Router>
        );
    });

    it('should have irs-header div', () => {
        expect(container.getElementsByClassName('.irs-header')).toBeTruthy();
    });

    it('should have container div', () => {
        expect(container.getElementsByClassName('.container')).toBeTruthy();
    });

    it('should have left-aligned-elts div', () => {
        expect(
            container.getElementsByClassName('.left-aligned-elts')
        ).toBeTruthy();
    });

    it('should have right-aligned-elts div', () => {
        expect(
            container.getElementsByClassName('.right-aligned-elts')
        ).toBeTruthy();
    });
});
