import React from 'react';
import RadioInput from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RadioInput component', () => {
    const fakeChangeProp = jest.fn();
    const fakeFocus = jest.fn();

    it('should render without props', () => {
        render(<RadioInput />);
        const radioInputContainer = screen.getByTestId('radio-input-container');
        expect(radioInputContainer).toBeInTheDocument();
    });

    it('should render with props', () => {
        render(
            <RadioInput
                value='Test Value'
                id='testID'
                label='Test Label'
                name='test'
                inputFieldLabel='test input label'
                inputFieldName='dlnInput'
                onFocus={fakeFocus}
                inputFieldHelperText='Enter the 14-digit control number provided on your letter.'
                onChange={fakeChangeProp}
            />
        );

        const radioInputContainer = screen.getByTestId('radio-input-container');
        expect(radioInputContainer).toBeInTheDocument();
    });

    it('should render inputFieldHelperText prop', () => {
        render(
            <RadioInput inputFieldHelperText='Enter the 14-digit control number provided on your letter.' />
        );

        const inputFieldHelperText = screen.getByText(
            'Enter the 14-digit control number provided on your letter.'
        );
        expect(inputFieldHelperText).toBeInTheDocument();
    });

    it('should render inputFieldLabel prop', () => {
        render(<RadioInput inputFieldName='dlnInput' />);

        const inputFieldName = screen.getByTestId('dlnInput');
        expect(inputFieldName).toBeInTheDocument();
    });
});
