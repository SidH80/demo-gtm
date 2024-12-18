import React from 'react';
import LoadingSpinner from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Loading Spinner Tests', () => {
    it('should render with default settings without crashing with no props', () => {
        const { getByRole } = render(<LoadingSpinner />);
        const progressbar = getByRole('progressbar', { hidden: true });
        expect(progressbar).toHaveClass('spinner');
    });

    it('should render spinner background color black when pageOverlay prop is false', () => {
        const { getByTestId } = render(<LoadingSpinner pageOverlay={false} />);
        const spinnerStyle = getByTestId('spinner-style');
        expect(spinnerStyle).toHaveClass('blackBackground');
    });
});
