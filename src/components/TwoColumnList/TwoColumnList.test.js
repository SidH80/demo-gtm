import React from 'react';
import TwoColumnList from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Two Column List Component Tests', () => {
    const listData = { a: 1, b: 2, c: 3 };

    it('should render without crashing with no props', () => {
        const { container } = render(<TwoColumnList />);
        expect(container).toBeInTheDocument();
    });

    it('should render with props', () => {
        const { container } = render(<TwoColumnList data={listData} />);
        expect(container).toBeInTheDocument();
    });

    it('should contain default classes with no flags', () => {
        const { container } = render(<TwoColumnList data={listData} />);
        expect(
            container.getElementsByClassName(
                'two-column-list__row--default-bold'
            )
        ).toBeTruthy();

        expect(
            container.getElementsByClassName('two-column-list__row--borders')
        ).toBeTruthy();
        expect(
            container.getElementsByClassName('two-column-list--borders')
        ).toBeTruthy();
        expect(
            container.getElementsByClassName('two-column-list__row--no-padding')
        ).toBeTruthy();
    });

    it('should render without borders with flag', () => {
        const { container } = render(
            <TwoColumnList data={listData} borderless />
        );
        expect(
            container.getElementsByClassName('two-column-list__row--borderless')
        ).toBeTruthy();
    });

    it('should bold the list data on right if contains flag', () => {
        const { container } = render(
            <TwoColumnList data={listData} boldRight />
        );

        expect(
            container.getElementsByClassName('two-column-list__row--right-bold')
        ).toBeTruthy();
    });

    it('should bold the list data on left if contains flag', () => {
        const { container } = render(
            <TwoColumnList data={listData} leftBold />
        );

        expect(
            container.getElementsByClassName(
                'two-column-list__row--default-bold'
            )
        ).toBeTruthy();
    });

    it('should bold no list data on left if contains flag', () => {
        const { container } = render(<TwoColumnList data={listData} noBold />);
        expect(
            container.getElementsByClassName('two-column-list__row--no-bold')
        ).toBeTruthy();
        expect(
            container.getElementsByClassName('two-column-list__row--no-bold')
        ).toBeTruthy();
    });

    it('should have no padding if contains flag', () => {
        const { container } = render(
            <TwoColumnList data={listData} noPadding />
        );
        expect(
            container.getElementsByClassName('two-column-list__row--no-padding')
        ).toBeTruthy();
    });

    it('should have default column width with no props', () => {
        const { container } = render(<TwoColumnList data={listData} />);
        const spanElements = container.querySelectorAll('span');
        spanElements.forEach(span => {
            expect(span).toHaveStyle('width:45%');
        });
    });

    it('should have specified columns widths with props', () => {
        const { container } = render(
            <TwoColumnList data={listData} colWidths={['25%', '75%']} />
        );

        const spanElements = container.querySelectorAll('span');
        expect(spanElements[0]).toHaveStyle('width:25%');
        expect(spanElements[1]).toHaveStyle('width:75%');
    });

    it('should have default margins between list items with no props', () => {
        render(<TwoColumnList data={listData} />);

        const liElements = screen.getAllByRole('listitem');
        expect(liElements[1]).toHaveStyle('margin:0 0');
    });

    it('should have specified margins between list items with props', () => {
        render(<TwoColumnList margin={['16px', 0]} data={listData} />);

        const listitems = screen.getAllByRole('listitem');
        expect(listitems[1]).toHaveStyle('margin:16px 0');
    });

    it('should successfully render with props with array data', () => {
        const arrayData = [
            ['a', 1],
            ['b', 2],
            ['c', 3],
        ];
        const { container } = render(<TwoColumnList data={arrayData} />);
        expect(container).toBeInTheDocument();

        const listitems = screen.getAllByRole('listitem');
        expect(listitems).toHaveLength(3);
    });

    it('should render custom class with "classes" prop', () => {
        const { container } = render(
            <TwoColumnList data={listData} classes='customClass' />
        );
        expect(
            container.getElementsByClassName('two-column-list customClass')
        ).toBeTruthy();
    });
});
