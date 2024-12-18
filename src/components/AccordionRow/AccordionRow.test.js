import React from 'react';
import AccordionRow from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Accordion Row Tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(<AccordionRow />);
        expect(container).toBeInTheDocument();
    });

    it('should render an close(minus) icon when the open(plus) icon is clicked', () => {
        const { container } = render(<AccordionRow open={true} />);
        userEvent.click(screen.getByRole('button'));
        expect(
            container.querySelector('.accordion-icon-minus')
        ).toBeInTheDocument();
        expect(
            container.querySelector('.accordion-icon-plus')
        ).not.toBeInTheDocument();
    });

    it('should render an open(plus) icon when close(minus) icon is clicked', () => {
        const { container } = render(<AccordionRow open={false} />);
        userEvent.click(screen.getByRole('button'));
        expect(
            container.querySelector('.accordion-icon-plus')
        ).toBeInTheDocument();
        expect(
            container.querySelector('.accordion-icon-minus')
        ).not.toBeInTheDocument();
    });

    it('should render a no bottom border accordion', () => {
        const { container } = render(<AccordionRow noBottom={true} />);
        expect(
            container.querySelector('.accordion--no_bottom_border')
        ).toBeInTheDocument();
    });

    it('should render a blank button', () => {
        const { container } = render(<AccordionRow unopenable={true} />);
        expect(
            container.querySelector('.accordion--unopenable')
        ).toBeInTheDocument();
    });

    it('should render a blue button when "blue" prop is true', () => {
        const { container } = render(<AccordionRow blue={true} />);
        expect(container.querySelector('.accordion--blue')).toBeInTheDocument();
    });
});
