import React from 'react';
import InputErrorMessage from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('InputErrorMessage component', () => {
    it('should render without props', () => {
        render(<InputErrorMessage />);
    });

    it('should render with props', () => {
        const { getByRole, getByText } = render(
            <InputErrorMessage errorMessage='Error Message' component='h2' />
        );
        const errMsg = getByText(/error message/i);
        expect(errMsg).toBeInTheDocument();
        const component = getByRole('heading', { level: 2 });
        expect(component).toBeInTheDocument();
    });

    it('should render with a p tag as the default', () => {
        const { container } = render(
            <InputErrorMessage errorMessage='Error Message' />
        );

        const component = container.querySelector('p');
        expect(component).toBeInTheDocument();
    });

    // default component should have aria-live attribute set to polite
    it('should set default aria-live to polite', () => {
        const { getByText } = render(
            <InputErrorMessage errorMessage='Error Message' component='h2' />
        );

        const component = getByText('Error Message');
        expect(component).toHaveAttribute('aria-live', 'polite');
    });

    // passing additional props such as aria-live='off' should override the default aria-live property
    it('should allow aria-live to be overridden', () => {
        const { getByText } = render(
            <InputErrorMessage
                errorMessage='Error Message'
                component='h2'
                aria-live='off'
            />
        );

        const component = getByText('Error Message');
        expect(component).toHaveAttribute('aria-live', 'off');
    });
});
