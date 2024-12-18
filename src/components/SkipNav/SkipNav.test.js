import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SkipNav from '.';

describe('SkipNav Tests', () => {
    it('renders without crashing with no props', () => {
        const { container } = render(<SkipNav />);

        expect(container).not.toBeEmptyDOMElement();
    });

    it('applies .skip-nav class to the anchor tag', () => {
        render(<SkipNav />);

        const anchorElement = screen.getByRole('link');
        expect(anchorElement).toHaveClass('skip-nav');
    });

    it('renders with expected text', () => {
        render(<SkipNav title={'This is Title Text'} />);

        const titleText = screen.getByText('This is Title Text');
        expect(titleText).toBeInTheDocument();
    });

    it('should call the inputRef prop function', () => {
        const inputRefMock = jest.fn();
        render(<SkipNav inputRef={inputRefMock} />);

        const anchorElement = screen.getByRole('link');
        userEvent.click(anchorElement);
        expect(inputRefMock).toHaveBeenCalled();
    });
});
