import React from 'react';
import LogoutIcon from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Logout Icon Tests', () => {
    it('should render without crashing', () => {
        const { getByTestId } = render(<LogoutIcon />);
        const logoutIcon = getByTestId('logout-icon');
        expect(logoutIcon).toHaveClass('logout-icon');
    });
});
