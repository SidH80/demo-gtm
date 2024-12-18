import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow from '.';

describe('TableRow Component Tests', () => {
    it('should render without crashing with no props', () => {
        const { container } = render(
            <table>
                <thead>
                    <TableRow cols={[1, 2, 3, 4]} header />
                </thead>
            </table>
        );

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should have four children', () => {
        render(
            <table>
                <thead>
                    <TableRow cols={[1, 2, 3, 4]} header />
                </thead>
            </table>
        );

        const tableElem = screen.getAllByRole('row');
        const childrenNum = tableElem[0].children;
        expect(childrenNum.length).toBe(4);
    });

    it('should have a width of 100% if the passed prop contains one column', () => {
        render(
            <table>
                <thead>
                    <TableRow cols={[1]} />
                </thead>
            </table>
        );

        const columnText = screen.getByText('1');
        expect(columnText).toHaveStyle('width:100%');
    });
});
