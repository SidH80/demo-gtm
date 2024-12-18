import ChevronUpIcon from '.';
import { render } from '@testing-library/react';
import React from 'react';

describe('Chevron Up Tests', () => {
    it('renders without crashing', () => {
        const { rerender } = render(<ChevronUpIcon />);
        rerender(<ChevronUpIcon isFocusable={true} isMute={true} />);
    });
});
