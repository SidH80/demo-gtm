import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortIcon from '.';

describe('Sort Icon Tests', () => {
    it('renders without crashing when passed with no props', () => {
        const { container } = render(<SortIcon />);

        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders without crashing when passed with props', () => {
        const { container } = render(
            <SortIcon isSortedAsc={true} isSortedDesc={false} />
        );

        expect(container).not.toBeEmptyDOMElement();
    });
});
