import React from 'react';
import IrsLink from './IrsLink';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintIcon from '../PrintIcon';

describe('IrsLink Tests', () => {
    const ariaLabel = 'Link Label';
    const href = '/test-balance';
    const onClickMock = jest.fn();
    const linkDescription = 'Link Label 2';
    const linkDestination = 'test-home';
    const linkDisplayText = 'Link Display text';
    const printIcon = <PrintIcon />;
    const clickEventMock = jest.fn();
    const className = 'test-class';

    const renderIrsLinkWithProps1 = (
        <IrsLink
            aria-label={ariaLabel}
            href={href}
            aria-expanded={true}
            linkDisplayText='Link Display text'
            className={className}
            onClick={onClickMock}
            icon={printIcon}
            addDelineater={true}
            noPadding={true}
        />
    );

    const renderIrsLinkWithProps2 = (
        <IrsLink
            blue={false}
            noPadding={false}
            linkDisplayText={linkDisplayText}
            linkDestination={linkDestination}
            linkDescription={linkDescription}
            newWindow={true}
            className={className}
            clickEvent={clickEventMock}
        />
    );
    it('should render default settings without crashing with no props', () => {
        const { getByText } = render(<IrsLink />);
        const link = getByText(/empty link object provided/i);
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('link link--blue link--no-padding');
        expect(link).toHaveAttribute('target', '_self');
        expect(link).toHaveAttribute('href', '#');
    });

    it('should render child text using linkDisplayText attribute/property', () => {
        const { getByText } = render(renderIrsLinkWithProps2);
        const link = getByText(/link display text/i);
        expect(link).toBeInTheDocument();
    });

    it('should render href using href attribute/property and renders child text', () => {
        const { getByText } = render(renderIrsLinkWithProps1);
        const link = getByText(/link display text/i);
        expect(link).toHaveAttribute('href', '/test-balance');
    });

    it('should render with print icon when supplied as icon prop', () => {
        const { getByTestId } = render(renderIrsLinkWithProps1);
        const printIcon = getByTestId(/print-icon/i);
        expect(printIcon).toBeInTheDocument();
    });

    it('should render with external icon when new window is true', () => {
        const { getByText, getByTestId } = render(renderIrsLinkWithProps2);
        const externalIcon = getByTestId(/external-icon/i);
        expect(externalIcon).toBeInTheDocument();
        const link = getByText(/link display text/i);
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('should render href using linkDestination', () => {
        const { getByText } = render(renderIrsLinkWithProps2);
        const link = getByText(/link display text/i);
        expect(link).toHaveAttribute('href', 'test-home');
    });

    it('should render aria-label using aria-label attribute/property', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps1);
        const link = getByLabelText(/link label/i);
        expect(link).toBeInTheDocument();
    });

    it('should render aria-label using linkDescription attribute/property', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps2);
        const link = getByLabelText(/link label 2/i);
        expect(link).toBeInTheDocument();
    });

    it('should render onClick using onClick attribute/property', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps1);
        const link = getByLabelText(/link label/i);
        fireEvent.click(link);
        expect(onClickMock).toHaveBeenCalled();
    });

    it('should render onClick using clickEvent attribute/property', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps2);
        const link = getByLabelText(/link label 2/i);
        fireEvent.click(link);
        expect(clickEventMock).toHaveBeenCalled();
    });

    it('should render props.addDelineater adds link--delineate', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps1);
        const link = getByLabelText(/link label/i);
        expect(link).toHaveClass('link--delineate');
    });

    it('should render component without addDelineator or default link class', () => {
        const { getByText } = render(<IrsLink removeLinkClass={true} />);
        const link = getByText(/empty link object provided/i);
        expect(link).not.toHaveClass('link--delineate' || 'link');
    });

    it('should render props.blue false removes link--blue', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps2);
        const link = getByLabelText(/link label 2/i);
        expect(link).not.toHaveClass('link--blue');
    });

    it('should render props.noPadding equals false removes link--no-padding', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps2);
        const link = getByLabelText(/link label 2/i);
        expect(link).not.toHaveClass('link--no-padding');
    });

    it('should render props.className adds 1 class', () => {
        const { getByLabelText } = render(renderIrsLinkWithProps2);
        const link = getByLabelText(/link label 2/i);
        expect(link).toHaveClass('test-class');
    });
});
