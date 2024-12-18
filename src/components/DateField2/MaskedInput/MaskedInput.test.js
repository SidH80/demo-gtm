import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MaskedInput from './MaskedInput';

describe('MaskedInput', () => {
    const maskedInputRef = createRef();
    const MaskedInputMockComponent = props => {
        return <MaskedInput {...props} ref={maskedInputRef} />;
    };
    describe('Render', () => {
        it.each`
            props                | expectedNumberOfElementsWithErrorClassName
            ${{}}                | ${0}
            ${{ isError: true }} | ${1}
        `(
            'should render $expectedNumberOfElementsWithErrorClassName element(s) with a className of "masked-input__error".',
            ({ props, expectedNumberOfElementsWithErrorClassName }) => {
                const { container } = render(MaskedInputMockComponent(props));
                expect(
                    container.getElementsByClassName('masked-input__error')
                        .length
                ).toBe(expectedNumberOfElementsWithErrorClassName);
            }
        );
    });

    describe('Format User Input (onKeyDown, onKeyUp)', () => {
        it.each`
            userInput       | expectedFormattedOutput
            ${'1'}          | ${'1'}
            ${'5'}          | ${'05/'}
            ${'12'}         | ${'12/'}
            ${'12/1'}       | ${'12/1'}
            ${'12/5'}       | ${'12/05/'}
            ${'12/11'}      | ${'12/11/'}
            ${'12/11/1'}    | ${'12/11/1'}
            ${'12/11/01'}   | ${'12/11/01'}
            ${'12/11/001'}  | ${'12/11/001'}
            ${'12/11/0001'} | ${'12/11/0001'}
        `(
            'should format an input of "$userInput" to "$expectedFormattedOutput."',
            ({ userInput, expectedFormattedOutput }) => {
                render(MaskedInputMockComponent({}));
                const maskedInput = screen.getByRole('textbox');
                userEvent.type(maskedInput, userInput);
                expect(maskedInput.value).toBe(expectedFormattedOutput);
            }
        );

        it.each(['a', '!'])(
            'should reject non-numeric input ("%s").',
            userInput => {
                render(MaskedInputMockComponent({}));
                const maskedInput = screen.getByRole('textbox');
                userEvent.type(maskedInput, userInput);
                expect(maskedInput.value).toBe('');
            }
        );
    });

    describe('Handle Delete key (onKeyDown)', () => {
        it.each`
            userInput     | initialFormattedOutput | lowerBoundSelectionRange | upperBoundSelectionRange | expectedValue
            ${'1'}        | ${'1'}                 | ${0}                     | ${0}                     | ${'1'}
            ${'5'}        | ${'05/'}               | ${1}                     | ${1}                     | ${'0'}
            ${'127'}      | ${'12/07/'}            | ${3}                     | ${3}                     | ${'12/07/'}
            ${'1214'}     | ${'12/14/'}            | ${3}                     | ${3}                     | ${'12/04/'}
            ${'1214'}     | ${'12/14/'}            | ${5}                     | ${5}                     | ${'12/14/'}
            ${'12142023'} | ${'12/14/2023'}        | ${6}                     | ${6}                     | ${'12/14/023'}
            ${'12142023'} | ${'12/14/2023'}        | ${7}                     | ${7}                     | ${'12/14/223'}
            ${'12142023'} | ${'12/14/2023'}        | ${8}                     | ${8}                     | ${'12/14/203'}
        `(
            'should format a user input of "$userInput" to "$expectedValue" when the cursor is moved to the index of "$lowerBoundSelectionRange".',
            ({
                userInput,
                initialFormattedOutput,
                lowerBoundSelectionRange,
                upperBoundSelectionRange,
                expectedValue,
            }) => {
                render(MaskedInputMockComponent({}));
                const maskedInput = screen.getByRole('textbox');
                userEvent.type(maskedInput, userInput);
                expect(maskedInput.value).toBe(initialFormattedOutput);
                maskedInput.setSelectionRange(
                    lowerBoundSelectionRange,
                    upperBoundSelectionRange
                );
                userEvent.type(maskedInput, '{del}');
                expect(expectedValue).toBe(maskedInput.value);
            }
        );
    });

    describe('Handle Backspace key (onKeyDown)', () => {
        it.each`
            userInput     | initialFormattedOutput | lowerBoundSelectionRange | upperBoundSelectionRange | expectedValue
            ${'1'}        | ${'1'}                 | ${0}                     | ${0}                     | ${''}
            ${'5'}        | ${'05/'}               | ${1}                     | ${1}                     | ${'05/'}
            ${'127'}      | ${'12/07/'}            | ${3}                     | ${3}                     | ${'10/07/'}
            ${'1214'}     | ${'12/14/'}            | ${3}                     | ${3}                     | ${'11/04/'}
            ${'12142023'} | ${'12/14/2023'}        | ${6}                     | ${6}                     | ${'12/12/023'}
            ${'12142023'} | ${'12/14/2023'}        | ${7}                     | ${7}                     | ${'12/14/023'}
            ${'12142023'} | ${'12/14/2023'}        | ${8}                     | ${8}                     | ${'12/14/223'}
        `(
            'should format a user input of "$userInput" to "$expectedValue" when the cursor is moved to the index of "$lowerBoundSelectionRange".',
            ({
                userInput,
                initialFormattedOutput,
                lowerBoundSelectionRange,
                upperBoundSelectionRange,
                expectedValue,
            }) => {
                render(MaskedInputMockComponent({}));
                const maskedInput = screen.getByRole('textbox');
                userEvent.type(maskedInput, userInput);
                expect(maskedInput.value).toBe(initialFormattedOutput);
                maskedInput.setSelectionRange(
                    lowerBoundSelectionRange,
                    upperBoundSelectionRange
                );
                userEvent.type(maskedInput, '{backspace}');
                expect(expectedValue).toBe(maskedInput.value);
            }
        );
    });
});
