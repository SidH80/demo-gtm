import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepIndicator from './StepIndicator';

describe('StepIndicator Tests', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <StepIndicator
                currentStep={1}
                onKnotClick={() => {}}
                titles={['Step 1', 'Step 2', 'Step 3']}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render step indicator wrapper', () => {
        const { container } = render(
            <StepIndicator
                currentStep={1}
                onKnotClick={() => {}}
                titles={['Step 1', 'Step 2', 'Step 3']}
            />
        );

        expect(container.firstChild).toHaveClass('stepIndicator-wrapper');
    });

    it('should render step 1 with the active status text', () => {
        render(
            <StepIndicator
                currentStep={1}
                titles={['Step 1', 'Step 2', 'Step 3']}
                screenReaderStatus={{
                    active: 'active status',
                    completed: 'completed status',
                    finished: 'finished status',
                    not_active: 'not active status',
                }}
            />
        );

        const childrenListItems = screen.getByRole('list');

        expect(childrenListItems.children[0]).toHaveTextContent(
            'active status'
        );
        expect(childrenListItems.children[1]).toHaveTextContent(
            'not active status'
        );
        expect(childrenListItems.children[2]).toHaveTextContent(
            'not active status'
        );
    });

    // Note: completed status does not have '.sr-only' class, it does not render screen reader status on screen just the title
    it('should render step 2 with the active status text', () => {
        render(
            <StepIndicator
                currentStep={2}
                titles={['Step 1', 'Step 2', 'Step 3']}
                screenReaderStatus={{
                    active: 'active status',
                    completed: 'completed status',
                    finished: 'finished status',
                    not_active: 'not active status',
                }}
            />
        );

        const childrenListItems = screen.getByRole('list');
        const firstListItemCompleted = screen.getByLabelText(
            'Step 1 completed status'
        );

        expect(firstListItemCompleted).toBeInTheDocument();
        expect(childrenListItems.children[0]).toHaveTextContent('Step 1');
        expect(childrenListItems.children[1]).toHaveTextContent(
            'active status'
        );
        expect(childrenListItems.children[2]).toHaveTextContent(
            'not active status'
        );
    });

    it('should render step 3 with the active status text', () => {
        render(
            <StepIndicator
                currentStep={3}
                titles={['Step 1', 'Step 2', 'Step 3']}
                screenReaderStatus={{
                    active: 'active status',
                    completed: 'completed status',
                    finished: 'finished status',
                    not_active: 'not active status',
                }}
            />
        );

        const childrenListItems = screen.getByRole('list');

        expect(childrenListItems.children[0]).toHaveTextContent(
            'finished status'
        );
        expect(childrenListItems.children[1]).toHaveTextContent(
            'finished status'
        );
        expect(childrenListItems.children[2]).toHaveTextContent(
            'active status'
        );
    });
});
