import React from 'react';
import HelptipButton from '../HelptipButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('HelptipButton tests', () => {
    it('should render when passed no props', () => {
        render(<HelptipButton />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should invoke custom function on click', async () => {
        const mock = jest.fn();
        render(<HelptipButton clickHandler={mock} />);
        const button = screen.getByRole('button');
        userEvent.click(button);
        expect(mock).toHaveBeenCalled();
    });
});
