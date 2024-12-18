import React from 'react';
import { render } from '@testing-library/react';
import ErrorIcon from '.';
import '@testing-library/jest-dom';

describe('ErrorIcon Tests', () => {
    it('should render without crashing', () => {
        render(<ErrorIcon />);
    });
    it('should render with custom prop values', () => {
        const { getByTestId } = render(
            <ErrorIcon fill={'1D1D1D'} height={'20px'} width={'20px'} />
        );
        const svg = getByTestId('error-icon');
        expect(svg).toHaveAttribute('fill', '1D1D1D');
        expect(svg).toHaveStyle('height:20px');
        expect(svg).toHaveStyle('width:20px');
    });
});
