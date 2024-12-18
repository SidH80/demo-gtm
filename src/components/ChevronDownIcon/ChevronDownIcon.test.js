import React from 'react';
import ChevronDownIcon from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Chevron Down Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(<ChevronDownIcon />);
        expect(container).toBeInTheDocument();
    });

    it('confirm presence of className "down-chevron"', () => {
        const { container } = render(<ChevronDownIcon />);
        expect(container.firstChild).toHaveClass('down-chevron');
    });
});
