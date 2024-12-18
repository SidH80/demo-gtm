import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaperclipIcon from '.';

describe('PaperclipIcon component tests', () => {
    it('renders a ODG-compliant PaperclipIcon', () => {
        const { container, unmount } = render(<PaperclipIcon />);
        expect(container.firstChild).toHaveClass('irs-paperclip-icon');
        unmount();
    });
});
