import React from 'react';
import HorizontalTable from '.';
require('sinon');
import { screen, render } from '@testing-library/react';

const headers = ['Tax Period', 'Reason For Payment', 'Tax Type', 'Amount Owed'];

const data = [
    [2018, 'Tax Return or Notice', '1040, 1040A, 1040EZ', '$959.74'],
    [2017, 'Tax Return or Notice', '1040, 1040A, 1040EZ', '$666.23'],
    [2016, 'Tax Return or Notice', '1040, 1040A, 1040EZ', '$14.74'],
    [2015, 'Tax Return or Notice', '1040, 1040A, 1040EZ', '$1020.23'],
];

const singleRow = [['This is a single, content item.']];

describe('HorizontalTable Tests', () => {
    const component = <HorizontalTable headerCols={headers} dataRows={data} />;
    const singleRowComponent = (
        <HorizontalTable headerCols={headers} dataRows={singleRow} />
    );

    it('should have 4 children', () => {
        render(component);
        const children = screen.getAllByRole('gridcell').length;
        expect(children).toEqual(4);
    });
    it('should not push a header row when dataRows is equal to 1', () => {
        render(singleRowComponent);
        const children = screen.getAllByRole('gridcell').length;
        expect(children).toEqual(1);
    });
});
