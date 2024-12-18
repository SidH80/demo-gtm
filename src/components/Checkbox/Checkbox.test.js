import React from 'react';
import ForwardedRefCheckbox, { Checkbox } from './Checkbox.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Checkbox tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(<Checkbox />);
        expect(container).toBeInTheDocument();
    });

    it('should render without crashing while disabled', () => {
        const { container } = render(<Checkbox disabled={true} />);
        expect(container).toBeInTheDocument();
    });

    it('should render without crashing with no props while forwarding refs', () => {
        const { container } = render(<ForwardedRefCheckbox />);
        expect(container).toBeInTheDocument();
    });

    it('should add a ref to the input control', () => {
        const ref = React.createRef();
        render(<Checkbox inputRef={ref} />);

        expect(screen.getByRole('checkbox')).toEqual(ref.current);
    });

    it('should add custom checkbox styling', () => {
        const { container } = render(
            <Checkbox className='my-checkbox-style' />
        );
        expect(
            container.getElementsByClassName('my-checkbox-style').length
        ).toBe(1);
    });

    it('should pass other props to the checkbox', () => {
        const { getByRole } = render(<Checkbox id='foo' disabled='true' />);
        const checkboxElement = getByRole('checkbox');
        expect(checkboxElement.getAttribute('id')).toBe('foo');
        expect(checkboxElement).toBeDisabled();
    });

    it('should render a label', () => {
        render(<Checkbox label='Test Label' />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
});
