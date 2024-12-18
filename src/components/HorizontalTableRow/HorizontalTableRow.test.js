import React from 'react';
import HorizontalTableRow from '.';
require('sinon');
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const columns = [
    2018,
    'Tax Return or Notice',
    '1040, 1040A, 1040EZ',
    '$959.74',
];
const mobileColumns = ['Tax Year', 2014];

describe('HorinzontalTable Tests', () => {
    const indentTableTitleRow = (
        <HorizontalTableRow
            cols={mobileColumns}
            indentTable={true}
            rowIndex={0}
        />
    );
    const indentTableRow = (
        <HorizontalTableRow cols={columns} indentTable={true} rowIndex={1} />
    );

    it('should render with no props without crashing', () => {
        render(<HorizontalTableRow />);
        screen.debug();
        const cell = screen.getByRole('gridcell');
        expect(cell).toBeInTheDocument();
    });

    it('should render top-level indented styled table row', () => {
        const { container } = render(indentTableTitleRow);
        const children = container.getElementsByClassName('.taxYear-end-col');
        expect(children).toBeTruthy();
    });

    it('should render standard table row', () => {
        const { container } = render(indentTableRow);
        const children = container.getElementsByClassName(
            '.table-row-item--indent'
        );
        expect(children).toBeTruthy();
    });
});
