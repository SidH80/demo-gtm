import React from 'react';
import ContentBox from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('ContentBox Component Tests', () => {
    const component = (
        <ContentBox title='Mock' border>
            <h1>Test Content</h1>
            <p>Consistent Test Content</p>
        </ContentBox>
    );

    it('should render without crashing with no children', () => {
        render(component);
        expect(screen.getByText('Mock')).toBeInTheDocument();
    });

    it('should render with .content-box-title tag', () => {
        render(component);
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should render with .content-box-content tag', () => {
        render(
            <ContentBox title='Mock' border>
                <h1>Test Content</h1>
                <p>Consistent Test Content</p>
            </ContentBox>
        );

        expect(
            screen.getByRole('heading', { name: 'Test Content' })
        ).toBeInTheDocument();
    });

    it('should have .content-box-border when prop border is true', () => {
        render(
            <ContentBox title='Mock' border>
                <h1>Test Content</h1>
                <p>Consistent Test Content</p>
            </ContentBox>
        );

        expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should render a different title component', () => {
        const myComp = (
            <ContentBox title='Mock' border titleComponent='h4'>
                <h1>Test Content</h1>
                <p>Consistent Test Content</p>
            </ContentBox>
        );

        render(myComp);
        expect(
            screen.getByRole('heading', { name: 'Mock' })
        ).toBeInTheDocument();
    });

    it('should render a different title id', () => {
        const myComp = (
            <ContentBox title='Mock' border titleId='someId'>
                <h1>Test Content</h1>
                <p>Consistent Test Content</p>
            </ContentBox>
        );

        render(myComp);

        expect(
            screen.getByRole('region', { name: 'Mock' })
        ).toBeInTheDocument();
    });
});
