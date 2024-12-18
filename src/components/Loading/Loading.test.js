import React from 'react';
import Loading from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Loading Spinner Tests', () => {
    it('should render with default settings without crashing with no props', () => {
        const { getByRole, getByTestId } = render(<Loading />);

        const overlayContainer = getByTestId('overlay');
        expect(overlayContainer).toHaveClass('loading-overlay fixed-pos');

        const heading = getByRole('heading', { level: 1 });
        expect(heading.innerHTML).toBe('Loading...');
        expect(heading).toHaveClass('loading-text');
    });

    it('should render the dark color style pageOverlay is false', () => {
        const { getByRole, getByTestId } = render(
            <Loading pageOverlay={false} />
        );
        const overlayContainer = getByTestId('overlay');
        expect(overlayContainer).toHaveClass(
            'loading-overlay--page-body relative-pos'
        );
        const heading = getByRole('heading', { level: 2 });
        expect(heading).toHaveClass('loading-text-black');
    });

    it('should render subtitle message when supplied as a prop', () => {
        const { getByText } = render(<Loading messageSubtitle='New Message' />);
        const subtitle = getByText('New Message');
        expect(subtitle).toBeInTheDocument();
    });

    it('should render h2 element when invalid variant prop is passed', () => {
        const { getByRole } = render(
            <Loading pageOverlay={false} messageVariant='invalid' />
        );
        const invalidVariant = getByRole('heading', { level: 2 });
        expect(invalidVariant).toBeInTheDocument();
    });

    it('should render p element when p is passed as message variant prop', () => {
        const { getByText } = render(
            <Loading
                pageOverlay={false}
                messageVariant='p'
                message='Message Variant p'
            />
        );
        const validVariant = getByText('Message Variant p');
        expect(validVariant.nodeName).toBe('P');
    });

    it('should render loading spinner with focus', () => {
        const { getByText } = render(<Loading shouldFocus={true} />);
        const message = getByText('Loading...');
        expect(message).toHaveFocus();
    });

    it('should render child heading element if passed', () => {
        const { getByText } = render(
            <Loading>
                <h3>loading from child</h3>
            </Loading>
        );
        const message = getByText('loading from child');
        expect(message).toBeVisible();
    });

    it('should not render if passing child with no string and throws error', () => {
        expect(() =>
            render(
                <Loading>
                    <h3></h3>
                </Loading>
            )
        ).toThrow(
            'Child component must be a heading element containing a string'
        );
    });
});
