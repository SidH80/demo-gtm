import React from 'react';
import TextFieldError from './TextFieldError';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TextFieldError Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(<TextFieldError />);
        expect(container).toBeInTheDocument();
    });

    it('renders error message', () => {
        render(
            <TextFieldError isError={true} errorMessage={'Invalid input'} />
        );

        const errorText = screen.getByText(/invalid input/i);
        expect(errorText).toBeInTheDocument();
    });

    it('renders error message with error label class "error-message_label_cltp"', () => {
        const { container } = render(
            <TextFieldError
                errorMessageLabel={true}
                errorMessage={'Error has occured'}
            />
        );

        const errorText = screen.getByText(/error has occured/i);
        expect(errorText).toBeInTheDocument();
        expect(
            container.getElementsByClassName('error-message_label_cltp').length
        ).toBe(1);
    });
});
