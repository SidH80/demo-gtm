import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SingleSelect, validateOptionProp } from './SingleSelect';

describe('SingleSelect tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(<SingleSelect />);

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render a list of options', () => {
        render(
            <SingleSelect>
                <option value='foo'>Foo</option>
                <option value='bar'>Bar</option>
            </SingleSelect>
        );

        expect(screen.getAllByRole('option').length).toBe(2);
    });

    it('should contain the forwarded ref in the DOM', () => {
        const ref = React.createRef();
        render(<SingleSelect inputRef={ref} />);

        const inputElement = ref.current;
        expect(inputElement).toBeInTheDocument();
    });

    it('should add an id to the select control', () => {
        render(<SingleSelect id='testId' />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveAttribute('id', 'testId');
    });

    it('should add a name to the select control', () => {
        render(<SingleSelect name='testName' />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveAttribute('name', 'testName');
    });

    it('should add a required attribute to the select control', () => {
        render(<SingleSelect required />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveAttribute('required');
    });

    it('should disable the select control', () => {
        render(<SingleSelect disabled />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveAttribute('disabled');
    });

    it('should style the input accordingly with an error', () => {
        render(<SingleSelect hasError={true} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveClass('single-select--error');
    });

    it('should invoke a callback when the select control receives focus', () => {
        const mockCb = jest.fn();
        render(<SingleSelect onFocus={mockCb} />);

        // Simulate a focus event
        const selectElement = screen.getByRole('combobox');
        userEvent.tab(selectElement);
        expect(mockCb).toHaveBeenCalledTimes(1);
    });

    it('should invoke a callback when the select control loses focus', () => {
        const mockCb = jest.fn();
        render(<SingleSelect onBlur={mockCb} />);

        // Simulate a blur event
        const selectElement = screen.getByRole('combobox');
        userEvent.tab(selectElement);
        userEvent.click(document.body);
        expect(mockCb).toHaveBeenCalledTimes(1);
    });

    it('should invoke a callback when the select control value changes', () => {
        const mockCb = jest.fn();
        render(
            <SingleSelect onChange={mockCb}>
                <option value='foo'>Foo</option>
                <option value='bar'>Bar</option>
            </SingleSelect>
        );

        // Simulate a change event
        const selectElement = screen.getByRole('combobox');
        userEvent.selectOptions(selectElement, 'bar');
        expect(mockCb).toHaveBeenCalledTimes(1);
    });
});
