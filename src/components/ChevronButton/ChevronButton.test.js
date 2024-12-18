import React from 'react';
import ChevronButton from './ChevronButton.js';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ChevronButton Tests', () => {
    it('renders without crashing with no props', () => {
        const { container } = render(<ChevronButton />);
        expect(container).toBeInTheDocument();
    });

    it('renders ChevronDown icon', () => {
        const { container } = render(<ChevronButton direction='down' />);
        expect(container.querySelector('.down-chevron')).toBeInTheDocument();
    });

    it('renders ChevronUp icon', () => {
        const { container } = render(<ChevronButton direction='up' />);
        expect(container.querySelector('.up-chevron')).toBeInTheDocument();
    });

    it('renders ChevronLeft icon', () => {
        const { container } = render(<ChevronButton direction='left' />);
        expect(
            container.querySelector('.chevron-left-icon--active')
        ).toBeInTheDocument();
    });

    it('renders ChevronRight icon', () => {
        const { container } = render(<ChevronButton direction='right' />);
        expect(
            container.querySelector('.chevron-right-icon--active')
        ).toBeInTheDocument();
    });
});
