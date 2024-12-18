import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionTitle from './SectionTitle';

const headlineContentGetter = jest.fn(() => {
    return 'Headline Content';
});

const subHeaderSetter = jest.fn(() => {
    return 'Additional Content';
});

describe('SectionTitle tests', () => {
    it('should render without crashing', () => {
        const { container } = render(
            <SectionTitle
                headlineContentGetter={headlineContentGetter}
                subHeaderSetter={subHeaderSetter}
            />
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render headline content when headlineContent is available but additionalContent is not available', () => {
        const { container } = render(
            <SectionTitle headlineContentGetter={headlineContentGetter} />
        );

        const headlineContentElement = screen.getByText('Headline Content');
        expect(headlineContentElement).toBeInTheDocument();
        const additionalContentElement = container.querySelector(
            'Additional Content'
        );
        expect(additionalContentElement).not.toBeInTheDocument();
    });

    it('should render additional content if it is available', () => {
        render(
            <SectionTitle
                headlineContentGetter={headlineContentGetter}
                subHeaderSetter={subHeaderSetter}
            />
        );

        const headlineContentElement = screen.getByText('Headline Content');
        expect(headlineContentElement).toBeInTheDocument();
        const additionalContentElement = screen.getByText('Additional Content');
        expect(additionalContentElement).toBeInTheDocument();
    });

    it('should render Account Home as default headline content ', () => {
        render(<SectionTitle />);

        const defaultHeadlineContentElement = screen.getByText('Account Home');
        expect(defaultHeadlineContentElement).toBeInTheDocument();
    });
});
