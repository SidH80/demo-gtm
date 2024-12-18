import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointerIcon from '.';

describe('Pointer tests', () => {
    it('should render when isOpen is true', () => {
        render(<PointerIcon isOpen={true} />);
        const pointerIconElement = screen.getByTitle('pointerIcon');
        expect(pointerIconElement).toBeInTheDocument();
    });
});
