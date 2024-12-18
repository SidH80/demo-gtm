import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelptipIcon from '../HelptipIcon';

describe('HelptipIcon tests', () => {
    it('should render when passed no props', () => {
        render(<HelptipIcon />);
        const icon = screen.getByTestId('helptip-icon');
        expect(icon).toBeInTheDocument();
    });

    it('should render correct svg when helptip is closed', () => {
        render(<HelptipIcon isOpen={false} />);
        const icon = screen.getByTestId('helptip-closed');
        expect(icon).toBeInTheDocument();
    });

    it('should render correct svg when helptip is open', () => {
        render(<HelptipIcon isOpen />);
        const icon = screen.getByTestId('helptip-opened');
        expect(icon).toBeInTheDocument();
    });

    it('should render correctly when id is passed', () => {
        render(<HelptipIcon id='testing-id' />);
        const icon = screen.getByTestId('helptip-icon');
        expect(icon).toHaveAttribute('id', 'testing-id');
    });
});
