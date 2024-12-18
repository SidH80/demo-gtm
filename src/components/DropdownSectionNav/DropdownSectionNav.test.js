import React from 'react';
import DropdownSectionNav from '.';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('DropdownSectionNave Tests', () => {
    const icon = <p>Icon</p>;
    const navLinks = [
        {
            id: 'navTestLink1',
            linkDisplayText: 'Display Text 1',
            linkDestination: '/linkDestination1',
            linkDescription: 'Nav Link Description1',
            newWindow: false,
            icon,
        },
        {
            id: 'navTestLink2',
            linkDisplayText: 'Display Text 2',
            linkDestination: '/',
            linkDescription: 'Nav Link Description 2',
            newWindow: false,
        },
        {
            id: 'navTestLink3',
            linkDisplayText: 'Display Text 3',
            subNav: [
                {
                    id: 'link3TestSubNav1',
                    linkDisplayText: 'Sub Nav Display Text 1',
                    linkDestination: '/linkSubNavDestination1',
                    linkDescription: 'Sub Nav Link Description 1',
                    newWindow: false,
                },
                {
                    id: 'link3TestSubNav2',
                    linkDisplayText: 'Sub Nav Display Text 2',
                    linkDestination: '/linkSubNavDestination2',
                    linkDescription: 'Sub Nav Link Description 2',
                    newWindow: false,
                },
            ],
        },
    ];
    const testPath = '/ola';

    it('should render without crashing', () => {
        render(<DropdownSectionNav />);
    });
    it.each([
        'Display Text 1',
        'Display Text 2',
        'Display Text 3',
        'Sub Nav Display Text 1',
        'Sub Nav Display Text 2',
    ])('should render "%s" without crashing', text => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSectionNav links={navLinks} />
            </MemoryRouter>
        );
        const displayText = getByText(text);
        expect(displayText).toBeInTheDocument();
    });
    it('should show icon if supplied in link props', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSectionNav links={navLinks}></DropdownSectionNav>
            </MemoryRouter>
        );
        const icon = getByText('Icon');
        expect(icon).toBeInTheDocument();
    });
    it('should show sub nav items when parent nav item is clicked', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSectionNav links={navLinks}></DropdownSectionNav>
            </MemoryRouter>
        );
        const navBtn = getByRole('button', { name: 'Display Text 3' });
        fireEvent.click(navBtn);
        expect(navBtn).toHaveAttribute('aria-expanded', 'true');
    });
    it('should show selected class nav item is on current page', () => {
        const { getAllByRole } = render(
            <MemoryRouter initialEntries={['/']}>
                <DropdownSectionNav links={navLinks}></DropdownSectionNav>
            </MemoryRouter>
        );
        const navTestLink2 = getAllByRole('listitem')[1];
        expect(navTestLink2).toHaveClass(
            'dropdown-section-nav__item--selected'
        );
    });
    it('should toggle sub nav when parent nav item is clicked twice', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSectionNav links={navLinks}></DropdownSectionNav>
            </MemoryRouter>
        );
        const navBtn = getByRole('button', { name: 'Display Text 3' });
        fireEvent.click(navBtn);
        fireEvent.click(navBtn);
        expect(navBtn).toHaveAttribute('aria-expanded', 'false');
    });
    it('should navigate when sub nav item is clicked', () => {
        const inputRefMock = jest.fn();
        const clickFunctionMock = jest.fn();
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSectionNav
                    links={navLinks}
                    inputRef={inputRefMock}
                    clickFunction={clickFunctionMock}
                />
            </MemoryRouter>
        );
        const navBtn = getByRole('button', { name: 'Display Text 3' });
        fireEvent.click(navBtn);
        const subNavLink = getByRole('link', {
            name: 'Sub Nav Display Text 1',
        });
        fireEvent.click(subNavLink);
        expect(inputRefMock && clickFunctionMock).toHaveBeenCalled();
    });
});
