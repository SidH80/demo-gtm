import React, { useState, useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import filterLanguages from '../../helpers/filterLanguages';
import getClassNames from '../../helpers/getClassNames';

import IrsLink from '../IrsLink';

import PropTypes from 'prop-types';

import './NavList.css';
import '../../styles/global.css';

/**
 *  @description This component will render a list of Link components.
 *  It will provide a delineator between each link.
 *  It is intended to be used for horizontal lists of links
 *  in the header as it includes a welcome message.
 */
const NavList = ({ className, links, userName }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [filteredLanguages, setFilteredLanguages] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const linkRef = useRef(null);
    const dropDownMenuRef = useRef(null);
    const currentLangBtnRef = useRef(null);

    const languageRefs = {};

    const classNames = getClassNames('nav-list', className);

    const closeMenu = evt => {
        if (
            !dropDownMenuRef.current?.contains(evt.target) ||
            evt.type === 'click' ||
            evt.key === 'Escape' ||
            evt.key === 'Tab'
        ) {
            setIsOpen(false);
            setCurrentIndex(-1);
            currentLangBtnRef.current?.focus();

            document.removeEventListener('click', closeMenu);
            document.removeEventListener('keydown', handleKeyDown);
        }
    };

    const handleKeyDown = evt => {
        const langKeys = Object.keys(filteredLanguages);
        const destKey = langKeys[currentIndex];

        if (evt.key === 'ArrowDown') {
            evt.preventDefault();
            if (currentIndex + 1 > langKeys.length) {
                setCurrentIndex(0);
            }
            setCurrentIndex(prevIndex => prevIndex + 1);
            languageRefs[destKey]?.focus();
        }

        if (evt.key === 'ArrowUp') {
            evt.preventDefault();
            setCurrentIndex(prevIndex => prevIndex - 1);
            if (currentIndex - 1) {
                setCurrentIndex(langKeys.length - 1);
            }
            languageRefs[destKey]?.focus();
        }

        if (evt.key === 'Tab') {
            if (evt.target.nodeName === 'BUTTON') {
                setCurrentIndex(0);
            } else if (evt.target.id && langKeys.includes(evt.target.id)) {
                const langIndex = langKeys.indexOf(evt.target.id);

                langIndex + 1 >= langKeys.length
                    ? closeMenu(evt)
                    : setCurrentIndex(langIndex + 1);
            } else {
                closeMenu(evt);
            }
        }

        if (evt.key === 'Escape') {
            closeMenu(evt);
        }
    };

    const openMenu = (evt, filteredLanguages) => {
        evt.preventDefault();
        setIsOpen(true);
        setFilteredLanguages(filteredLanguages);

        document.addEventListener('click', closeMenu);
        document.addEventListener('keydown', handleKeyDown);
    };

    const setLanguageRefs = element => {
        if (element) {
            languageRefs[element.id] = element;
        }
    };

    const renderDropdownLanguageMenu = (currentLanguage, item) => {
        const filteredLanguages = filterLanguages(
            item.languageNames,
            currentLanguage
        );

        return (
            <section className='navlist-switcher-section'>
                <button
                    className='navlist-switcher-section__button navlist-text'
                    type='button'
                    aria-expanded={isOpen}
                    aria-label={
                        item.languageNames[currentLanguage].selectedLanguage
                    }
                    onClick={e => openMenu(e, filteredLanguages)}
                    style={{ margin: 0 }}
                    ref={currentLangBtnRef}>
                    {item.languageNames[currentLanguage].nativeName}
                    <div
                        className='navlist-switcher-section__icon'
                        style={{
                            transform: isOpen && 'scaleY(-1)',
                            marginTop: isOpen && '-4px',
                        }}>
                        {item.icon}
                    </div>
                </button>
                <ul
                    role='list'
                    className='navlist-switcher-section__ul'
                    ref={dropDownMenuRef}>
                    {isOpen &&
                        Object.keys(filteredLanguages).map(language => {
                            return (
                                <li
                                    key={language}
                                    value={language}
                                    className='navlist-switcher-section__li'
                                    onClick={evt => {
                                        item.handleChange(language);
                                        closeMenu(evt);
                                    }}>
                                    <NavLink
                                        exact
                                        id={language}
                                        to={item.linkDestination}
                                        aria-label={
                                            item.languageNames[language]
                                                .nativeName
                                        }
                                        aria-current='page'
                                        className='navlist-switcher-section__link'
                                        ref={setLanguageRefs}>
                                        {
                                            item.languageNames[language]
                                                .nativeName
                                        }
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </section>
        );
    };

    return (
        <div className={classNames}>
            <ul role='list' id='nav-list-ul' className='link-list nav-list'>
                {userName && (
                    <li className='nav-list__greeting navlist-text'>
                        {userName}
                    </li>
                )}

                {links.map((item, index) => {
                    const currentLanguage = item.isLanguageDropDown
                        ? item.i18n.language
                        : '';

                    return (
                        <li key={item.id} className='navlist-text'>
                            {item.isLanguageDropDown ? (
                                renderDropdownLanguageMenu(
                                    currentLanguage,
                                    item
                                )
                            ) : item.internalLink && item.handleClick ? (
                                <NavLink
                                    exact
                                    to={item.linkDestination}
                                    aria-label={item.linkDescription}
                                    className='link'
                                    onClick={evt => item.handleClick(evt)}>
                                    {item.icon}
                                    {item.linkDisplayText}
                                </NavLink>
                            ) : item.internalLink && !item.handleClick ? (
                                <NavLink
                                    exact
                                    to={item.linkDestination}
                                    aria-label={item.linkDescription}
                                    className='link'
                                    ref={linkRef}>
                                    {item.icon}
                                    {item.linkDisplayText}
                                </NavLink>
                            ) : item.newWindow && item.handleClick ? (
                                <IrsLink
                                    linkDisplayText={item.linkDisplayText}
                                    linkDestination={item.linkDestination}
                                    linkDescription={item.linkDescription}
                                    clickEvent={evt => item.handleClick(evt)}
                                    newWindow={item.newWindow}
                                    addDelineater={index !== 0}
                                    className={item.className}
                                />
                            ) : item.component ? (
                                item.component
                            ) : (
                                <IrsLink
                                    icon={item.icon}
                                    linkDisplayText={item.linkDisplayText}
                                    linkDestination={item.linkDestination}
                                    linkDescription={item.linkDescription}
                                    clickEvent={evt => item.handleClick(evt)}
                                    newWindow={item.newWindow}
                                    addDelineater={index !== 0}
                                    className={item.className}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

NavList.propTypes = {
    className: PropTypes.string,
    /** An array of link related props */
    links: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            linkDisplayText: PropTypes.string,
            linkDestination: PropTypes.string,
            linkDescription: PropTypes.string,
            newWindow: PropTypes.bool,
            component: PropTypes.object,
        })
    ),
    /**Used to populate with the username of a signed in user */
    userName: PropTypes.string,
};

NavList.defaultProps = {
    className: '',
    links: [],
    userName: '',
};

export default withRouter(NavList);
