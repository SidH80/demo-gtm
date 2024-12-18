import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { create } from 'react-test-renderer';

import SectionAlert, { SectionAlertTitle } from '.';

describe('SectionAlert component tests', () => {
    it('renders an error section alert without crashing', () => {
        const error = create(
            <SectionAlert className='test-classname' variant='error'>
                <SectionAlertTitle element='h2'>Error</SectionAlertTitle>
                <p>Error</p>
            </SectionAlert>
        );
        error.unmount();
    });

    it('renders an info section alert without crashing', () => {
        const info = create(
            <SectionAlert variant='info'>
                <SectionAlertTitle>Info</SectionAlertTitle>
                <p>Info</p>
            </SectionAlert>
        );
        info.unmount();
    });

    it('renders an success section alert without crashing', () => {
        const success = create(
            <SectionAlert variant='success'>
                <SectionAlertTitle>Success</SectionAlertTitle>
                <p>Success</p>
            </SectionAlert>
        );
        success.unmount();
    });

    it('renders a warning section alert without crashing', () => {
        const warning = create(
            <SectionAlert variant='warning'>
                <SectionAlertTitle>Warning</SectionAlertTitle>
                <p>Warning</p>
            </SectionAlert>
        );
        warning.unmount();
    });

    it('should render an unweighted h3 element', () => {
        render(
            <SectionAlert variant='warning'>
                <SectionAlertTitle data-testid='test' unWeighted={true}>
                    Title
                </SectionAlertTitle>
            </SectionAlert>
        );
        expect(screen.getByTestId('test')).toBeInTheDocument();
    });
});
