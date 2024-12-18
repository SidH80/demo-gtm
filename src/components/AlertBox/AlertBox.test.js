import React from 'react';
import AlertBox from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Alert Box Tests', () => {
    it('renders without crashing with no props', () => {
        const { container } = render(<AlertBox />);
        expect(container).toBeInTheDocument();
    });

    it('renders a title', () => {
        render(<AlertBox title='Test Title' />);
        const title = screen.getByText(/test title/i);
        expect(title).toBeInTheDocument();
    });

    it('renders a custom header for card title', () => {
        render(<AlertBox headerLevel={2} title='Custom Header Title' />);
        const header = screen.getByRole('heading', { level: 2 });
        expect(header).toBeInTheDocument();
    });

    it('should render warning class if contains isWarning flag', () => {
        const { container } = render(<AlertBox isWarning />);
        expect(
            container.querySelector('.alert-box--warning-color')
        ).toBeInTheDocument();
    });

    it('should render error class if contains isError flag', () => {
        const { container } = render(<AlertBox isError />);
        expect(
            container.querySelector('.alert-box--error-color')
        ).toBeInTheDocument();
    });

    it('should render success class if contains isSuccess flag', () => {
        const { container } = render(<AlertBox isSuccess />);
        expect(
            container.querySelector('.alert-box--success-color')
        ).toBeInTheDocument();
    });

    it('should render info class by default if contains no flag', () => {
        const { container } = render(<AlertBox />);
        expect(
            container.querySelector('.alert-box--info-color')
        ).toBeInTheDocument();
    });
});
