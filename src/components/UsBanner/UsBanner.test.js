import React from 'react';
import UsBanner from '.';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('UsBanner Tests', () => {
    it('renders banner text', () => {
        render(<UsBanner />);
        const bannerText = screen.getByText(
            /An official website of the United States government/i
        );
        expect(bannerText).toBeInTheDocument();
    });

    it('renders with custom banner text', () => {
        render(
            <UsBanner bannerText={'Custom Text'} className={'test-class'} />
        );
        expect(screen.getByText(/Custom Text/i)).toBeInTheDocument();
    });

    it('should render "Official websites use .gov" when button is toggled', () => {
        const mockOnExpandChange = jest.fn();
        render(
            <BrowserRouter>
                <UsBanner
                    bannerText={'Entered Text'}
                    className={'test-class'}
                    onExpandChange={mockOnExpandChange}
                />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByRole('button'));
        expect(
            screen.getByText(/Official websites use .gov/i)
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button'));
        expect(
            screen.queryByText(/Official websites use .gov/i)
        ).not.toBeInTheDocument();
    });
});
