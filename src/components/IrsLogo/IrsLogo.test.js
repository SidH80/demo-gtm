import React from 'react';
import IrsLogo from './IrsLogo';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { gaPageEventMethods } from '../../helpers/gaService/index.js';

describe('IrsLogo Tests', () => {
    const componentHeader = (
        <BrowserRouter>
            <IrsLogo
                logoUrl='/test'
                logo='/IRS_LOGO.png'
                logoAlt='The logo of this website'
            />
        </BrowserRouter>
    );

    it('should renders with default settings without crashing', () => {
        const { getByRole, getByTestId } = render(<IrsLogo />);
        const wrapper = getByTestId('no-logo-url');
        expect(wrapper).toHaveClass('irs-logo__wrapper');
        const img = getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveClass('irs-logo');
    });

    it('should render a link with an href to /test', () => {
        const { getByRole } = render(componentHeader);
        const link = getByRole('link');
        expect(link).toHaveAttribute('href', '/test');
    });

    it('should call GA event header click via react-ga', () => {
        gaPageEventMethods.sendHeaderIrsLogoClick = jest.fn();
        const { getByRole } = render(componentHeader);
        const link = getByRole('link');
        fireEvent.click(link);
        expect(gaPageEventMethods.sendHeaderIrsLogoClick).toHaveBeenCalled();
    });

    it('should render a logo with alt text', () => {
        const { getByRole } = render(
            <IrsLogo logoAlt='Logo Description' footer={true} />
        );
        const img = getByRole('img');
        expect(img).toHaveAttribute('alt', 'Logo Description');
    });

    it('should set class to active when clicked', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <IrsLogo
                    logoUrl='/test'
                    logo='/IRS_LOGO.png'
                    logoAlt='The logo of this website'
                    disableRef={true}
                />
            </BrowserRouter>
        );
        const link = getByRole('link');
        fireEvent.click(link);
        expect(link).toHaveClass('active');
    });
});
