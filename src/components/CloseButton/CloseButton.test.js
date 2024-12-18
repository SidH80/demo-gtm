import React from 'react';
import CloseButton from '../CloseButton';
import { render } from '@testing-library/react';

describe('CloseButton tests', () => {
    it('should render when passed no props', () => {
        render(<CloseButton />);
    });
});
