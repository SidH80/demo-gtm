import React from 'react';
import ExpandContent from '.';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Expand Content Tests', () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();

    it('renders without crashing', () => {
        const { getByRole } = render(<ExpandContent />);
        const readMore = getByRole('link', { name: /read more/i });
        expect(readMore).toBeInTheDocument();
    });

    it('should toggle content on click', () => {
        const { getByRole } = render(
            <ExpandContent onOpen={handleOpen} onClose={handleClose}>
                <p>Expand content test</p>
            </ExpandContent>
        );
        const readMore = getByRole('link', { name: /read more/i });
        fireEvent.click(readMore);
        const readLess = getByRole('link', { name: /read less/i });
        expect(readLess).toBeInTheDocument();
    });

    it('should toggle content when enter key is pressed', () => {
        const { getByRole } = render(
            <ExpandContent onOpen={handleOpen} onClose={handleClose}>
                <p>Expand content test</p>
            </ExpandContent>
        );
        const readMore = getByRole('link', { name: /read more/i });
        expect(readMore).toHaveClass('expand-content__more-link');
        userEvent.type(readMore, '{ enter }');
        const readLess = getByRole('link', { name: /read less/i });
        expect(readLess).toBeInTheDocument();
        userEvent.type(readLess, '{ enter }');
        expect(readLess).not.toBeInTheDocument();
    });

    it('should toggle the open state and calls appropriate callbacks', () => {
        const { getByRole } = render(
            <ExpandContent
                collapsedText='Read More'
                expandedLinkText='Read Less'
                onOpen={handleOpen}
                onClose={handleClose}
            />
        );
        const readMore = getByRole('link', { name: /read more/i });
        fireEvent.click(readMore);
        expect(handleOpen).toHaveBeenCalled();
        const readLess = getByRole('link', { name: /read less/i });
        fireEvent.click(readLess);
        expect(handleClose).toHaveBeenCalled();
    });

    it('should toggle the open state and calls appropriate callbacks when transition prop is set', async () => {
        const transitionDurationSeconds = 1;
        const { getByRole, getByText } = render(
            <ExpandContent
                collapsedText='Read More'
                expandedLinkText='Read Less'
                transitionDurationSeconds={transitionDurationSeconds}>
                <p>Expand content test</p>
            </ExpandContent>
        );
        const readMore = getByRole('link', { name: /read more/i });
        fireEvent.click(readMore);
        await act(
            () =>
                new Promise(resolve =>
                    setTimeout(
                        resolve,
                        (transitionDurationSeconds + 0.1) * 1000
                    )
                )
        );
        const expandedContent = getByText(/expand content test/i);
        expect(expandedContent).toBeInTheDocument();
    });
});
