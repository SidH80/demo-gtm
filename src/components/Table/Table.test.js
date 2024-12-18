import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

describe('Table Component Tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(
            <Table
                title='Test Title'
                headerCols={['A', 'B', 'C']}
                dataRows={[
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]}
            />
        );
        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render a title element', () => {
        render(
            <Table
                title='Test Title'
                headerCols={['A', 'B', 'C']}
                dataRows={[
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]}
            />
        );

        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toBeInTheDocument();
    });

    it('should render 3 children', () => {
        render(
            <Table
                title='Test Title'
                headerCols={['A', 'B', 'C']}
                dataRows={[
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]}
            />
        );

        const parentElem = screen.getByRole('table');
        expect(parentElem.children.length).toBe(3);
    });

    it('should have class of sr-only on showCaption = false', () => {
        render(
            <Table
                title='Test Title'
                headerCols={['A', 'B', 'C']}
                dataRows={[
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]}
                showCaption={false}
                caption='Test Table Caption false'
            />
        );

        const tableElem = screen.getByText('Test Table Caption false');
        expect(tableElem).toHaveClass('sr-only');
    });

    it('should not have class of sr-only on showCaption = true', () => {
        render(
            <Table
                title='Test Title'
                headerCols={['A', 'B', 'C']}
                dataRows={[
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]}
                caption='Test Table Caption true'
                showCaption
            />
        );

        const captionElem = screen.getByText('Test Table Caption true');
        expect(captionElem).not.toHaveClass('sr-only');
    });
});
