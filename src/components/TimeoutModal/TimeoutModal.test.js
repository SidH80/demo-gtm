import React from 'react';
import TimeoutModal from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeout } from '../../helpers';
import { BrowserRouter } from 'react-router-dom';

describe('TimeoutModal component', () => {
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    const continueFunctionMock = jest.fn();
    const timeoutObject = new Timeout();

    it('renders without crashing with no props', () => {
        const { container } = render(
            <BrowserRouter>
                <TimeoutModal />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it('focus on H1 header when Timeout Modal is rendered  ', () => {
        render(
            <BrowserRouter>
                <TimeoutModal />
            </BrowserRouter>
        );
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toHaveFocus();
    });

    it('should render appropriate text when Timeout Modal is displayed and passed props', async () => {
        jest.useFakeTimers();

        render(
            <BrowserRouter>
                <TimeoutModal
                    timeoutObject={timeoutObject}
                    continueText={'YES'}
                    endText={'NO'}
                    promptText={'Do you need more time?'}
                    countDownText={'Time remaining: '}
                    headerId={'headerId'}
                    sessionEndTime={120000}
                    duration={600000}
                />
            </BrowserRouter>
        );
        const yesText = await screen.findByText(/yes/i);
        const noText = await screen.findByText(/no/i);
        const needMoreTimeText = await screen.findByText(
            /do you need more time/i
        );
        const timeRemainingText = await screen.findByText(/time remaining/i);

        expect(yesText).toBeInTheDocument();
        expect(noText).toBeInTheDocument();
        expect(needMoreTimeText).toBeInTheDocument();
        expect(timeRemainingText).toBeInTheDocument();
    });

    it('should format time and display time remaining', async () => {
        jest.useFakeTimers('modern');
        const fakeDate = new Date(1708120805775); //Feb 16 2024 5:00pm converted to milliseconds
        jest.setSystemTime(fakeDate);
        const sessionEndTime = 1708121105775; //Adds 5 minutes to fakeDate

        render(
            <BrowserRouter>
                <TimeoutModal
                    timeoutObject={timeoutObject}
                    countDownText={'Time remaining: '}
                    headerId={'headerId'}
                    sessionEndTime={sessionEndTime}
                    duration={600000}
                />
            </BrowserRouter>
        );
        const timeRemainingText = await screen.findByText(
            /time remaining: 4:59/i
        );

        expect(timeRemainingText).toBeInTheDocument();
    });

    it('should call continue function when YES button (extend session) is clicked', () => {
        render(
            <BrowserRouter>
                <TimeoutModal
                    timeoutObject={timeoutObject}
                    continueText={'YES'}
                    endText={'NO'}
                    promptText={'Do you need more time?'}
                    countDownText={'Time remaining: '}
                    continueFunction={continueFunctionMock}
                    headerId={'headerId'}
                    sessionEndTime={500000}
                    duration={10}
                />
            </BrowserRouter>
        );

        const continueButton = screen.getByText('YES');
        fireEvent.click(continueButton);
        expect(continueFunctionMock).toHaveBeenCalled();
    });

    it('should call logout function when NO button (end session) is clicked', () => {
        const logoutMock = jest.fn();

        render(
            <BrowserRouter>
                <TimeoutModal
                    timeoutObject={timeoutObject}
                    continueText={'YES'}
                    endText={'NO'}
                    promptText={'Do you need more time?'}
                    countDownText={'Time remaining: '}
                    logout={logoutMock}
                    headerId={'headerId'}
                    sessionEndTime={500000}
                    duration={10}
                />
            </BrowserRouter>
        );

        const endSessionButton = screen.getByText('NO');
        fireEvent.click(endSessionButton);
        expect(logoutMock).toHaveBeenCalled();
    });

    it('should render spanish props', () => {
        render(
            <BrowserRouter>
                <TimeoutModal
                    promptText={'Necesitas más tiempo?'}
                    hasLangPicker={true}
                    headerId={'headerId'}
                />
            </BrowserRouter>
        );

        const continueButtonEn = screen.queryByText(/do you need more time/i);
        const continueButtonEs = screen.getByText(/necesitas más tiempo?/i);
        expect(continueButtonEn).not.toBeInTheDocument();
        expect(continueButtonEs).toBeInTheDocument();
    });

    it('should focus background modal header if primary modal is closed', async () => {
        render(
            <BrowserRouter>
                <TimeoutModal
                    continueText={'YES'}
                    endText={'NO'}
                    promptText={'Do you need more time?'}
                    continueFunction={continueFunctionMock}
                    sessionEndTime={500000}
                    duration={15}
                />
                <TimeoutModal
                    continueText={'YES, I WANT TO LEAVE'}
                    endText={'NO, I WANT TO REMAIN'}
                    promptText={'Do you want to leave the page?'}
                    continueFunction={continueFunctionMock}
                    sessionEndTime={500000}
                    duration={10}
                />
            </BrowserRouter>
        );

        const continueButton = screen.getByText('YES');
        fireEvent.click(continueButton);

        const modalHeaders = screen.getAllByRole('heading', { level: 1 });
        expect(modalHeaders).toHaveLength(2);

        const primaryModalH1 = screen.getByRole('heading', {
            name: 'Do you need more time?',
            level: 1,
        });

        const backgroundModalH1 = screen.getByRole('heading', {
            name: 'Do you want to leave the page?',
            level: 1,
        });

        expect(primaryModalH1).not.toHaveFocus();
        expect(backgroundModalH1).toHaveFocus();
    });
});
