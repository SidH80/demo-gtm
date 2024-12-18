import React from 'react';
import Breadcrumbs from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const homeObject = {
    linkDescription: 'Leave this page and return to the main account page',
    linkDisplayText: 'Account Home',
    linkDestination: '/ola/',
};

const resolveLocationToHome = jest.fn(() => {
    return [homeObject, 'Breadcrumb Test'];
});

const resolveLocationToHomeStringParamOnly = jest.fn(() => {
    return ['Breadcrumb Test 2'];
});

describe('Breadcrumb Tests', () => {
    it('renders without crashing with no props', () => {
        const { container } = render(<Breadcrumbs />);
        expect(container).toBeInTheDocument();
    });

    it('render Account Home "a" element given an object to format', () => {
        render(
            <MemoryRouter>
                <Breadcrumbs
                    crumbs={resolveLocationToHome(
                        '/ola/frequently_asked_questions'
                    )}
                />
            </MemoryRouter>
        );
        expect(screen.getByText(/Account Home/)).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Account Home' })
        ).toHaveAttribute('href', '/ola/');
    });

    it('returns a span tag with a string value when given a string argument', () => {
        render(
            <MemoryRouter>
                <Breadcrumbs
                    crumbs={resolveLocationToHomeStringParamOnly(
                        '/ola/frequently_asked_questions'
                    )}
                />
            </MemoryRouter>
        );
        expect(screen.getByText(/Breadcrumb Test 2/)).toBeInTheDocument();
    });
});
