import React from 'react';
import EmphasisTag from './EmphasisTag';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('EmphasisTag Tests', () => {
    global.window.open = jest.fn();

    let addEventListenerSpy;
    let removeEventListenerSpy;
    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });
    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
        jest.clearAllMocks();
    });

    it('should render the tag with the class emphasisTag', async () => {
        const renderEmphasisTag = (
            <BrowserRouter>
                <EmphasisTag srOnlyText=''>Test Tag</EmphasisTag>
            </BrowserRouter>
        );

        const { container } = render(renderEmphasisTag);
        const tag = container.firstChild;

        const defaultClasses = 'emphasisTag';
        expect(tag).toHaveClass(defaultClasses);
    });
});
