import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import StepIndicatorItem from './StepIndicatorItem';

describe('StepIndicatorItem Tests', () => {
    it('renders active status without crashing', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={2}
                title='Title Test'
                status='active'
                totalSteps={3}
                onKnotClick={() => {}}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders completed status without crashing', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={2}
                title='Title Test'
                status='completed'
                totalSteps={3}
                onKnotClick={() => {
                    console.log('test');
                }}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders finished status without crashing', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={3}
                title='Title Test'
                status='finished'
                totalSteps={3}
                onKnotClick={() => {}}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders default status without crashing', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={3}
                title='Title Test'
                status='default'
                totalSteps={3}
                onKnotClick={() => {}}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render active knot class', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={2}
                title='Title Test'
                status='active'
                totalSteps={3}
                onKnotClick={() => {}}
                screenReaderStatus='active status'
            />
        );

        const activeElement = container.querySelector(
            '.stepIndicator-knot-active'
        );
        expect(activeElement).toBeInTheDocument();
    });

    it('should render default label class', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={3}
                title='Title Test'
                status='default'
                totalSteps={3}
                onKnotClick={() => {}}
            />
        );

        const defaultElement = container.querySelector('.stepIndicator-label');
        expect(defaultElement).toBeInTheDocument();
    });

    it('should render finish knot class', () => {
        const { container } = render(
            <StepIndicatorItem
                stepNum={3}
                title='Title Test'
                status='finished'
                totalSteps={3}
                onKnotClick={() => {}}
            />
        );

        const finishedElement = container.querySelector(
            '.stepIndicator-knot-finished'
        );
        expect(finishedElement).toBeInTheDocument();
    });

    it('should call setStep prop function', () => {
        const clickMockFn = jest.fn();
        render(
            <StepIndicatorItem
                stepNum={2}
                title='Title Test'
                status='completed'
                totalSteps={3}
                onKnotClick={clickMockFn}
            />
        );

        userEvent.click(screen.getByLabelText('Title Test not active'));
        expect(clickMockFn).toHaveBeenCalledTimes(1);
    });
});
