import React from 'react';
import PopUp from './PopUp';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PopUp tests', () => {
    it('should render when passed no props', () => {
        const { container } = render(<PopUp />);
        const popup = container.querySelector('.PopUp__main');
        const closeIcon = container.querySelector('.PopUp__closeIcon');
        expect(popup).toBeInTheDocument();
        expect(closeIcon).toBeInTheDocument();
    });

    it('should render when passed props', () => {
        const { container } = render(
            <PopUp content={<p>Test PopUp Content</p>} />
        );
        const testContent = container.querySelector('.PopUp__container p');
        expect(testContent).toBeInTheDocument();
    });
});
