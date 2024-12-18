import React from 'react';
import RadioInputNew from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RadioInputNew component', () => {
    it('should render without props', () => {
        const { container } = render(<RadioInputNew />);

        const firstChild = container.firstChild;
        expect(firstChild).toHaveClass('radio-input-container');
    });

    it('should call onFocus prop when focus event fired', () => {
        const onFocusMock = jest.fn();
        render(<RadioInputNew onFocus={onFocusMock} />);

        const radioInput = screen.getByRole('textbox');
        fireEvent.focus(radioInput);
        expect(onFocusMock).toHaveBeenCalled();
    });
});
