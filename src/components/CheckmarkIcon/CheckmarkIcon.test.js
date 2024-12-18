import React from 'react';
import CheckmarkIcon from './CheckmarkIcon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CheckmarkIcon tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(<CheckmarkIcon />);
        expect(container).toBeInTheDocument();
    });

    it('should add custom styling to the container', () => {
        const { container } = render(
            <CheckmarkIcon checkmarkContainerClassNames='container-test-style' />
        );
        expect(
            container.getElementsByClassName('container-test-style').length
        ).toBe(1);
    });

    it('should add custom styling to the icon', () => {
        const { container } = render(
            <CheckmarkIcon checkmarkIconClassNames='icon-test-style' />
        );
        expect(container.getElementsByClassName('icon-test-style').length).toBe(
            1
        );
    });
});
