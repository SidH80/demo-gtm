import React from 'react';
import TimeoutWrapper from '.';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('Timeout Wrapper tests', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render without crashing with no props', () => {
        const { container } = render(<TimeoutWrapper />);
        expect(container).toBeInTheDocument();
    });

    it('should render TimeoutModal after user is idle for 10 minutes', () => {
        jest.useFakeTimers();
        render(
            <BrowserRouter>
                <TimeoutWrapper />
            </BrowserRouter>
        );
        act(() => {
            jest.advanceTimersByTime(600000);
        });

        const h1 = screen.getByRole('heading', { level: 1 });
        const yesButton = screen.getByText(/yes/i);
        const noButton = screen.getByText(/no, logout/i);

        expect(h1).toBeInTheDocument();
        expect(h1).toHaveTextContent(/do you need more time/i);
        expect(yesButton).toBeInTheDocument();
        expect(noButton).toBeInTheDocument();
    });

    it('should have focus on H1', () => {
        jest.useFakeTimers();

        render(
            <BrowserRouter>
                <TimeoutWrapper />
            </BrowserRouter>
        );
        act(() => {
            jest.advanceTimersByTime(600000);
        });

        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toHaveFocus();
    });

    it('should hide Medallia invitation and survey when Timeout Modal is shown', () => {
        jest.useFakeTimers();
        render(
            <BrowserRouter>
                <TimeoutWrapper />
            </BrowserRouter>
        );
        document.body.innerHTML = `
            <span id="MDigitalInvitationWrapper"></span>
            <span id="MDigitalLightboxWrapper"></span>
            `;
        const medalliaInvitation = document.getElementById(
            'MDigitalInvitationWrapper'
        );
        const medalliaSurvey = document.getElementById(
            'MDigitalLightboxWrapper'
        );
        act(() => {
            jest.advanceTimersByTime(600000);
        });

        expect(medalliaInvitation).toHaveStyle('display:none');
        expect(medalliaSurvey).toHaveStyle('display:none');
    });

    it('should show the Medallia invitation and survey if they were visible prior to Timeout Modal', () => {
        jest.useFakeTimers();
        const continueMock = jest.fn();
        render(
            <BrowserRouter>
                <TimeoutWrapper onContinue={continueMock} />
            </BrowserRouter>
        );
        document.body.append.innerHTML = `
            <span id="MDigitalInvitationWrapper"></span>
            <span id="MDigitalLightboxWrapper"></span>
            `;
        const medalliaInvitation = document.getElementById(
            'MDigitalInvitationWrapper'
        );
        const medalliaSurvey = document.getElementById(
            'MDigitalLightboxWrapper'
        );
        act(() => {
            jest.advanceTimersByTime(600000);
        });

        expect(medalliaInvitation).toHaveStyle('display:none');
        expect(medalliaSurvey).toHaveStyle('display:none');

        const yesButton = screen.getByText('YES');
        fireEvent.click(yesButton);

        expect(medalliaInvitation).toHaveStyle('display:block');
        expect(medalliaSurvey).toHaveStyle('display:block');
    });

    it('should allow the user to continue after clicking YES', () => {
        jest.useFakeTimers();
        const continueMock = jest.fn();

        render(
            <BrowserRouter>
                <TimeoutWrapper logoutUrl='/logout' onContinue={continueMock} />
            </BrowserRouter>
        );
        act(() => {
            jest.advanceTimersByTime(600000);
        });

        const continueButton = screen.getByText(/yes/i);
        fireEvent.click(continueButton);
        expect(continueMock).toHaveBeenCalledTimes(1);
    });

    it('should not be visible if not idle for more than 10 min', () => {
        jest.useFakeTimers();

        render(
            <BrowserRouter>
                <TimeoutWrapper />
            </BrowserRouter>
        );
        act(() => {
            jest.advanceTimersByTime(500000);
        });

        const ariaRole = screen.queryByRole('dialog');
        expect(ariaRole).not.toBeInTheDocument();
    });
});
