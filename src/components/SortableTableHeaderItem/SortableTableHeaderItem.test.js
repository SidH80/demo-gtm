import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortableHeaderItem from '.';

describe('SortableHeaderItem Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing when passed no props', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <SortableHeaderItem />
                    </tr>
                </thead>
            </table>
        );

        const headerItemElem = screen.getByRole('columnheader');
        expect(headerItemElem).toHaveClass('header-not-sortable');
    });

    it('renders with correct className when passed with isItemSortable prop', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <SortableHeaderItem
                            className='testClassName'
                            isItemSortable
                        />
                    </tr>
                </thead>
            </table>
        );

        const headerItemElem = screen.getByRole('columnheader');
        expect(headerItemElem).toHaveClass('testClassName');
        expect(headerItemElem).toHaveClass('header-sortable');
    });

    it('should call updateSort when sort button is clicked', () => {
        const updateSortMock = jest.fn();
        const testId = 'test-id';

        render(
            <table>
                <thead>
                    <tr>
                        <SortableHeaderItem
                            className='testClassName'
                            isItemSortable={true}
                            updateSort={updateSortMock}
                            elt={{ id: testId }}
                        />
                    </tr>
                </thead>
            </table>
        );

        const buttonElem = screen.getByRole('button');
        fireEvent.click(buttonElem);
        expect(updateSortMock).toHaveBeenCalledTimes(2);
        expect(updateSortMock).toHaveBeenCalledWith(testId);
    });

    it('should call updateSort when Enter key is pressed', () => {
        const updateSortMock = jest.fn();
        const testId = 'test-id';

        render(
            <table>
                <thead>
                    <tr>
                        <SortableHeaderItem
                            className='testClassName'
                            isItemSortable={true}
                            updateSort={updateSortMock}
                            elt={{ id: testId }}
                        />
                    </tr>
                </thead>
            </table>
        );

        const buttonElem = screen.getByRole('button');
        fireEvent.keyDown(buttonElem, { key: 'Enter' });
        expect(updateSortMock).toHaveBeenCalledTimes(1);
        expect(updateSortMock).toHaveBeenCalledWith(testId);
    });

    it('should call updateSort when Spacebar is pressed', () => {
        const updateSortMock = jest.fn();
        const testId = 'test-id';

        render(
            <table>
                <thead>
                    <tr>
                        <SortableHeaderItem
                            className='testClassName'
                            isItemSortable={true}
                            updateSort={updateSortMock}
                            elt={{ id: testId }}
                        />
                    </tr>
                </thead>
            </table>
        );

        const buttonElem = screen.getByRole('button');
        fireEvent.keyDown(buttonElem, { key: ' ', code: 'Space' });
        expect(updateSortMock).toHaveBeenCalledTimes(1);
        expect(updateSortMock).toHaveBeenCalledWith(testId);
    });
});
