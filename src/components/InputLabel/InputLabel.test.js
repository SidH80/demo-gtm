import React from 'react';
import InputLabel from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('InputLabel component', () => {
    const renderInputLabel = text => {
        const { getByText } = render(
            <>
                <InputLabel
                    htmlFor='testLabel'
                    label='test label'
                    className='test-class'
                    isRequired
                />
                <input id='testLabel' />
            </>
        );
        return getByText(text);
    };
    it('should render without crashing', () => {
        render(<InputLabel />);
    });
    it('should render a required class when provided as a prop', () => {
        const label = renderInputLabel(/test label/i);
        expect(label).toHaveClass('input-label--required');
    });
    it('should render custom class name when provided as a prop', () => {
        const label = renderInputLabel(/test label/i);
        expect(label).toHaveClass('test-class');
    });
});
