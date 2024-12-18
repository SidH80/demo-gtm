import React, { Fragment } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../test/renderWithRouter';
import SubNavRowItem from './SubNavRowItem';

describe('SubNavItem component tests', () => {
    const data = {
        id: 'navLink1',
        linkDisplayText: 'Test Sub Nav',
        subNav: [
            {
                id: 'navLink2',
                linkDisplayText: 'Nav Link 1',
                linkDestination: '/nav_link_1',
                linkDescription: 'This is a sample description for nav link 1',
            },
            {
                id: 'navLink3',
                linkDisplayText: 'Nav Link 2',
                linkDestination: '/nav_link_2',
                linkDescription: 'This is a sample description for nav link 2',
            },
        ],
    };

    it('should render the SubNavRowItem component', () => {
        renderWithRouter(<SubNavRowItem data={data} location={location} />);

        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('should handle a click event and expand sub nav menu', () => {
        renderWithRouter(<SubNavRowItem data={data} location={location} />);

        const subNavAnchor = screen.getByText('Test Sub Nav').closest('a');
        userEvent.click(subNavAnchor);

        expect(subNavAnchor).toHaveAttribute('aria-expanded', 'true');
    });

    it('should handle close the sub nav menu when focus changes', () => {
        renderWithRouter(
            <Fragment>
                <SubNavRowItem data={data} location={location} />
                <button>Test Button</button>
            </Fragment>
        );

        const subNavAnchor = screen.getByText('Test Sub Nav').closest('a');
        userEvent.click(subNavAnchor);
        userEvent.click(screen.getByRole('button'));

        expect(subNavAnchor).toHaveAttribute('aria-expanded', 'false');
    });

    it('should handle a hover event and expand sub nav menu', () => {
        renderWithRouter(<SubNavRowItem data={data} location={location} />);

        const subNavAnchor = screen.getByText('Test Sub Nav').closest('a');
        userEvent.hover(subNavAnchor);

        expect(subNavAnchor).toHaveAttribute('aria-expanded', 'true');
    });

    it('should handle on blur event and close the sub nav menu', () => {
        renderWithRouter(<SubNavRowItem data={data} location={location} />);

        const subNavAnchor = screen.getByText('Test Sub Nav').closest('a');

        expect(document.body).toHaveFocus();

        userEvent.tab();
        userEvent.tab();

        expect(subNavAnchor).toHaveAttribute('aria-expanded', 'false');
    });

    it('should set the sub nav tab with the active class', () => {
        const location = {
            pathname: '/nav_link_1',
        };

        renderWithRouter(<SubNavRowItem data={data} location={location} />);

        const subNavAnchor = screen.getByText('Test Sub Nav').closest('a');

        expect(subNavAnchor).toHaveClass('active');
    });
});
