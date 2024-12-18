import React from 'react';
import DropdownSection from '.';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('DropDownSection Tests', () => {
    let addEventListenerSpy;
    let removeEventListenerSpy;
    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    });
    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });
    const languageNames = {
        en: { nativeName: 'English' },
        es: { nativeName: 'Español' },
    };

    const i18n = {
        language: 'en',
    };

    const nav = [
        {
            id: 'langPicker',
            isLanguageDropDown: true,
            linkDescription: 'testLp',
            linkDestination: '#',
            languageNames,
            i18n,
            handleChange: jest.fn(),
            icon: <p id='chevron'>Chevron</p>,
        },
        {
            id: 'a',
            linkDescription: 'testA',
            linkDestination: '/#',
            handleClick: jest.fn(),
            linkDisplayText: 'Display Text A',
            internalLink: true,
            icon: null,
        },
        {
            id: 'b',
            linkDescription: 'testB',
            linkDestination: '#',
            linkDisplayText: 'Display Text B',
            externalLink: true,
            newWindow: true,
            handleClick: jest.fn(),
            icon: null,
        },
        {
            id: 'c',
            linkDescription: 'testC',
            linkDestination: '#',
            linkDisplayText: 'Display Text C',
            newWindow: true,
            handleClick: jest.fn(),
            icon: null,
        },
        {
            id: 'd',
            linkDescription: 'testD',
            linkDestination: '#',
            linkDisplayText: 'Display Text D',
            internalLink: true,
            newWindow: true,
            icon: null,
        },
    ];

    const testPath = '/ola';
    const clickFunctionMock = jest.fn();

    it('should render without crashing', () => {
        render(<DropdownSection />);
    });

    it.each([
        'English',
        'Display Text A',
        'Display Text B',
        'Display Text C',
        'Display Text D',
    ])(
        'should render four nav links and a language picker elements',
        linkText => {
            const { getByText } = render(
                <MemoryRouter initialEntries={[testPath]}>
                    <DropdownSection links={nav} />
                </MemoryRouter>
            );
            expect(getByText(linkText)).toBeInTheDocument();
        }
    );

    it('should render two nav links and a language picker elements', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={nav}
                />
            </MemoryRouter>
        );
        const linkA = getByRole('link', { name: 'testA' });
        fireEvent.click(linkA);
        expect(clickFunctionMock).toHaveBeenCalled();
    });

    it('should fire handleClick method when a link with newWindow true and link is clicked', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={nav}
                />
            </MemoryRouter>
        );
        const linkC = getByRole('link', { name: 'testC' });
        fireEvent.click(linkC);
        expect(nav[3].handleClick).toHaveBeenCalled();
    });

    it('should display Spanish option when language picker is clicked', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection links={nav} />
            </MemoryRouter>
        );
        const languagePicker = getByRole('button');
        fireEvent.click(languagePicker);
        expect(getByRole('link', { name: 'Español' })).toBeInTheDocument();
    });

    it('should close language picker when clicked off the menu', () => {
        const { getAllByRole, getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection links={nav} />
            </MemoryRouter>
        );
        const languagePicker = getByRole('button');
        fireEvent.click(languagePicker);
        expect(getAllByRole('link').length).toBe(5);
        fireEvent.click(document);
        expect(getAllByRole('link').length).toBe(4);
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'click',
            expect.any(Function)
        );
    });
    it('should close language picker when language is chosen', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={nav}
                />
            </MemoryRouter>
        );
        const languagePicker = getByRole('button');
        fireEvent.click(languagePicker);
        const espLink = getByRole('link', { name: 'Español' });
        act(() => {
            fireEvent.click(espLink);
        });
        expect(clickFunctionMock).toHaveBeenCalled();
    });
    it('should render a link with dropdown-link class and update state by calling clickFunction method', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={nav}
                />
            </MemoryRouter>
        );
        const linkD = getByRole('link', { name: 'testD' });
        expect(linkD).toHaveClass('dropdown-link');
        act(() => {
            fireEvent.click(linkD);
        });
        expect(clickFunctionMock).toHaveBeenCalled();
    });
    it('should render a component supplied as a prop', () => {
        const component = (
            <a href='#' className='dropdown-link'>
                Text
            </a>
        );
        const link = {
            component,
        };
        const { getByText } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={[link]}
                />
            </MemoryRouter>
        );
        const renderedComponent = getByText('Text');
        expect(renderedComponent).toBeInTheDocument();
    });
    it('should render an anchor element with aria-current true', () => {
        const link = {
            linkDestination: '/',
            linkDescription: '',
            handleClick: jest.fn(),
            linkDisplayText: 'Link Text',
            icon: null,
        };
        const { getByText } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={[link]}
                />
            </MemoryRouter>
        );
        const component = getByText('Link Text');
        act(() => {
            fireEvent.click(component);
        });
        expect(link.handleClick).toHaveBeenCalled();
        expect(component).toHaveAttribute('aria-current', 'true');
    });
    it('should render an anchor element that is not the current item on the page', () => {
        const link = {
            linkDestination: '/ola',
            linkDescription: '',
            handleClick: jest.fn(),
            linkDisplayText: 'Link Text',
            icon: null,
        };
        const { getByText } = render(
            <MemoryRouter initialEntries={[testPath]}>
                <DropdownSection
                    clickFunction={clickFunctionMock}
                    links={[link]}
                />
            </MemoryRouter>
        );
        const component = getByText('Link Text');
        act(() => {
            fireEvent.click(component);
        });
        expect(component).not.toHaveAttribute('aria-current');
    });
});
