import React from 'react';
import UserIcon from './UserIcon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('UserIcon tests', () => {
    it('should render without crashing', () => {
        const { container } = render(<UserIcon />);
        expect(container).toBeInTheDocument();
    });
});
