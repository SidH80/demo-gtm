import React from 'react';
import HelptipContent from '../HelptipContent';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HelptipContent tests', () => {
    it('should render when passed no props', () => {
        const { container } = render(<HelptipContent />);
        const helptipContent = container.querySelector(
            '.helptip-content__content'
        );
        expect(helptipContent).toBeInTheDocument();
    });

    it('should render when passed content', () => {
        const { container } = render(
            <HelptipContent content={<p>Test Helptip Content</p>} />
        );
        const helptipContentP = container.querySelector(
            '.helptip-content__content p'
        );
        expect(helptipContentP).toBeInTheDocument();
    });
});
