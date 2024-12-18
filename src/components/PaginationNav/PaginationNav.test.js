import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationNav from '.';

describe('Info Icon Tests', () => {
    let currentPage = 1;
    const componentWithProps = (
        <PaginationNav
            currentPage={currentPage}
            totalPages={3}
            paginationLabel={'testLabel'}
        />
    );
    const componentWithLabelProps = (
        <PaginationNav
            currentPage={currentPage}
            totalPages={3}
            paginationLabel={'testLabel'}
            prevLinkLabel='Test Prev'
            nextLinkLabel='Test Next'
        />
    );

    it('renders without crashing with prop labels', () => {
        render(componentWithProps);
    });

    it('should render class .pagination-nav__mute', () => {
        render(
            <PaginationNav currentPage={1} className={'pagination-nav__mute'} />
        );
        const paginationElement = screen.getByTestId('pagination-nav__mute');
        expect(paginationElement).toBeInTheDocument();
    });

    it('should render class .pagination-nav__label', () => {
        render(componentWithProps);
        const PaginationLabel = screen.getByRole('pagination-nav__label');
        expect(PaginationLabel).toBeInTheDocument();
    });

    it('should render a muted chevron left icon when on first page', () => {
        render(componentWithProps);
        const chevronRight = screen.getByTestId('chevron-left-icon--mute');
        expect(chevronRight).toBeInTheDocument();
    });

    it('should render next and previous when no label props passed', () => {
        render(componentWithProps);
        const next = screen.getByText('Next');
        const previous = screen.getByText('Previous');
        expect(next).toBeInTheDocument();
        expect(previous).toBeInTheDocument();
    });

    it('should render test text when label props provided', () => {
        render(componentWithLabelProps);
        const next = screen.getByText('Test Next');
        const previous = screen.getByText('Test Prev');
        expect(next).toBeInTheDocument();
        expect(previous).toBeInTheDocument();
    });

    it('should render an active chevron right icon on first page', () => {
        render(componentWithProps);
        const chevronRight = screen.getByTestId('chevron-right-icon--active');
        expect(chevronRight).toBeInTheDocument();
    });

    it('should render a muted chevron right icon when on last page', () => {
        render(
            <PaginationNav
                currentPage={3}
                totalPages={3}
                paginationLabel={'right icon'}
            />
        );
        const paginationElement = screen.getByTestId(
            'chevron-right-icon--mute'
        );
        expect(paginationElement).toBeInTheDocument();
    });

    it('should render an active chevron left icon when on last page', () => {
        render(
            <PaginationNav
                currentPage={3}
                totalPages={3}
                paginationLabel={'right icon'}
            />
        );
        const paginationElement = screen.getByTestId(
            'chevron-left-icon--active'
        );
        expect(paginationElement).toBeInTheDocument();
    });
});
