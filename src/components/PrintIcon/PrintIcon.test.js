import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintIcon from '.';

describe('Print Icon Tests', () => {
    it('renders without crashing', () => {
        render(<PrintIcon />);
        const printIconElement = screen.getByTestId('print-icon');
        expect(printIconElement).toBeInTheDocument();
    });
});
