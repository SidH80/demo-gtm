import React from 'react';
import InfoIcon from '.';
import { render } from '@testing-library/react';

describe('InfoIcon Tests', () => {
    it('renders without crashing', () => {
        render(<InfoIcon />);
    });
});
