import React from 'react';
import BreadcrumbBar from './BreadcrumbBar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('BreadcrumbBar tests', () => {
    it('should exist', () => {
        const { container } = render(
            <BrowserRouter>
                <BreadcrumbBar pathGetter={() => ['/first', '/second']} />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it('should have a <nav>', () => {
        render(
            <BrowserRouter>
                <BreadcrumbBar pathGetter={() => ['/first', '/second']} />
            </BrowserRouter>
        );
        expect(screen.getAllByRole('navigation').length).toEqual(1);
    });

    it('should render when passed no props', () => {
        const { container } = render(<BreadcrumbBar />);
        expect(container).toBeInTheDocument();
    });

    it('should call onCrumbClick function when Account Home text is clicked', () => {
        const onCrumbClickMock = jest.fn();
        const homeObject = {
            linkDescription:
                'Leave this page and return to the main account page',
            linkDisplayText: 'Account Home',
            linkDestination: '/ola/',
        };
        render(
            <BrowserRouter>
                <BreadcrumbBar
                    pathGetter={() => [homeObject]}
                    onCrumbClick={onCrumbClickMock}
                />
            </BrowserRouter>
        );
        const crumb = screen.getByText('Account Home');
        fireEvent.click(crumb);
        expect(onCrumbClickMock).toBeCalled();
    });
});
