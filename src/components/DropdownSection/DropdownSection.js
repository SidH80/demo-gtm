import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IrsLink from '../IrsLink';
import './DropdownSection.css';
import '../../styles/global.css';
import { NavLink } from 'react-router-dom';
const isUndefined = require('lodash/isUndefined');
import filterLanguages from '../../helpers/filterLanguages';

/**
 * @description This class is responsible for rendering a section of items
 * in a dropdown menu. It should be given an array of link obects
 * that will then be rendered into the dropdown menu.
 * The DropdownSection will render a line below it to show that
 * the section is over.
 *
 * The background color of the Dropdown Section items will match the
 * background color of the container that they are placed in.
 */
export default class DropdownSection extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
        this._isMounted = false;
        this.dropDownMenuRef = React.createRef();
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    openMenu = event => {
        event.preventDefault();
        this.setState({
            isOpen: true,
        });
        document.addEventListener('click', this.closeMenu);
    };

    closeMenu = event => {
        if (
            this._isMounted &&
            this.dropDownMenuRef &&
            !this.dropDownMenuRef.current?.contains(event.target)
        ) {
            this.setState({ isOpen: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClick = (evt, clickEvent) => {
        clickEvent(evt);
        this.props.clickFunction();
    };

    handleStateChange = () => {
        this.props.clickFunction();
    };

    /**
     * @function languagePicker renders the list items which contain the languages available
     * for selection and filters out the language that is currently displayed
     */
    languagePicker = (link, currentLanguage) => {
        const filteredLanguages = filterLanguages(
            link.languageNames,
            currentLanguage
        );
        return Object.keys(filteredLanguages).map(language => (
            <li
                key={language}
                value={language}
                className='dropdown-switcher-section__li'
                onClick={() => {
                    link.handleChange(language);
                    this.props.clickFunction();
                }}>
                <a
                    aria-label={link.languageNames[language].nativeName}
                    role='link'
                    className='dropdown-switcher-section__link'
                    style={{ padding: 0 }}>
                    {link.languageNames[language].nativeName}
                </a>
            </li>
        ));
    };

    /**
     * @function renderSwitch renders the section containing the entire
     * dropdown menu and it's children.
     */
    renderSwitch = (currentLanguage, link) => {
        return (
            <div
                className='dropdown-switcher-section'
                ref={this.switcherListRef}>
                <button
                    className='dropdown-switcher-section__button'
                    type='button'
                    aria-expanded={this.state.isOpen}
                    aria-label={
                        link.languageNames[currentLanguage].selectedLanguage
                    }
                    onClick={this.openMenu}
                    style={{ margin: 0 }}>
                    {link.languageNames[currentLanguage].nativeName}
                    <div
                        className='dropdown-switcher-section__icon'
                        style={{
                            transform: this.state.isOpen && 'scaleY(-1)',
                            position: this.state.isOpen && 'relative',
                            top: this.state.isOpen && '-3px',
                        }}>
                        {link.icon}
                    </div>
                </button>
                <ul
                    role='list'
                    className='dropdown-switcher-section__ul'
                    ref={this.dropDownMenuRef}>
                    {this.state.isOpen &&
                        this.languagePicker(link, currentLanguage)}
                </ul>
            </div>
        );
    };

    render() {
        return (
            /* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */
            <ul role='list' className='dropdown-section link-list'>
                <li>{this.props.userName}</li>
                <li role='separator'></li>
                {this.props.links.map(link => {
                    let classes =
                        link.linkDestination === window.location.pathname
                            ? 'dropdown-section__item--selected'
                            : '';
                    let icon = isUndefined(link.icon) ? null : link.icon;
                    const currentLanguage = link.isLanguageDropDown
                        ? link.i18n.language
                        : '';
                    return (
                        <li key={link.id} className={classes}>
                            {link.isLanguageDropDown ? (
                                this.renderSwitch(currentLanguage, link)
                            ) : link.internalLink && link.handleClick ? (
                                <NavLink
                                    exact
                                    to={link.linkDestination}
                                    aria-label={link.linkDescription}
                                    className='dropdown-link'
                                    onClick={evt =>
                                        this.handleClick(evt, link.handleClick)
                                    }>
                                    {link.icon}
                                    {link.linkDisplayText}
                                </NavLink>
                            ) : link.internalLink && !link.handleClick ? (
                                <NavLink
                                    exact
                                    to={link.linkDestination}
                                    aria-label={link.linkDescription}
                                    className='dropdown-link'
                                    onClick={() => this.handleStateChange()}>
                                    {link.icon}
                                    {link.linkDisplayText}
                                </NavLink>
                            ) : link.newWindow && link.handleClick ? (
                                <IrsLink
                                    linkDisplayText={link.linkDisplayText}
                                    linkDestination={link.linkDestination}
                                    linkDescription={link.linkDescription}
                                    clickEvent={evt => link.handleClick(evt)}
                                    newWindow={link.newWindow}
                                    removeLinkClass={link.externalLink}
                                    className='dropdown-link'
                                />
                            ) : link.component ? (
                                link.component
                            ) : (
                                <a
                                    href={link.linkDestination}
                                    className='dropdown-link'
                                    aria-current={
                                        link.linkDestination ===
                                        window.location.pathname
                                            ? true
                                            : null
                                    }
                                    aria-label={link.linkDescription}
                                    onClick={evt =>
                                        this.handleClick(evt, link.handleClick)
                                    }>
                                    {icon}
                                    {link.linkDisplayText}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

DropdownSection.propTypes = {
    /**@prop {array} links - links that are passed in by the Dropdown class and rendered within the menu */
    links: PropTypes.arrayOf(
        PropTypes.shape({
            /**@prop {string} id - Each link object is made up of a link ID */
            id: PropTypes.string,
            /**@prop {string} linkDescription - The alt text for the link, also used for accessibility purposes */

            linkDescription: PropTypes.string,
            /**@prop {string} linkDestination - An absolute or relative URL that describes where the user will be taken after clicking the link */

            linkDestination: PropTypes.string,
            /**@prop {string} linkDisplayText - The display text of the link */

            linkDisplayText: PropTypes.string,
            /**@prop {element} icon - An icon can be optionally included where provided */

            icon: PropTypes.element,

            /**@param {object} component - Component to render in place of a link */
            component: PropTypes.object,
        })
    ),
    /**@prop {string} linkType - links that are passed in by the Dropdown class and rendered within the menu */
    linkType: PropTypes.string,
    /**@prop {function} linkType - links that are passed in by the Dropdown class and rendered within the menu */
    clickFunction: PropTypes.func,
};

DropdownSection.defaultProps = {
    links: [],
    clickFunction: null,
};
