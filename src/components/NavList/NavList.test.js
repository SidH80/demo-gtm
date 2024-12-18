import React from 'react';
import NavList from './NavList';
import { act, fireEvent, screen, within } from '@testing-library/react';
import renderWithRouter from '../../test/renderWithRouter';
import '@testing-library/jest-dom';

describe('NavList Tests', () => {
    const userName = 'John Doe';

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

    const navLinks = [
        {
            id: 'langPicker',
            isLanguageDropDown: true,
            linkDescription: 'testLp',
            linkDestination: '#',
            languageNames,
            i18n,
            handleChange: jest.fn(),
            icon: <svg role='img' id='chevron' />,
        },
        {
            id: 'a',
            linkDescription: 'testA',
            linkDestination: '/#',
            handleClick: jest.fn(),
            linkDisplayText: 'Link A',
            internalLink: true,
            icon: null,
        },
        {
            id: 'b',
            linkDescription: 'testB',
            linkDestination: '#',
            linkDisplayText: 'Link B',
            externalLink: true,
            newWindow: true,
            handleClick: jest.fn(),
            icon: null,
        },
        {
            id: 'c',
            linkDescription: 'testC',
            linkDestination: '#',
            linkDisplayText: 'Link C',
            newWindow: true,
            handleClick: jest.fn(),
            icon: null,
        },
        {
            id: 'd',
            linkDescription: 'testD',
            linkDestination: '#',
            linkDisplayText: 'Link D',
            internalLink: true,
            handleClick: jest.fn(),
            newWindow: true,
            icon: null,
        },
        {
            id: 'e',
            linkDescription: 'testE',
            linkDestination: '#',
            linkDisplayText: 'Link E',
            internalLink: true,
            newWindow: true,
            icon: null,
        },
        {
            id: 'f',
            linkDisplayText: 'testF',
            linkDestination: '#',
            linkDescription: 'Link F',
            handleClick: jest.fn(),
            icon: <svg role='img' id='chevron' />,
        },
        {
            component: <a href='/'>Item Component</a>,
        },
    ];

    const clickFunctionMock = jest.fn();

    it('should render with no props', () => {
        renderWithRouter(<NavList />);

        const navList = screen.getByRole('list');
        expect(navList).toBeInTheDocument();
    });

    it('should render a language picker with chevron and userName', () => {
        renderWithRouter(<NavList userName={userName} links={navLinks} />);

        const user = screen.getByText('John Doe');
        const button = screen.getByRole('button');
        const chevronIcon = within(button).getByRole('img');

        expect(user).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(chevronIcon).toBeInTheDocument();
    });

    it('should render a language picker with chevron and userName', () => {
        renderWithRouter(<NavList userName={userName} links={navLinks} />);

        const user = screen.getByText('John Doe');
        const button = screen.getByRole('button');
        const chevronIcon = within(button).getByRole('img');

        expect(user).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(chevronIcon).toBeInTheDocument();
    });

    it.each([
        'English',
        'Link A',
        'Link B',
        'Link C',
        'Link D',
        'Link E',
        'Item Component',
    ])('should render "%s" nav link', elementText => {
        renderWithRouter(<NavList links={navLinks} />);
        expect(screen.getByText(elementText)).toBeInTheDocument();
    });

    it('should fire handleClick method when a link with newWindow true and link is clicked', () => {
        renderWithRouter(
            <NavList clickFunction={clickFunctionMock} links={navLinks} />
        );
        const linkC = screen.getByRole('link', { name: 'testC' });
        fireEvent.click(linkC);
        expect(navLinks[3].handleClick).toHaveBeenCalled();
    });

    it('should fire handleClick method when a link with internal link true and link is clicked', () => {
        renderWithRouter(
            <NavList clickFunction={clickFunctionMock} links={navLinks} />
        );
        const linkD = screen.getByRole('link', { name: 'testD' });
        fireEvent.click(linkD);
        expect(navLinks[4].handleClick).toHaveBeenCalled();
    });

    it('should render component item when supplied as a nav link', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const customComponent = screen.getByText('Item Component');
        expect(customComponent).toBeInTheDocument();
    });

    it('should open language picker and display Spanish option when language picker is clicked', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const langPicker = screen.getByRole('button');
        fireEvent.click(langPicker);
        const spanishSelector = screen.getByRole('link', { name: 'Español' });
        expect(spanishSelector).toBeInTheDocument();
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'click',
            expect.any(Function)
        );
    });

    it.each(['ArrowDown', 'ArrowUp', 'Tab'])(
        'should select language from dropdown using "%s" and not close menu',
        key => {
            renderWithRouter(<NavList links={navLinks} />);
            const langPicker = screen.getByRole('button');
            fireEvent.click(langPicker);
            const spanishSelector = screen.getByRole('link', {
                name: 'Español',
            });
            act(() => {
                fireEvent.keyDown(spanishSelector, {
                    key,
                    code: key,
                });
            });
            expect(removeEventListenerSpy).not.toHaveBeenCalledWith();
        }
    );

    it.each(['Tab', 'Escape'])(
        'should close language picker when "%s" is pressed',
        key => {
            renderWithRouter(<NavList links={navLinks} />);
            const langPicker = screen.getByRole('button');
            fireEvent.click(langPicker);
            const spanishSelector = screen.getByRole('link', {
                name: 'Español',
            });
            act(() => {
                fireEvent.keyDown(spanishSelector, {
                    key,
                    code: key,
                });
            });
            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            );
        }
    );

    it('should close language picker when clicked off the menu', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const langPicker = screen.getByRole('button');
        fireEvent.click(langPicker);
        fireEvent.click(document);
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'click',
            expect.any(Function)
        );
    });

    it('should close language picker when language is selected', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const langPicker = screen.getByRole('button');
        fireEvent.click(langPicker);
        const espLink = screen.getByRole('link', { name: 'Español' });
        act(() => {
            fireEvent.click(espLink);
        });
        expect(navLinks[0].handleChange).toHaveBeenCalled();
    });

    it('should close language picker when escape button is pressed', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const langPicker = screen.getByRole('button');
        fireEvent.click(langPicker);
        const espLink = screen.getByRole('link', { name: 'Español' });
        act(() => {
            fireEvent.keyDown(espLink, { key: 'Escape', code: 'Escape' });
        });
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
    });

    it('should close language picker when tab button is pressed', () => {
        renderWithRouter(<NavList links={navLinks} />);
        const langPicker = screen.getByRole('button');
        fireEvent.click(langPicker);
        const espLink = screen.getByRole('link', { name: 'Español' });
        act(() => {
            fireEvent.keyDown(espLink, { key: 'Tab', code: 'Tab' });
        });
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
    });
});
