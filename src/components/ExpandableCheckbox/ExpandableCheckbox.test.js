import { render } from '@testing-library/react';
import React from 'react';
import ExpandableCheckbox from './ExpandableCheckbox';
import '@testing-library/jest-dom';

describe('ExpandableCheckbox Tests', () => {
    it('should render without crashing', () => {
        render(<ExpandableCheckbox />);
    });
    it('should expand and show text when checkbox is clicked', () => {
        const children = (
            <>
                <h2>This is a test</h2>
            </>
        );
        const { getByRole } = render(
            <ExpandableCheckbox checked={true} children={children} />
        );
        const heading = getByRole('heading');
        expect(heading).toBeInTheDocument();
    });
});
