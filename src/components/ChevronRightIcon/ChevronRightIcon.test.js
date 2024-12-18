import React from 'react';
import { render } from '@testing-library/react';

import ChevronRightIcon from '.';

describe('ChevronRightIcon unit tests', () => {
    it('renders without crashing', () => {
        const { rerender } = render(<ChevronRightIcon />);
        rerender(<ChevronRightIcon isFocusable={true} isMute={true} />);
    });
});
