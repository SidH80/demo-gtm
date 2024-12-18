import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import PaginationNav2 from './PaginationNav2';

describe('PaginationNav2 Tests', () => {
    let currentPage = 1;
    let totalPages = 40;

    const mockHandler = jest.fn();

    const componentWithProps = (
        <PaginationNav2
            currentPage={currentPage}
            totalPages={totalPages}
            prevLinkLabel='prev label'
            nextLinkLabel='next label'
            handleNextClick={mockHandler}
            handlePrevClick={mockHandler}
            handlePageBtnClick={mockHandler}
            handleChangeResults={mockHandler}
            handleClickBack={mockHandler}
            showResultsPerPage
            showJumpToPage
            showJumpToPageMobile
            showPageTracker
            jumpToPageErrorMsg='sample error message'
        />
    );

    it('should render without crashing', () => {
        render(componentWithProps);
    });

    it('should correctly set results per page dropdown default option', () => {
        render(componentWithProps);
        // check if first option is selected
        expect(screen.getByRole('option', { name: '25' }).selected).toBe(true);

        // check if the rest of options exists
        expect(screen.getByRole('option', { name: '50' })).toBeTruthy();
        expect(screen.getByRole('option', { name: '75' })).toBeTruthy();
        expect(screen.getByRole('option', { name: '100' })).toBeTruthy();
        expect(screen.getByRole('option', { name: 'All' })).toBeTruthy();

        // check if the correct number of options are created
        expect(screen.getAllByRole('option').length).toBe(5);
    });

    it('should allow user to change results per page dropdown value', () => {
        render(componentWithProps);
        userEvent.selectOptions(
            screen.getByRole('combobox'),
            screen.getByRole('option', { name: '50' })
        );

        // check if value has changed after making a selection
        expect(screen.getByRole('option', { name: '50' }).selected).toBe(true);
    });

    it('should set new current page on click of page buttons', () => {
        render(componentWithProps);
        const pageBtns = screen.getAllByTestId('page-btn');
        userEvent.click(pageBtns[1]);

        // check if the selected button has active styling
        expect(
            pageBtns[1].classList.contains('numbered-page-btn__active')
        ).toBe(true);
    });

    it('should render elipses on left and right sides', () => {
        // adjust current page and simulate rerender
        currentPage = 12;
        const componentWithProps = (
            <PaginationNav2
                currentPage={currentPage}
                totalPages={totalPages}
                prevLinkLabel='prev label'
                nextLinkLabel='next label'
                handleNextClick={mockHandler}
                handlePrevClick={mockHandler}
                handlePageBtnClick={mockHandler}
                handleChangeResults={mockHandler}
                handleClickBack={mockHandler}
                showResultsPerPage
                showJumpToPage
                showJumpToPageMobile
                showPageTracker
                jumpToPageErrorMsg='sample error message'
            />
        );
        render(componentWithProps);
        const elipses = screen.getAllByTestId('elipsis');

        // check both elipses are rendered
        expect(elipses.length).toBe(2);
    });

    it('should navigate to next page on right chevron click', () => {
        render(componentWithProps);
        const rightChevron = screen.getByTestId('right-chevron');
        const pageBtns = screen.getAllByTestId('page-btn');

        // check if first page button is active before clicking next chevron button
        expect(
            pageBtns[0].classList.contains('numbered-page-btn__active')
        ).toBe(true);
        expect(
            pageBtns[1].classList.contains('numbered-page-btn__active')
        ).toBe(false);

        userEvent.click(rightChevron);

        // check if second page button is active after clicking next chevron button
        expect(
            pageBtns[0].classList.contains('numbered-page-btn__active')
        ).toBe(false);
        expect(
            pageBtns[1].classList.contains('numbered-page-btn__active')
        ).toBe(true);
    });

    it('should navigate to previous page on left chevron click', () => {
        render(componentWithProps);
        const leftChevron = screen.getByTestId('left-chevron');
        const rightChevron = screen.getByTestId('right-chevron');
        const pageBtns = screen.getAllByTestId('page-btn');

        userEvent.click(rightChevron);

        // check if second page button is active before clicking previous chevron button
        expect(
            pageBtns[0].classList.contains('numbered-page-btn__active')
        ).toBe(false);
        expect(
            pageBtns[1].classList.contains('numbered-page-btn__active')
        ).toBe(true);

        userEvent.click(leftChevron);

        // check if first page button is active after clicking previous chevron button
        expect(
            pageBtns[0].classList.contains('numbered-page-btn__active')
        ).toBe(true);
        expect(
            pageBtns[1].classList.contains('numbered-page-btn__active')
        ).toBe(false);
    });

    it('should render 5 end pages plus first page when current page is up to 3 pages from total pages', () => {
        render(componentWithProps);
        let pageBtns = screen.getAllByTestId('page-btn');
        const lastPage = pageBtns[pageBtns.length - 1];

        // check last page is selected properly
        expect(lastPage.innerHTML).toEqual(String(totalPages));

        // click on the last page to move current page
        userEvent.click(lastPage);
        pageBtns = screen.getAllByTestId('page-btn');

        // check if proper amount of page buttons are rendered
        expect(pageBtns.length).toBe(6);
        // check the value of each page rendered
        expect(pageBtns[4].innerHTML).toEqual(String(totalPages - 1));
        expect(pageBtns[3].innerHTML).toEqual(String(totalPages - 2));
        expect(pageBtns[2].innerHTML).toEqual(String(totalPages - 3));
        expect(pageBtns[1].innerHTML).toEqual(String(totalPages - 4));
        expect(pageBtns[0].innerHTML).toEqual('1');
    });

    it('responsive breakpoint should be dynamic to screensize', () => {
        render(componentWithProps);
        const container = screen.getByTestId('component-container');
        expect(container).toBeTruthy();

        global.innerWidth = 200;
        global.dispatchEvent(new Event('resize'));
        const containerMobile = screen.getByTestId(
            'component-container-mobile'
        );
        expect(containerMobile).toBeTruthy();
    });

    it('should NOT render error message for emptied "Jump to" value on click.', () => {
        const errorMessage = 'Error: Invalid page number';
        render(componentWithProps);
        const jumpToInput = screen.getByRole('textbox', {
            name: 'Enter a page number from 1 through 40 to jump to',
        });
        const jumpToButton = screen.getByRole('button', { name: 'Go' });
        userEvent.type(jumpToInput, '2');
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();
        userEvent.clear(jumpToInput);
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();
    });

    it('should render "Error: Invalid page number" for all invalid page number scenarios.', () => {
        const errorMessage = 'Error: Invalid page number';
        render(componentWithProps);

        const jumpToInput = screen.getByRole('textbox', {
            name: 'Enter a page number from 1 through 40 to jump to',
        });
        const jumpToButton = screen.getByRole('button', { name: 'Go' });

        // jumpToValue < 1
        userEvent.type(jumpToInput, '0');
        userEvent.click(jumpToButton);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        userEvent.clear(jumpToInput);
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();

        // jumpToValue > totalPages
        userEvent.type(jumpToInput, '9999');
        userEvent.click(jumpToButton);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        userEvent.clear(jumpToInput);
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();

        // jumpToValue isNaN
        userEvent.type(jumpToInput, '1,5');
        userEvent.click(jumpToButton);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        userEvent.clear(jumpToInput);
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();

        // jumpToValue includes a decimal
        userEvent.type(jumpToInput, '1.5');
        userEvent.click(jumpToButton);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        userEvent.clear(jumpToInput);
        userEvent.click(jumpToButton);
        expect(screen.queryByText(errorMessage)).toBeNull();
    });
});
