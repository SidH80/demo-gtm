import React from 'react';
import { render } from '@testing-library/react';

import ChevronLeftIcon from '.';

describe('ChevronLeftIcon unit tests', () => {
    it('renders without crashing', () => {
        const { rerender } = render(<ChevronLeftIcon />);
        rerender(<ChevronLeftIcon isFocusable={true} isMute={true} />);
    });
});
