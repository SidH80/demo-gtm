import React from 'react';
import DropdownIcon from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('DropDownIcon Tests', () => {
    it('should render the component with "Menu" text button', () => {
        render(<DropdownIcon />);
        const defaultText = screen.getByText('Menu');
        expect(defaultText).toBeInTheDocument();
    });

    it('should render the component with "Close" text button', () => {
        render(<DropdownIcon open={true} />);
        const defaultText = screen.getByText('Close');
        expect(defaultText).toBeInTheDocument();
    });

    it('should render the component with "Cerrar" and "Menu" props text button', () => {
        render(<DropdownIcon hasLangPicker={true} menuLabelMenu={'Menu'} />);
        const menuLabelMenu = screen.getByText('Menu');
        expect(menuLabelMenu).toBeInTheDocument();
    });

    it('should render the component with "Cerrar" and "Menu" props text button', () => {
        render(
            <DropdownIcon
                open={true}
                hasLangPicker={true}
                menuLabelClose={'Cerrar'}
            />
        );
        const menuLabelClose = screen.getByText('Cerrar');
        expect(menuLabelClose).toBeInTheDocument();
    });
});
