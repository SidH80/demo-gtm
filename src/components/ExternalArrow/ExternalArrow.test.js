import React from 'react';
import ExternalArrow from '.';
import { render } from '@testing-library/react';

describe('ExternalArrow Tests', () => {
    it('should render without crashing', () => {
        render(<ExternalArrow />);
    });
});
