import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import TextField, { validKeyCodes } from './TextField';
import { formatCurrency } from '../../helpers/formatCurrency';

describe('TextField tests', () => {
    let canInput = jest.fn();

    it('should persist typed data', () => {
        render(<TextField name='foo' canInput={canInput} />);

        userEvent.type(screen.getByRole('textbox'), 'Foo');
        expect(screen.getByRole('textbox')).toHaveValue('Foo');
    });

    it('should permit functional key codes', () => {
        render(<TextField name='foo' canInput={canInput} />);

        const textbox = screen.getByRole('textbox');

        userEvent.type(textbox, 'foo');

        for (let keyCode in validKeyCodes) {
            fireEvent.keyDown(textbox, {
                keyCode,
                code: validKeyCodes[keyCode],
            });
            expect(textbox).toHaveValue('foo');
        }

        fireEvent.keyDown(textbox, { metaKey: true, code: 'OS' });
        expect(textbox).toHaveValue('foo');
        fireEvent.keyDown(textbox, { ctrlKey: true, code: 'Control' });
        expect(textbox).toHaveValue('foo');
        expect(canInput).toHaveBeenCalled();
    });

    it('should run handleBlur method when you leave the field', () => {
        let onBlur = jest.fn();
        const handleBlur = e => {
            onBlur(e);
        };

        render(
            <TextField name='foo' onBlur={handleBlur} canInput={canInput} />
        );

        userEvent.type(screen.getByRole('textbox'), 'abcd');
        userEvent.tab();
        expect(onBlur).toHaveBeenCalled();
    });

    it('should run handleInput method when an input is entered', () => {
        let onInput = jest.fn();
        const handleInput = e => {
            onInput(e);
        };

        render(
            <TextField name='foo' onInput={handleInput} canInput={canInput} />
        );

        userEvent.type(screen.getByRole('textbox'), 'abcd');
        // userEvent.tab()
        expect(onInput).toHaveBeenCalled();
    });

    it('should permit pasting if allowed', () => {
        render(<TextField name='foo' canInput={canInput} />);

        const input = screen.getByRole('textbox');
        userEvent.type(input, '12345');
        userEvent.paste(input, '678');

        expect(input).toHaveValue('12345678');
    });

    it('should reformat the value entered when focused', () => {
        render(<TextField name='foo' canInput={canInput} />);

        const input = screen.getByRole('textbox');
        userEvent.type(input, '$12345');
        userEvent.tab();

        userEvent.click(input);

        expect(input).toHaveValue('12345');
    });

    it('should intercept a value and mutate the textbox value', () => {
        // Adds a hyphen between the 4th and 5th letter character if there
        // are 9 digits
        const formatToCurrency = textBoxValue => {
            const regex = /^\$?-?([1-9]{1}[0-9]{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^-?\$?([1-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/;

            if (regex.test(textBoxValue)) {
                return `${formatCurrency.format(textBoxValue)}`;
            } else {
                return textBoxValue;
            }
        };

        render(
            <TextField
                name='foo'
                interceptValue={formatToCurrency}
                canInput={canInput}
            />
        );

        const input = screen.getByRole('textbox');
        userEvent.type(input, '12345');
        userEvent.tab();
        expect(input).toHaveValue('$12,345.00');
    });

    it('should call the formatOnFocus function when user enters input', () => {
        const formatOnFocusMock = jest.fn();
        render(
            <TextField
                name='TextField'
                canInput={canInput}
                formatOnFocus={formatOnFocusMock}
            />
        );

        userEvent.type(screen.getByRole('textbox'), 'WebApps');
        expect(formatOnFocusMock).toHaveBeenCalled();
    });

    it('should call the formatOnBlur function after user enters input and tabs out of field', () => {
        const formatOnBlurMock = jest.fn();
        render(
            <TextField
                name='TextField'
                canInput={canInput}
                formatOnBlur={formatOnBlurMock}
            />
        );

        userEvent.type(screen.getByRole('textbox'), 'Test');
        userEvent.tab();
        expect(formatOnBlurMock).toHaveBeenCalled();
    });

    it('should render empty textfield if input is not allowed via canInput callback function', () => {
        const notAllowed = x => {
            if (x === '!') return false;
        };
        render(<TextField name='TextField' canInput={notAllowed} />);

        userEvent.type(screen.getByRole('textbox'), '!');
        expect(screen.getByRole('textbox')).toHaveValue('');
    });
});
