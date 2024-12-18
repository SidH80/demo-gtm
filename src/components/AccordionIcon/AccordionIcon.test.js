import React from 'react';
import AccordionIcon from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Accordion Icon Tests', () => {
    it('should render closed styles to Accordion Icon component', async () => {
        render(<AccordionIcon isOpen={true} />);
        const icon = await screen.findByRole('img');
        expect(icon).toHaveClass('accordion-icon-minus');
    });

    it('should render open styles to Accordion Icon component', async () => {
        render(<AccordionIcon />);
        const icon = await screen.findByRole('img');
        expect(icon).toHaveClass('accordion-icon-plus');
    });
});
