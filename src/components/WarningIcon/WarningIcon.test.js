import React from 'react';
import WarningIcon from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Warning Icon Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(<WarningIcon />);
        expect(container).toBeInTheDocument();
    });
});
