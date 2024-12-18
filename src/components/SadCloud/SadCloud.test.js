import React from 'react';
import SadCloud from './index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SadCloud', () => {
    describe('A shallow <SadCloud/>', () => {
        it('should render a <SadCloud/> component', () => {
            render(<SadCloud />);
            const sadCloudElement = screen.getByTestId('service-unavailable');
            expect(sadCloudElement).toBeInTheDocument();
        });

        it('should render a "sad-cloud-img" div', () => {
            render(<SadCloud />);
            const sadCloudImg = screen.getByRole('img');
            expect(sadCloudImg).toBeInTheDocument();
        });

        it('should render a div with testID labeled service-unavailable__content ', () => {
            render(<SadCloud />);
            const sadCloudElement = screen.getByTestId(
                'service-unavailable__content'
            );
            expect(sadCloudElement).toBeInTheDocument();
        });

        it('should render a h2 sad-cloud heading', () => {
            render(<SadCloud />);
            const sadCloudImg = screen.getByRole('heading');
            expect(sadCloudImg).toBeInTheDocument();
        });

        it('should render a sad-cloud banner withProps banner', () => {
            render(<SadCloud banner='test' />);
            const sadCloudImg = screen.getByText('test');
            expect(sadCloudImg).toBeInTheDocument();
        });

        it('should render a sad-cloud banner withProps message', () => {
            render(<SadCloud message='test' />);
            const sadCloudImg = screen.getByText('test');
            expect(sadCloudImg).toBeInTheDocument();
        });
    });
});
