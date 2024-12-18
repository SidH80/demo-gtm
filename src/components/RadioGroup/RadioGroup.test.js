import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioGroup from '.';
import Radio from '../Radio';

describe('RadioGroup component', () => {
    const fakeOnChange = jest.fn();

    const children = (
        <Radio
            key='inputButton'
            id='inputButton'
            label='inputButton'
            name='inputButton'
            onChange={fakeOnChange}
            disabled={false}
            value=''
        />
    );
    it('should render without props', () => {
        render(<RadioGroup children='testRadio' name='testRadio' />);
        const noPropsWrapper = screen.getByTestId('radio-group');
        expect(noPropsWrapper).toBeInTheDocument();
    });

    it('should render a legend with props ', () => {
        render(
            <RadioGroup
                children='testRadio'
                name='testRadio'
                renderLegend={true}
                legend='testLegend'
            />
        );
        const legendText = screen.getByTestId('legend');
        expect(legendText).toBeInTheDocument();
        expect(legendText).not.toHaveClass('sr-only');
    });

    it('should call onChange prop if one is supplied', async () => {
        render(
            <RadioGroup
                children={[children]}
                data-testId={'testRadio'}
                onChange={fakeOnChange}
            />
        );
        const inputButton = screen.getByRole('radio');
        fireEvent.change(inputButton, { target: { value: 'inputButton' } });
        expect(inputButton).toHaveAttribute('value', 'inputButton');
    });
});
