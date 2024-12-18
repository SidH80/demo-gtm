import React from 'react';
import IrsButton from './IrsButton';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Button Tests', () => {
    const clickEventMock = jest.fn();
    global.window.open = jest.fn();

    let addEventListenerSpy;
    let removeEventListenerSpy;
    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });
    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
        jest.clearAllMocks();
    });

    const renderIrsBtnWithoutProps = (
        <BrowserRouter>
            <IrsButton />
        </BrowserRouter>
    );
    const renderIrsBtnWithProps = (
        <BrowserRouter>
            <IrsButton
                buttonText='Button Text'
                clickEvent={clickEventMock}
                active={false}
                newWindow
                to='profile'
                isPrintIcon={true}
                inverted={true}
                className='new-class'
            />
        </BrowserRouter>
    );

    it('should add event listener on mount', async () => {
        render(renderIrsBtnWithoutProps);
        expect(addEventListenerSpy).toHaveBeenCalled();
        await waitFor(() => {
            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            );
        });
    });

    it('should remove keydown event listener on unmount', () => {
        const { unmount } = render(renderIrsBtnWithoutProps);
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalled();
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
    });
    it('should render without crashing with no props', () => {
        const { getByRole } = render(renderIrsBtnWithoutProps);
        const defaultClasses = 'irs-button irs-button--active';
        const button = getByRole('button');
        expect(button).toHaveClass(defaultClasses);
    });

    it('should render with expected text', () => {
        const { getByText } = render(renderIrsBtnWithProps);
        const buttonText = getByText(/button text/i);
        expect(buttonText).toBeInTheDocument();
    });

    it('should not register click when inactive', () => {
        const { getByRole } = render(renderIrsBtnWithProps);

        const button = getByRole('button');
        fireEvent.click(button);
        expect(clickEventMock).not.toHaveBeenCalled();
        expect(button).toHaveClass('irs-button--disabled');
    });

    it('should register a click on the button', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <IrsButton clickEvent={clickEventMock} />
            </BrowserRouter>
        );

        const button = getByRole('button');
        fireEvent.click(button);
        expect(clickEventMock).toHaveBeenCalled();
    });

    it('should render an external icon', () => {
        const { getByTestId } = render(renderIrsBtnWithProps);

        const externalArrow = getByTestId(/external-icon/i);
        expect(externalArrow).toBeInTheDocument();
    });

    it('should open a new window when "to" prop is supplied', () => {
        const { getByRole } = render(renderIrsBtnWithProps);

        const button = getByRole('button');
        fireEvent.click(button);
        expect(window.open).toHaveBeenCalledWith('profile');
    });

    it('should open a new window at location supplied by the "to" prop', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <IrsButton to='account-balance' />
            </BrowserRouter>
        );

        const button = getByRole('button');
        fireEvent.click(button);
        expect(window.location.pathname).toEqual('/account-balance');
    });

    it('should render a print icon', () => {
        const { getByTestId } = render(renderIrsBtnWithProps);

        const printIcon = getByTestId(/print-icon/i);
        expect(printIcon).toBeInTheDocument();
    });

    it('should render button with inverted colors', () => {
        const { getByRole } = render(renderIrsBtnWithProps);
        const button = getByRole('button');
        expect(button).toHaveClass('inverted');
    });

    it('should render with prop class', () => {
        const { getByRole } = render(renderIrsBtnWithProps);
        const button = getByRole('button');
        expect(button).toHaveClass('new-class');
    });

    it('should trigger active element when spacebar is pressed', () => {
        document.activeElement.click = jest.fn();
        const { getByRole } = render(renderIrsBtnWithoutProps);

        const button = getByRole('button');
        fireEvent.keyDown(button, { keyCode: 32 });
        expect(document.activeElement.click).toHaveBeenCalled();
    });
});
