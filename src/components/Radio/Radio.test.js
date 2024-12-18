import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Radio from '.';

describe('Radio component', () => {
    const fakeChangeProp = jest.fn();
    const fakeChangeContext = jest.fn();

    const noChangePropsRender = () =>
        render(
            <Radio
                value='Test Value'
                id='testID'
                label='Test Label'
                name='test'
                disabled={false}
            />
        );

    const component = () =>
        render(
            <Radio
                value='Test Value'
                id='testID'
                label='Test Label'
                name='test'
                onChange={fakeChangeProp}
                disabled={false}
            />
        );

    it('should render without crashing', () => {
        component();

        const radio = screen.getByTestId('testID');
        const label = screen.getByText('Test Label');

        expect(radio).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });

    it('should not crash if onChange prop is not passed', async () => {
        noChangePropsRender();

        const radio = screen.getByLabelText('Test Label');
        expect(radio).not.toBeChecked();
        await fireEvent.click(radio);
        expect(radio).toBeChecked();
    });

    it('should not crash when onFocus default prop is called', async () => {
        component();
        const radio = screen.getByTestId('testID');
        radio.focus();
        expect(radio).toHaveFocus();
        radio.blur();
        expect(radio).not.toHaveFocus();
    });

    it('should apply selected class styles if selected', () => {
        render(
            <Radio
                name='test-radio'
                value='test'
                id='test-radio'
                selected={true}
            />
        );
        const radio = screen.getByTestId('test-radio');
        expect(radio).not.toHaveClass('radio-button--checked');
    });

    it('should not apply selected class styles if not selected', () => {
        render(
            <Radio
                name='test-radio'
                value='test'
                id='test-radio'
                selected={false}
            />
        );
        const radio = screen.getByTestId('test-radio');
        expect(radio).not.toHaveClass('radio-button--checked');
    });

    it('should not apply disabled class style if disabled', () => {
        render(<Radio name='test-radio' value='test' id='test-radio' />);
        const radio = screen.getByTestId('test-radio');
        expect(radio).not.toHaveClass('radio-button__input--disabled');
    });

    it('should apply disabled class style if disabled', () => {
        render(
            <Radio name='test-radio' value='test' id='test-radio' disabled />
        );
        const radio = screen.getByTestId('test-radio');
        expect(radio).toHaveClass('radio-button__input--disabled');
    });

    it('should apply required and aria-required=false attributes with required attribute present', () => {
        render(<Radio name='test-radio' value='test' id='test-radio' />);
        const radio = screen.getByTestId('test-radio');
        expect(radio).toHaveAttribute('aria-required', 'false');
    });

    it('should apply required and aria-required=true attributes with required attribute present', () => {
        render(
            <Radio name='test-radio' value='test' required id='test-radio' />
        );
        const radio = screen.getByTestId('test-radio');
        expect(radio).toHaveAttribute('aria-required');
    });
});
