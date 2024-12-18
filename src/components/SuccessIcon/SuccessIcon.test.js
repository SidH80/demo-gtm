import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessIcon from '.';

describe('SuccessIcon Icon Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(<SuccessIcon />);

        expect(container).not.toBeEmptyDOMElement();
    });
});
