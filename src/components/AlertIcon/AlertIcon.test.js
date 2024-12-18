import React from 'react';
import AlertIcon from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('AlertIcon tests', () => {
    it('should render when passed no props', () => {
        const { container } = render(<AlertIcon />);
        expect(container).toBeInTheDocument();
    });

    it('should render when passed with props', () => {
        const { container } = render(
            <AlertIcon height={'16px'} width={'16px'} />
        );
        expect(container).toBeInTheDocument();
    });
});
