import React from 'react';
import FlexLayout from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Flex Layout tests', () => {
    it('should render without crashing with no props', () => {
        render(<FlexLayout />);
    });

    it('should render without crashing with props', () => {
        const { getByText } = render(
            <FlexLayout>
                <div>
                    <p>Test Content</p>
                </div>
            </FlexLayout>
        );
        expect(getByText(/test content/i)).toBeInTheDocument();
    });
});
