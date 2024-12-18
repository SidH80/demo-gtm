import React from 'react';
import DesktopCalendarContainer from './DesktopCalendarContainer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DesktopCalendarContainer tests', () => {
    it('should render when passed no props', () => {
        const { container } = render(<DesktopCalendarContainer />);
        const desktopMain = container.querySelector(
            '.DesktopCalendarContainer__main'
        );
        expect(desktopMain).toBeInTheDocument();
    });

    it('should render when passed props', () => {
        const { container } = render(
            <DesktopCalendarContainer
                content={<p>Test DesktopCalendarContainer Content</p>}
            />
        );
        const content = container.querySelector(
            '.DesktopCalendarContainer__main div p'
        );
        expect(content).toBeInTheDocument();
    });
});
