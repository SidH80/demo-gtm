import React from 'react';
import TitleBar from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Title Bar tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(<TitleBar />);
        expect(container).toBeInTheDocument();
    });

    it('should render header text', () => {
        render(<TitleBar headerText='Test Text 123' />);
        const headerText = screen.getByText(/test text 123/i);
        expect(headerText).toBeInTheDocument();
    });
});
