import React from 'react';
import Footer from '.';
require('sinon');
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Footer Tests', () => {
    const links = [
        {
            id: 'link1',
            linkDisplayText: 'Link 1',
            linkDestination: 'Link1',
            linkDescription: 'Link 1 link.',
            newWindow: false,
        },
        {
            id: 'link2',
            linkDisplayText: 'Link 2',
            linkDestination: 'Link2',
            linkDescription: 'Link 2 link.',
            newWindow: true,
        },
    ];

    it('should render with no props without crashing', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('should render with footer tag', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('should display footer with correct amount of links', () => {
        render(<Footer footerLinks={links} />);
        const displayedLinks = screen.queryAllByRole('link');
        expect(displayedLinks).toHaveLength(2);
    });
});
