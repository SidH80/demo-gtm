import CloseIcon from '.';
import { render } from '@testing-library/react';
import React from 'react';

describe('CloseIcon Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(<CloseIcon />);
        expect(container.getElementsByClassName('close-icon').length).toBe(1);
    });
});
