import React from 'react';
import InputControl from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('InputControl Component', () => {
    it('should render without props', () => {
        render(<InputControl />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });
});
